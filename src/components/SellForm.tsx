"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Upload } from "lucide-react";

const field =
  "h-11 w-full border border-brand-black/10 bg-white px-3 text-sm focus:border-brand-red focus:outline-none";
const label =
  "mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-brand-gray";

export function SellForm() {
  const [submitted, setSubmitted] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Structure ready for multipart upload + CRM / email API
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-brand-black/10 bg-brand-light p-8">
        <h2 className="font-display text-2xl font-semibold">Submission ready</h2>
        <p className="mt-3 text-sm text-brand-gray">
          Thank you. In production, your vehicle details and photos would be
          sent to the dealership. This demo does not upload files.
        </p>
        <Button
          type="button"
          className="mt-6"
          variant="outline"
          onClick={() => {
            setSubmitted(false);
            setFileNames([]);
          }}
        >
          Submit another
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="border border-brand-black/8 bg-white p-6 md:p-8"
      encType="multipart/form-data"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={label}>Name</span>
          <input name="name" required className={field} autoComplete="name" />
        </label>
        <label className="block">
          <span className={label}>Phone</span>
          <input name="phone" type="tel" required className={field} autoComplete="tel" />
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>Email</span>
          <input name="email" type="email" required className={field} autoComplete="email" />
        </label>
        <label className="block">
          <span className={label}>Vehicle Make</span>
          <input name="make" required className={field} />
        </label>
        <label className="block">
          <span className={label}>Vehicle Model</span>
          <input name="model" required className={field} />
        </label>
        <label className="block">
          <span className={label}>Year</span>
          <input name="year" type="number" required className={field} min={1990} max={2030} />
        </label>
        <label className="block">
          <span className={label}>Mileage (km)</span>
          <input name="mileage" type="number" required className={field} min={0} />
        </label>
        <label className="block">
          <span className={label}>Condition</span>
          <select name="condition" required className={field} defaultValue="">
            <option value="" disabled>
              Select
            </option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Needs work">Needs work</option>
          </select>
        </label>
        <label className="block">
          <span className={label}>Asking Price (GH₵)</span>
          <input name="askingPrice" type="number" className={field} min={0} />
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>Additional Information</span>
          <textarea
            name="notes"
            rows={4}
            className="w-full border border-brand-black/10 bg-white px-3 py-3 text-sm focus:border-brand-red focus:outline-none"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>Upload Vehicle Photos</span>
          <div className="relative flex min-h-[120px] cursor-pointer flex-col items-center justify-center border border-dashed border-brand-black/20 bg-brand-light px-4 py-8 transition hover:border-brand-red">
            <Upload className="text-brand-gray" size={22} />
            <span className="mt-2 text-sm text-brand-gray">
              Tap to select photos (demo — files not uploaded)
            </span>
            <input
              type="file"
              name="photos"
              accept="image/*"
              multiple
              className="absolute inset-0 cursor-pointer opacity-0"
              onChange={(e) => {
                const files = Array.from(e.target.files ?? []);
                setFileNames(files.map((f) => f.name));
              }}
            />
          </div>
          {fileNames.length > 0 && (
            <ul className="mt-2 space-y-1 text-xs text-brand-gray">
              {fileNames.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          )}
        </label>
      </div>
      <Button type="submit" className="mt-8 w-full sm:w-auto" size="lg">
        Submit Vehicle
      </Button>
    </form>
  );
}
