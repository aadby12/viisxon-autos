import {
  Car,
  Eye,
  HeartHandshake,
  LayoutGrid,
  MapPinned,
} from "lucide-react";

const items = [
  {
    icon: Car,
    title: "Quality Vehicles",
    text: "Carefully selected vehicles suited to Ghana roads and buyer needs.",
  },
  {
    icon: Eye,
    title: "Transparent Information",
    text: "Clear vehicle details and pricing so you can compare with confidence.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Focused",
    text: "Support throughout the buying process — from enquiry to handover.",
  },
  {
    icon: LayoutGrid,
    title: "Wide Selection",
    text: "Multiple makes and vehicle categories across sedans, SUVs and more.",
  },
  {
    icon: MapPinned,
    title: "Ghana-Based",
    text: "Serving customers in Accra and across Ghana with local expertise.",
  },
];

export function TrustSection() {
  return (
    <section className="section-pad bg-brand-light">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-red">
            Why Choose Us
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
            Why Choose VIixson Autos?
          </h2>
        </div>
        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {items.map((item) => (
            <div
              key={item.title}
              className="border border-brand-black/8 bg-white p-5 transition hover:border-brand-red/40"
            >
              <item.icon className="text-brand-red" size={22} strokeWidth={1.75} />
              <h3 className="mt-4 font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-gray">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
