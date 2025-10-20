"use client";
import React from "react";
import { CategoryCard } from "./CategoryCard";
import { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Product } from "@/utils/DataSlice";

export function CategorySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const groupedByCategory = useSelector(
    (state: any) => state.dataSlice.groupedByCategory
  );

  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-3">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Shop By Category</h2>
        </div>

        {/* Desktop view - grid */}
        <div className="hidden md:grid md:grid-cols-4 lg:grid-cols-[repeat(7,minmax(0,1fr))] gap-4">
          {Object.entries(groupedByCategory as Record<string, Product[]>).map(
            ([category, products]) => (
              <CategoryCard
                key={category}
                title={category}
                image={products[0]?.imageUrls?.[0] || "/fallback.jpg"}
                href={`/${category}`}
              />
            )
          )}
        </div>

        {/* Mobile view - horizontal scroll */}
        <div
          ref={scrollContainerRef}
          className="md:hidden flex overflow-x-auto pb-4 gap-3 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {Object.entries(groupedByCategory as Record<string, Product[]>).map(
            ([category, products]) => (
              <CategoryCard
                key={category}
                title={category}
                image={products[0]?.imageUrls?.[0] || "/fallback.jpg"}
                href={`/${category}`}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}
