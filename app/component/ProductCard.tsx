import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/navigation";
import { setCart, setIsFetch } from "@/utils/DataSlice";
import { Product } from "@/utils/DataSlice";
import { toast } from "sonner";
import { ShoppingCart } from "lucide-react";
import { ImageCompo } from "./ImageCompo";
import { useTransition } from "react";
import { DiscountPercentage } from "@/constant/DiscountPercentage";
interface ProductCardProps {
  title: string;
  price: number;
  image: string;
  href: string;
  productId: string;
}

export function ProductCard({
  title,
  price,
  image,
  href,
  productId,
}: ProductCardProps) {
  const router = useRouter();
  const userInfo = useSelector((state: any) => state.dataSlice.userInfo);
  const isFetch = useSelector((state: any) => state.dataSlice.isFetch);
  const products = useSelector((state: any) => state.dataSlice.products);
  const cartProduct = useSelector((state: any) => state.dataSlice.cart);

  // selected Product
  const selectedProduct = products.find(
    (product: Product) => product.id === productId
  );

  const dispatch = useDispatch();

  const [isPending, startTransition] = useTransition();

  const actualPrice = Math.floor(
    selectedProduct.discountPrice -
      (DiscountPercentage / 100) * selectedProduct.discountPrice
  );
  // product in cart state  then  make api call becasuse of maintianing state first then api
  function addToCart(userId: string, productId: string, quantity: number) {
    if (!userId) {
      router.push("/Login");
      return;
    }

    startTransition(async () => {
      try {
        // Update cart locally first
        let newCartProduct = {
          id: crypto.randomUUID(),
          items: [
            ...(cartProduct?.items || []),
            {
              id: crypto.randomUUID(),
              price: selectedProduct.price,
              product: selectedProduct as Product,
              quantity,
            },
          ],
        };

        dispatch(setCart(newCartProduct));

        toast.success("Added to Cart", {
          description: `${quantity} × ${selectedProduct.title.substring(
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

        // API call
        await axios.post("/api/addCart", {
          userId,
          productId,
          quantity,
        });

        dispatch(setIsFetch(!isFetch));
      } catch (error: any) {
        let message = "Something went wrong";

        if (axios.isAxiosError(error)) {
          if (error.response) {
            message =
              error.response.data?.message ||
              `Server error: ${error.response.status}`;
          } else if (error.request) {
            message =
              "No response from server. Please check your internet connection.";
          } else {
            message = error.message;
          }
        } else {
          message = error?.message || message;
        }

        console.error("Error adding to cart:", error);

        toast.error("Failed to add to cart", {
          description: message,
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
    });
  }

  return (
    <div className="group relative bg-white border rounded-lg overflow-hidden transition-all hover:shadow-md h-full hover:scale-105">
      <Link href={href} className="block p-2 md:p-4">
        <div className="aspect-square relative mb-2 md:mb-4">
          {/* <Image
            src={image || "/placeholder.svg"}
            alt={title}
            fill
            className="object-contain"
          /> */}
          <ImageCompo src={image} alt={title} />
        </div>

        <div className="space-y-1 md:space-y-2">
          <h3 className="font-medium text-gray-900 line-clamp-2 text-sm md:text-base">
            {title}
          </h3>

          <div className="flex items-center gap-2">
            <span className="font-bold text-sm md:text-lg">₹{actualPrice}</span>
            <span className="text-md text-gray-500 line-through">
              ₹{selectedProduct.discountPrice}
            </span>
            <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
              {DiscountPercentage}% OFF
            </span>
          </div>
        </div>
      </Link>

      <div className="p-2 md:p-4 pt-0">
        <Button
          className="w-full bg-gradient-to-br from-[#1e7ae4] to-[#052f5e] text-white px-6 py-2 rounded-md shadow-md hover:opacity-90 transition"
          onClick={() => addToCart(userInfo?.id, productId, 1)}
          disabled={isPending}
        >
          {isPending ? "Please Wait..." : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
}
