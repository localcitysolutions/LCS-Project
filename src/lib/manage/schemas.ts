import { z } from "zod";

// Shared across client-side form validation and the Server Action's
// server-side re-validation — never trust the client-side pass alone.

export const clientStatusValues = ["lead", "active", "paused", "churned"] as const;

// Fixed menu of services the agency offers. Stored as the key; label comes
// from the dictionary (manageDict.*.clients.serviceLabels).
export const serviceTypeValues = [
  "seo",
  "local_seo_gmb",
  "web_design",
  "web_development",
  "google_ads_ppc",
  "social_media",
  "content_blogs",
  "google_ads_fee",
  "gmb_creation_fee",
] as const;
export type ServiceType = (typeof serviceTypeValues)[number];

export const clientServiceStatusValues = ["active", "completed", "paused"] as const;
export type ClientServiceStatusValue = (typeof clientServiceStatusValues)[number];

export const clientSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  company: z.string().trim().optional().or(z.literal("")),
  email: z.string().trim().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().trim().optional().or(z.literal("")),
  whatsapp: z.string().trim().optional().or(z.literal("")),
  industry: z.string().trim().optional().or(z.literal("")),
  status: z.enum(clientStatusValues),
  website: z.string().trim().optional().or(z.literal("")),
  start_date: z.string().trim().optional().or(z.literal("")),
  primary_service: z.enum(serviceTypeValues).optional().or(z.literal("")),
  gmb_name: z.string().trim().optional().or(z.literal("")),
  gmb_location: z.string().trim().optional().or(z.literal("")),
  gmb_link: z.string().trim().optional().or(z.literal("")),
  vat_number: z.string().trim().optional().or(z.literal("")),
  notes: z.string().trim().optional().or(z.literal("")),
  assigned_to: z.string().uuid().optional().or(z.literal("")),
});

export type ClientInput = z.infer<typeof clientSchema>;

export const clientServiceSchema = z.object({
  service: z.enum(serviceTypeValues),
  status: z.enum(clientServiceStatusValues).default("active"),
  started_at: z.string().trim().optional().or(z.literal("")),
  ended_at: z.string().trim().optional().or(z.literal("")),
  notes: z.string().trim().optional().or(z.literal("")),
});

export type ClientServiceInput = z.infer<typeof clientServiceSchema>;

// An unchecked HTML checkbox submits nothing at all, so FormData.get() returns
// null rather than "false" — z.coerce.boolean() would read that as false only
// by accident and would read the string "false" as true. Be explicit instead.
const checkboxField = z.any().transform((v) => v === "on" || v === "true" || v === true);

/** Standard Saudi VAT. Applied per-charge when the VAT box is ticked. */
export const VAT_RATE = 15;

export const billingPlanStatusValues = ["active", "paused", "ended"] as const;

export const billingPlanSchema = z
  .object({
    monthly_amount: z.coerce.number().min(0, "Monthly amount must be 0 or more"),
    setup_fee: z.coerce.number().min(0, "Setup fee must be 0 or more"),
    currency: z.string().trim().min(1).default("SAR"),
    billing_day: z.coerce
      .number()
      .int("Billing day must be a whole number")
      .min(1, "Billing day must be between 1 and 28")
      .max(28, "Billing day must be between 1 and 28"),
    start_date: z.string().trim().min(1, "Start date is required"),
    end_date: z.string().trim().optional().or(z.literal("")),
    vat_enabled: checkboxField,
    status: z.enum(billingPlanStatusValues).default("active"),
    notes: z.string().trim().optional().or(z.literal("")),
  })
  .refine((d) => !d.end_date || d.end_date >= d.start_date, {
    message: "End date cannot be before the start date",
    path: ["end_date"],
  })
  .refine((d) => d.monthly_amount > 0 || d.setup_fee > 0, {
    message: "Set a monthly amount, a setup fee, or both",
    path: ["monthly_amount"],
  });

export type BillingPlanInput = z.infer<typeof billingPlanSchema>;

export const paymentStatusValues = ["unpaid", "partial", "paid"] as const;
export const paymentKindValues = ["monthly", "setup", "one_off"] as const;

// NOTE: `status` is deliberately absent. A charge's status is derived in the
// database from how much has actually been received against it, so it can
// never drift from the money on record. To settle a charge, record a payment.
export const paymentSchema = z.object({
  client_id: z.string().uuid("Select a client"),
  kind: z.enum(paymentKindValues).default("one_off"),
  description: z.string().trim().optional().or(z.literal("")),
  amount: z.coerce.number().min(0, "Amount must be 0 or more"),
  currency: z.string().trim().min(1).default("SAR"),
  due_date: z.string().trim().optional().or(z.literal("")),
  period_month: z.string().trim().optional().or(z.literal("")),
  vat_enabled: checkboxField,
  invoice_number: z.string().trim().optional().or(z.literal("")),
  notes: z.string().trim().optional().or(z.literal("")),
});

export type PaymentInput = z.infer<typeof paymentSchema>;

export const paymentMethodValues = [
  "bank",
  "cash",
  "stc_pay",
  "card",
  "cheque",
  "other",
] as const;

/** Recording money that actually arrived. `apply_to` is either "auto" (settle
 * the oldest open charges first), "credit" (hold it all as advance), or the id
 * of a specific charge. */
export const receiptSchema = z.object({
  client_id: z.string().uuid("Select a client"),
  amount: z.coerce.number().gt(0, "Amount must be greater than 0"),
  currency: z.string().trim().min(1).default("SAR"),
  received_at: z.string().trim().min(1, "Date received is required"),
  method: z.enum(paymentMethodValues).default("bank"),
  reference: z.string().trim().optional().or(z.literal("")),
  notes: z.string().trim().optional().or(z.literal("")),
  apply_to: z.string().trim().default("auto"),
});

export type ReceiptInput = z.infer<typeof receiptSchema>;

export const reminderChannelValues = ["dashboard", "email", "whatsapp"] as const;
export const reminderStatusValues = ["pending", "sent", "done", "dismissed"] as const;

export const reminderSchema = z.object({
  client_id: z.string().uuid().optional().or(z.literal("")),
  title: z.string().trim().min(1, "Title is required"),
  description: z.string().trim().optional().or(z.literal("")),
  due_at: z.string().trim().min(1, "Due date/time is required"),
  channels: z.array(z.enum(reminderChannelValues)).min(1, "Pick at least one channel"),
  assigned_to: z.string().uuid().optional().or(z.literal("")),
});

export type ReminderInput = z.infer<typeof reminderSchema>;
