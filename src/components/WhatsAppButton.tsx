import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl } from "@/lib/whatsapp";

type WhatsAppButtonProps = {
  message: string;
  label?: string;
  className?: string;
  variant?: "button" | "link" | "icon";
};

export function WhatsAppButton({
  message,
  label = "WhatsApp Enquiry",
  className = "",
  variant = "button",
}: WhatsAppButtonProps) {
  const href = getWhatsAppUrl(message);

  if (variant === "icon") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className={`inline-flex items-center justify-center rounded-full bg-[#25D366] text-white transition hover:brightness-95 ${className}`}
      >
        <MessageCircle size={20} />
      </a>
    );
  }

  if (variant === "link") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center gap-2 text-sm font-semibold text-[#128C7E] hover:underline ${className}`}
      >
        <MessageCircle size={16} />
        {label}
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex h-11 items-center justify-center gap-2 bg-[#25D366] px-5 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-red ${className}`}
    >
      <MessageCircle size={18} />
      {label}
    </a>
  );
}
