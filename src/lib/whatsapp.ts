import { dealership } from "./config";
import { formatPrice, vehicleTitle } from "./format";
import type { Vehicle } from "@/types/vehicle";

export function getWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${dealership.whatsapp}?text=${encoded}`;
}

export function vehicleEnquiryMessage(vehicle: Vehicle): string {
  const title = vehicleTitle(vehicle);
  const price = formatPrice(vehicle.price);
  return `Hello ${dealership.name}, I'm interested in the ${title} listed at ${price}. Is it still available?`;
}

export function generalEnquiryMessage(): string {
  return `Hello ${dealership.name}, I'd like to enquire about your vehicles.`;
}

export function sellEnquiryMessage(): string {
  return `Hello ${dealership.name}, I'm interested in selling or trading in my vehicle.`;
}
