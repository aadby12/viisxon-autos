import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CallButton } from "@/components/CallButton";
import { generalEnquiryMessage } from "@/lib/whatsapp";
import { dealership } from "@/lib/config";

export function ContactCTA() {
  return (
    <section className="section-pad bg-brand-deep text-white">
      <div className="container-page flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
        <div className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-red">
            Ready to drive?
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Speak with {dealership.name}
          </h2>
          <p className="mt-3 text-brand-silver">
            Browse inventory, save favourites, or reach us on WhatsApp and phone
            for a fast response.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <WhatsAppButton message={generalEnquiryMessage()} label="WhatsApp" />
          <CallButton label={`Call ${dealership.name}`} />
          <Button href="/contact" variant="outline" className="border-white/30 text-white hover:border-brand-red hover:text-brand-red">
            Contact Page
          </Button>
        </div>
      </div>
    </section>
  );
}
