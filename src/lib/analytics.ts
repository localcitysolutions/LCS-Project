export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params);
  }
};

export const trackWhatsAppClick = () => {
  trackEvent("whatsapp_click", {
    event_category: "engagement",
    event_label: "WhatsApp CTA",
  });
};

export const trackPhoneClick = () => {
  trackEvent("phone_click", {
    event_category: "engagement",
    event_label: "Phone Call CTA",
  });
};

export const trackFormSubmit = (service: string) => {
  trackEvent("form_submit", {
    event_category: "lead",
    event_label: service,
  });
};

export const trackFreeAuditClick = () => {
  trackEvent("free_audit_click", {
    event_category: "engagement",
    event_label: "Free Audit CTA",
  });
};
