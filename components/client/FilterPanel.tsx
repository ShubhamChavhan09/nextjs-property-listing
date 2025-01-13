"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

export default function FilterPanel() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [priceRange, setPriceRange] = useState("");

  const updateFilters = (value: string) => {
    setPriceRange(value);
    startTransition(() => {
      const params = new URLSearchParams(searchParams);
      params.set("price", value);
      router.push(`/properties?${params.toString()}`);
    });
  };

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="font-semibold mb-4">Filters</h2>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Price Range</label>
          <select
            value={priceRange}
            onChange={(e) => updateFilters(e.target.value)}
            className="w-full p-2 border rounded"
            disabled={isPending}
          >
            <option value="">All Prices</option>
            <option value="0-500000">Up to $500,000</option>
            <option value="500000-1000000">$500,000 - $1,000,000</option>
            <option value="1000000+">$1,000,000+</option>
          </select>
        </div>
      </div>
    </div>
  );
}
