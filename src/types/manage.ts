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
  website: string | null;
  start_date: string | null;
  primary_service: string | null;
  gmb_name: string | null;
  gmb_location: string | null;
  gmb_link: string | null;
  vat_number: string | null;
  notes: string | null;
  tags: string[];
  assigned_to: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

/** A timestamped, attributed note in the client's running log. */
export type ClientNote = {
  id: string;
  client_id: string;
  body: string;
  pinned: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

/** Written only by database triggers — see 0006_client_management.sql. */
export type ClientActivity = {
  id: string;
  client_id: string;
  kind: string;
  meta: Record<string, unknown>;
  actor: string | null;
  created_at: string;
};

export type ClientServiceStatus = "active" | "completed" | "paused";

export type ClientService = {
  id: string;
  client_id: string;
  service: string;
  status: ClientServiceStatus;
  started_at: string | null;
  ended_at: string | null;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type BillingPlanStatus = "active" | "paused" | "ended";

/** What a client owes on a recurring basis, plus the one-time setup fee. */
export type BillingPlan = {
  id: string;
  client_id: string;
  monthly_amount: number;
  /** Client's monthly ad spend billed through us as a separate, VAT-free
   * pass-through charge. Not revenue. */
  ad_budget_amount: number;
  setup_fee: number;
  setup_fee_charged: boolean;
  currency: string;
  billing_day: number;
  start_date: string;
  end_date: string | null;
  vat_enabled: boolean;
  status: BillingPlanStatus;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

// "partial" is never written by the app — a database trigger derives it from
// how much of the charge has actually been settled by receipts.
export type PaymentStatus = "unpaid" | "partial" | "paid";
export type PaymentKind = "monthly" | "setup" | "one_off";

/** A CHARGE (invoice). `amount` is the pre-VAT subtotal. */
export type Payment = {
  id: string;
  client_id: string;
  plan_id: string | null;
  kind: PaymentKind;
  period_month: string | null;
  description: string | null;
  amount: number;
  vat_rate: number;
  vat_amount: number;
  total: number;
  amount_paid: number;
  currency: string;
  due_date: string | null;
  status: PaymentStatus;
  paid_at: string | null;
  invoice_number: string | null;
  notes: string | null;
  /** True when the charge is the client's ad budget passing through us. */
  is_ad_budget: boolean;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type PaymentWithStatus = Payment & {
  balance: number;
  is_overdue: boolean;
};

export type PaymentMethod = "bank" | "cash" | "stc_pay" | "card" | "cheque" | "other";

/** Money actually received from a client. Separate from the charge it settles
 * so one payment can cover several months and one month can be covered by
 * several payments (partial) — and so an advance can sit unapplied as credit. */
export type PaymentReceipt = {
  id: string;
  client_id: string;
  receipt_number: string | null;
  amount: number;
  currency: string;
  received_at: string;
  method: PaymentMethod;
  reference: string | null;
  notes: string | null;
  /** Which partner's bank account the money landed in. */
  received_by: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type PaymentAllocation = {
  id: string;
  receipt_id: string;
  payment_id: string;
  amount: number;
  created_at: string;
};

export type QuotationStatus =
  | "draft"
  | "sent"
  | "accepted"
  | "declined"
  | "expired"
  | "converted";

export type Quotation = {
  id: string;
  client_id: string;
  quote_number: string | null;
  title: string | null;
  status: QuotationStatus;
  issue_date: string;
  valid_until: string | null;
  currency: string;
  vat_enabled: boolean;
  discount: number;
  notes: string | null;
  terms: string | null;
  /** One-off total after discount. Derived in the database from the items. */
  subtotal: number;
  vat_amount: number;
  total: number;
  /** Recurring total, deliberately kept out of `total` — it is what the client
   * pays every month, not what they owe on acceptance. */
  monthly_total: number;
  accepted_at: string | null;
  converted_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type QuotationItem = {
  id: string;
  quotation_id: string;
  position: number;
  service: string | null;
  description: string;
  kind: PaymentKind;
  quantity: number;
  unit_price: number;
  line_total: number;
  created_at: string;
};

/** The seller side of every invoice. Exactly one row exists — the database
 * enforces that with a boolean primary key. */
export type CompanySettings = {
  id: boolean;
  name_en: string;
  name_ar: string;
  vat_number: string | null;
  cr_number: string | null;
  address_en: string | null;
  address_ar: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  bank_name: string | null;
  iban: string | null;
  invoice_prefix: string;
  receipt_prefix: string;
  quote_prefix: string;
  quote_validity_days: number;
  payment_terms_en: string | null;
  payment_terms_ar: string | null;
  updated_at: string;
};

export type ClientBalance = {
  client_id: string;
  total_charged: number;
  total_applied: number;
  outstanding: number;
  total_received: number;
  credit_balance: number;
  overdue_count: number;
};

/** An owner of the business. Shares should add up to 100. */
export type Partner = {
  id: string;
  name: string;
  share_percent: number;
  is_default_account: boolean;
  sort_order: number;
  active: boolean;
  created_at: string;
  updated_at: string;
};

export type ExpenseCategory =
  | "ad_spend"
  | "tools"
  | "subscriptions"
  | "salary"
  | "office"
  | "other";

/** Money a partner paid out on the business's behalf. */
export type Expense = {
  id: string;
  client_id: string | null;
  paid_by: string;
  category: ExpenseCategory;
  amount: number;
  currency: string;
  spent_at: string;
  description: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

export type TransferKind = "settlement" | "personal" | "other";

/** Money moved from one partner to another — settling a share, a personal
 * loan, anything. One table so the balance between them is one number. */
export type PartnerTransfer = {
  id: string;
  from_partner: string;
  to_partner: string;
  amount: number;
  currency: string;
  transferred_at: string;
  kind: TransferKind;
  note: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

/** Per-partner cash totals from the partner_positions view. */
export type PartnerPosition = {
  partner_id: string;
  name: string;
  share_percent: number;
  is_default_account: boolean;
  sort_order: number;
  active: boolean;
  received: number;
  ad_budget_received: number;
  expenses_paid: number;
  ad_spend_paid: number;
  transfers_out: number;
  transfers_in: number;
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
      client_notes: {
        Row: ClientNote;
        Insert: Partial<ClientNote> & { client_id: string; body: string };
        Update: Partial<ClientNote>;
        Relationships: [];
      };
      client_activity: {
        Row: ClientActivity;
        Insert: never; // trigger-written only
        Update: never;
        Relationships: [];
      };
      client_services: {
        Row: ClientService;
        Insert: Partial<ClientService> & { client_id: string; service: string };
        Update: Partial<ClientService>;
        Relationships: [];
      };
      billing_plans: {
        Row: BillingPlan;
        Insert: Partial<BillingPlan> & { client_id: string; start_date: string };
        Update: Partial<BillingPlan>;
        Relationships: [];
      };
      payments: {
        Row: Payment;
        Insert: Partial<Payment> & { client_id: string; amount: number };
        Update: Partial<Payment>;
        Relationships: [];
      };
      payment_receipts: {
        Row: PaymentReceipt;
        Insert: Partial<PaymentReceipt> & { client_id: string; amount: number };
        Update: Partial<PaymentReceipt>;
        Relationships: [];
      };
      quotations: {
        Row: Quotation;
        Insert: Partial<Quotation> & { client_id: string };
        Update: Partial<Quotation>;
        Relationships: [];
      };
      quotation_items: {
        Row: QuotationItem;
        Insert: Partial<QuotationItem> & { quotation_id: string; description: string };
        Update: Partial<QuotationItem>;
        Relationships: [];
      };
      company_settings: {
        Row: CompanySettings;
        Insert: Partial<CompanySettings>;
        Update: Partial<CompanySettings>;
        Relationships: [];
      };
      payment_allocations: {
        Row: PaymentAllocation;
        Insert: Partial<PaymentAllocation> & {
          receipt_id: string;
          payment_id: string;
          amount: number;
        };
        Update: Partial<PaymentAllocation>;
        Relationships: [];
      };
      reminders: {
        Row: Reminder;
        Insert: Partial<Reminder> & { title: string; due_at: string };
        Update: Partial<Reminder>;
        Relationships: [];
      };
      partners: {
        Row: Partner;
        Insert: Partial<Partner> & { name: string };
        Update: Partial<Partner>;
        Relationships: [];
      };
      expenses: {
        Row: Expense;
        Insert: Partial<Expense> & { paid_by: string; amount: number };
        Update: Partial<Expense>;
        Relationships: [];
      };
      partner_transfers: {
        Row: PartnerTransfer;
        Insert: Partial<PartnerTransfer> & {
          from_partner: string;
          to_partner: string;
          amount: number;
        };
        Update: Partial<PartnerTransfer>;
        Relationships: [];
      };
    };
    Views: {
      partner_positions: {
        Row: PartnerPosition;
        Relationships: [];
      };
      payments_with_status: {
        Row: PaymentWithStatus;
        Relationships: [];
      };
      client_balances: {
        Row: ClientBalance;
        Relationships: [];
      };
    };
    Functions: {
      generate_due_charges: {
        Args: Record<string, never>;
        Returns: number;
      };
      apply_client_credit: {
        Args: { p_client_id: string | null };
        Returns: number;
      };
      convert_quotation: {
        Args: { p_quotation_id: string; p_replace_plan?: boolean };
        Returns: number;
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
