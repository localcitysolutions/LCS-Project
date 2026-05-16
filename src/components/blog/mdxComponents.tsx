import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type CalloutType = "tip" | "warning" | "note" | "insight";

export function Callout({
  type = "tip",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
}) {
  const styles: Record<CalloutType, { bg: string; border: string; icon: string; label: string }> = {
    tip: { bg: "bg-emerald-500/10", border: "border-emerald-500/40", icon: "💡", label: "Tip" },
    warning: { bg: "bg-amber-500/10", border: "border-amber-500/40", icon: "⚠️", label: "Warning" },
    note: { bg: "bg-blue-500/10", border: "border-blue-500/40", icon: "📝", label: "Note" },
    insight: { bg: "bg-[#F5C518]/10", border: "border-[#F5C518]/50", icon: "✨", label: "Insight" },
  };
  const s = styles[type];

  return (
    <aside className={`my-8 p-6 rounded-xl border ${s.bg} ${s.border} not-prose`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl shrink-0">{s.icon}</span>
        <div className="flex-1">
          <div className="font-bold text-white text-sm uppercase tracking-wide mb-2">
            {title || s.label}
          </div>
          <div className="text-white/80 leading-relaxed text-base">{children}</div>
        </div>
      </div>
    </aside>
  );
}

export function Stat({ value, label, sub }: { value: string; label: string; sub?: string }) {
  return (
    <div className="my-8 p-6 rounded-xl bg-gradient-to-br from-[#F5C518]/15 to-transparent border border-[#F5C518]/30 text-center not-prose">
      <div className="text-5xl md:text-6xl font-extrabold text-[#F5C518] leading-none mb-2">
        {value}
      </div>
      <div className="text-white font-semibold text-base md:text-lg">{label}</div>
      {sub ? <div className="text-white/60 text-sm mt-1">{sub}</div> : null}
    </div>
  );
}

export function PullQuote({
  author,
  role,
  children,
}: {
  author?: string;
  role?: string;
  children: ReactNode;
}) {
  return (
    <figure className="my-10 not-prose">
      <blockquote className="relative pl-8 border-l-4 border-[#F5C518]">
        <span className="absolute -left-2 -top-4 text-6xl text-[#F5C518]/30 font-serif select-none" aria-hidden="true">&ldquo;</span>
        <p className="text-xl md:text-2xl text-white italic leading-relaxed font-light">
          {children}
        </p>
        {author || role ? (
          <footer className="mt-4 text-sm text-white/60">
            {author ? <span className="font-semibold text-[#F5C518]">{author}</span> : null}
            {role ? <span> · {role}</span> : null}
          </footer>
        ) : null}
      </blockquote>
    </figure>
  );
}

export function Comparison({
  headers,
  rows,
}: {
  headers: string[];
  rows: Array<Array<string>>;
}) {
  return (
    <div className="my-8 overflow-x-auto not-prose rounded-xl border border-white/10">
      <table className="w-full text-sm md:text-base">
        <thead>
          <tr className="bg-[#F5C518]/15">
            {headers.map((h, i) => (
              <th key={i} className="text-left p-4 font-bold text-white">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, ri) => (
            <tr key={ri} className="border-t border-white/10 hover:bg-white/5">
              {row.map((cell, ci) => (
                <td key={ci} className="p-4 text-white/80">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Steps({ items }: { items: Array<{ title: string; body: string }> }) {
  return (
    <ol className="my-8 space-y-6 not-prose list-none p-0">
      {items.map((step, i) => (
        <li key={i} className="flex gap-4">
          <div className="shrink-0 w-10 h-10 rounded-full bg-[#F5C518] text-[#0A1628] font-extrabold flex items-center justify-center text-lg">
            {i + 1}
          </div>
          <div className="flex-1">
            <div className="text-white font-bold text-lg mb-1">{step.title}</div>
            <div className="text-white/75 leading-relaxed">{step.body}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Figure({
  src,
  alt,
  caption,
  width = 1200,
  height = 800,
}: {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-10 not-prose">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-xl shadow-2xl w-full h-auto"
      />
      {caption ? (
        <figcaption className="text-center text-sm text-white/55 mt-3 italic">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function TLDR({ children }: { children: ReactNode }) {
  return (
    <div className="my-8 p-6 rounded-xl bg-white/[0.03] border border-white/10 not-prose">
      <div className="text-[#F5C518] text-xs font-bold uppercase tracking-widest mb-2">
        TL;DR
      </div>
      <div className="text-white/85 text-base md:text-lg leading-relaxed">{children}</div>
    </div>
  );
}

export function PostCTA({
  title,
  body,
  href,
  label,
}: {
  title: string;
  body: string;
  href: string;
  label: string;
}) {
  return (
    <div className="my-12 p-8 rounded-2xl bg-gradient-to-br from-[#F5C518]/10 to-transparent border border-[#F5C518]/30 text-center not-prose">
      <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-3">{title}</h3>
      <p className="text-white/75 text-base md:text-lg mb-6 max-w-xl mx-auto leading-relaxed">{body}</p>
      <Link href={href} className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#F5C518] text-[#0A1628] font-bold text-base hover:bg-[#F5C518]/90 transition-all hover:-translate-y-0.5 shadow-2xl shadow-[#F5C518]/25">
        {label} →
      </Link>
    </div>
  );
}

// Map exposed to <MDXRemote components={...} />.
// `img` override sends markdown image syntax through next/image; the prose
// strings stored in src/data/blog-posts.ts use raw <h2>/<p>/<ul> HTML so the
// default markdown renderers don't need to be overridden — rehype-raw passes
// the existing HTML through unchanged.
export const mdxComponents = {
  Callout,
  Stat,
  PullQuote,
  Comparison,
  Steps,
  Figure,
  TLDR,
  PostCTA,
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <Image
      src={src ?? ""}
      alt={alt ?? ""}
      width={1200}
      height={800}
      className="rounded-xl shadow-2xl my-8 w-full h-auto"
    />
  ),
};
