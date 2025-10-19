"use client";
import React from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { Product } from "@/utils/DataSlice";

import { ProductCard } from "@/app/component/ProductCard";
import { ChevronLeft } from "lucide-react";

import { PRODUCT_IDS } from "@/constant/PRODUCT_IDs";

import Link from "next/link";
function CategoryPage() {
  const params = useParams();
  const { category } = params;
  const decodedCategory = decodeURIComponent(category as string);
  const products = useSelector((state: any) => state.dataSlice.products).filter(
    (product: Product) => !PRODUCT_IDS.includes(product.id)
  );

  const filterProducts = products.filter(
    (product: Product) => product.category === decodedCategory
  );

  return (
    <section className="py-12">
      <div className="px-10">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Products
        </Link>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">{decodedCategory}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filterProducts.map((product: Product) => (
            <ProductCard
              title={product.title}
              price={product.price}
              productId={product.id}
              image={product.imageUrls[0]}
              href={`/Product/${product.id}`}
              key={product.id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryPage;
