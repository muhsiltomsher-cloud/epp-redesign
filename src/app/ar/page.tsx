"use client";

import { ChevronLeft, ChevronRight, Heart, Check, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useMemo, useRef, useState, useEffect, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products, categories } from "@/lib/data";
import ProductCardCompact from "./ProductCardCompact";
import { addToCart } from "@/lib/cart";
import { toggleWishlist, isInWishlist } from "@/lib/wishlist";

export default function HomeAr() {
  const perfumes = useMemo(
    () => products.filter((p) => p.collection === "Perfume Collection").slice(0, 12),
    []
  );
  const catLabelMap: Record<string, string> = {
    "Perfume Collection": "مجموعة العطور",
    "Accessories for Bakhoor": "إكسسوارات البخور",
    "Oil Perfumes": "عطور زيتية",
    "Oud & Dakhoon": "عود وبخور",
    "Perfume Gift Sets": "هدايا العطور",
    "Home Collection": "مجموعة المنزل",
  };
  const catItems = useMemo(
    () =>
      categories
        .filter((c) => c.name !== "Best Sellers")
        .slice(0, 6),
    []
  );

  const sigRef = useRef<HTMLDivElement>(null);
  const favRef = useRef<HTMLDivElement>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement>, dir: number, step = 3) => {
    if (!ref.current) return;
    const first = ref.current.firstElementChild as HTMLElement;
    const w = first ? first.offsetWidth + 12 : 220;
    ref.current.scrollBy({ left: dir * w * step, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col" dir="rtl">
      <Navbar />
      <main className="flex-1 pb-24 md:pb-0">
        {/* Hero */}
        <section className="pt-[72px] md:pt-[100px]">
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet="https://emiratespride.com/ae/wp-content/uploads/sites/10/2026/03/mobile-banner-en.webp"
            />
            <source
              media="(min-width: 768px)"
              srcSet="https://emiratespride.com/wp-content/uploads/2026/02/Desktop-Banner-ENG-scaled.jpg"
            />
            <img
              src="https://emiratespride.com/wp-content/uploads/2026/02/Desktop-Banner-ENG-scaled.jpg"
              alt="إمارات برايد"
              className="w-full h-auto"
            />
          </picture>
        </section>

        {/* Signature Fragrances */}
        <section className="py-10 md:py-14">
          <div className="epp-container">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-0.5">التشكيلة الكاملة</p>
                <h2 className="text-lg md:text-2xl font-serif uppercase tracking-wide">العطور المميزة</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scroll(sigRef, -1, 3)}
                  className="w-8 h-8 md:w-9 md:h-9 border border-gray-300 flex items-center justify-center hover:border-[var(--color-brand-gold)] transition-colors"
                  aria-label="السابق"
                >
                  <ChevronRight size={16} />
                </button>
                <button
                  onClick={() => scroll(sigRef, 1, 3)}
                  className="w-8 h-8 md:w-9 md:h-9 border border-gray-300 flex items-center justify-center hover:border-[var(--color-brand-gold)] transition-colors"
                  aria-label="التالي"
                >
                  <ChevronLeft size={16} />
                </button>
              </div>
            </div>
            <div
              ref={sigRef}
              className="flex overflow-x-auto hide-scrollbar gap-3 cursor-grab select-none"
            >
              {perfumes.map((p) => (
                <div key={p.id} className="flex-shrink-0 product-slide-card fade-in-up">
                  <ProductCardCompact product={p} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Favourites */}
        <section className="py-10 md:py-14">
          <div className="epp-container">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-1">تصفح</p>
                <h2 className="text-lg md:text-2xl font-serif uppercase tracking-wide">المفضلات</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scroll(favRef, -1, 2)}
                  className="w-8 h-8 md:w-9 md:h-9 border border-gray-300 flex items-center justify-center hover:border-[var(--color-brand-gold)] transition-colors"
                  aria-label="السابق"
                >
                  <ChevronRight size={16} />
                </button>
                <button
                  onClick={() => scroll(favRef, 1, 2)}
                  className="w-8 h-8 md:w-9 md:h-9 border border-gray-300 flex items-center justify-center hover:border-[var(--color-brand-gold)] transition-colors"
                  aria-label="التالي"
                >
                  <ChevronLeft size={16} />
                </button>
              </div>
            </div>
            <div
              ref={favRef}
              className="grid grid-flow-col md:grid-flow-row md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-cols-[160px] md:auto-cols-auto gap-3 md:gap-5 overflow-x-auto md:overflow-visible hide-scrollbar scroll-smooth snap-x md:snap-none snap-mandatory md:snap-start select-none"
            >
              {catItems.map((cat) => (
                <a key={cat.id} href="/collection">
                  <div className="h-full w-[160px] md:w-auto flex flex-col gap-2 md:gap-3 snap-start group cursor-pointer fade-in-up">
                    <div className="aspect-square overflow-hidden bg-[#f5f3ef]">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-center group-hover:text-[var(--color-brand-gold)] transition-colors">
                      {catLabelMap[cat.name] || cat.name}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Brand */}
        <section className="relative overflow-hidden">
          <div className="relative w-full aspect-[10/9] md:aspect-[21/6] animate-fade">
            <picture>
              <source
                media="(max-width: 767px)"
                srcSet="https://emiratespride.com/wp-content/uploads/2026/04/oud-hindi-malaki-2.webp"
              />
              <source
                media="(min-width: 768px)"
                srcSet="https://emiratespride.com/wp-content/uploads/2026/04/EPP.png"
              />
              <img
                src="https://emiratespride.com/wp-content/uploads/2026/04/EPP.png"
                alt="العلامة"
                className="w-full h-full object-cover object-center"
              />
            </picture>
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center epp-container">
              <p className="text-white/70 text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-3">إمارات برايد</p>
              <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-serif mb-4 max-w-xl leading-tight">
                العلامة
              </h2>
              <p className="text-white/80 text-sm md:text-base max-w-md mb-4">
                تراث، حرفية، وفخامة عصرية في كل ابتكار عطري.
              </p>
              <div className="flex gap-3">
                <a href="/collection" className="inline-block border border-white text-white px-7 md:px-9 py-3 text-[10px] uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-colors cursor-pointer">
                  اكتشف
                </a>
                <a href="/about-us" className="inline-block bg-[var(--color-brand-gold)] text-white px-7 md:px-9 py-3 text-[10px] uppercase tracking-[0.25em] hover:bg-[var(--color-brand-gold-light)] transition-colors cursor-pointer">
                  المزيد
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
