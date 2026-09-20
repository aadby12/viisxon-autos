import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { dealership } from "@/lib/config";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CallButton } from "@/components/CallButton";
import { generalEnquiryMessage } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${dealership.name} in Accra, Ghana by phone, WhatsApp or email.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="container-page pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-red">
          Get in touch
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Contact
        </h1>
        <p className="mt-4 max-w-xl text-brand-gray">
          Reach {dealership.name} for vehicle enquiries, sourcing requests, or
          trade-in conversations.
        </p>
      </section>

      <section className="container-page grid gap-10 pb-16 lg:grid-cols-2 lg:gap-16 md:pb-24">
        <div>
          <h2 className="font-display text-2xl font-semibold">{dealership.name}</h2>
          <ul className="mt-6 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 shrink-0 text-brand-red" size={18} />
              <span>
                {dealership.country}
                <br />
                <span className="text-brand-gray">{dealership.location}</span>
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="shrink-0 text-brand-red" size={18} />
              <a
                href={`tel:${dealership.phone}`}
                className="hover:text-brand-red"
              >
                {dealership.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="shrink-0 text-brand-red" size={18} />
              <a
                href={`mailto:${dealership.email}`}
                className="hover:text-brand-red"
              >
                {dealership.email}
              </a>
            </li>
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <WhatsAppButton message={generalEnquiryMessage()} />
            <CallButton label={`Call ${dealership.name}`} />
          </div>

          <div className="mt-8 border border-brand-black/10 bg-brand-light p-5">
            <h3 className="font-display text-lg font-semibold">Get Directions</h3>
            <p className="mt-2 text-sm text-brand-gray">
              Exact showroom coordinates will be added once the dealership
              location is confirmed. For now, contact us to arrange a viewing in{" "}
              {dealership.location}.
            </p>
            <a
              href={dealership.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-semibold uppercase tracking-wide text-brand-red hover:underline"
            >
              Follow on Instagram
            </a>
          </div>
        </div>

        <ContactForm />
      </section>
    </div>
  );
}
