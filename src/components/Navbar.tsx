"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Heart,
  Menu,
  Search,
  X,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/Button";
import { useFavorites } from "@/hooks/useFavorites";
import { SearchModal } from "@/components/SearchModal";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Inventory" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const mobileLinks = [
  { href: "/", label: "Home" },
  { href: "/inventory", label: "Inventory" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/sell", label: "Sell Your Car" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count } = useFavorites();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || open
            ? "bg-brand-black/95 shadow-lg backdrop-blur-md"
            : "bg-gradient-to-b from-brand-black/80 to-transparent"
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
          <Logo variant="light" priority />

          <nav
            className="hidden items-center gap-7 lg:flex"
            aria-label="Primary"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/85 transition hover:text-brand-red"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              aria-label="Search vehicles"
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center text-white transition hover:text-brand-red"
            >
              <Search size={20} />
            </button>

            <Link
              href="/favorites"
              aria-label={`Saved vehicles${count ? `, ${count} saved` : ""}`}
              className="relative inline-flex h-10 w-10 items-center justify-center text-white transition hover:text-brand-red"
            >
              <Heart size={20} />
              {count > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-red px-1 text-[10px] font-bold text-white">
                  {count}
                </span>
              )}
            </Link>

            <div className="ml-1 hidden items-center gap-2 xl:flex">
              <Button href="/sell" variant="outline" size="sm" className="border-white/30 text-white hover:border-brand-red hover:text-brand-red">
                Sell / Trade In
              </Button>
              <Button href="/contact" size="sm">
                Contact Us
              </Button>
            </div>

            <button
              type="button"
              className="ml-1 inline-flex h-10 w-10 items-center justify-center text-white lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="border-t border-white/10 bg-brand-black lg:hidden">
            <nav className="container-page flex flex-col py-4" aria-label="Mobile">
              {mobileLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/8 py-3.5 text-base font-medium text-white transition hover:text-brand-red"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-2 pb-2">
                <Button href="/sell" variant="white" onClick={() => setOpen(false)}>
                  Sell / Trade In
                </Button>
                <Button href="/contact" onClick={() => setOpen(false)}>
                  Contact Us
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
