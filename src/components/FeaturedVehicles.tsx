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
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-red">
              Inventory
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Featured Vehicles
            </h2>
          </div>
          <Button href="/inventory" variant="outline" size="sm">
            View All
          </Button>
        </div>

        {/* Mobile: horizontal snap carousel */}
        <div className="mt-10 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory md:hidden -mx-4 px-4">
          {vehicles.map((v, i) => (
            <div key={v.id} className="w-[85%] shrink-0 snap-start sm:w-[70%]">
              <VehicleCard vehicle={v} priority={i < 2} />
            </div>
          ))}
        </div>

        <div className="mt-10 hidden grid-cols-2 gap-5 md:grid xl:grid-cols-3">
          {vehicles.map((v, i) => (
            <VehicleCard key={v.id} vehicle={v} priority={i < 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
