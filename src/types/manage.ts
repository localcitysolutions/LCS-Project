export type Role = "admin" | "staff";

// NOTE: these are `type` aliases, not `interface`s, deliberately. supabase-js
// checks each table's Row/Insert/Update against `Record<string, unknown>`
// via a conditional-type `extends` check, and TypeScript's structural rules
// only treat plain type-literal shapes as satisfying an index signature that
// way — `interface` declarations do not, and silently resolve to `never`
// everywhere below `.from(...)` instead of raising a clear error.
export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: Role;
  active: boolean;
  created_at: string;
};

export type ClientStatus = "lead" | "active" | "paused" | "churned";

export type Client = {
  id: string;
  name: string;
  company: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  industry: string | null;
  status: ClientStatus;
  notes: string | null;
  assigned_to: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type PaymentStatus = "unpaid" | "paid";

export type Payment = {
  id: string;
  client_id: string;
  description: string | null;
  amount: number;
  currency: string;
  due_date: string | null;
  status: PaymentStatus;
  paid_at: string | null;
  invoice_number: string | null;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type PaymentWithStatus = Payment & {
  is_overdue: boolean;
};

export type ReminderChannel = "dashboard" | "email" | "whatsapp";
export type ReminderStatus = "pending" | "sent" | "done" | "dismissed";

export type Reminder = {
  id: string;
  client_id: string | null;
  title: string;
  description: string | null;
  due_at: string;
  channels: ReminderChannel[];
  status: ReminderStatus;
  assigned_to: string | null;
  created_by: string | null;
  sent_at: string | null;
  created_at: string;
  updated_at: string;
};

// Minimal hand-written schema typing (no generated types yet — regenerate
// with `supabase gen types typescript` once the project is linked, if
// desired). Covers just enough for typed `.from("table")` calls.
//
// `Relationships: []` on every entry is required — supabase-js's generic
// constraints expect it on each table/view, and omitting it makes every
// row type silently collapse to `never` instead of erroring loudly.
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Partial<Profile> & { id: string };
        Update: Partial<Profile>;
        Relationships: [];
      };
      clients: {
        Row: Client;
        Insert: Partial<Client> & { name: string };
        Update: Partial<Client>;
        Relationships: [];
      };
      payments: {
        Row: Payment;
        Insert: Partial<Payment> & { client_id: string; amount: number };
        Update: Partial<Payment>;
        Relationships: [];
      };
      reminders: {
        Row: Reminder;
        Insert: Partial<Reminder> & { title: string; due_at: string };
        Update: Partial<Reminder>;
        Relationships: [];
      };
    };
    Views: {
      payments_with_status: {
        Row: PaymentWithStatus;
        Relationships: [];
      };
    };
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
