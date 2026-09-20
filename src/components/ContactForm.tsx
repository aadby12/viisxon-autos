"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";

const field =
  "h-11 w-full border border-brand-black/10 bg-white px-3 text-sm focus:border-brand-red focus:outline-none";
const label =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-brand-gray";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Ready for backend / email API integration
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-brand-black/10 bg-brand-light p-8">
        <h2 className="font-display text-2xl font-semibold">Message received</h2>
        <p className="mt-3 text-sm text-brand-gray">
          Thank you. In production, this enquiry would be delivered to the
          dealership team. For this demo, your details were not sent.
        </p>
        <Button
          type="button"
          className="mt-6"
          variant="outline"
          onClick={() => setSubmitted(false)}
        >
          Send another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border border-brand-black/8 bg-white p-6 md:p-8"
      noValidate
    >
      <h2 className="font-display text-xl font-semibold">Send a message</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="block sm:col-span-1">
          <span className={label}>Name</span>
          <input name="name" required className={field} autoComplete="name" />
        </label>
        <label className="block">
          <span className={label}>Phone</span>
          <input
            name="phone"
            type="tel"
            required
            className={field}
            autoComplete="tel"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>Email</span>
          <input
            name="email"
            type="email"
            required
            className={field}
            autoComplete="email"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>Message</span>
          <textarea
            name="message"
            required
            rows={5}
            className="w-full border border-brand-black/10 bg-white px-3 py-3 text-sm focus:border-brand-red focus:outline-none"
          />
        </label>
      </div>
      <Button type="submit" className="mt-6 w-full sm:w-auto">
        Send Enquiry
      </Button>
    </form>
  );
}
