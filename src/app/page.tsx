"use client";

import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products, categories } from "@/lib/data";
import { addToCart } from "@/lib/cart";
import { toggleWishlist, isInWishlist } from "@/lib/wishlist";

export default function Home() {
  const carouselProducts = products.filter((p) => p.collection === "Perfume Collection").slice(0, 12);

  // Product slider — arrow buttons
  const sliderRef = useRef<HTMLDivElement>(null);

  const slideLeft = () => {
    if (!sliderRef.current) return;
    const first = sliderRef.current.firstElementChild as HTMLElement;
    const cardW = first ? first.offsetWidth + 12 : 220;
    sliderRef.current.scrollBy({ left: -cardW * 3, behavior: "smooth" });
  };
  const slideRight = () => {
    if (!sliderRef.current) return;
    const first = sliderRef.current.firstElementChild as HTMLElement;
    const cardW = first ? first.offsetWidth + 12 : 220;
    sliderRef.current.scrollBy({ left: cardW * 3, behavior: "smooth" });
  };

  // Mouse drag on slider
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragScrollLeft = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    isDragging.current = true;
    dragStartX.current = e.pageX - sliderRef.current.offsetLeft;
    dragScrollLeft.current = sliderRef.current.scrollLeft;
    sliderRef.current.style.cursor = "grabbing";
    sliderRef.current.style.userSelect = "none";
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - dragStartX.current) * 1.5;
    sliderRef.current.scrollLeft = dragScrollLeft.current - walk;
  };
  const onMouseUp = () => {
    isDragging.current = false;
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grab";
      sliderRef.current.style.userSelect = "";
    }
  };

  // Favourites slider
  const catRef = useRef<HTMLDivElement>(null);
  const catItems = useMemo(() => {
    const base = categories.filter((c) => c.name !== "Best Sellers");
    const perfume = base.find((c) => c.name === "Perfume Collection");
    const rest = base.filter((c) => c.name !== "Perfume Collection");
    const ordered = perfume ? [perfume, ...rest] : base;
    const extra = {
      id: "home-collection",
      name: "Home Collection",
      count: 0,
      image: "https://emiratespride.com/wp-content/uploads/2025/07/EP_villa_2840-copy.webp",
    };
    const withExtra = ordered.find((c) => c.name === extra.name) ? ordered : [...ordered, extra];
    if (withExtra.length >= 6) return withExtra;
    const filled = [...withExtra];
    let idx = 0;
    while (filled.length < 6 && withExtra.length > 0) {
      filled.push(withExtra[idx % withExtra.length]);
      idx++;
    }
    return filled;
  }, []);

  const slideCatsLeft = () => {
    if (!catRef.current) return;
    const first = catRef.current.firstElementChild as HTMLElement;
    const cardW = first ? first.offsetWidth + 12 : 180;
    catRef.current.scrollBy({ left: -cardW * 2, behavior: "smooth" });
  };
  const slideCatsRight = () => {
    if (!catRef.current) return;
    const first = catRef.current.firstElementChild as HTMLElement;
    const cardW = first ? first.offsetWidth + 12 : 180;
    catRef.current.scrollBy({ left: cardW * 2, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 pb-24 md:pb-0">

        {/* 1. HERO — mobile/desktop specific images */}
        <section className="pt-[58px] !md:pt-[50px]">
          <div className="w-full">
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
                alt="Emirates Pride"
                className="w-full h-auto block"
              />
            </picture>
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
                <button onClick={slideLeft} className="w-8 h-8 md:w-9 md:h-9 border border-gray-300 flex items-center justify-center hover:border-[var(--color-brand-gold)] transition-colors" aria-label="Previous">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={slideRight} className="w-8 h-8 md:w-9 md:h-9 border border-gray-300 flex items-center justify-center hover:border-[var(--color-brand-gold)] transition-colors" aria-label="Next">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            {/* Slider — mouse drag + arrow scroll */}
            <div
              ref={sliderRef}
              className="flex overflow-x-auto hide-scrollbar scroll-smooth gap-3 cursor-grab select-none"
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseUp}
            >
              {carouselProducts.map((product) => (
                <div key={product.id} className="flex-shrink-0 product-slide-card fade-in-up">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. THE FAVOURITES — grid slider */}
        <section className="py-10 md:py-14">
          <div className="epp-container">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-1">Browse</p>
                <h2 className="text-lg md:text-2xl font-serif uppercase tracking-wide">The Favourites</h2>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={slideCatsLeft} className="w-8 h-8 md:w-9 md:h-9 border border-gray-300 flex items-center justify-center hover:border-[var(--color-brand-gold)] transition-colors" aria-label="Previous">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={slideCatsRight} className="w-8 h-8 md:w-9 md:h-9 border border-gray-300 flex items-center justify-center hover:border-[var(--color-brand-gold)] transition-colors" aria-label="Next">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            <div
              ref={catRef}
              className="grid grid-flow-col md:grid-flow-row md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 auto-cols-[160px] md:auto-cols-auto gap-3 md:gap-5 overflow-x-auto md:overflow-visible hide-scrollbar scroll-smooth snap-x md:snap-none snap-mandatory md:snap-start select-none"
            >
              {catItems.map((cat) => (
                <Link key={cat.id} href="/collection">
                  <div className="h-full w-[160px] md:w-auto flex flex-col gap-2 md:gap-3 snap-start group cursor-pointer fade-in-up">
                    <div className="aspect-square overflow-hidden bg-[#f5f3ef]">
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <p className="text-[10px] md:text-[11px] uppercase tracking-[0.15em] text-center group-hover:text-[#c9a96e] transition-colors">
                      {cat.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* 4. EDITORIAL BLOCK 1 — no gap, full-bleed columns inside container */}
        <section className="py-10 md:py-14">
          <div className="epp-container">
            <div className="flex flex-col md:grid md:grid-cols-2 items-stretch">
              <div className="order-2 md:order-1 bg-[#f5f3ef] flex flex-col justify-center px-8 md:px-16 py-16 md:py-24">
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#c9a96e] mb-3">The Collection</p>
                <h2 className="text-2xl md:text-4xl font-serif mb-5 leading-snug text-[#1a1308]">
                  Natural Oud
                </h2>
                <p className="text-xs text-gray-500 leading-relaxed mb-3 max-w-sm">
                  A celebration of the world's most prized agarwoods — rare, refined, and reserved for true connoisseurs. Rooted in centuries of tradition and perfected through modern craftsmanship, each piece in this collection is a pure expression of natural Indian oud at its finest.
                </p>
                <p className="text-xs text-gray-500 leading-relaxed mb-8 max-w-sm">
                  Unmatched in quality, authenticity, and sophistication — this is oud luxury in its purest form.
                </p>
                <Link href="/collection">
                  <span className="inline-block bg-[#1a1308] text-white text-[10px] uppercase tracking-[0.2em] px-7 py-3 hover:bg-[#c9a96e] transition-colors cursor-pointer w-fit">
                    Explore Collection
                  </span>
                </Link>
              </div>
              <div className="relative aspect-[4/3] md:min-h-[520px] overflow-hidden order-1 md:order-2">
                <img
                  src="https://emiratespride.com/wp-content/uploads/2026/04/oud-hindi-malaki.webp"
                  alt="Natural Oud"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 5. BLOG — latest articles */}
        <section className="py-12 md:py-16 bg-[#f5f3ef]">
          <div className="epp-container">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-1">Stories</p>
                <h2 className="text-lg md:text-2xl font-serif uppercase tracking-wide">From the Journal</h2>
              </div>
              <a
                href="https://emiratespride.com/blogs/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] uppercase tracking-[0.2em] border-b border-black pb-0.5 hover:text-[var(--color-brand-gold)] hover:border-[var(--color-brand-gold)] transition-colors"
              >
                View All
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
              {blogPosts.map(post => (
                <a
                  key={post.slug}
                  href={post.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group cursor-pointer"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-white mb-4">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-gray-400 mb-2">{post.category}</p>
                  <h3 className="text-sm md:text-base font-serif mb-2 group-hover:text-[var(--color-brand-gold)] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em]">{post.date}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* 6. THE BRAND */}
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
                alt="The Brand"
                className="w-full h-full object-cover object-center"
              />
            </picture>
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center epp-container">
              <p className="text-white/70 text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-3">Emirates Pride</p>
              <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-serif mb-6 max-w-xl leading-tight">
                The Brand
              </h2>
              <p className="text-white/80 text-sm md:text-base max-w-md mb-4">
                Heritage, craftsmanship, and modern luxury—shaped in every bottle we create.
              </p>
              <div className="flex gap-3">
                <Link href="/collection">
                  <span className="inline-block border border-white text-white px-7 md:px-9 py-3 text-[10px] uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-colors cursor-pointer">
                    Discover
                  </span>
                </Link>
                <Link href="/about-us">
                  <span className="inline-block bg-[var(--color-brand-gold)] text-white px-7 md:px-9 py-3 text-[10px] uppercase tracking-[0.25em] hover:bg-[var(--color-brand-gold-light)] transition-colors cursor-pointer">
                    Learn More
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

const blogPosts = [
  {
    slug: "mens-fragrance",
    title: "3 Steps to Choosing the Best Men's Fragrance",
    category: "Fragrance",
    date: "April 2024",
    image: "https://emiratespride.com/wp-content/uploads/2021/04/Untitled-6-25.webp",
    href: "https://emiratespride.com/blog/3-steps-to-choosing-the-best-mens-fragrance-your-guide-to-the-world-of-luxury-scents/",
  },
  {
    slug: "fathers-day",
    title: "Celebrating Father's Day with a Fragranced Reflection of Gift & Bond",
    category: "Lifestyle",
    date: "June 2024",
    image: "https://emiratespride.com/wp-content/uploads/2024/06/Website-Images-Reflection-03-1400x1753.webp",
    href: "https://emiratespride.com/blog/celebrating-fathers-day-with-a-fragranced-reflection-of-gift-bond/",
  },
  {
    slug: "fragrance-report",
    title: "The 2024 Fragrance Report",
    category: "Culture",
    date: "May 2024",
    image: "https://emiratespride.com/wp-content/uploads/2024/05/peaceful-life.webp",
    href: "https://emiratespride.com/blog/the-2024-fragrance-report/",
  },
];

function ProductCard({ product }: { product: any }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  useEffect(() => { setWishlisted(isInWishlist(product.id)); }, [product.id]);

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
            {product.badge === "NEW" ? "New In" : product.badge === "BESTSELLER" ? "Best Seller" : product.badge}
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
          Quick Add
        </button>
      </div>
      <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-1 truncate">
        {product.collection || "Eau de Parfum"}
      </p>
      <Link href={`/product/${product.id}`}>
        <p className="text-[11px] uppercase tracking-[0.08em] text-black hover:text-[var(--color-brand-gold)] transition-colors cursor-pointer leading-tight line-clamp-2 mb-1">
          {product.name}
        </p>
      </Link>
      <p className="text-[11px] text-gray-600">{product.currency} {product.price}</p>
    </div>
  );
}
