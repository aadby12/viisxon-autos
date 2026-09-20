"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X, ZoomIn } from "lucide-react";

type VehicleGalleryProps = {
  images: string[];
  alt: string;
};

export function VehicleGallery({ images, alt }: VehicleGalleryProps) {
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(() => {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
    setZoomed(false);
  }, [images.length]);

  const next = useCallback(() => {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
    setZoomed(false);
  }, [images.length]);

  useEffect(() => {
    if (!fullscreen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [fullscreen, prev, next]);

  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx > 0) prev();
      else next();
    }
    touchStartX.current = null;
  }

  const current = images[index] ?? images[0];

  return (
    <div>
      <div
        className="relative aspect-[16/10] overflow-hidden bg-brand-light"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Image
          src={current}
          alt={`${alt} — photo ${index + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
          className={`object-cover transition duration-300 ${zoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"}`}
          onClick={() => setZoomed((z) => !z)}
        />
        <div className="absolute inset-x-0 bottom-0 flex justify-between p-3">
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous image"
              onClick={prev}
              className="inline-flex h-10 w-10 items-center justify-center bg-brand-black/70 text-white backdrop-blur-sm transition hover:bg-brand-red"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={next}
              className="inline-flex h-10 w-10 items-center justify-center bg-brand-black/70 text-white backdrop-blur-sm transition hover:bg-brand-red"
            >
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label={zoomed ? "Zoom out" : "Zoom in"}
              onClick={() => setZoomed((z) => !z)}
              className="inline-flex h-10 w-10 items-center justify-center bg-brand-black/70 text-white backdrop-blur-sm transition hover:bg-brand-red"
            >
              <ZoomIn size={18} />
            </button>
            <button
              type="button"
              aria-label="Open fullscreen gallery"
              onClick={() => setFullscreen(true)}
              className="inline-flex h-10 w-10 items-center justify-center bg-brand-black/70 text-white backdrop-blur-sm transition hover:bg-brand-red"
            >
              <Maximize2 size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => {
              setIndex(i);
              setZoomed(false);
            }}
            aria-label={`View photo ${i + 1}`}
            aria-current={i === index ? "true" : undefined}
            className={`relative h-16 w-24 shrink-0 overflow-hidden border-2 transition ${
              i === index ? "border-brand-red" : "border-transparent opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={src}
              alt=""
              fill
              sizes="96px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {fullscreen && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-brand-black">
          <div className="flex items-center justify-between p-4">
            <p className="text-sm text-white/70">
              {index + 1} / {images.length}
            </p>
            <button
              type="button"
              aria-label="Close fullscreen"
              onClick={() => setFullscreen(false)}
              className="text-white"
            >
              <X size={24} />
            </button>
          </div>
          <div
            className="relative flex-1"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <Image
              src={current}
              alt={`${alt} — fullscreen ${index + 1}`}
              fill
              sizes="100vw"
              className="object-contain"
            />
            <button
              type="button"
              aria-label="Previous"
              onClick={prev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 p-3 text-white backdrop-blur hover:bg-brand-red"
            >
              <ChevronLeft size={28} />
            </button>
            <button
              type="button"
              aria-label="Next"
              onClick={next}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 p-3 text-white backdrop-blur hover:bg-brand-red"
            >
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
