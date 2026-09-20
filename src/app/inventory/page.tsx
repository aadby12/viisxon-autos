import type { Metadata } from "next";
import { Suspense } from "react";
import { VehicleFilters } from "@/components/VehicleFilters";
import { VehicleGrid } from "@/components/VehicleGrid";
import { searchParamsToFilters } from "@/lib/filters";
import { fetchVehicles } from "@/lib/vehicles";
import { dealership } from "@/lib/config";

export const metadata: Metadata = {
  title: "Vehicle Inventory",
  description: `Browse cars for sale in Ghana at ${dealership.name}. Filter by make, price, year and more.`,
  alternates: { canonical: "/inventory" },
};

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function InventoryPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const filters = searchParamsToFilters(params);
  const results = await fetchVehicles(filters);
  const queryLabel = filters.query?.trim();

  return (
    <div className="overflow-x-hidden bg-brand-light pt-20 md:pt-28">
      <div className="container-page pb-5 md:pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-red sm:text-xs">
          Marketplace
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Vehicle Inventory
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-brand-gray sm:text-base">
          Explore our demo selection of vehicles available in Accra, Ghana.
          {queryLabel ? (
            <>
              {" "}
              Showing results for{" "}
              <span className="font-semibold text-brand-black">
                &ldquo;{queryLabel}&rdquo;
              </span>
              .
            </>
          ) : null}
        </p>
        <p className="mt-2 hidden text-sm font-medium text-brand-black lg:block">
          {results.length} vehicle{results.length === 1 ? "" : "s"} found
        </p>
      </div>

      <div className="container-page flex flex-col gap-5 pb-24 lg:flex-row lg:gap-8 lg:pb-24">
        <Suspense
          fallback={
            <div className="h-12 w-full border border-brand-black/8 bg-white lg:h-auto lg:w-72" />
          }
        >
          <VehicleFilters resultCount={results.length} />
        </Suspense>
        <div className="min-w-0 w-full flex-1">
          <VehicleGrid vehicles={results} priorityCount={3} />
        </div>
      </div>
    </div>
  );
}
