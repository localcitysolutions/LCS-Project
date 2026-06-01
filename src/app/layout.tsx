// Minimal root layout — html/body/lang/dir are set in app/[locale]/layout.tsx
// so every locale gets the correct lang and dir attributes on the <html> element.
//
// Root-level metadata (favicons, manifest, theme color) lives here because
// these don't depend on locale; per-locale title/description/OG metadata
// lives in app/[locale]/layout.tsx and inherits these defaults.
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
    other: [
      { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#0A1628",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
