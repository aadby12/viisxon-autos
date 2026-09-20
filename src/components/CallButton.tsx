import { Phone } from "lucide-react";
import { dealership } from "@/lib/config";

type CallButtonProps = {
  label?: string;
  className?: string;
  variant?: "button" | "icon" | "text";
};

export function CallButton({
  label = "Call Dealer",
  className = "",
  variant = "button",
}: CallButtonProps) {
  const href = `tel:${dealership.phone}`;

  if (variant === "icon") {
    return (
      <a
        href={href}
        aria-label={label}
        className={`inline-flex items-center justify-center rounded-full bg-brand-black text-white transition hover:bg-brand-deep ${className}`}
      >
        <Phone size={18} />
      </a>
    );
  }

  if (variant === "text") {
    return (
      <a
        href={href}
        className={`inline-flex items-center gap-2 text-sm font-semibold hover:text-brand-red ${className}`}
      >
        <Phone size={16} />
        {dealership.phoneDisplay}
      </a>
    );
  }

  return (
    <a
      href={href}
      className={`inline-flex h-11 items-center justify-center gap-2 border border-brand-black/15 bg-white px-5 text-sm font-semibold uppercase tracking-wide text-brand-black transition hover:border-brand-red hover:text-brand-red focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red ${className}`}
    >
      <Phone size={16} />
      {label}
    </a>
  );
}
