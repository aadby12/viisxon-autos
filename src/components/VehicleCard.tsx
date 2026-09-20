import Image from "next/image";
import Link from "next/link";
import type { Vehicle } from "@/types/vehicle";
import { formatMileage, formatPrice, vehicleTitle } from "@/lib/format";
import { FavoriteButton } from "@/components/FavoriteButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { vehicleEnquiryMessage } from "@/lib/whatsapp";

type VehicleCardProps = {
  vehicle: Vehicle;
  priority?: boolean;
  showWhatsApp?: boolean;
};

export function VehicleCard({
  vehicle,
  priority = false,
  showWhatsApp = true,
}: VehicleCardProps) {
  const title = vehicleTitle(vehicle);
  const href = `/vehicle/${vehicle.id}`;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden border border-brand-black/8 bg-white transition duration-300 hover:-translate-y-0.5 hover:border-brand-black/15 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
      <Link href={href} className="absolute inset-0 z-10" aria-label={`View ${title}`}>
        <span className="sr-only">View {title}</span>
      </Link>

      <div className="relative aspect-[16/10] overflow-hidden bg-brand-light">
        <Image
          src={vehicle.images[0]}
          alt={title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-[1.04]"
          priority={priority}
        />
        <div className="absolute left-3 top-3 z-20 flex flex-wrap gap-2">
          {vehicle.featured && (
            <span className="bg-brand-red px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
              Featured
            </span>
          )}
          <span
            className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ${
              vehicle.available
                ? "bg-white text-brand-black"
                : "bg-brand-black text-white"
            }`}
          >
            {vehicle.available ? "Available" : "Sold"}
          </span>
        </div>
        <div className="absolute right-3 top-3 z-20">
          <FavoriteButton vehicleId={vehicle.id} />
        </div>
      </div>

      <div className="relative z-20 flex flex-1 flex-col p-4 md:p-5 pointer-events-none">
        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight md:text-xl">
          {title}
        </h3>
        <p className="mt-2 text-xl font-bold text-brand-red md:text-2xl">
          {formatPrice(vehicle.price)}
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-brand-gray sm:text-sm">
          <div>
            <dt className="sr-only">Mileage</dt>
            <dd>{formatMileage(vehicle.mileage)}</dd>
          </div>
          <div>
            <dt className="sr-only">Transmission</dt>
            <dd>{vehicle.transmission}</dd>
          </div>
          <div>
            <dt className="sr-only">Fuel</dt>
            <dd>{vehicle.fuel}</dd>
          </div>
          <div>
            <dt className="sr-only">Location</dt>
            <dd>{vehicle.location}</dd>
          </div>
        </dl>

        <div className="mt-auto flex flex-col gap-2 pt-5 pointer-events-auto">
          <Link
            href={href}
            className="inline-flex h-10 items-center justify-center bg-brand-black px-4 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-brand-red"
          >
            View Vehicle
          </Link>
          {showWhatsApp && (
            <WhatsAppButton
              message={vehicleEnquiryMessage(vehicle)}
              label="WhatsApp Enquiry"
              className="h-10 text-xs"
            />
          )}
        </div>
      </div>
    </article>
  );
}
