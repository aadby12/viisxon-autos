import type { Metadata } from "next";
import { FavoritesClient } from "./FavoritesClient";

export const metadata: Metadata = {
  title: "Saved Vehicles",
  description: "View vehicles you have saved on VIixson Autos.",
  alternates: { canonical: "/favorites" },
  robots: { index: false, follow: true },
};

export default function FavoritesPage() {
  return <FavoritesClient />;
}
