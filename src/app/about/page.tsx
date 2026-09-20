import type { Metadata } from "next";
import Image from "next/image";
import { dealership } from "@/lib/config";
import { ContactCTA } from "@/components/ContactCTA";

export const metadata: Metadata = {
  title: "About VIixson Autos",
  description: `Learn about ${dealership.name} — a Ghana-based dealership focused on quality vehicles, transparency and customer experience.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="relative min-h-[50vh] overflow-hidden bg-brand-black pt-28">
        <Image
          src="https://images.unsplash.com/photo-1563720223185-11003d516935?w=2000&q=80"
          alt="Dealership atmosphere"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/50 to-brand-black/40" />
        <div className="container-page relative flex min-h-[50vh] items-end pb-16">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-red">
              Our Story
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white md:text-6xl">
              About VIixson Autos
            </h1>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              A professional approach to finding your next vehicle
            </h2>
            <p className="mt-5 text-base leading-relaxed text-brand-gray">
              {dealership.name} is a Ghana-based automotive dealership serving
              buyers in Accra and beyond. We focus on quality vehicles, clear
              information, and a straightforward buying experience — whether you
              are looking for a daily sedan, a capable SUV, or a carefully
              sourced import.
            </p>
            <p className="mt-4 text-base leading-relaxed text-brand-gray">
              Our team helps customers compare options, understand vehicle
              condition, and move confidently from enquiry to purchase. We value
              transparency and professional service over pressure sales.
            </p>
          </div>
          <div className="relative min-h-[280px] overflow-hidden bg-brand-light lg:min-h-full">
            <Image
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80"
              alt="Premium vehicle presentation"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-brand-light section-pad">
        <div className="container-page max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-red">
            Mission
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Our Mission
          </h2>
          <p className="mt-6 font-display text-xl leading-snug text-brand-black md:text-2xl">
            To make finding and purchasing your next vehicle simpler, clearer
            and more enjoyable.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="container-page">
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            What we stand for
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "Quality vehicles",
                d: "Thoughtfully selected cars suited to real buyer needs.",
              },
              {
                t: "Customer experience",
                d: "Clear communication from first enquiry through handover.",
              },
              {
                t: "Transparency",
                d: "Straightforward details on pricing, condition and next steps.",
              },
              {
                t: "Professional service",
                d: "Respectful, informed support throughout the process.",
              },
              {
                t: "Right-fit guidance",
                d: "Helping customers find vehicles that match their priorities.",
              },
              {
                t: "Local presence",
                d: `Based in ${dealership.location}, serving customers across Ghana.`,
              },
            ].map((item) => (
              <div
                key={item.t}
                className="border border-brand-black/8 p-5 transition hover:border-brand-red/40"
              >
                <h3 className="font-display text-lg font-semibold">{item.t}</h3>
                <p className="mt-2 text-sm text-brand-gray">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
