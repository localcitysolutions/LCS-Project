import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

/**
 * Dispatches due reminders that requested email/WhatsApp delivery.
 *
 * Deliberately does NOT touch dashboard-only reminders (channels=['dashboard'])
 * — those stay 'pending' until a human marks them done/dismissed in the UI.
 * "sent" here means "the async notification went out", not "resolved".
 *
 * Called by Vercel Cron (see vercel.json). Protected by CRON_SECRET so it
 * can't be triggered by anyone who guesses the URL.
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (!process.env.CRON_SECRET || authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  const { data: dueReminders, error } = await supabase
    .from("reminders")
    .select("id, title, description, due_at, channels")
    .eq("status", "pending")
    .lte("due_at", new Date().toISOString())
    .overlaps("channels", ["email", "whatsapp"]);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const resend = resendApiKey ? new Resend(resendApiKey) : null;
  const notifyEmail = process.env.REMINDER_NOTIFY_EMAIL;
  const whatsappConfigured = Boolean(
    process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID
  );

  let sent = 0;
  let skipped = 0;

  for (const reminder of dueReminders || []) {
    const wantsEmail = reminder.channels.includes("email");
    const wantsWhatsapp = reminder.channels.includes("whatsapp");

    let delivered = false;

    if (wantsEmail) {
      if (resend && notifyEmail) {
        try {
          await resend.emails.send({
            from: "Client Manager <reminders@localcitysolutions.com>",
            to: notifyEmail,
            subject: `Reminder: ${reminder.title}`,
            text: reminder.description || reminder.title,
          });
          delivered = true;
        } catch (err) {
          console.error(`[reminders] email send failed for ${reminder.id}`, err);
        }
      } else {
        console.log(`[reminders] skipping email for ${reminder.id} — RESEND_API_KEY/REMINDER_NOTIFY_EMAIL not set`);
      }
    }

    if (wantsWhatsapp) {
      if (whatsappConfigured) {
        // Phase 2: not implemented yet — needs a Meta WhatsApp Cloud API
        // phone number + an approved message template before this can send.
        console.log(`[reminders] WhatsApp configured but not yet wired up for ${reminder.id}`);
      } else {
        console.log(`[reminders] skipping WhatsApp for ${reminder.id} — not configured`);
      }
    }

    if (!delivered) {
      // Nothing actually went out (missing config, or send failed) — leave
      // it pending so the next cron run retries rather than silently
      // dropping the reminder.
      skipped++;
      continue;
    }

    // Idempotency: only flip pending → sent, guarded by the current status,
    // so a duplicate cron trigger can't double-send.
    const { error: updateError } = await supabase
      .from("reminders")
      .update({ status: "sent", sent_at: new Date().toISOString() })
      .eq("id", reminder.id)
      .eq("status", "pending");

    if (updateError) {
      console.error(`[reminders] failed to mark ${reminder.id} as sent`, updateError);
      skipped++;
    } else {
      sent++;
    }
  }

  return NextResponse.json({ processed: dueReminders?.length || 0, sent, skipped });
}
