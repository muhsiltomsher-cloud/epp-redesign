"use client";

import { Heart, ShoppingBag, ChevronLeft, ChevronRight, ArrowRight, Star, Truck, Shield, Gift } from "lucide-react";
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
  const bestSellers = products.filter(p => p.badge === "BESTSELLER").slice(0, 4);
  
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 320;
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
        
        {/* Hero Section - Full Screen Split */}
        <section className="relative min-h-[100vh] flex items-center bg-[#1a1308]">
          <div className="absolute inset-0">
            <img
              src="https://emiratespride.com/wp-content/uploads/2026/02/Desktop-Banner-ENG-scaled.jpg"
              alt="Emirates Pride"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1a1308] via-[#1a1308]/80 to-transparent" />
          </div>
          <div className="relative z-10 w-full px-6 md:px-12 lg:px-20 xl:px-32 py-20">
            <div className="max-w-2xl">
              <p className="text-[#c9a96e] text-xs md:text-sm uppercase tracking-[0.3em] mb-4">Luxury Arabian Fragrances</p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white mb-6 leading-tight">
                Discover the Art of <span className="text-[#c9a96e]">Perfumery</span>
              </h1>
              <p className="text-white/70 text-base md:text-lg mb-10 max-w-lg leading-relaxed">
                Experience the finest oud, bakhoor, and luxury perfumes crafted with centuries-old Arabian traditions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/collection">
                  <span className="inline-flex items-center gap-3 bg-[#c9a96e] text-[#1a1308] px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white transition-colors cursor-pointer">
                    Explore Collection
                    <ArrowRight size={16} />
                  </span>
                </Link>
                <Link href="/collection">
                  <span className="inline-flex items-center gap-3 border border-white/30 text-white px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white hover:text-[#1a1308] transition-colors cursor-pointer">
                    View All
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bar */}
        <section className="bg-[#f8f7f5] py-6 border-y border-gray-200">
          <div className="px-6 md:px-12 lg:px-20 xl:px-32">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex items-center gap-3">
                <Truck size={24} className="text-[#c9a96e]" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider">Free Shipping</p>
                  <p className="text-xs text-gray-500">On orders over 500 AED</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield size={24} className="text-[#c9a96e]" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider">Authentic</p>
                  <p className="text-xs text-gray-500">100% genuine products</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Gift size={24} className="text-[#c9a96e]" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider">Gift Wrapping</p>
                  <p className="text-xs text-gray-500">Luxury packaging</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Star size={24} className="text-[#c9a96e]" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider">Premium Quality</p>
                  <p className="text-xs text-gray-500">Handcrafted perfumes</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories - Elegant Cards */}
        <section className="py-16 md:py-24 px-6 md:px-12 lg:px-20 xl:px-32">
          <div className="text-center mb-12">
            <p className="text-[#c9a96e] text-xs uppercase tracking-[0.3em] mb-3">Our Collections</p>
            <h2 className="text-2xl md:text-4xl font-serif">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {categories.slice(0, 6).map((cat, index) => (
              <Link key={cat.id} href="/collection">
                <div className={`group cursor-pointer relative overflow-hidden ${index === 0 || index === 5 ? 'md:col-span-1 aspect-[4/5]' : 'aspect-[4/5]'}`}>
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <h3 className="text-white text-sm md:text-lg font-serif mb-1">{cat.name}</h3>
                    <p className="text-white/60 text-xs">{cat.count} Products</p>
                  </div>
                  <div className="absolute inset-0 border border-white/0 group-hover:border-white/30 transition-colors m-3" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Product - Large Showcase */}
        <section className="bg-[#1a1308] py-16 md:py-24">
          <div className="px-6 md:px-12 lg:px-20 xl:px-32">
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
              <div className="order-2 md:order-1">
                <p className="text-[#c9a96e] text-xs uppercase tracking-[0.3em] mb-4">Featured Product</p>
                <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Future Oud</h2>
                <p className="text-white/60 mb-8 leading-relaxed">
                  A revolutionary interpretation of classic oud. Experience the perfect harmony of tradition and innovation in this masterfully crafted fragrance.
                </p>
                <div className="flex flex-wrap gap-4 mb-8">
                  <div className="bg-white/10 px-4 py-2">
                    <p className="text-white/50 text-[10px] uppercase tracking-wider">Top Notes</p>
                    <p className="text-white text-sm">Black Pepper, Bergamot</p>
                  </div>
                  <div className="bg-white/10 px-4 py-2">
                    <p className="text-white/50 text-[10px] uppercase tracking-wider">Heart Notes</p>
                    <p className="text-white text-sm">Oud Wood, Rose</p>
                  </div>
                  <div className="bg-white/10 px-4 py-2">
                    <p className="text-white/50 text-[10px] uppercase tracking-wider">Base Notes</p>
                    <p className="text-white text-sm">Musk, Amber</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-3xl font-serif text-[#c9a96e]">AED 795</span>
                  <Link href="/product/53688">
                    <span className="inline-flex items-center gap-2 bg-[#c9a96e] text-[#1a1308] px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white transition-colors cursor-pointer">
                      Shop Now
                      <ArrowRight size={14} />
                    </span>
                  </Link>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative aspect-[3/4] bg-white/5">
                  <img 
                    src="https://emiratespride.com/wp-content/uploads/2026/01/Future-Oud-scaled-1.webp"
                    alt="Future Oud"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* New Arrivals - Horizontal Scroll */}
        <section className="py-16 md:py-24">
          <div className="px-6 md:px-12 lg:px-20 xl:px-32 mb-8">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-[#c9a96e] text-xs uppercase tracking-[0.3em] mb-3">Just Arrived</p>
                <h2 className="text-2xl md:text-4xl font-serif">New Arrivals</h2>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => scrollSlider("left")}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={() => scrollSlider("right")}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
          
          <div 
            ref={sliderRef}
            className="flex gap-5 overflow-x-auto scroll-smooth px-6 md:px-12 lg:px-20 xl:px-32 pb-4 hide-scrollbar"
          >
            {newArrivals.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[280px] md:w-[300px]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* Best Sellers Grid */}
        <section className="py-16 md:py-24 bg-[#f8f7f5]">
          <div className="px-6 md:px-12 lg:px-20 xl:px-32">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-[#c9a96e] text-xs uppercase tracking-[0.3em] mb-3">Most Loved</p>
                <h2 className="text-2xl md:text-4xl font-serif">Best Sellers</h2>
              </div>
              <Link href="/collection">
                <span className="text-sm uppercase tracking-wider text-gray-600 hover:text-[#c9a96e] transition-colors cursor-pointer flex items-center gap-2">
                  View All
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
              {(bestSellers.length > 0 ? bestSellers : featuredProducts.slice(0, 4)).map((product) => (
                <ProductCard key={product.id} product={product} variant="large" />
              ))}
            </div>
          </div>
        </section>

        {/* Brand Story Banner */}
        <section className="relative py-24 md:py-32 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://emiratespride.com/wp-content/uploads/2026/01/Mostakbal-Lifestyle-scaled-1.webp"
              alt="Our Story"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#1a1308]/80" />
          </div>
          <div className="relative z-10 px-6 md:px-12 lg:px-20 xl:px-32 text-center">
            <p className="text-[#c9a96e] text-xs uppercase tracking-[0.3em] mb-4">Our Heritage</p>
            <h2 className="text-3xl md:text-5xl font-serif text-white mb-6 max-w-3xl mx-auto">
              Crafting Luxury Fragrances Since 2010
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
              Emirates Pride represents the pinnacle of Arabian perfumery. Each fragrance is a masterpiece, 
              meticulously crafted using the finest ingredients sourced from around the world.
            </p>
            <Link href="/collection">
              <span className="inline-flex items-center gap-3 border border-[#c9a96e] text-[#c9a96e] px-10 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#c9a96e] hover:text-[#1a1308] transition-colors cursor-pointer">
                Discover Our Story
              </span>
            </Link>
          </div>
        </section>

        {/* All Products Grid */}
        <section className="py-16 md:py-24">
          <div className="px-6 md:px-12 lg:px-20 xl:px-32">
            <div className="text-center mb-12">
              <p className="text-[#c9a96e] text-xs uppercase tracking-[0.3em] mb-3">Complete Collection</p>
              <h2 className="text-2xl md:text-4xl font-serif">Explore All Products</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/collection">
                <span className="inline-flex items-center gap-3 bg-[#1a1308] text-white px-10 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#c9a96e] transition-colors cursor-pointer">
                  View All Products
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 md:py-20 bg-[#1a1308]">
          <div className="px-6 md:px-12 lg:px-20 xl:px-32 text-center">
            <p className="text-[#c9a96e] text-xs uppercase tracking-[0.3em] mb-3">Stay Connected</p>
            <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">Join Our Newsletter</h2>
            <p className="text-white/60 mb-8 max-w-md mx-auto">
              Be the first to know about new collections, exclusive offers, and fragrance tips.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border border-white/20 px-5 py-4 text-white text-sm placeholder-white/40 focus:outline-none focus:border-[#c9a96e]"
              />
              <button className="bg-[#c9a96e] text-[#1a1308] px-8 py-4 text-xs font-semibold tracking-[0.2em] uppercase hover:bg-white transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}

function ProductCard({ product, variant = "default" }: { product: any; variant?: "default" | "large" }) {
  const [wishlisted, setWishlisted] = useState(() => isInWishlist(product.id));
  const [addedToCart, setAddedToCart] = useState(false);
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
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
  }, [product.id]);

  return (
    <div 
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative bg-[#f8f7f5] mb-4 overflow-hidden ${variant === "large" ? "aspect-[3/4]" : "aspect-[3/4]"}`}>
        <Link href={`/product/${product.id}`}>
          <img 
            src={isHovered && product.hoverImage ? product.hoverImage : product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-all duration-700" 
          />
        </Link>
        
        {product.badge && (
          <span className={`absolute top-3 left-3 text-white text-[9px] px-3 py-1 uppercase tracking-wider font-medium ${
            product.badge === "NEW" ? "bg-[#1a1308]" : "bg-[#c9a96e]"
          }`}>
            {product.badge}
          </span>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={handleWishlist}
            className="w-9 h-9 bg-white flex items-center justify-center shadow-sm hover:bg-[#1a1308] hover:text-white transition-colors"
          >
            <Heart size={16} className={wishlisted ? "fill-red-500 text-red-500" : ""} />
          </button>
        </div>

        <div className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent transform transition-all duration-300 ${isHovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}>
          <button
            onClick={handleAddToCart}
            className="w-full bg-white text-[#1a1308] py-3 text-xs font-semibold tracking-wider uppercase hover:bg-[#c9a96e] transition-colors flex items-center justify-center gap-2"
          >
            <ShoppingBag size={14} />
            {addedToCart ? "Added!" : "Add to Cart"}
          </button>
        </div>
      </div>
      
      <div className="text-center">
        <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">{product.collection}</p>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-medium mb-2 hover:text-[#c9a96e] transition-colors cursor-pointer">{product.name}</h3>
        </Link>
        <p className="text-sm font-semibold">{product.currency} {product.price}</p>
      </div>
    </div>
  );
}
