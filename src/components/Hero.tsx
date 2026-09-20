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
      <div className="absolute inset-0 bg-gradient-to-r from-brand-black/95 via-brand-black/70 to-brand-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-brand-black/30" />

      <div className="container-page relative flex min-h-[100svh] flex-col justify-end pb-28 pt-28 md:justify-center md:pb-24 md:pt-32">
        <div className="max-w-2xl">
          <p className="fade-in text-xs font-semibold uppercase tracking-[0.28em] text-brand-red">
            {dealership.name}
          </p>
          <h1 className="fade-in-up delay-100 mt-4 font-display text-5xl font-bold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            {dealership.tagline}
          </h1>
          <p className="fade-in-up delay-200 mt-5 max-w-lg text-base text-white/80 sm:text-lg">
            Premium vehicles. Trusted service. Your next car starts here.
          </p>
          <div className="fade-in-up delay-300 mt-8 flex flex-wrap gap-3">
            <Button href="/inventory" size="lg">
              Explore Vehicles
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="border-white/40 text-white hover:border-brand-red hover:text-brand-red"
            >
              Contact Us
            </Button>
          </div>
          <p className="fade-in-up delay-300 mt-8 inline-flex items-center gap-2 text-sm text-brand-silver">
            <MapPin size={16} className="text-brand-red" />
            {dealership.location}
          </p>
        </div>
      </div>
    </section>
  );
}
