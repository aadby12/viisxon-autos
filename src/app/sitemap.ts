import type { MetadataRoute } from "next";
import { dealership } from "@/lib/config";
import { getAllVehicles } from "@/data/vehicles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = dealership.siteUrl;
  const staticRoutes = [
    "",
    "/inventory",
    "/about",
    "/services",
    "/contact",
    "/sell",
    "/favorites",
  ].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const vehicleRoutes = getAllVehicles().map((v) => ({
    url: `${base}/vehicle/${v.id}`,
    lastModified: new Date(v.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...vehicleRoutes];
}
