"use client";
import React, { useState, useTransition } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Minus,
  Plus,
  Star,
} from "lucide-react";

import axios from "axios";
import { useRouter } from "next/navigation";
import { PRODUCT_IDS } from "@/constant/PRODUCT_IDs";

import Image from "next/image";

import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { setCart } from "@/utils/DataSlice";
import { toast } from "sonner";

import { Skeleton } from "@/components/ui/skeleton";
import { Product } from "@/utils/DataSlice";
import { DiscountPercentage } from "@/constant/DiscountPercentage";

function ProductDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const products = useSelector((state: any) => state.dataSlice.products);
  const filterProduct: Product = products.find(
    (product: Product) => product.id == id
  );
  const cartProducts = useSelector((state: any) => state.dataSlice.cart);

  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setcurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Record<number, boolean>>({});
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [isPending, startTransition] = useTransition();

  const dispatch = useDispatch();

  const incrementQuantity = () => {
    if (quantity < filterProduct.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const nextImage = () => {
    let index = (currentImageIndex + 1) % filterProduct.imageUrls.length;
    setcurrentImageIndex(index);
  };

  const prevImage = () => {
    let index =
      (currentImageIndex - 1 + filterProduct.imageUrls.length) %
      filterProduct.imageUrls.length;

    setcurrentImageIndex(index);
  };

  const userInfo = useSelector((state: any) => state.dataSlice.userInfo);

  const actualPrice = Math.floor(
    filterProduct.discountPrice -
      (DiscountPercentage(filterProduct.id) / 100) * filterProduct.discountPrice
  );

  function addToCart(userId: string, productId: string, quantity: number) {
    if (!userId) {
      router.push("/Login");
      return;
    }
    startTransition(async () => {
      const req = await axios.post("/api/addCart", {
        userId,
        productId,
        quantity,
      });
      let newCart = {
        id: new Date().toDateString(),
        items: [
          ...(cartProducts?.items ?? []),
          {
            price: filterProduct.price,
            product: filterProduct as Product,
            quantity,
          },
        ],
      };

      toast.success("Added to Cart", {
        description: `${quantity} × ${filterProduct.title.substring(
          0,
          30
        )}... added to your cart`,
        position: "bottom-right",
        duration: 3000,
        className: "bg-blue-700 text-white border border-navy-600",
        style: {
          backgroundColor: "#334477",
          color: "white",
          border: "1px solid #3e5692",
        },
        icon: <ShoppingCart className="h-5 w-5" />,
      });

      dispatch(setCart(newCart));
    });
  }

  const handleImageLoad = (index: number) => {
    setImagesLoaded((prev) => ({ ...prev, [index]: true }));
  };

  const handleImageError = (index: number) => {
    setImageErrors((prev) => ({ ...prev, [index]: true }));
  };

  const isOutofStuck =
    filterProduct.category === "Fish Oil" ||
    (filterProduct.category === "Protein" &&
      !PRODUCT_IDS.includes(filterProduct.id)) ||
    filterProduct.category === "Whey Protein" ||
    filterProduct.category === "Multi Vitamin";

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ChevronLeft className="w-4 h-4 mr-1" />
        Back to Products
      </Link>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="relative bg-white rounded-xl shadow-sm p-4">
          <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
            {!imagesLoaded[currentImageIndex] &&
              !imageErrors[currentImageIndex] && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Skeleton className="w-full h-full rounded-lg" />
                </div>
              )}
            {!imageErrors[currentImageIndex] ? (
              <Image
                src={filterProduct.imageUrls[currentImageIndex]}
                alt={filterProduct.title}
                fill
                className={`object-contain transition-opacity duration-300 ${
                  imagesLoaded[currentImageIndex] ? "opacity-100" : "opacity-0"
                }`}
                priority
                onLoad={() => handleImageLoad(currentImageIndex)}
                onError={() => handleImageError(currentImageIndex)}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-slate-100 rounded-lg">
                <div className="text-center p-4">
                  <p className="text-navy-700 font-medium">
                    Image could not be loaded
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Please try again later
                  </p>
                </div>
              </div>
            )}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 text-navy-700" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 text-navy-700" />
            </button>
          </div>
          <div className="flex justify-center gap-2 mt-2">
            {filterProduct.imageUrls.map((url, index) => (
              <button
                key={index}
                onClick={() => setcurrentImageIndex(index)}
                className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                  index === currentImageIndex
                    ? "border-navy-700"
                    : "border-transparent"
                }`}
              >
                <div className="relative w-full h-full">
                  {!imagesLoaded[index] && !imageErrors[index] && (
                    <Skeleton className="absolute inset-0 w-full h-full rounded-md" />
                  )}

                  {!imageErrors[index] ? (
                    <Image
                      src={url || "/placeholder.svg"}
                      alt={`Product thumbnail ${index + 1}`}
                      fill
                      className={`object-cover transition-opacity duration-300 ${
                        imagesLoaded[index] ? "opacity-100" : "opacity-0"
                      }`}
                      onLoad={() => handleImageLoad(index)}
                      onError={() => handleImageError(index)}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-100 rounded-md">
                      <p className="text-xs text-navy-700">Failed</p>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="inline-block bg-blue-600  text-white text-xs font-semibold px-2.5 py-1 rounded">
              {filterProduct.category}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-navy-900 mb-2">
            {filterProduct.title}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">(120 reviews)</span>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-3xl font-bold text-navy-900">
              ₹{actualPrice}
            </span>
            <span className="text-xl text-gray-500 line-through">
              ₹{filterProduct.discountPrice}
            </span>
            <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
              {DiscountPercentage(filterProduct.id)}% OFF
            </span>
          </div>

          <p className="text-gray-700 mb-6">{filterProduct.description}</p>

          <div className="bg-slate-100 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-navy-900 mb-2">
              Product Highlights
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              {filterProduct.productHighlights.map(
                (highlight: string, index) => (
                  <li key={index} className="text-gray-700">
                    {highlight}
                  </li>
                )
              )}
            </ul>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={decrementQuantity}
                className="px-3 py-2 text-navy-700 hover:bg-gray-100"
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 py-2 border-x border-gray-300">
                {quantity}
              </span>
              <button
                onClick={incrementQuantity}
                className="px-3 py-2 text-navy-700 hover:bg-gray-100"
                disabled={quantity >= filterProduct.stock}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <span className="text-sm text-gray-500">
              {filterProduct.stock} available
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            {isOutofStuck ? (
              <Button
                className="w-full bg-gradient-to-br from-[#1e7ae4] to-[#052f5e] text-white px-6 py-2 rounded-md shadow-md hover:opacity-90 transition"
                disabled
              >
                Out of Stock
              </Button>
            ) : (
              <Button
                className="w-full bg-gradient-to-br from-[#1e7ae4] to-[#052f5e] text-white px-6 py-2 rounded-md shadow-md hover:opacity-90 transition"
                onClick={() =>
                  addToCart(userInfo.id, filterProduct.id, quantity)
                }
              >
                <ShoppingCart className="mr-2 h-4 w-4" />{" "}
                {isPending ? "Please Wait...." : "Add to cart"}
              </Button>
            )}
          </div>
        </div>
      </div>

      <Tabs defaultValue="benefits" className="mt-12">
        <TabsList className="bg-slate-100 text-navy-700 flex gap-4">
          <TabsTrigger
            value="benefits"
            className="data-[state=active]:bg-blue-700 data-[state=active]:text-white"
          >
            Key Benefits
          </TabsTrigger>
          <TabsTrigger
            value="nutrition"
            className="data-[state=active]:bg-blue-700 data-[state=active]:text-white"
          >
            Nutrition Information
          </TabsTrigger>
        </TabsList>
        <TabsContent value="benefits" className="mt-6">
          <Card className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterProduct.keyBenefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="bg-slate-50 p-4 rounded-lg border border-slate-200"
                >
                  <h3 className="font-semibold text-navy-800 mb-2">
                    {benefit.topic}
                  </h3>
                  <p className="text-gray-700">{benefit.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        <TabsContent value="nutrition" className="mt-6">
          <Card className="p-6">
            <h3 className="font-semibold text-navy-800 mb-4 text-lg">
              Nutrition Information
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-100 text-navy-900">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Nutrient</th>
                    <th className="px-4 py-3 font-semibold">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filterProduct.nutritionInformation.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3">{item.nutrition}</td>
                      <td className="px-4 py-3">
                        {item.quantity || "Not applicable"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              {filterProduct.energy !== "" && (
                <p>Energy: {filterProduct.energy}</p>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProductDetailPage;
