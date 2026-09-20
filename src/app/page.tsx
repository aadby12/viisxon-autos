import { Hero } from "@/components/Hero";
import { QuickSearch } from "@/components/QuickSearch";
import { FeaturedVehicles } from "@/components/FeaturedVehicles";
import { TrustSection } from "@/components/TrustSection";
import { Testimonials } from "@/components/Testimonials";
import { SocialGallery } from "@/components/SocialGallery";
import { ContactCTA } from "@/components/ContactCTA";
import { fetchFeaturedVehicles } from "@/lib/vehicles";
import { dealership } from "@/lib/config";

export default async function HomePage() {
  const featured = await fetchFeaturedVehicles(6);

  return (
    <>
      <Hero />
      <QuickSearch />
      {dealership.isDemo && (
        <div className="container-page mt-8">
          <p className="border border-brand-black/10 bg-brand-light px-4 py-3 text-center text-xs text-brand-gray">
            Demo proposal website — vehicle listings and pricing are illustrative
            until verified with {dealership.name}.
          </p>
        </div>
      )}
      <FeaturedVehicles vehicles={featured} />
      <TrustSection />
      <Testimonials />
      <SocialGallery />
      <ContactCTA />
    </>
  );
}
