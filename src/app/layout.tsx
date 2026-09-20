import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import { FavoritesProvider } from "@/hooks/useFavorites";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileCTA } from "@/components/MobileCTA";
import { dealership } from "@/lib/config";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(dealership.siteUrl),
  title: {
    default: "VIixson Autos | Cars for Sale in Ghana",
    template: "%s | VIixson Autos",
  },
  description:
    "Shop quality cars for sale in Ghana with VIixson Autos. Explore our latest vehicles, compare options and contact our dealership today.",
  openGraph: {
    type: "website",
    locale: "en_GH",
    siteName: dealership.name,
    title: "VIixson Autos | Cars for Sale in Ghana",
    description:
      "Shop quality cars for sale in Ghana with VIixson Autos. Explore our latest vehicles, compare options and contact our dealership today.",
    url: dealership.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "VIixson Autos | Cars for Sale in Ghana",
    description:
      "Shop quality cars for sale in Ghana with VIixson Autos. Explore our latest vehicles, compare options and contact our dealership today.",
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${syne.variable}`}>
      <body className="min-h-screen">
        <FavoritesProvider>
          <Navbar />
          <main className="min-w-0 overflow-x-hidden pb-24 md:pb-0">{children}</main>
          <Footer />
          <MobileCTA />
        </FavoritesProvider>
      </body>
    </html>
  );
}
