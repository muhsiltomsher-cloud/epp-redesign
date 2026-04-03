"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ChevronDown, Heart, ShoppingBag } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products } from "@/lib/data";
import { addToCart } from "@/lib/cart";
import { toggleWishlist, isInWishlist } from "@/lib/wishlist";

const CATEGORIES = ["All", "Oud & Dakhoon", "Gift Sets", "Perfume Collection"];
const SORT_OPTIONS = [
  { label: "Best Sellers", value: "best" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A - Z", value: "name-asc" },
];

export default function Collection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("best");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filteredProducts = (activeCategory === "All" 
    ? products 
    : products.filter(p => p.collection === activeCategory)
  ).sort((a, b) => {
    switch (sortBy) {
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "name-asc": return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[120px] md:pt-[140px]">
        {/* Header */}
        <header className="py-10 md:py-14 px-4 md:px-8 lg:px-16 xl:px-24 text-center border-b">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">Discover</p>
          <h1 className="text-2xl md:text-4xl font-serif mb-3">Our Collection</h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto">Explore our curated selection of luxury fragrances crafted with the finest ingredients</p>
        </header>

        <section className="px-4 md:px-8 lg:px-16 xl:px-24 py-8 md:py-10">
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b">
            {/* Categories */}
            <div className="flex gap-6 md:gap-10 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs tracking-[0.15em] uppercase whitespace-nowrap pb-1 transition-colors ${
                    activeCategory === cat 
                      ? "text-black font-medium border-b-2 border-[#c9a96e]" 
                      : "text-gray-400 hover:text-black"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 text-xs tracking-[0.15em] uppercase text-gray-600 hover:text-black"
              >
                {SORT_OPTIONS.find(o => o.value === sortBy)?.label}
                <ChevronDown size={14} className={`transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
              </button>
              {isSortOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white border shadow-lg z-10">
                  {SORT_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      onClick={() => { setSortBy(option.value); setIsSortOpen(false); }}
                      className={`w-full text-left px-5 py-3 text-xs tracking-wider ${
                        sortBy === option.value ? "text-[#c9a96e] bg-gray-50 font-medium" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-24 text-center text-gray-500">
              No products found in this category.
            </div>
          )}
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
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
          />
        </Link>
        
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#c9a96e] text-white text-[10px] px-2.5 py-1 uppercase tracking-wider">
            {product.badge}
          </span>
        )}

        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Heart size={16} className={wishlisted ? "fill-red-500 text-red-500" : "text-gray-600"} />
        </button>

        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform md:opacity-0 md:group-hover:opacity-100"
        >
          <ShoppingBag size={16} className={addedToCart ? "text-[#c9a96e]" : "text-gray-600"} />
        </button>
      </div>
      
      <Link href={`/product/${product.id}`}>
        <h3 className="text-sm md:text-base font-medium mb-1 hover:text-[#c9a96e] transition-colors cursor-pointer">{product.name}</h3>
      </Link>
      <p className="text-xs text-gray-500 mb-1 uppercase tracking-wider">{product.collection}</p>
      <p className="text-sm font-medium">{product.currency} {product.price}</p>
    </div>
  );
}
