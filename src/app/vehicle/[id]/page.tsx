import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { VehicleGallery } from "@/components/VehicleGallery";
import { VehicleSpecs } from "@/components/VehicleSpecs";
import { VehicleCard } from "@/components/VehicleCard";
import { Button } from "@/components/ui/Button";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CallButton } from "@/components/CallButton";
import { FavoriteToggle } from "@/components/FavoriteToggle";
import {
  fetchSimilarVehicles,
  fetchVehicleById,
} from "@/lib/vehicles";
import { getAllVehicles } from "@/data/vehicles";
import { formatPrice, vehicleTitle } from "@/lib/format";
import { vehicleEnquiryMessage } from "@/lib/whatsapp";
import { dealership } from "@/lib/config";

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  return getAllVehicles().map((v) => ({ id: v.id }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const vehicle = await fetchVehicleById(id);
  if (!vehicle) return { title: "Vehicle Not Found" };
  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model} for Sale in Ghana`;
  const description = `${vehicleTitle(vehicle)} listed at ${formatPrice(vehicle.price)}. Contact ${dealership.name} in Accra, Ghana.`;
  return {
    title,
    description,
    alternates: { canonical: `/vehicle/${vehicle.id}` },
    openGraph: {
      title: `${title} | ${dealership.name}`,
      description,
      images: vehicle.images[0] ? [{ url: vehicle.images[0] }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${dealership.name}`,
      description,
    },
  };
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { id } = await params;
  const vehicle = await fetchVehicleById(id);
  if (!vehicle) notFound();

  const similar = await fetchSimilarVehicles(vehicle, 4);
  const title = vehicleTitle(vehicle);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Car",
    name: title,
    brand: { "@type": "Brand", name: vehicle.make },
    model: vehicle.model,
    vehicleModelDate: String(vehicle.year),
    mileageFromOdometer: {
      "@type": "QuantitativeValue",
      value: vehicle.mileage,
      unitCode: "KMT",
    },
    fuelType: vehicle.fuel,
    vehicleTransmission: vehicle.transmission,
    bodyType: vehicle.bodyType,
    offers: {
      "@type": "Offer",
      price: vehicle.price,
      priceCurrency: "GHS",
      availability: vehicle.available
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut",
      seller: {
        "@type": "AutoDealer",
        name: dealership.name,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Accra",
          addressCountry: "GH",
        },
      },
    },
    image: vehicle.images,
    description: vehicle.description,
  };

  return (
    <div className="overflow-x-hidden bg-white pt-20 md:pt-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-page pb-4 md:pb-6">
        <nav className="truncate text-xs text-brand-gray sm:text-sm" aria-label="Breadcrumb">
          <Link href="/inventory" className="hover:text-brand-red">
            Inventory
          </Link>
          <span className="mx-2">/</span>
          <span className="text-brand-black">{title}</span>
        </nav>
      </div>

      <div className="container-page grid gap-8 lg:grid-cols-2 lg:gap-12">
        <VehicleGallery images={vehicle.images} alt={title} />

        <div>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <h1 className="font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
                {title}
              </h1>
              <p className="mt-2 text-2xl font-bold text-brand-red sm:mt-3 sm:text-3xl md:text-4xl">
                {formatPrice(vehicle.price)}
              </p>
            </div>
            <span
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${
                vehicle.available
                  ? "bg-brand-red text-white"
                  : "bg-brand-black text-white"
              }`}
            >
              {vehicle.available ? "Available" : "Sold"}
            </span>
          </div>

          <div className="mt-8">
            <VehicleSpecs vehicle={vehicle} />
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Button href="/contact" className="w-full">
              Contact Dealer
            </Button>
            <WhatsAppButton
              message={vehicleEnquiryMessage(vehicle)}
              className="w-full"
            />
            <CallButton label="Call Dealer" className="w-full" />
            <FavoriteToggle vehicleId={vehicle.id} />
          </div>

          {dealership.isDemo && (
            <p className="mt-6 text-xs text-brand-gray">
              Demo listing — availability and pricing illustrative until verified.
            </p>
          )}
        </div>
      </div>

      <section className="container-page section-pad">
        <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
          Vehicle Overview
        </h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-brand-gray">
          {vehicle.description}
        </p>

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-display text-lg font-semibold">Key Features</h3>
            <ul className="mt-4 space-y-2">
              {vehicle.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm text-brand-black"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-brand-red" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-6">
            <div>
              <h3 className="font-display text-lg font-semibold">Condition</h3>
              <p className="mt-2 text-sm text-brand-gray">{vehicle.condition}</p>
            </div>
            {vehicle.serviceInfo && (
              <div>
                <h3 className="font-display text-lg font-semibold">
                  Service Information
                </h3>
                <p className="mt-2 text-sm text-brand-gray">{vehicle.serviceInfo}</p>
              </div>
            )}
            {vehicle.imported && (
              <div>
                <h3 className="font-display text-lg font-semibold">
                  Import Information
                </h3>
                <p className="mt-2 text-sm text-brand-gray">
                  This demo listing is marked as an imported vehicle. Confirm
                  clearance and documentation details with {dealership.name}.
                </p>
              </div>
            )}
            {vehicle.documentation && (
              <div>
                <h3 className="font-display text-lg font-semibold">
                  Documentation
                </h3>
                <p className="mt-2 text-sm text-brand-gray">
                  {vehicle.documentation}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="bg-brand-light section-pad">
          <div className="container-page">
            <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
              You May Also Like
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {similar.map((v) => (
                <VehicleCard key={v.id} vehicle={v} showWhatsApp={false} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
