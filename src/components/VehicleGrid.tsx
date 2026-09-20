import type { Vehicle } from "@/types/vehicle";
import { VehicleCard } from "@/components/VehicleCard";

type VehicleGridProps = {
  vehicles: Vehicle[];
  priorityCount?: number;
};

export function VehicleGrid({ vehicles, priorityCount = 0 }: VehicleGridProps) {
  if (vehicles.length === 0) {
    return (
      <div className="border border-dashed border-brand-black/15 bg-brand-light px-6 py-16 text-center">
        <p className="font-display text-xl font-semibold">No vehicles found</p>
        <p className="mt-2 text-sm text-brand-gray">
          Try adjusting your filters or search terms.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {vehicles.map((vehicle, i) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          priority={i < priorityCount}
        />
      ))}
    </div>
  );
}
