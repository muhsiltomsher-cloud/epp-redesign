"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { addToCart } from "@/lib/cart";
import { toggleWishlist, isInWishlist } from "@/lib/wishlist";

export default function ProductCardCompact({ product }: { product: any }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const nameMap: Record<string, string> = {
    "Oud & Dakhoon": "عود وبخور",
    "Perfume Collection": "مجموعة العطور",
    "Oil Perfumes": "عطور زيتية",
    "Accessories for Bakhoor": "إكسسوارات البخور",
    "Perfume Gift Sets": "هدايا العطور",
    "Home Collection": "مجموعة المنزل",
  };
  useEffect(() => {
    setWishlisted(isInWishlist(product.id));
  }, [product.id]);

  const handleWishlist = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setWishlisted(toggleWishlist(product.id));
    },
    [product.id]
  );

  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      addToCart(product.id);
    },
    [product.id]
  );

  return (
    <div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f3ef] mb-3">
        <Link href={`/product/${product.id}`}>
          <img
            src={isHovered && product.hoverImage ? product.hoverImage : product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        {product.badge && (
          <span className="absolute top-2 left-2 text-[8px] uppercase tracking-[0.15em] text-black bg-white/90 px-2 py-0.5">
            {product.badge === "NEW" ? "جديد" : product.badge === "BESTSELLER" ? "الأكثر مبيعًا" : product.badge}
          </span>
        )}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 w-8 h-8 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Wishlist"
        >
          <Heart size={14} className={wishlisted ? "fill-black text-black" : "text-black"} />
        </button>
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 bg-[var(--color-brand-gold)] text-white text-[9px] uppercase tracking-[0.2em] py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300 hover:bg-[var(--color-brand-gold-light)]"
        >
          إضافة سريعة
        </button>
      </div>
      <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-1 truncate">
        {nameMap[product.collection] || product.collection || "عطر"}
      </p>
      <Link href={`/product/${product.id}`}>
        <p className="text-[11px] uppercase tracking-[0.08em] text-black hover:text-[var(--color-brand-gold)] transition-colors cursor-pointer leading-tight line-clamp-2 mb-1">
          {product.name_ar || product.name}
        </p>
      </Link>
      <p className="text-[11px] font-semibold text-gray-800">
          {product.currency} {product.price}
        </p>
    </div>
  );
}
