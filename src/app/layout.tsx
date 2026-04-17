// Minimal root layout — html/body/lang/dir are set in app/[locale]/layout.tsx
// so every locale gets the correct lang and dir attributes on the <html> element.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement;
}
