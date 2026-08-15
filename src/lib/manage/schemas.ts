import { z } from "zod";

// Shared across client-side form validation and the Server Action's
// server-side re-validation — never trust the client-side pass alone.

export const clientStatusValues = ["lead", "active", "paused", "churned"] as const;

export const clientSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  company: z.string().trim().optional().or(z.literal("")),
  email: z.string().trim().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().trim().optional().or(z.literal("")),
  whatsapp: z.string().trim().optional().or(z.literal("")),
  industry: z.string().trim().optional().or(z.literal("")),
  status: z.enum(clientStatusValues),
  notes: z.string().trim().optional().or(z.literal("")),
  assigned_to: z.string().uuid().optional().or(z.literal("")),
});

export type ClientInput = z.infer<typeof clientSchema>;

export const paymentStatusValues = ["unpaid", "paid"] as const;

export const paymentSchema = z.object({
  client_id: z.string().uuid("Select a client"),
  description: z.string().trim().optional().or(z.literal("")),
  amount: z.coerce.number().min(0, "Amount must be 0 or more"),
  currency: z.string().trim().min(1).default("SAR"),
  due_date: z.string().trim().optional().or(z.literal("")),
  status: z.enum(paymentStatusValues),
  invoice_number: z.string().trim().optional().or(z.literal("")),
  notes: z.string().trim().optional().or(z.literal("")),
});

export type PaymentInput = z.infer<typeof paymentSchema>;

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
