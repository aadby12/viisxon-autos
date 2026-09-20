import Image from "next/image";
import { Instagram } from "lucide-react";
import { dealership } from "@/lib/config";

const gallery = [
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
  "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
  "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
  "https://images.unsplash.com/photo-1542362567-b0666cd09982?w=800&q=80",
];

export function SocialGallery() {
  return (
    <section className="section-pad">
      <div className="container-page">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-red">
              Social
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
              Follow VIixson Autos
            </h2>
          </div>
          <a
            href={dealership.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-brand-black transition hover:text-brand-red"
          >
            <Instagram size={18} />
            Instagram
          </a>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-3">
          {gallery.map((src, i) => (
            <div
              key={src}
              className="relative aspect-square overflow-hidden bg-brand-light"
            >
              <Image
                src={src}
                alt={`VIixson Autos gallery image ${i + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 33vw"
                className="object-cover transition duration-500 hover:scale-105"
              />
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-brand-gray">
          Gallery placeholders for social content — replace with dealership media when available.
        </p>
      </div>
    </section>
  );
}
