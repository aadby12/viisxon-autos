import type { Vehicle } from "@/types/vehicle";
import { VehicleCard } from "@/components/VehicleCard";
import { Button } from "@/components/ui/Button";

type FeaturedVehiclesProps = {
  vehicles: Vehicle[];
};

export function FeaturedVehicles({ vehicles }: FeaturedVehiclesProps) {
  return (
    <section className="section-pad">
      <div className="container-page">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand-red sm:text-xs">
              Inventory
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:mt-3 sm:text-3xl md:text-4xl">
              Featured Vehicles
            </h2>
          </div>
          <Button href="/inventory" variant="outline" size="sm" className="w-full sm:w-auto">
            View All
          </Button>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {vehicles.map((v, i) => (
            <VehicleCard key={v.id} vehicle={v} priority={i < 2} />
          ))}
        </div>
      </div>
    </section>
  );
}
