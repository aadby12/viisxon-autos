/**
 * Testimonials placeholder — ready for verified customer reviews.
 * Do not invent fake reviews.
 */
export function Testimonials() {
  return (
    <section className="section-pad bg-brand-black text-white">
      <div className="container-page">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-red">
          Reviews
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight md:text-4xl">
          What Customers Say
        </h2>
        <div className="mt-10 border border-white/10 bg-brand-deep p-8 md:p-12">
          <blockquote className="font-display text-2xl font-medium leading-snug text-white/90 md:text-3xl">
            &ldquo;Add verified customer reviews here.&rdquo;
          </blockquote>
          <p className="mt-6 text-sm text-brand-silver">
            This section is structured for real customer testimonials. Once
            verified reviews are available, they will appear here.
          </p>
        </div>
      </div>
    </section>
  );
}
