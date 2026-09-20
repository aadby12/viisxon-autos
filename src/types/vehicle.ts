export type Transmission = "Automatic" | "Manual";
export type FuelType = "Petrol" | "Diesel" | "Hybrid" | "Electric";
export type Condition = "New" | "Used";
export type BodyType =
  | "Sedan"
  | "SUV"
  | "Coupe"
  | "Convertible"
  | "Pickup"
  | "Van"
  | "Wagon";

export type Vehicle = {
  id: string;
  make: string;
  model: string;
  trim?: string;
  year: number;
  price: number;
  mileage: number;
  transmission: Transmission;
  fuel: FuelType;
  bodyType: BodyType;
  engine?: string;
  drivetrain?: string;
  condition: Condition;
  location: string;
  description: string;
  features: string[];
  images: string[];
  featured: boolean;
  available: boolean;
  imported?: boolean;
  documentation?: string;
  serviceInfo?: string;
  createdAt: string;
};

export type VehicleFilters = {
  make?: string;
  model?: string;
  condition?: string;
  transmission?: string;
  fuel?: string;
  bodyType?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  minMileage?: number;
  maxMileage?: number;
  query?: string;
  sort?: SortOption;
};

export type SortOption =
  | "newest"
  | "price-asc"
  | "price-desc"
  | "mileage-asc";
