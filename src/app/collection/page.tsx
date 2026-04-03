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
      <main className="flex-1 pt-14 md:pt-16">
        {/* Header */}
        <header className="py-8 md:py-12 px-4 md:px-10 lg:px-20 text-center border-b">
          <h1 className="text-2xl md:text-4xl font-serif mb-2">Our Collection</h1>
          <p className="text-sm text-gray-500">Discover our curated selection of luxury fragrances</p>
        </header>

        <section className="px-4 md:px-10 lg:px-20 py-6">
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            {/* Categories */}
            <div className="flex gap-4 md:gap-8 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs tracking-wider uppercase whitespace-nowrap pb-1 transition-colors ${
                    activeCategory === cat 
                      ? "text-black border-b border-black" 
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
                className="flex items-center gap-2 text-xs tracking-wider uppercase text-gray-500 hover:text-black"
              >
                {SORT_OPTIONS.find(o => o.value === sortBy)?.label}
                <ChevronDown size={14} className={`transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
              </button>
              {isSortOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border shadow-lg z-10">
                  {SORT_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      onClick={() => { setSortBy(option.value); setIsSortOpen(false); }}
                      className={`w-full text-left px-4 py-2 text-xs ${
                        sortBy === option.value ? "text-[#c9a96e] bg-gray-50" : "text-gray-600 hover:bg-gray-50"
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-20 text-center text-gray-500">
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
