"use client";

import { Heart, ShoppingBag, Plus, Pause, Play, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { useState, useCallback, useRef, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products, categories } from "@/lib/data";
import { addToCart } from "@/lib/cart";
import { toggleWishlist, isInWishlist } from "@/lib/wishlist";

export default function Home() {
  const carouselProducts = products.slice(0, 8);
  const editorialProducts = products.slice(0, 2);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  // Category carousel - infinite scroll
  const carouselRef = useRef<HTMLDivElement>(null);
  const productScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    let frame: number;
    let pos = 0;
    const speed = 0.5;
    const step = () => {
      pos += speed;
      if (pos >= el.scrollWidth / 2) pos = 0;
      el.scrollLeft = pos;
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, []);

  const catItems = [...categories.slice(0, 6), ...categories.slice(0, 6)]; // duplicate for infinite loop

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1">

        {/* 1. HERO — 16:7 banner, sits below fixed navbar */}
        <section className="relative pt-[104px] md:pt-[106px]">
          <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/7" }}>
            <img
              src="https://emiratespride.com/wp-content/uploads/2026/02/Desktop-Banner-ENG-scaled.jpg"
              alt="Emirates Pride"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/25" />

            {/* Video controls — bottom-left */}
            <div className="absolute bottom-5 left-5 z-20 flex items-center gap-3">
              <button
                onClick={() => setIsVideoPaused(!isVideoPaused)}
                className="w-7 h-7 flex items-center justify-center text-white hover:text-white/70 transition-colors"
              >
                {isVideoPaused ? <Play size={14} /> : <Pause size={14} />}
              </button>
              <button
                onClick={() => setIsVideoMuted(!isVideoMuted)}
                className="w-7 h-7 flex items-center justify-center text-white hover:text-white/70 transition-colors"
              >
                {isVideoMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>

            {/* Hero text — centered overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 md:pb-14 text-center px-6 z-10">
              <p className="text-white/80 text-[9px] md:text-[10px] uppercase tracking-[0.35em] mb-3">
                Crafting Luxury with an Imaginative Spirit
              </p>
              <h1 className="text-white text-2xl md:text-4xl lg:text-5xl font-serif mb-6 max-w-xl leading-tight">
                The Signature Collection
              </h1>
              <div className="flex items-center gap-6 md:gap-8">
                <Link href="/collection">
                  <span className="text-white text-[10px] md:text-[11px] uppercase tracking-[0.25em] border-b border-white/60 pb-0.5 hover:border-white transition-colors cursor-pointer">
                    The Collection
                  </span>
                </Link>
                <span className="text-white/40 text-xs">|</span>
                <Link href="/collection">
                  <span className="text-white text-[10px] md:text-[11px] uppercase tracking-[0.25em] border-b border-white/60 pb-0.5 hover:border-white transition-colors cursor-pointer">
                    The Campaign
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 2. PRODUCT CAROUSEL — "THE FULL RANGE" horizontal scroll */}
        <section className="py-12 md:py-16">
          <div className="px-6 md:px-10 lg:px-16 mb-8">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gray-500 mb-1 text-center">The Full Range</p>
            <h2 className="text-xl md:text-2xl font-serif text-center uppercase tracking-wide">
              Signature Fragrances
            </h2>
          </div>
          <div
            ref={productScrollRef}
            className="flex gap-0 overflow-x-auto hide-scrollbar px-6 md:px-10 lg:px-16 pb-2"
          >
            {carouselProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[200px] md:w-[220px] mr-4 md:mr-6">
                <ProductCarouselCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* 3. EDITORIAL BLOCK 1 — text left, dual-image right (hover swap) */}
        <section className="grid md:grid-cols-2 min-h-[500px] md:min-h-[600px]">
          {/* Left: text content */}
          <div className="flex items-center justify-center bg-[#f5f3ef] px-8 md:px-14 lg:px-20 py-16 md:py-0 order-2 md:order-1">
            <div className="max-w-xs">
              <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-4">Daily Rituals</p>
              <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-wide mb-6 leading-snug">
                Arabian Bath &amp; Body
              </h2>
              <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500 mb-8 leading-relaxed">
                Everyday gestures, beautifully considered
              </p>
              <Link href="/collection">
                <span className="inline-block border border-black text-black px-8 py-3 text-[10px] uppercase tracking-[0.25em] hover:bg-black hover:text-white transition-colors cursor-pointer">
                  Shop Now
                </span>
              </Link>
            </div>
          </div>
          {/* Right: dual image hover swap */}
          <div className="relative order-1 md:order-2 aspect-square md:aspect-auto overflow-hidden group">
            <img
              src="https://emiratespride.com/wp-content/uploads/2026/01/Mostakbal-Lifestyle-scaled-1.webp"
              alt="Bath and Body"
              className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
            />
            <img
              src="https://emiratespride.com/wp-content/uploads/2026/02/Desktop-Banner-ENG-scaled.jpg"
              alt="Bath and Body alternate"
              className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </div>
        </section>

        {/* 4. EDITORIAL BLOCK 2 — dual-image left (hover swap), text right */}
        <section className="grid md:grid-cols-2 min-h-[500px] md:min-h-[600px]">
          {/* Left: dual image hover swap */}
          <div className="relative aspect-square md:aspect-auto overflow-hidden group">
            <img
              src="https://emiratespride.com/wp-content/uploads/2026/01/Future-Oud-scaled-1.webp"
              alt="Art of Living"
              className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
            />
            <img
              src="https://emiratespride.com/wp-content/uploads/2026/02/Desktop-Banner-ENG-scaled.jpg"
              alt="Art of Living alternate"
              className="w-full h-full object-cover absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </div>
          {/* Right: text content */}
          <div className="flex items-center justify-center bg-white px-8 md:px-14 lg:px-20 py-16 md:py-0">
            <div className="max-w-xs">
              <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-4">Everyday Gestures</p>
              <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-wide mb-6 leading-snug">
                The Art of Living Arabian
              </h2>
              <p className="text-[11px] uppercase tracking-[0.25em] text-gray-500 mb-8 leading-relaxed">
                Beautifully considered
              </p>
              <Link href="/collection">
                <span className="inline-block border border-black text-black px-8 py-3 text-[10px] uppercase tracking-[0.25em] hover:bg-black hover:text-white transition-colors cursor-pointer">
                  Shop Now
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* 5. THE FAVOURITES — infinite auto-scroll category carousel */}
        <section className="py-12 md:py-16 overflow-hidden">
          <div className="px-6 md:px-10 lg:px-16 mb-8 text-center">
            <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-1">Browse</p>
            <h2 className="text-xl md:text-2xl font-serif uppercase tracking-wide">The Favourites</h2>
          </div>
          <div
            ref={carouselRef}
            className="flex gap-0 overflow-x-hidden"
            style={{ userSelect: "none" }}
          >
            {catItems.map((cat, i) => (
              <Link key={`${cat.id}-${i}`} href="/collection">
                <div className="flex-shrink-0 w-[220px] md:w-[260px] mr-3 md:mr-4 group cursor-pointer">
                  <div className="aspect-square overflow-hidden bg-[#f5f3ef]">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-center mt-3 group-hover:text-[#c9a96e] transition-colors">
                    {cat.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 6. PROMOTIONAL STRIP — wide landscape image with offer text + CTA overlay */}
        <section className="relative overflow-hidden">
          <div className="aspect-[16/5] md:aspect-[21/6]">
            <img
              src="https://emiratespride.com/wp-content/uploads/2026/02/Desktop-Banner-ENG-scaled.jpg"
              alt="Exclusive offer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="absolute inset-0 flex flex-col items-start justify-center px-8 md:px-16 lg:px-24">
            <p className="text-white/80 text-[10px] uppercase tracking-[0.35em] mb-2">A gift for you</p>
            <p className="text-white text-sm md:text-base max-w-md mb-5 leading-relaxed">
              Receive a complimentary miniature with all orders above 500 AED
            </p>
            <Link href="/collection">
              <span className="inline-block border border-white text-white px-8 py-3 text-[10px] uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-colors cursor-pointer">
                Shop Now
              </span>
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

// Product card used in the horizontal scrolling carousel (matches AdP style exactly)
function ProductCarouselCard({ product }: { product: any }) {
  const [wishlisted, setWishlisted] = useState(() => isInWishlist(product.id));

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
    <div className="group">
      {/* Image container — natural 3:4 portrait ratio for perfume bottles */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f3ef] mb-3">
        <Link href={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {/* Badge — "New In" or "Best seller" top-left, exactly like AdP */}
        {product.badge && (
          <span className="absolute top-2 left-2 text-[9px] uppercase tracking-[0.15em] text-black font-medium">
            {product.badge === "NEW" ? "New In" : product.badge === "BESTSELLER" ? "Best seller" : product.badge}
          </span>
        )}
        {/* Wishlist icon — top right, hidden until hover */}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart size={16} className={wishlisted ? "fill-black text-black" : "text-black"} />
        </button>
        {/* Quick add — bottom, appears on hover */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 bg-white text-black text-[9px] uppercase tracking-[0.2em] py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        >
          Quick Add
        </button>
      </div>
      {/* Below image: type label small gray, then product name */}
      <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-0.5">
        {product.collection || "Eau de Parfum"}
      </p>
      <Link href={`/product/${product.id}`}>
        <p className="text-[11px] uppercase tracking-[0.1em] text-black hover:text-gray-500 transition-colors cursor-pointer leading-tight">
          {product.name}
        </p>
      </Link>
    </div>
  );
}
