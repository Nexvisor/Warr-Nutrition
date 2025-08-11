"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, Clock, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Product } from "@/utils/DataSlice";
import { ImageCompo } from "./ImageCompo";

export function SearchDropdown() {
  const products = useSelector((state: any) => state.dataSlice.products);
  const groupedByCategory = useSelector(
    (state: any) => state.dataSlice.groupedByCategory
  );
  const popularCategories = Object.entries(groupedByCategory).map(
    ([category, products]) => category
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(products);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults(products);
    } else {
      const filtered = products.filter((product: Product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
    }
  }, [searchQuery]);

  // Handle click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Clear search input
  const clearSearch = () => {
    setSearchQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Search for products, brands and more..."
          className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
        />
        {searchQuery ? (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
            onClick={clearSearch}
          >
            <X className="h-5 w-5 text-gray-500" />
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full"
          >
            <Search className="h-5 w-5 text-gray-500" />
          </Button>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full bg-white mt-1 rounded-md shadow-lg border border-gray-200 max-h-[80vh] overflow-y-auto">
          {searchQuery === "" ? (
            <div className="p-4">
              {/* Popular categories */}
              <div>
                <div className="flex items-center mb-2">
                  <h3 className="text-sm font-medium text-gray-700">
                    Popular Categories
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {popularCategories.map((category, index) => (
                    <Link
                      key={index}
                      href={`/${category}`}
                      className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md text-sm"
                    >
                      <TrendingUp className="h-4 w-4 mr-2 text-blue-600" />
                      {category}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              {searchResults.length > 0 ? (
                <div className="divide-y divide-gray-100">
                  {searchResults.map((product: Product) => (
                    <Link
                      key={product.id}
                      href={`/Product/${product.id}`}
                      className="flex items-center p-3 hover:bg-gray-50"
                    >
                      <div className="flex-shrink-0 h-16 w-16 relative">
                        {/* <Image
                          src={product.imageUrls[0] || "/placeholder.svg"}
                          alt={product.title}
                          fill
                          className="object-contain"
                        /> */}
                        <ImageCompo
                          src={product.imageUrls[0]}
                          alt={product.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {product.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {product.category}
                        </p>
                        <p className="text-sm font-bold mt-1">
                          ₹{product.price}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center">
                  <p className="text-gray-500">
                    No products found for "{searchQuery}"
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="p-3 bg-gray-50 border-t border-gray-200">
            <Link
              href={`/search?q=${encodeURIComponent(searchQuery)}`}
              className="flex items-center justify-center text-blue-600 hover:text-blue-800"
            >
              <Search className="h-4 w-4 mr-2" />
              <span>View all results for "{searchQuery || "..."}"</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
