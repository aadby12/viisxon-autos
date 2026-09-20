import type { Metadata } from "next";
import { SellForm } from "@/components/SellForm";
import { dealership } from "@/lib/config";

export const metadata: Metadata = {
  title: "Sell / Trade In",
  description: `Thinking of selling or trading in your vehicle? Submit details to ${dealership.name}.`,
  alternates: { canonical: "/sell" },
};

export default function SellPage() {
  return (
    <div className="pt-24 md:pt-28">
      <section className="container-page max-w-3xl pb-10">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-red">
          Trade-in
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Want to Sell Your Car?
        </h1>
        <p className="mt-4 text-brand-gray">
          Thinking of selling or trading in your vehicle? Send us your vehicle
          details and our team will get back to you.
        </p>
      </section>

      <section className="container-page max-w-3xl pb-16 md:pb-24">
        <SellForm />
      </section>
    </div>
  );
}
