/** Format price in Ghanaian Cedis (GH₵). */
export function formatPrice(price: number): string {
  return `GH₵${price.toLocaleString("en-GH")}`;
}

export function formatMileage(km: number): string {
  return `${km.toLocaleString("en-GH")} km`;
}

export function vehicleTitle(vehicle: {
  year: number;
  make: string;
  model: string;
  trim?: string;
}): string {
  const base = `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
  return vehicle.trim ? `${base} ${vehicle.trim}` : base;
}
