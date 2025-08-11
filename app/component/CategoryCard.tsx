import React from "react";

import Link from "next/link";
import { ImageCompo } from "./ImageCompo";

interface CategoryCardProps {
  title: string;
  image: string;
  href: string;
}

export function CategoryCard({ title, image, href }: CategoryCardProps) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-center bg-white border rounded-lg p-4 transition-all hover:shadow-md min-w-[140px] md:min-w-0 scale-100 hover:scale-110"
    >
      <div className="relative w-20 h-20 md:w-24 md:h-24 mb-3">
        <ImageCompo src={image} alt={title} className="object-contain" />
      </div>
      <h3 className="text-black group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-br group-hover:from-[#0760C8] group-hover:to-[#0F4E98] transition duration-300 font-medium text-md">
        {title}
      </h3>
    </Link>
  );
}
