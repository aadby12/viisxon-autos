"use client";

import { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { vehicles } from "@/data/vehicles";
import {
  BODY_TYPES,
  CONDITIONS,
  FILTER_MAKES,
  FUEL_TYPES,
  TRANSMISSIONS,
} from "@/data/vehicles";
import { getModelsForMake, getUniqueMakes } from "@/lib/filters";
import type { SortOption } from "@/types/vehicle";
import { Button } from "@/components/ui/Button";

const field =
  "h-10 w-full border border-brand-black/10 bg-white px-3 text-sm focus:border-brand-red focus:outline-none";

const labelCls =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-brand-gray";

export function VehicleFilters({ resultCount }: { resultCount: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState(false);

  const make = searchParams.get("make") ?? "";
  const datasetMakes = useMemo(() => {
    const fromData = getUniqueMakes(vehicles);
    return [...new Set([...FILTER_MAKES, ...fromData])].sort();
  }, []);
  const models = useMemo(
    () => getModelsForMake(vehicles, make || undefined),
    [make]
  );

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) params.delete(key);
    else params.set(key, value);
    if (key === "make") params.delete("model");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  function clearAll() {
    router.push(pathname, { scroll: false });
    setOpen(false);
  }

  const filtersForm = (
    <div className="space-y-5">
      <div>
        <label className={labelCls} htmlFor="sort">
          Sort
        </label>
        <select
          id="sort"
          className={field}
          value={(searchParams.get("sort") as SortOption) ?? "newest"}
          onChange={(e) => update("sort", e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="mileage-asc">Mileage: Low → High</option>
        </select>
      </div>

      <fieldset>
        <legend className={labelCls}>Price (GH₵)</legend>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            inputMode="numeric"
            placeholder="Min"
            className={field}
            defaultValue={searchParams.get("minPrice") ?? ""}
            onBlur={(e) => update("minPrice", e.target.value)}
            aria-label="Minimum price"
          />
          <input
            type="number"
            inputMode="numeric"
            placeholder="Max"
            className={field}
            defaultValue={searchParams.get("maxPrice") ?? ""}
            onBlur={(e) => update("maxPrice", e.target.value)}
            aria-label="Maximum price"
          />
        </div>
      </fieldset>

      <div>
        <label className={labelCls} htmlFor="make">
          Make
        </label>
        <select
          id="make"
          className={field}
          value={make}
          onChange={(e) => update("make", e.target.value)}
        >
          <option value="">All makes</option>
          {datasetMakes.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelCls} htmlFor="model">
          Model
        </label>
        <select
          id="model"
          className={field}
          value={searchParams.get("model") ?? ""}
          onChange={(e) => update("model", e.target.value)}
          disabled={!make}
        >
          <option value="">All models</option>
          {models.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      <fieldset>
        <legend className={labelCls}>Year</legend>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            className={field}
            defaultValue={searchParams.get("minYear") ?? ""}
            onBlur={(e) => update("minYear", e.target.value)}
            aria-label="Minimum year"
          />
          <input
            type="number"
            placeholder="Max"
            className={field}
            defaultValue={searchParams.get("maxYear") ?? ""}
            onBlur={(e) => update("maxYear", e.target.value)}
            aria-label="Maximum year"
          />
        </div>
      </fieldset>

      <fieldset>
        <legend className={labelCls}>Mileage (km)</legend>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            className={field}
            defaultValue={searchParams.get("minMileage") ?? ""}
            onBlur={(e) => update("minMileage", e.target.value)}
            aria-label="Minimum mileage"
          />
          <input
            type="number"
            placeholder="Max"
            className={field}
            defaultValue={searchParams.get("maxMileage") ?? ""}
            onBlur={(e) => update("maxMileage", e.target.value)}
            aria-label="Maximum mileage"
          />
        </div>
      </fieldset>

      <div>
        <label className={labelCls} htmlFor="transmission">
          Transmission
        </label>
        <select
          id="transmission"
          className={field}
          value={searchParams.get("transmission") ?? ""}
          onChange={(e) => update("transmission", e.target.value)}
        >
          <option value="">Any</option>
          {TRANSMISSIONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelCls} htmlFor="fuel">
          Fuel
        </label>
        <select
          id="fuel"
          className={field}
          value={searchParams.get("fuel") ?? ""}
          onChange={(e) => update("fuel", e.target.value)}
        >
          <option value="">Any</option>
          {FUEL_TYPES.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelCls} htmlFor="condition">
          Condition
        </label>
        <select
          id="condition"
          className={field}
          value={searchParams.get("condition") ?? ""}
          onChange={(e) => update("condition", e.target.value)}
        >
          <option value="">Any</option>
          {CONDITIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelCls} htmlFor="bodyType">
          Body Type
        </label>
        <select
          id="bodyType"
          className={field}
          value={searchParams.get("bodyType") ?? ""}
          onChange={(e) => update("bodyType", e.target.value)}
        >
          <option value="">Any</option>
          {BODY_TYPES.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <Button type="button" variant="outline" className="w-full" onClick={clearAll}>
        Clear Filters
      </Button>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 lg:block">
        <div className="sticky top-28 border border-brand-black/8 bg-white p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold">Filters</h2>
            <span className="text-xs text-brand-gray">{resultCount} found</span>
          </div>
          {filtersForm}
        </div>
      </aside>

      {/* Mobile trigger */}
      <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
        <p className="text-sm text-brand-gray">
          <span className="font-semibold text-brand-black">{resultCount}</span>{" "}
          vehicles found
        </p>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-10 items-center gap-2 border border-brand-black/15 bg-white px-4 text-sm font-semibold uppercase tracking-wide"
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>
      </div>

      {/* Mobile bottom sheet */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-brand-black/60"
            aria-label="Close filters"
            onClick={() => setOpen(false)}
          />
          <div
            className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-y-auto rounded-t-2xl bg-white p-5 pb-24 shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label="Vehicle filters"
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">Filters</h2>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="p-2"
              >
                <X size={20} />
              </button>
            </div>
            {filtersForm}
            <Button
              type="button"
              className="mt-4 w-full"
              onClick={() => setOpen(false)}
            >
              Show {resultCount} Vehicles
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
