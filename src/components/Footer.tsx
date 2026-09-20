import Link from "next/link";
import { Logo } from "@/components/Logo";
import { dealership } from "@/lib/config";
import { getWhatsAppUrl, generalEnquiryMessage } from "@/lib/whatsapp";

const nav = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Inventory" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const customer = [
  { href: "/sell", label: "Sell / Trade In" },
  { href: "/favorites", label: "Favorites" },
];

export function Footer() {
  return (
    <footer className="bg-brand-black text-white">
      <div className="container-page section-pad grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo variant="light" />
          <p className="mt-4 font-display text-xl font-semibold tracking-tight">
            {dealership.tagline}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-brand-silver">
            Premium vehicles and professional service in {dealership.location}.
          </p>
          {dealership.isDemo && (
            <p className="mt-4 text-[11px] uppercase tracking-wider text-brand-gray">
              Demo proposal — inventory illustrative
            </p>
          )}
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-silver">
            Navigate
          </h2>
          <ul className="mt-4 space-y-2.5">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/80 transition hover:text-brand-red"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-silver">
            Customer
          </h2>
          <ul className="mt-4 space-y-2.5">
            {customer.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-white/80 transition hover:text-brand-red"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-brand-silver">
            Connect
          </h2>
          <ul className="mt-4 space-y-2.5 text-sm text-white/80">
            <li>
              <a
                href={dealership.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-brand-red"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={dealership.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-brand-red"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href={dealership.social.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-brand-red"
              >
                TikTok
              </a>
            </li>
            <li>
              <a
                href={getWhatsAppUrl(generalEnquiryMessage())}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-brand-red"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-brand-gray sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {dealership.name}. All rights reserved.</p>
          <p>{dealership.location}</p>
        </div>
      </div>
    </footer>
  );
}
