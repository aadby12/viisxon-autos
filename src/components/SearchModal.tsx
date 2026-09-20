"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { vehicles } from "@/data/vehicles";
import { filterVehicles } from "@/lib/filters";
import { formatPrice, vehicleTitle } from "@/lib/format";
import { useRouter } from "next/navigation";

type SearchModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SearchModal({ open, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return filterVehicles(vehicles, { query }).slice(0, 8);
  }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-brand-black/70 p-4 pt-[12vh] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Search vehicles"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-hidden border border-white/10 bg-brand-deep shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          className="flex items-center gap-3 border-b border-white/10 px-4"
          onSubmit={(e) => {
            e.preventDefault();
            const q = query.trim();
            onClose();
            router.push(q ? `/inventory?query=${encodeURIComponent(q)}` : "/inventory");
          }}
        >
          <Search className="shrink-0 text-brand-silver" size={20} />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search make, model, year, price…"
            className="h-14 w-full bg-transparent text-base text-white placeholder:text-brand-gray focus:outline-none"
            aria-label="Search query"
          />
          <button
            type="button"
            aria-label="Close search"
            onClick={onClose}
            className="text-brand-silver hover:text-white"
          >
            <X size={20} />
          </button>
        </form>

        <div className="max-h-[50vh] overflow-y-auto">
          {query.trim() && (
            <p className="px-4 py-3 text-xs uppercase tracking-wider text-brand-gray">
              {results.length} vehicle{results.length === 1 ? "" : "s"} found
            </p>
          )}
          {results.map((v) => (
            <Link
              key={v.id}
              href={`/vehicle/${v.id}`}
              onClick={onClose}
              className="flex items-center justify-between gap-4 border-t border-white/5 px-4 py-3 transition hover:bg-white/5"
            >
              <span className="text-sm text-white">{vehicleTitle(v)}</span>
              <span className="shrink-0 text-sm font-semibold text-brand-red">
                {formatPrice(v.price)}
              </span>
            </Link>
          ))}
          {query.trim() && results.length === 0 && (
            <p className="px-4 py-8 text-center text-sm text-brand-gray">
              No matching vehicles. Try another search.
            </p>
          )}
        </div>

        {query.trim() && (
          <div className="border-t border-white/10 p-3">
            <button
              type="button"
              className="w-full py-2 text-sm font-semibold uppercase tracking-wide text-brand-red hover:underline"
              onClick={() => {
                onClose();
                router.push(`/inventory?query=${encodeURIComponent(query.trim())}`);
              }}
            >
              View all results
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
