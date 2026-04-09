"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ShoppingBag, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products } from "@/lib/data";
import { getWishlist, toggleWishlist } from "@/lib/wishlist";
import { addToCart } from "@/lib/cart";

export default function Wishlist() {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);

  useEffect(() => {
    setWishlistIds(getWishlist());
    const onUpdate = () => setWishlistIds(getWishlist());
    window.addEventListener("wishlist-updated", onUpdate);
    return () => window.removeEventListener("wishlist-updated", onUpdate);
  }, []);

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  const handleRemove = (productId: string) => {
    toggleWishlist(productId);
  };

  const handleAddToCart = (productId: string) => {
    addToCart(productId);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[104px] md:pt-[106px] pb-20 md:pb-0">
        {/* Header */}
        <div className="epp-container pt-8 md:pt-14 pb-6 md:pb-10">
          <div className="text-center">
            <div className="w-12 h-[1px] bg-[#c9a96e] mx-auto mb-4 md:mb-6" />
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-serif mb-2 text-black">My Wishlist</h1>
            <p className="text-[11px] md:text-xs text-black/40 font-light tracking-wide">
              {wishlistProducts.length === 0
                ? "Your wishlist is empty"
                : `${wishlistProducts.length} ${wishlistProducts.length === 1 ? "item" : "items"} saved`}
            </p>
          </div>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-5 py-16 md:py-24 text-center">
            <div className="w-20 h-20 rounded-full bg-[#c9a96e]/10 flex items-center justify-center mb-6">
              <Heart size={32} strokeWidth={1} className="text-[#c9a96e]" />
            </div>
            <p className="font-serif text-xl md:text-2xl text-black mb-3">No saved items yet</p>
            <p className="text-[11px] md:text-[12px] text-black/40 max-w-[280px] mb-8 leading-relaxed">
              Browse our collection and tap the heart icon to save your favorite fragrances.
            </p>
            <Link href="/collection">
              <span className="creed-button inline-block cursor-pointer">Explore Collection</span>
            </Link>
          </div>
        ) : (
          <div className="epp-container pb-12 md:pb-20">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
              {wishlistProducts.map((product) => (
                <div key={product.id} className="group relative">
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-black/40 hover:text-red-500 hover:bg-white transition-all shadow-sm"
                    aria-label="Remove from wishlist"
                  >
                    <X size={14} strokeWidth={1.5} />
                  </button>

                  <Link href={`/product/${product.id}`}>
                    <div className="cursor-pointer">
                      <div className="aspect-[3/4] overflow-hidden bg-[#f8f8f8] mb-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                      <div className="px-1">
                        <p className="text-[11px] md:text-[12px] font-serif text-black group-hover:text-[#c9a96e] transition-colors truncate">
                          {product.name}
                        </p>
                        <p className="text-[9px] md:text-[10px] text-black/40 mt-0.5">{product.collection}</p>
                        <p className="text-[12px] md:text-[13px] font-medium text-black mt-1">
                          {product.currency} {product.price}
                        </p>
                      </div>
                    </div>
                  </Link>

                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="w-full mt-3 flex items-center justify-center gap-2 py-2.5 border border-black/10 text-[9px] md:text-[10px] tracking-[0.15em] uppercase font-medium text-black hover:bg-[#1a1308] hover:text-white hover:border-[#1a1308] transition-colors"
                  >
                    <ShoppingBag size={13} strokeWidth={1.2} />
                    Add to Cart
                  </button>
                </div>
              ))}
            </div>

            <div className="text-center mt-10 md:mt-16">
              <Link href="/collection">
                <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.15em] uppercase text-[#c9a96e] hover:text-[#8a6d3b] transition-colors cursor-pointer">
                  Continue Shopping
                </span>
              </Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
