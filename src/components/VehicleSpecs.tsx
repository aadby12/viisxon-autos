import type { Vehicle } from "@/types/vehicle";
import { formatMileage } from "@/lib/format";

type VehicleSpecsProps = {
  vehicle: Vehicle;
};

export function VehicleSpecs({ vehicle }: VehicleSpecsProps) {
  const specs: { label: string; value: string }[] = [
    { label: "Year", value: String(vehicle.year) },
    { label: "Mileage", value: formatMileage(vehicle.mileage) },
    { label: "Transmission", value: vehicle.transmission },
    { label: "Fuel", value: vehicle.fuel },
    { label: "Engine", value: vehicle.engine ?? "—" },
    { label: "Body", value: vehicle.bodyType },
    { label: "Drive", value: vehicle.drivetrain ?? "—" },
    { label: "Condition", value: vehicle.condition },
  ];

  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden border border-brand-black/10 bg-brand-black/10 sm:grid-cols-4">
      {specs.map((s) => (
        <div key={s.label} className="bg-white p-4">
          <dt className="text-[11px] font-semibold uppercase tracking-wider text-brand-gray">
            {s.label}
          </dt>
          <dd className="mt-1 text-sm font-semibold text-brand-black">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
