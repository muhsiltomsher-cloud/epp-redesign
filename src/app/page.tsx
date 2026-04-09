"use client";

import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useCallback, useRef, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products, categories } from "@/lib/data";
import { addToCart } from "@/lib/cart";
import { toggleWishlist, isInWishlist } from "@/lib/wishlist";

export default function Home() {
  const carouselProducts = products.slice(0, 12);

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
    if (sliderRef.current) sliderRef.current.style.cursor = "grab";
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

        {/* 1. HERO — natural image height, no forced ratio */}
        <section className="pt-[104px] md:pt-[106px]">
          <div className="w-full">
            <img
              src="https://emiratespride.com/wp-content/uploads/2026/02/Desktop-Banner-ENG-scaled.jpg"
              alt="Emirates Pride"
              className="w-full h-auto block"
            />
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
                <div key={product.id} className="flex-shrink-0 product-slide-card">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. EDITORIAL BLOCK 1 — contained, text left, image right */}
        <section className="py-10 md:py-14">
          <div className="epp-container">
            <div className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10 items-stretch">
              <div className="order-2 md:order-1 bg-[#f5f3ef] flex flex-col justify-center px-8 md:px-10 py-10 md:py-14">
                <p className="text-[10px] uppercase tracking-[0.35em] text-[#c9a96e] mb-3">Daily Rituals</p>
                <h2 className="text-2xl md:text-3xl font-serif mb-4 leading-snug text-[#1a1308]">
                  Arabian Bath &amp; Body
                </h2>
                <p className="text-xs text-gray-500 leading-relaxed mb-7 max-w-xs">
                  Immerse yourself in the finest Arabian bath rituals. Each product is crafted to transform everyday moments into luxurious experiences.
                </p>
                <Link href="/collection">
                  <span className="inline-block bg-[#1a1308] text-white text-[10px] uppercase tracking-[0.2em] px-7 py-3 hover:bg-[#c9a96e] transition-colors cursor-pointer w-fit">
                    Shop Now
                  </span>
                </Link>
              </div>
              <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden order-1 md:order-2">
                <img
                  src="https://emiratespride.com/wp-content/uploads/2026/01/Mostakbal-Lifestyle-scaled-1.webp"
                  alt="Bath and Body"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>



        {/* 5. THE FAVOURITES — inside container */}
        <section className="py-10 md:py-14">
          <div className="epp-container">
            <div className="mb-6 text-center">
              <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-1">Browse</p>
              <h2 className="text-lg md:text-2xl font-serif uppercase tracking-wide">The Favourites</h2>
            </div>
            <div
              ref={catRef}
              className="flex overflow-x-auto hide-scrollbar"
              style={{ userSelect: "none" }}
            >
              {catItems.map((cat, i) => (
                <Link key={`${cat.id}-${i}`} href="/collection">
                  <div className="flex-shrink-0 w-[140px] md:w-[200px] mr-3 md:mr-4 group cursor-pointer">
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
          </div>
        </section>

        {/* 6. THE BRAND */}
        <section className="relative overflow-hidden">
          <div className="relative w-full aspect-[16/6] md:aspect-[21/6]">
            <img
              src="https://emiratespride.com/wp-content/uploads/2026/01/Future-Oud-Lifestyle-scaled-1.webp"
              alt="The Brand"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/45" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center epp-container">
              <p className="text-white/70 text-[9px] md:text-[10px] uppercase tracking-[0.4em] mb-3">Emirates Pride</p>
              <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-serif mb-6 max-w-xl leading-tight">
                The Brand
              </h2>
              <Link href="/collection">
                <span className="inline-block border border-white text-white px-8 md:px-10 py-3 text-[10px] uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-colors cursor-pointer">
                  Discover
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* 7. BLOG — latest articles */}
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
                className="text-[10px] uppercase tracking-[0.2em] border-b border-black pb-0.5 hover:text-gray-500 hover:border-gray-500 transition-colors"
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
                  <h3 className="text-sm md:text-base font-serif mb-2 group-hover:text-gray-500 transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em]">{post.date}</p>
                </a>
              ))}
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
    slug: "art-of-oud",
    title: "The Art of Oud: A Journey Through Arabian Perfumery",
    category: "Fragrance",
    date: "March 2026",
    image: "https://emiratespride.com/wp-content/uploads/2026/01/Future-Oud-Lifestyle-scaled-1.webp",
    href: "https://emiratespride.com/blogs/",
  },
  {
    slug: "luxury-gifting",
    title: "The Ultimate Guide to Luxury Fragrance Gifting",
    category: "Lifestyle",
    date: "February 2026",
    image: "https://emiratespride.com/wp-content/uploads/2026/01/Mostakbal-Lifestyle-scaled-1.webp",
    href: "https://emiratespride.com/blogs/",
  },
  {
    slug: "scent-stories",
    title: "Scent Stories: How Fragrance Defines Identity",
    category: "Culture",
    date: "January 2026",
    image: "https://emiratespride.com/wp-content/uploads/2026/01/Future-Bakhoor-Lifestyle-scaled-1.webp",
    href: "https://emiratespride.com/blogs/",
  },
];

function ProductCard({ product }: { product: any }) {
  const [wishlisted, setWishlisted] = useState(() => isInWishlist(product.id));
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
          className="absolute bottom-0 left-0 right-0 bg-black text-white text-[9px] uppercase tracking-[0.2em] py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        >
          Quick Add
        </button>
      </div>
      <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-1 truncate">
        {product.collection || "Eau de Parfum"}
      </p>
      <Link href={`/product/${product.id}`}>
        <p className="text-[11px] uppercase tracking-[0.08em] text-black hover:text-gray-500 transition-colors cursor-pointer leading-tight line-clamp-2 mb-1">
          {product.name}
        </p>
      </Link>
      <p className="text-[11px] text-gray-600">{product.currency} {product.price}</p>
    </div>
  );
}
