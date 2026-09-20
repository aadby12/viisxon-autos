import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-red">
        404
      </p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-brand-gray">
        The page you are looking for does not exist or may have been moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href="/">Go Home</Button>
        <Button href="/inventory" variant="outline">
          Browse Inventory
        </Button>
      </div>
      <Link
        href="/contact"
        className="mt-6 text-sm font-semibold text-brand-red hover:underline"
      >
        Contact us
      </Link>
    </div>
  );
}
