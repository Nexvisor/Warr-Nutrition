"use client";
import React from "react";
import { CategoryCard } from "./CategoryCard";
import { useState, useTransition, useEffect, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setGroupedByCategory, setProducts } from "@/utils/DataSlice";

import { Product } from "@/utils/DataSlice";

export function CategorySection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const groupedByCategory = useSelector(
    (state: any) => state.dataSlice.groupedByCategory
  );

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);

  const loadAndSetProductData = async () => {
    try {
      const res = await axios.get("/api/getProduct");
      startTransition(() => {
        let products = res.data.allProducts || [];

        // Categorise the product based on their category
        const groupedByCategory: Record<string, Product[]> = products.reduce(
          (acc: Record<string, Product[]>, product: Product) => {
            const category = product.category;

            if (!acc[category]) {
              acc[category] = [];
            }

            acc[category].push(product);
            return acc;
          },
          {} as Record<string, Product[]>
        );

        dispatch(setGroupedByCategory(groupedByCategory));
        dispatch(setProducts(products));
      });
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    loadAndSetProductData();
  }, []);

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
