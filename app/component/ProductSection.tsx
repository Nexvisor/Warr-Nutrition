"use client";
import React from "react";
import { ProductCard } from "./ProductCard";
import { useSelector } from "react-redux";
import { Product } from "@/utils/DataSlice";
import { shuffleArray } from "@/utils/resultArray";

export function ProductSection() {
  // Shuffled array
  const products = shuffleArray(
    useSelector((state: any) => state.dataSlice.products)
  );

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 md:px-32">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Best Sellers</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {products.map((product: Product) => (
            <ProductCard
              title={product.title}
              price={product.discountPrice}
              key={product.id}
              image={product.imageUrls[0]}
              href={`/Product/${product.id}`}
              productId={product.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
