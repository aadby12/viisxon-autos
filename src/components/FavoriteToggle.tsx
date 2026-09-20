"use client";

import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

export function FavoriteToggle({ vehicleId }: { vehicleId: string }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(vehicleId);

  return (
    <button
      type="button"
      onClick={() => toggleFavorite(vehicleId)}
      aria-pressed={active}
      className="inline-flex h-11 w-full items-center justify-center gap-2 border border-brand-black/15 bg-white px-5 text-sm font-semibold uppercase tracking-wide transition hover:border-brand-red hover:text-brand-red"
    >
      <Heart
        size={18}
        className={active ? "fill-brand-red text-brand-red" : ""}
      />
      {active ? "Saved" : "Save Vehicle"}
    </button>
  );
}
