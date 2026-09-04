"use client";

// A <form action={...}> that asks before submitting. Destructive one-click
// actions (delete client, delete receipt...) render their button inside this
// instead of a bare <form> — without JS it degrades to submitting directly,
// which matches the old behaviour rather than breaking the button.

export default function ConfirmForm({
  action,
  message,
  className,
  children,
}: {
  action: (formData: FormData) => void | Promise<void>;
  message: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <form
      action={action}
      className={className}
      onSubmit={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </form>
  );
}
