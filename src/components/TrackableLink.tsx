"use client";

import { trackWhatsAppClick, trackPhoneClick, trackFreeAuditClick } from "@/lib/analytics";

type TrackType = "whatsapp" | "phone" | "free-audit";

interface TrackableLinkProps {
  href: string;
  track: TrackType;
  className?: string;
  target?: string;
  rel?: string;
  children: React.ReactNode;
}

const HANDLERS: Record<TrackType, () => void> = {
  whatsapp: trackWhatsAppClick,
  phone: trackPhoneClick,
  "free-audit": trackFreeAuditClick,
};

export default function TrackableLink({
  href,
  track,
  className,
  target,
  rel,
  children,
}: TrackableLinkProps) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      onClick={() => HANDLERS[track]()}
      className={className}
    >
      {children}
    </a>
  );
}
