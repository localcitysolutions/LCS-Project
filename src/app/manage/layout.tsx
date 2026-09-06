import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "../globals.css";
import { getManageLang, getDict } from "@/lib/manage/lang";
import { createClient } from "@/lib/supabase/server";
import { setManageLangAction } from "./actions";
import { signOut } from "./login/actions";

// Internal tool — never indexed, never shown in search results. The manifest
// and Apple tags let it be added to a phone's home screen as its own app;
// both live in /public because the auth middleware would otherwise bounce the
// (cookie-less) manifest fetch to the login page.
export const metadata: Metadata = {
  title: "Client Manager",
  robots: { index: false, follow: false },
  manifest: "/manage.webmanifest",
  appleWebApp: { capable: true, title: "LCS Manager", statusBarStyle: "default" },
  icons: { icon: "/android-chrome-192x192.png", apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = {
  themeColor: "#0E1A2E",
  width: "device-width",
  initialScale: 1,
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

  const isAdmin = profile?.role === "admin";
  const navItems: { href: string; label: string }[] = [
    { href: "/manage", label: dict.nav.dashboard },
    { href: "/manage/clients", label: dict.nav.clients },
    { href: "/manage/quotations", label: dict.nav.quotations },
    { href: "/manage/payments", label: dict.nav.payments },
    { href: "/manage/reminders", label: dict.nav.reminders },
    ...(isAdmin
      ? [
          { href: "/manage/partners", label: dict.nav.partners },
          { href: "/manage/team", label: dict.nav.team },
        ]
      : []),
    { href: "/manage/settings", label: dict.nav.settings },
  ];

  const navLinkClass =
    "px-3 py-2 rounded-lg text-ink/70 hover:text-ink hover:bg-ink/5 transition-colors whitespace-nowrap";

  const accountControls = (
    <>
      <form action={setManageLangAction}>
        <input type="hidden" name="lang" value={isRTL ? "en" : "ar"} />
        <button type="submit" className="text-xs text-ink/60 hover:text-gold-ink transition-colors">
          {isRTL ? "English" : "العربية"}
        </button>
      </form>
      <form action={signOut}>
        <button type="submit" className="text-xs text-red-600/80 hover:text-red-700 transition-colors">
          {dict.nav.signOut}
        </button>
      </form>
    </>
  );

  return (
    <html lang={lang} dir={isRTL ? "rtl" : "ltr"}>
      <body className="manage-app min-h-screen bg-page text-ink antialiased">
        {user ? (
          <div className="flex min-h-screen flex-col md:flex-row">
            {/* Desktop: fixed sidebar */}
            <aside className="hidden md:flex w-60 shrink-0 border-e border-line bg-panel p-5 flex-col">
              <div className="text-lg font-bold text-gold-ink mb-8">{dict.appName}</div>
              <nav className="flex flex-col gap-1 text-sm flex-1">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className={navLinkClass}>
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto pt-5 border-t border-line space-y-3">
                <div className="text-xs text-ink/50 leading-relaxed">
                  {profile?.full_name || user.email}
                  <br />
                  <span className="uppercase tracking-wide text-[10px] text-gold-ink/80">
                    {profile?.role}
                  </span>
                </div>
                {accountControls}
              </div>
            </aside>

            {/* Phone: compact header with a scrollable nav strip */}
            <header className="md:hidden sticky top-0 z-20 bg-panel border-b border-line">
              <div className="flex items-center justify-between gap-3 px-4 pt-3 pb-2">
                <span className="font-bold text-gold-ink">{dict.appName}</span>
                <div className="flex items-center gap-4">{accountControls}</div>
              </div>
              <nav className="flex gap-1 overflow-x-auto px-3 pb-2 text-sm [scrollbar-width:none]">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href} className={navLinkClass}>
                    {item.label}
                  </Link>
                ))}
              </nav>
            </header>

            <main className="flex-1 w-full max-w-6xl p-4 md:p-8">{children}</main>
          </div>
        ) : (
          <main>{children}</main>
        )}
      </body>
    </html>
  );
}
