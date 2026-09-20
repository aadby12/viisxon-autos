import type { Metadata } from "next";
import {
  Car,
  Search,
  Ship,
  RefreshCw,
  ClipboardCheck,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { dealership } from "@/lib/config";

export const metadata: Metadata = {
  title: "Our Services",
  description: `Vehicle sales, sourcing, importation assistance, trade-in and inspection support from ${dealership.name}.`,
  alternates: { canonical: "/services" },
};

const services = [
  {
    icon: Car,
    title: "Vehicle Sales",
    text: "Quality vehicles available for purchase — browse inventory and enquire about the cars that fit your needs.",
  },
  {
    icon: Search,
    title: "Vehicle Sourcing",
    text: "Can't find the vehicle you're looking for? We can help source options that match your preferences.",
  },
  {
    icon: Ship,
    title: "Vehicle Importation",
    text: "Vehicle sourcing and import assistance for customers exploring imported options.",
  },
  {
    icon: RefreshCw,
    title: "Trade-In",
    text: "Explore trade-in options for your current vehicle when upgrading to your next car.",
  },
  {
    icon: ClipboardCheck,
    title: "Vehicle Inspection",
    text: "Help customers understand vehicle condition before purchase — ask us what to review on any listing.",
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="container-page pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-red">
          What we offer
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Our Services
        </h1>
        <p className="mt-4 max-w-2xl text-brand-gray">
          From browsing inventory to sourcing a specific vehicle, {dealership.name}{" "}
          supports you through each step of the buying journey.
        </p>
      </section>

      <section className="container-page grid gap-4 pb-16 sm:grid-cols-2 lg:grid-cols-3 md:pb-24">
        {services.map((s) => (
          <article
            key={s.title}
            className="border border-brand-black/8 bg-white p-6 transition hover:border-brand-red/40"
          >
            <s.icon className="text-brand-red" size={28} strokeWidth={1.5} />
            <h2 className="mt-5 font-display text-xl font-semibold">{s.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-brand-gray">{s.text}</p>
          </article>
        ))}
      </section>

      <section className="bg-brand-black section-pad text-white">
        <div className="container-page flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="font-display text-3xl font-bold tracking-tight">
              Ready to get started?
            </h2>
            <p className="mt-2 text-brand-silver">
              Browse vehicles or tell us what you are looking for.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button href="/inventory">Explore Inventory</Button>
            <Button
              href="/sell"
              variant="outline"
              className="border-white/30 text-white hover:border-brand-red hover:text-brand-red"
            >
              Sell / Trade In
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
