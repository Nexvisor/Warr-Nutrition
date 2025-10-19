"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Trash2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import axios from "axios";
import { Product } from "@/utils/DataSlice";
import { ImageCompo } from "./ImageCompo";
import Loader from "./Loader";
import { toast } from "sonner";

// Sample product data

export default function ProductListPage() {
  const [isPending, startTransition] = useTransition();
  const [products, setProducts] = useState<Product[]>([]);
  const [isFetch, setIsFetch] = useState(false);

  useEffect(() => {
    startTransition(async () => {
      let req = await axios.get("/api/getProduct");
      const { allProducts } = req.data;
      setProducts(allProducts);
    });
  }, [isFetch]);

  const deleteProduct = async (id: string) => {
    try {
      await axios.delete("/api/deleteProduct", {
        data: { id },
      });
      toast.success("Product deleted successfully", {
        position: "bottom-right",
        duration: 3000,
        className: "bg-green-700 text-white border border-green-800",
        style: {
          backgroundColor: "#2f855a",
          color: "white",
          border: "1px solid #276749",
        },
      });

      setIsFetch((prev) => !prev);
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product", {
        description: "Something went wrong. Please try again.",
        position: "bottom-right",
        duration: 3000,
        className: "bg-red-700 text-white border border-red-800",
        style: {
          backgroundColor: "#7a1f1f",
          color: "white",
          border: "1px solid #a33d3d",
        },
      });
    }
  };

  if (isPending) {
    return <Loader />;
  }
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <ImageCompo src={product.imageUrls[0]} alt={product.title} />
                  <div>
                    <CardTitle className="text-xl">{product.title}</CardTitle>
                    <p className="text-gray-600 mt-1">{product.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="font-semibold">₹{product.discountPrice}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-semibold">{product.category}</p>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500">Stock</p>
                    <p className="font-semibold">{product.stock} units</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700 cursor-pointer"
                    onClick={() => deleteProduct(product.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {products.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-500 text-lg">No products found</p>
              <p className="text-gray-400 mt-2">
                Add your first product to get started
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
