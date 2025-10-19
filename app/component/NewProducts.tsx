"use client";
import { RootState } from "@/utils/Store";
import React from "react";
import { useSelector } from "react-redux";
import { Product } from "@/utils/DataSlice";
import { PRODUCT_IDS } from "@/constant/PRODUCT_IDs";
import { ProductCard } from "./ProductCard";
function NewProducts() {
  const products = useSelector(
    (state: RootState) => state.dataSlice.products
  ).filter((product: Product) => PRODUCT_IDS.includes(product.id));

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 md:px-32">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Premium Black Series</h2>
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

export default NewProducts;
