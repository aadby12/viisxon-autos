"use client";

import { useMemo } from "react";
import { vehicles } from "@/data/vehicles";
import { useFavorites } from "@/hooks/useFavorites";
import { VehicleGrid } from "@/components/VehicleGrid";
import { Button } from "@/components/ui/Button";

export function FavoritesClient() {
  const { favorites, ready } = useFavorites();

  const saved = useMemo(
    () => vehicles.filter((v) => favorites.includes(v.id)),
    [favorites]
  );

  return (
    <div className="pt-24 md:pt-28">
      <section className="container-page pb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-red">
          Saved
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
          Saved Vehicles
        </h1>
        <p className="mt-3 text-brand-gray">
          Vehicles you save are stored on this device.
        </p>
      </section>

      <section className="container-page pb-16 md:pb-24">
        {!ready ? (
          <p className="text-sm text-brand-gray">Loading saved vehicles…</p>
        ) : saved.length === 0 ? (
          <div className="border border-dashed border-brand-black/15 bg-brand-light px-6 py-16 text-center">
            <p className="font-display text-xl font-semibold">
              Your saved vehicles will appear here.
            </p>
            <p className="mt-2 text-sm text-brand-gray">
              Tap the heart on any vehicle to save it for later.
            </p>
            <Button href="/inventory" className="mt-6">
              Browse Inventory
            </Button>
          </div>
        ) : (
          <>
            <p className="mb-6 text-sm font-medium">
              {saved.length} saved vehicle{saved.length === 1 ? "" : "s"}
            </p>
            <VehicleGrid vehicles={saved} />
          </>
        )}
      </section>
    </div>
  );
}
