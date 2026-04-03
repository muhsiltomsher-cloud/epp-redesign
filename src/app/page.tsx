"use client";

import { Heart, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useCallback, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products, categories } from "@/lib/data";
import { addToCart } from "@/lib/cart";
import { toggleWishlist, isInWishlist } from "@/lib/wishlist";

export default function Home() {
  const featuredProducts = products.slice(0, 8);
  const newArrivals = products.filter(p => p.badge === "NEW").length > 0 
    ? products.filter(p => p.badge === "NEW").slice(0, 8) 
    : featuredProducts;
  
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 300;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Video - No Content */}
        <section className="relative h-[75vh] md:h-[85vh] w-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://emiratespride.com/wp-content/uploads/2026/02/Desktop-Banner-ENG-scaled.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
        </section>

        {/* Categories */}
        <section className="py-16 md:py-20 px-6 md:px-12 lg:px-20 xl:px-32">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">Explore</p>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {categories.map((cat) => (
              <Link key={cat.name} href="/collection">
                <div className="group cursor-pointer">
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <img 
                      src={cat.image} 
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute inset-0 flex items-end p-4">
                      <h3 className="text-white text-sm md:text-base font-medium">{cat.name}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* New Arrivals - Slider */}
        <section className="py-16 md:py-20 bg-[#fafafa]">
          <div className="px-6 md:px-12 lg:px-20 xl:px-32">
            <div className="flex justify-between items-end mb-10">
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-2">Just Arrived</p>
                <h2 className="text-2xl md:text-3xl font-serif">New Arrivals</h2>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2">
                  <button 
                    onClick={() => scrollSlider("left")}
                    className="w-10 h-10 border border-black/20 rounded-full flex items-center justify-center hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={() => scrollSlider("right")}
                    className="w-10 h-10 border border-black/20 rounded-full flex items-center justify-center hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
                <Link href="/collection">
                  <span className="text-xs tracking-[0.2em] uppercase text-black hover:text-[#c9a96e] transition-colors cursor-pointer border-b border-current pb-1">
                    View All
                  </span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Slider - 5 items visible on desktop */}
          <div 
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto scroll-smooth px-6 md:px-12 lg:px-20 xl:px-32 pb-4 hide-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {newArrivals.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[70vw] sm:w-[45vw] md:w-[calc((100%-4rem)/5)] lg:w-[calc((100%-4rem)/5)]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* Banner */}
        <section className="py-20 md:py-28 bg-[#1a1308] text-white text-center px-6 md:px-12 lg:px-20 xl:px-32">
          <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4">Complimentary</p>
          <h2 className="text-2xl md:text-4xl font-serif mb-4">Free Shipping Worldwide</h2>
          <p className="text-sm font-light mb-8 text-white/80">On all orders above AED 1500</p>
          <Link href="/collection">
            <span className="inline-block border border-white px-10 py-3.5 text-xs tracking-[0.2em] uppercase hover:bg-white hover:text-[#1a1308] transition-colors cursor-pointer">
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
