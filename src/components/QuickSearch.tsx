"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { vehicles } from "@/data/vehicles";
import { getModelsForMake, getUniqueMakes } from "@/lib/filters";
import { Button } from "@/components/ui/Button";

const priceRanges = [
  { label: "Any price", min: "", max: "" },
  { label: "Under GH₵200,000", min: "", max: "200000" },
  { label: "GH₵200,000 – 400,000", min: "200000", max: "400000" },
  { label: "GH₵400,000 – 600,000", min: "400000", max: "600000" },
  { label: "Over GH₵600,000", min: "600000", max: "" },
];

const years = Array.from({ length: 15 }, (_, i) => 2026 - i);

export function QuickSearch() {
  const router = useRouter();
  const makes = useMemo(() => getUniqueMakes(vehicles), []);
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [condition, setCondition] = useState("");
  const [price, setPrice] = useState("");
  const [year, setYear] = useState("");
  const [transmission, setTransmission] = useState("");
  const [fuel, setFuel] = useState("");

  const models = useMemo(
    () => getModelsForMake(vehicles, make || undefined),
    [make]
  );

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (make) params.set("make", make);
    if (model) params.set("model", model);
    if (condition) params.set("condition", condition);
    if (year) {
      params.set("minYear", year);
      params.set("maxYear", year);
    }
    if (transmission) params.set("transmission", transmission);
    if (fuel) params.set("fuel", fuel);
    if (price) {
      const range = priceRanges.find((r) => r.label === price);
      if (range?.min) params.set("minPrice", range.min);
      if (range?.max) params.set("maxPrice", range.max);
    }
    router.push(`/inventory?${params.toString()}`);
  }

  const field =
    "h-11 w-full border border-brand-black/10 bg-white px-3 text-sm text-brand-black focus:border-brand-red focus:outline-none";

  return (
    <section className="relative z-10 -mt-10 md:-mt-14">
      <div className="container-page">
        <div className="border border-brand-black/8 bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.12)] md:p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
            Find Your Next Car
          </h2>
          <form
            onSubmit={onSubmit}
            className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
          >
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-brand-gray">
                Make
              </span>
              <select
                className={field}
                value={make}
                onChange={(e) => {
                  setMake(e.target.value);
                  setModel("");
                }}
              >
                <option value="">Any make</option>
                {makes.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-brand-gray">
                Model
              </span>
              <select
                className={field}
                value={model}
                onChange={(e) => setModel(e.target.value)}
                disabled={!make}
              >
                <option value="">Any model</option>
                {models.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-brand-gray">
                Condition
              </span>
              <select
                className={field}
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
              >
                <option value="">Any</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-brand-gray">
                Price Range
              </span>
              <select
                className={field}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              >
                {priceRanges.map((r) => (
                  <option key={r.label} value={r.label === "Any price" ? "" : r.label}>
                    {r.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-brand-gray">
                Year
              </span>
              <select
                className={field}
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">Any year</option>
                {years.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-brand-gray">
                Transmission
              </span>
              <select
                className={field}
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
              >
                <option value="">Any</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-brand-gray">
                Fuel Type
              </span>
              <select
                className={field}
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
              >
                <option value="">Any</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Electric">Electric</option>
              </select>
            </label>

            <div className="flex items-end">
              <Button type="submit" className="w-full" size="lg">
                Search Vehicles
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
