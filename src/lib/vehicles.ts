import type { Vehicle } from "@/types/vehicle";
import { getAllVehicles, getFeaturedVehicles, getVehicleById } from "@/data/vehicles";
import { filterVehicles, getSimilarVehicles } from "@/lib/filters";
import type { VehicleFilters } from "@/types/vehicle";

/**
 * Data access layer — swap implementations when connecting a database/API.
 * Keep page components depending on these helpers, not raw mock arrays.
 */
export async function fetchVehicles(
  filters?: VehicleFilters
): Promise<Vehicle[]> {
  const all = getAllVehicles();
  if (!filters) return all;
  return filterVehicles(all, filters);
}

export async function fetchVehicleById(
  id: string
): Promise<Vehicle | undefined> {
  return getVehicleById(id);
}

export async function fetchFeaturedVehicles(
  limit = 6
): Promise<Vehicle[]> {
  return getFeaturedVehicles(limit);
}

export async function fetchSimilarVehicles(
  vehicle: Vehicle,
  limit = 4
): Promise<Vehicle[]> {
  return getSimilarVehicles(getAllVehicles(), vehicle, limit);
}
