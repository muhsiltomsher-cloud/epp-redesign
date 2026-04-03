"use client";

import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useState, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products, categories } from "@/lib/data";
import { addToCart } from "@/lib/cart";
import { toggleWishlist, isInWishlist } from "@/lib/wishlist";

export default function Home() {
  const featuredProducts = products.slice(0, 8);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center bg-[#1a1308]">
          <img
            src="https://emiratespride.com/wp-content/uploads/2026/02/Desktop-Banner-ENG-scaled.jpg"
            alt="Emirates Pride"
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif mb-4">Emirates Pride</h1>
            <p className="text-sm md:text-base font-light mb-6 max-w-md mx-auto">Luxury fragrances crafted with excellence</p>
            <Link href="/collection">
              <span className="inline-block bg-[#c9a96e] text-white px-8 py-3 text-xs tracking-widest uppercase hover:bg-[#b8954f] transition-colors cursor-pointer">
                Shop Now
              </span>
            </Link>
          </div>
        </section>

        {/* Categories */}
        <section className="py-12 md:py-16 px-4 md:px-10 lg:px-20">
          <h2 className="text-center text-2xl md:text-3xl font-serif mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link key={cat.name} href="/collection">
                <div className="group cursor-pointer">
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-3">
                    <img 
                      src={cat.image} 
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute inset-0 flex items-end p-4">
                      <h3 className="text-white text-sm font-medium">{cat.name}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-12 md:py-16 px-4 md:px-10 lg:px-20 bg-[#fafafa]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-serif">Featured Products</h2>
            <Link href="/collection">
              <span className="text-xs tracking-widest uppercase text-[#c9a96e] hover:underline cursor-pointer">
                View All
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Simple Banner */}
        <section className="py-16 md:py-24 px-4 md:px-10 lg:px-20 bg-[#1a1308] text-white text-center">
          <h2 className="text-2xl md:text-4xl font-serif mb-4">Free Shipping Worldwide</h2>
          <p className="text-sm font-light mb-6">On all orders above AED 1500</p>
          <Link href="/collection">
            <span className="inline-block border border-white px-8 py-3 text-xs tracking-widest uppercase hover:bg-white hover:text-[#1a1308] transition-colors cursor-pointer">
              Start Shopping
            </span>
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  const [wishlisted, setWishlisted] = useState(() => isInWishlist(product.id));
  const [addedToCart, setAddedToCart] = useState(false);

  const handleWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted(toggleWishlist(product.id));
  }, [product.id]);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  }, [product.id]);

  return (
    <div className="group">
      <div className="relative aspect-[3/4] bg-gray-100 mb-3 overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        </Link>
        
        {product.badge && (
          <span className="absolute top-2 left-2 bg-[#c9a96e] text-white text-[10px] px-2 py-1 uppercase">
            {product.badge}
          </span>
        )}

        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Heart size={14} className={wishlisted ? "fill-red-500 text-red-500" : "text-gray-600"} />
        </button>

        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform md:opacity-0 md:group-hover:opacity-100"
        >
          <ShoppingBag size={14} className={addedToCart ? "text-[#c9a96e]" : "text-gray-600"} />
        </button>
      </div>
      
      <Link href={`/product/${product.id}`}>
        <h3 className="text-sm font-medium mb-1 hover:text-[#c9a96e] transition-colors cursor-pointer">{product.name}</h3>
      </Link>
      <p className="text-xs text-gray-500 mb-1">{product.collection}</p>
      <p className="text-sm font-medium">{product.currency} {product.price}</p>
    </div>
  );
}
