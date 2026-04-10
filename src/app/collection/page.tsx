"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Heart, SlidersHorizontal, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products } from "@/lib/data";
import { addToCart } from "@/lib/cart";
import { toggleWishlist, isInWishlist } from "@/lib/wishlist";

const CATEGORIES = ["All", "Oud & Dakhoon", "Gift Sets", "Perfume Collection"];
const SORT_OPTIONS = [
  { label: "Featured", value: "best" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A — Z", value: "name-asc" },
];

export default function Collection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("best");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

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

      <main className="flex-1 pb-24 md:pb-0">
        {/* Page header */}
        <div className="pt-[72px] md:pt-[106px]">
          <div className="border-b border-gray-100 py-6 md:py-10 text-center">
            <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-2">Emirates Pride</p>
            <h1 className="text-2xl md:text-3xl font-serif">Our Collection</h1>
          </div>
        </div>

        <div className="epp-container pb-16 md:pb-24">

          {/* Filter / Sort bar */}
          <div className="flex items-center justify-between py-5 border-b border-gray-100 mb-8">
            {/* Category tabs — desktop */}
            <div className="hidden md:flex items-center gap-6">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[10px] uppercase tracking-[0.2em] pb-0.5 transition-colors ${
                    activeCategory === cat
                      ? "text-black border-b border-black"
                      : "text-gray-400 hover:text-[var(--color-brand-gold)]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Mobile: filter button */}
            <button
              className="md:hidden flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] hover:text-[var(--color-brand-gold)] transition-colors"
              onClick={() => setFilterOpen(true)}
            >
              <SlidersHorizontal size={14} />
              Filter
            </button>

            {/* Right: count + sort */}
            <div className="flex items-center gap-5">
              <span className="hidden md:block text-[10px] text-gray-400 uppercase tracking-[0.15em]">
                {filteredProducts.length} Products
              </span>
              <div className="relative">
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-gray-600 hover:text-[var(--color-brand-gold)] transition-colors"
                >
                  Sort: {SORT_OPTIONS.find(o => o.value === sortBy)?.label}
                  <ChevronDown size={12} className={`transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
                </button>
                {isSortOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-100 shadow-lg z-20">
                    {SORT_OPTIONS.map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => { setSortBy(opt.value); setIsSortOpen(false); }}
                        className={`w-full text-left px-4 py-3 text-[10px] uppercase tracking-[0.15em] transition-colors ${
                          sortBy === opt.value
                            ? "text-[var(--color-brand-gold)] bg-[#fdf7ef]"
                            : "text-gray-500 hover:text-[var(--color-brand-gold)] hover:bg-[#fdf7ef]"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Product grid — 4 columns desktop, 2 mobile */}
          {filteredProducts.length === 0 ? (
            <div className="py-24 text-center text-gray-400 text-sm">No products found.</div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
              {filteredProducts.map(product => (
                <div key={product.id} className="fade-in-up">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Mobile filter drawer */}
      {filterOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-black/40 animate-fade" onClick={() => setFilterOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <span className="text-[11px] uppercase tracking-[0.2em] font-medium">Filter by Category</span>
              <button onClick={() => setFilterOpen(false)}><X size={18} /></button>
            </div>
            <div className="flex flex-col gap-1">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setFilterOpen(false); }}
                  className={`text-left py-3 border-b border-gray-100 text-[11px] uppercase tracking-[0.15em] transition-colors ${
                    activeCategory === cat ? "text-black font-medium" : "text-gray-500"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
  const [wishlisted, setWishlisted] = useState(false);
  useEffect(() => { setWishlisted(isInWishlist(product.id)); }, [product.id]);
  const [isHovered, setIsHovered] = useState(false);

  const handleWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted(toggleWishlist(product.id));
  }, [product.id]);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
  }, [product.id]);

  return (
    <div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] bg-[#f5f3ef] mb-3 overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <img
            src={isHovered && product.hoverImage ? product.hoverImage : product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>

        {product.badge && (
          <span className="absolute top-2 left-2 text-[8px] uppercase tracking-[0.15em] text-black bg-white/90 px-2 py-0.5">
            {product.badge === "NEW" ? "New In" : product.badge === "BESTSELLER" ? "Best Seller" : product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 w-8 h-8 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Wishlist"
        >
          <Heart size={14} className={wishlisted ? "fill-black text-black" : "text-black"} />
        </button>

        {/* Quick add */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 bg-black text-white text-[9px] uppercase tracking-[0.2em] py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        >
          Quick Add
        </button>
      </div>

      {/* Info */}
      <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-1">{product.collection}</p>
      <Link href={`/product/${product.id}`}>
        <h3 className="text-[11px] md:text-xs uppercase tracking-[0.08em] text-black hover:text-[var(--color-brand-gold)] transition-colors cursor-pointer mb-1 line-clamp-2 leading-snug">
          {product.name}
        </h3>
      </Link>
      <p className="text-[11px] md:text-xs font-semibold text-gray-800">{product.currency} {product.price}</p>
    </div>
  );
}
