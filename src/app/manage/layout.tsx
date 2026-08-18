import type { Metadata } from "next";
import Link from "next/link";
import "../globals.css";
import { getManageLang, getDict } from "@/lib/manage/lang";
import { createClient } from "@/lib/supabase/server";
import { setManageLangAction } from "./actions";
import { signOut } from "./login/actions";

// Internal tool — never indexed, never shown in search results.
export const metadata: Metadata = {
  title: "Client Manager",
  robots: { index: false, follow: false },
};

export default async function ManageLayout({ children }: { children: React.ReactNode }) {
  const lang = await getManageLang();
  const dict = getDict(lang);
  const isRTL = lang === "ar";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: { full_name: string | null; role: string } | null = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("full_name, role")
      .eq("id", user.id)
      .maybeSingle();
    profile = data;
  }

  const navLinkClass =
    "px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors";

  return (
    <html lang={lang} dir={isRTL ? "rtl" : "ltr"}>
      <body className="min-h-screen bg-[#080E1A] text-white antialiased">
        {user ? (
          <div className="flex min-h-screen">
            <aside className="w-60 shrink-0 border-e border-white/10 bg-[#0C1424] p-5 flex flex-col">
              <div className="text-lg font-bold text-[#F5C518] mb-8">{dict.appName}</div>
              <nav className="flex flex-col gap-1 text-sm flex-1">
                <Link href="/manage" className={navLinkClass}>
                  {dict.nav.dashboard}
                </Link>
                <Link href="/manage/clients" className={navLinkClass}>
                  {dict.nav.clients}
                </Link>
                <Link href="/manage/quotations" className={navLinkClass}>
                  {dict.nav.quotations}
                </Link>
                <Link href="/manage/payments" className={navLinkClass}>
                  {dict.nav.payments}
                </Link>
                <Link href="/manage/reminders" className={navLinkClass}>
                  {dict.nav.reminders}
                </Link>
                {profile?.role === "admin" && (
                  <Link href="/manage/team" className={navLinkClass}>
                    {dict.nav.team}
                  </Link>
                )}
                <Link href="/manage/settings" className={navLinkClass}>
                  {dict.nav.settings}
                </Link>
              </nav>
              <div className="mt-auto pt-5 border-t border-white/10 space-y-3">
                <div className="text-xs text-white/50 leading-relaxed">
                  {profile?.full_name || user.email}
                  <br />
                  <span className="uppercase tracking-wide text-[10px] text-[#F5C518]/80">
                    {profile?.role}
                  </span>
                </div>
                <form action={setManageLangAction}>
                  <input type="hidden" name="lang" value={isRTL ? "en" : "ar"} />
                  <button type="submit" className="text-xs text-white/60 hover:text-[#F5C518] transition-colors">
                    {isRTL ? "English" : "العربية"}
                  </button>
                </form>
                <form action={signOut}>
                  <button type="submit" className="text-xs text-red-400/80 hover:text-red-400 transition-colors">
                    {dict.nav.signOut}
                  </button>
                </form>
              </div>
            </aside>
            <main className="flex-1 p-6 md:p-8 max-w-6xl">{children}</main>
          </div>
        ) : (
          <main>{children}</main>
        )}
      </body>
    </html>
  );
}
