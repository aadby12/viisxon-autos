"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { useFavorites } from "@/hooks/useFavorites";

type FavoriteButtonProps = {
  vehicleId: string;
  className?: string;
  size?: number;
};

export function FavoriteButton({
  vehicleId,
  className = "",
  size = 20,
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(vehicleId);
  const [pop, setPop] = useState(false);

  return (
    <button
      type="button"
      aria-label={active ? "Remove from saved vehicles" : "Save vehicle"}
      aria-pressed={active}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70 ${className}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(vehicleId);
        setPop(true);
        window.setTimeout(() => setPop(false), 350);
      }}
    >
      <Heart
        size={size}
        className={`${pop ? "heart-pop" : ""} ${active ? "fill-brand-red text-brand-red" : ""}`}
      />
    </button>
  );
}
