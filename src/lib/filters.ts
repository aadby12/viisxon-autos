import type { SortOption, Vehicle, VehicleFilters } from "@/types/vehicle";

export function filterVehicles(
  vehicles: Vehicle[],
  filters: VehicleFilters
): Vehicle[] {
  let result = [...vehicles];

  if (filters.query?.trim()) {
    const q = filters.query.trim().toLowerCase();
    const qDigits = q.replace(/[^\d]/g, "");
    result = result.filter((v) => {
      const haystack = [
        v.make,
        v.model,
        v.trim,
        v.year,
        v.bodyType,
        v.fuel,
        v.transmission,
        v.condition,
        v.location,
        v.price,
        v.mileage,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (haystack.includes(q)) return true;
      if (qDigits && String(v.price).includes(qDigits)) return true;
      if (qDigits && String(v.year).includes(qDigits)) return true;
      return false;
    });
  }

  if (filters.make) {
    result = result.filter(
      (v) => v.make.toLowerCase() === filters.make!.toLowerCase()
    );
  }
  if (filters.model) {
    result = result.filter(
      (v) => v.model.toLowerCase() === filters.model!.toLowerCase()
    );
  }
  if (filters.condition) {
    result = result.filter(
      (v) => v.condition.toLowerCase() === filters.condition!.toLowerCase()
    );
  }
  if (filters.transmission) {
    result = result.filter(
      (v) =>
        v.transmission.toLowerCase() === filters.transmission!.toLowerCase()
    );
  }
  if (filters.fuel) {
    result = result.filter(
      (v) => v.fuel.toLowerCase() === filters.fuel!.toLowerCase()
    );
  }
  if (filters.bodyType) {
    result = result.filter(
      (v) => v.bodyType.toLowerCase() === filters.bodyType!.toLowerCase()
    );
  }
  if (filters.minPrice != null) {
    result = result.filter((v) => v.price >= filters.minPrice!);
  }
  if (filters.maxPrice != null) {
    result = result.filter((v) => v.price <= filters.maxPrice!);
  }
  if (filters.minYear != null) {
    result = result.filter((v) => v.year >= filters.minYear!);
  }
  if (filters.maxYear != null) {
    result = result.filter((v) => v.year <= filters.maxYear!);
  }
  if (filters.minMileage != null) {
    result = result.filter((v) => v.mileage >= filters.minMileage!);
  }
  if (filters.maxMileage != null) {
    result = result.filter((v) => v.mileage <= filters.maxMileage!);
  }

  return sortVehicles(result, filters.sort ?? "newest");
}

export function sortVehicles(
  vehicles: Vehicle[],
  sort: SortOption
): Vehicle[] {
  const sorted = [...vehicles];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "mileage-asc":
      return sorted.sort((a, b) => a.mileage - b.mileage);
    case "newest":
    default:
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() ||
          b.year - a.year
      );
  }
}

export function getSimilarVehicles(
  vehicles: Vehicle[],
  vehicle: Vehicle,
  limit = 4
): Vehicle[] {
  const scored = vehicles
    .filter((v) => v.id !== vehicle.id && v.available)
    .map((v) => {
      let score = 0;
      if (v.make === vehicle.make) score += 4;
      if (v.bodyType === vehicle.bodyType) score += 3;
      if (Math.abs(v.year - vehicle.year) <= 2) score += 2;
      const priceDiff = Math.abs(v.price - vehicle.price) / vehicle.price;
      if (priceDiff <= 0.25) score += 2;
      else if (priceDiff <= 0.5) score += 1;
      return { v, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, limit).map((s) => s.v);
}

export function getUniqueMakes(vehicles: Vehicle[]): string[] {
  return [...new Set(vehicles.map((v) => v.make))].sort();
}

export function getModelsForMake(
  vehicles: Vehicle[],
  make?: string
): string[] {
  const filtered = make
    ? vehicles.filter((v) => v.make.toLowerCase() === make.toLowerCase())
    : vehicles;
  return [...new Set(filtered.map((v) => v.model))].sort();
}

export function filtersToSearchParams(
  filters: VehicleFilters
): URLSearchParams {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });
  return params;
}

export function searchParamsToFilters(
  params: URLSearchParams | Record<string, string | string[] | undefined>
): VehicleFilters {
  const get = (key: string): string | undefined => {
    if (params instanceof URLSearchParams) {
      return params.get(key) ?? undefined;
    }
    const val = params[key];
    return Array.isArray(val) ? val[0] : val;
  };

  const num = (key: string): number | undefined => {
    const v = get(key);
    if (v == null || v === "") return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  };

  return {
    make: get("make"),
    model: get("model"),
    condition: get("condition"),
    transmission: get("transmission"),
    fuel: get("fuel"),
    bodyType: get("bodyType"),
    minPrice: num("minPrice"),
    maxPrice: num("maxPrice"),
    minYear: num("minYear"),
    maxYear: num("maxYear"),
    minMileage: num("minMileage"),
    maxMileage: num("maxMileage"),
    query: get("query") ?? get("q"),
    sort: (get("sort") as VehicleFilters["sort"]) ?? "newest",
  };
}
