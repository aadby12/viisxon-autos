import { MessageCircle, Phone } from "lucide-react";
import { dealership } from "@/lib/config";
import { getWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";

/** Sticky mobile conversion bar — WhatsApp + Call */
export function MobileCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-brand-black/95 p-2 backdrop-blur-md md:hidden pb-[max(0.5rem,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-2 gap-2">
        <a
          href={getWhatsAppUrl(generalEnquiryMessage())}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 items-center justify-center gap-2 bg-[#25D366] text-sm font-bold uppercase tracking-wide text-white"
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
        <a
          href={`tel:${dealership.phone}`}
          className="inline-flex h-12 items-center justify-center gap-2 bg-brand-red text-sm font-bold uppercase tracking-wide text-white"
        >
          <Phone size={18} />
          Call
        </a>
      </div>
    </div>
  );
}
