import Image from "next/image";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { dealership } from "@/lib/config";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-brand-black">
      <Image
        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=2400&q=80"
        alt="Premium vehicle showcase at VIixson Autos"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/95 via-brand-black/75 to-brand-black/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-brand-black/40" />

      <div className="container-page relative flex min-h-[100svh] flex-col justify-end pb-28 pt-24 md:justify-center md:pb-24 md:pt-32">
        <div className="max-w-2xl">
          <p className="fade-in text-[11px] font-semibold uppercase tracking-[0.28em] text-brand-red sm:text-xs">
            {dealership.name}
          </p>
          <h1 className="fade-in-up delay-100 mt-3 font-display text-[2.65rem] font-bold leading-[1.05] tracking-tight text-white sm:mt-4 sm:text-6xl md:text-7xl lg:text-8xl">
            {dealership.tagline}
          </h1>
          <p className="fade-in-up delay-200 mt-4 max-w-lg text-sm leading-relaxed text-white/80 sm:mt-5 sm:text-base md:text-lg">
            Premium vehicles. Trusted service. Your next car starts here.
          </p>
          <div className="fade-in-up delay-300 mt-7 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap">
            <Button href="/inventory" size="lg" className="w-full sm:w-auto">
              Explore Vehicles
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="w-full border-white/40 text-white hover:border-brand-red hover:text-brand-red sm:w-auto"
            >
              Contact Us
            </Button>
          </div>
          <p className="fade-in-up delay-300 mt-7 inline-flex items-center gap-2 text-sm text-brand-silver sm:mt-8">
            <MapPin size={16} className="shrink-0 text-brand-red" />
            {dealership.location}
          </p>
        </div>
      </div>
    </section>
  );
}
