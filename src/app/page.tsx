"use client";

import { Heart, ChevronLeft, ChevronRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { useState, useCallback, useRef, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products, categories } from "@/lib/data";
import { addToCart } from "@/lib/cart";
import { toggleWishlist, isInWishlist } from "@/lib/wishlist";

export default function Home() {
  const carouselProducts = products.slice(0, 12);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  // Product slider
  const sliderRef = useRef<HTMLDivElement>(null);

  const slideLeft = () => {
    if (!sliderRef.current) return;
    const card = sliderRef.current.querySelector("[data-card]") as HTMLElement;
    const cardW = card ? card.offsetWidth + 12 : 200;
    sliderRef.current.scrollBy({ left: -cardW * 3, behavior: "smooth" });
  };
  const slideRight = () => {
    if (!sliderRef.current) return;
    const card = sliderRef.current.querySelector("[data-card]") as HTMLElement;
    const cardW = card ? card.offsetWidth + 12 : 200;
    sliderRef.current.scrollBy({ left: cardW * 3, behavior: "smooth" });
  };

  // Category carousel - infinite auto-scroll
  const catRef = useRef<HTMLDivElement>(null);
  const catItems = [...categories.slice(0, 6), ...categories.slice(0, 6)];

  useEffect(() => {
    const el = catRef.current;
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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1">

        {/* 1. HERO — 4:3 mobile / 16:7 desktop, below fixed navbar */}
        <section className="pt-[104px] md:pt-[106px]">
          <div className="relative w-full overflow-hidden aspect-[4/3] md:aspect-[16/7]">
            <img
              src="https://emiratespride.com/wp-content/uploads/2026/02/Desktop-Banner-ENG-scaled.jpg"
              alt="Emirates Pride"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/20" />
            {/* video controls bottom-left */}
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
              <button
                onClick={() => setIsVideoPaused(!isVideoPaused)}
                className="w-7 h-7 flex items-center justify-center text-white hover:text-white/70 transition-colors"
              >
                {isVideoPaused ? <Play size={13} /> : <Pause size={13} />}
              </button>
              <button
                onClick={() => setIsVideoMuted(!isVideoMuted)}
                className="w-7 h-7 flex items-center justify-center text-white hover:text-white/70 transition-colors"
              >
                {isVideoMuted ? <VolumeX size={13} /> : <Volume2 size={13} />}
              </button>
            </div>
          </div>
        </section>

        {/* 2. SIGNATURE FRAGRANCES — 6 visible at once, prev/next arrows */}
        <section className="py-10 md:py-14">
          {/* Header + arrows — same container as slider */}
          <div className="epp-container">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-0.5">The Full Range</p>
                <h2 className="text-lg md:text-2xl font-serif uppercase tracking-wide">Signature Fragrances</h2>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={slideLeft} className="w-8 h-8 md:w-9 md:h-9 border border-gray-300 flex items-center justify-center hover:border-black transition-colors" aria-label="Previous">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={slideRight} className="w-8 h-8 md:w-9 md:h-9 border border-gray-300 flex items-center justify-center hover:border-black transition-colors" aria-label="Next">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            {/* Slider — overflow visible outside container to allow scroll, width anchored to container */}
            <div ref={sliderRef} className="flex overflow-x-auto hide-scrollbar scroll-smooth snap-x snap-mandatory gap-3">
              {carouselProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0 snap-start product-slide-card">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. EDITORIAL BLOCK 1 — text left, image right */}
        <section className="flex flex-col md:grid md:grid-cols-2 min-h-[400px] md:min-h-[560px]">
          <div className="flex items-center justify-center bg-[#f5f3ef] epp-container py-12 md:py-0 order-2 md:order-1">
            <div className="max-w-xs w-full">
              <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-3">Daily Rituals</p>
              <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-wide mb-5 leading-snug">
                Arabian Bath &amp; Body
              </h2>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-7 leading-relaxed">
                Everyday gestures, beautifully considered
              </p>
              <Link href="/collection">
                <span className="inline-block border border-black text-black px-7 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors cursor-pointer">
                  Shop Now
                </span>
              </Link>
            </div>
          </div>
          <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden group order-1 md:order-2">
            <img
              src="https://emiratespride.com/wp-content/uploads/2026/01/Mostakbal-Lifestyle-scaled-1.webp"
              alt="Bath and Body"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            />
            <img
              src="https://emiratespride.com/wp-content/uploads/2026/02/Desktop-Banner-ENG-scaled.jpg"
              alt="Bath and Body alternate"
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </div>
        </section>

        {/* 4. EDITORIAL BLOCK 2 — image left, text right */}
        <section className="flex flex-col md:grid md:grid-cols-2 min-h-[400px] md:min-h-[560px]">
          <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden group order-1">
            <img
              src="https://emiratespride.com/wp-content/uploads/2026/01/Future-Oud-scaled-1.webp"
              alt="Art of Living"
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
            />
            <img
              src="https://emiratespride.com/wp-content/uploads/2026/02/Desktop-Banner-ENG-scaled.jpg"
              alt="Art of Living alternate"
              className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            />
          </div>
          <div className="flex items-center justify-center bg-white epp-container py-12 md:py-0 order-2">
            <div className="max-w-xs w-full">
              <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-3">Everyday Gestures</p>
              <h2 className="text-2xl md:text-3xl font-serif uppercase tracking-wide mb-5 leading-snug">
                The Art of Living Arabian
              </h2>
              <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500 mb-7 leading-relaxed">
                Beautifully considered
              </p>
              <Link href="/collection">
                <span className="inline-block border border-black text-black px-7 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-black hover:text-white transition-colors cursor-pointer">
                  Shop Now
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* 5. THE FAVOURITES — infinite auto-scroll category carousel */}
        <section className="py-10 md:py-14 overflow-hidden">
          <div className="epp-container mb-6 text-center">
            <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-1">Browse</p>
            <h2 className="text-lg md:text-2xl font-serif uppercase tracking-wide">The Favourites</h2>
          </div>
          <div
            ref={catRef}
            className="flex overflow-x-hidden"
            style={{ userSelect: "none" }}
          >
            {catItems.map((cat, i) => (
              <Link key={`${cat.id}-${i}`} href="/collection">
                <div className="flex-shrink-0 w-[150px] md:w-[220px] mr-2 md:mr-3 group cursor-pointer">
                  <div className="aspect-square overflow-hidden bg-[#f5f3ef]">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-center mt-2 group-hover:text-[#c9a96e] transition-colors">
                    {cat.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 6. PROMOTIONAL STRIP */}
        <section className="relative overflow-hidden">
          <div className="relative w-full aspect-[16/6] md:aspect-[21/6]">
            <img
              src="https://emiratespride.com/wp-content/uploads/2026/02/Desktop-Banner-ENG-scaled.jpg"
              alt="Exclusive offer"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-start justify-center epp-container">
              <p className="text-white/80 text-[9px] md:text-[10px] uppercase tracking-[0.35em] mb-2">A gift for you</p>
              <p className="text-white text-sm md:text-base max-w-xs md:max-w-md mb-5 leading-relaxed">
                Receive a complimentary miniature with all orders above 500 AED
              </p>
              <Link href="/collection">
                <span className="inline-block border border-white text-white px-6 md:px-8 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors cursor-pointer">
                  Shop Now
                </span>
              </Link>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

function ProductCard({ product }: { product: any }) {
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
      {/* 3:4 portrait image, fills fully */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f3ef] mb-2">
        <Link href={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        {product.badge && (
          <span className="absolute top-2 left-2 text-[8px] uppercase tracking-[0.12em] text-black font-medium bg-white/80 px-1.5 py-0.5">
            {product.badge === "NEW" ? "New In" : product.badge === "BESTSELLER" ? "Best seller" : product.badge}
          </span>
        )}
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          aria-label="Wishlist"
        >
          <Heart size={14} className={wishlisted ? "fill-black text-black" : "text-black"} />
        </button>
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 bg-white text-black text-[8px] uppercase tracking-[0.15em] py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        >
          Quick Add
        </button>
      </div>
      <p className="text-[8px] uppercase tracking-[0.15em] text-gray-400 mb-0.5 truncate">
        {product.collection || "Eau de Parfum"}
      </p>
      <Link href={`/product/${product.id}`}>
        <p className="text-[10px] md:text-[11px] uppercase tracking-[0.08em] text-black hover:text-gray-500 transition-colors cursor-pointer leading-tight line-clamp-2">
          {product.name}
        </p>
      </Link>
    </div>
  );
}
