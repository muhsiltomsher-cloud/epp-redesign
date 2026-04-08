"use client";

import { Heart, ShoppingBag, ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { useState, useCallback } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products, categories } from "@/lib/data";
import { addToCart } from "@/lib/cart";
import { toggleWishlist, isInWishlist } from "@/lib/wishlist";

export default function Home() {
  const featuredProducts = products.slice(0, 4);
  const signatureCollection = products.slice(4, 8);

  return (
    <div className="min-h-screen bg-[#faf9f7] flex flex-col">
      <Navbar />
      <main className="flex-1">
        
        {/* Hero - Full Width Cinematic */}
        <section className="relative h-screen">
          <div className="absolute inset-0">
            <img
              src="https://emiratespride.com/wp-content/uploads/2026/02/Desktop-Banner-ENG-scaled.jpg"
              alt="Emirates Pride"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
          <div className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-32">
            <div className="px-6 md:px-16 lg:px-24">
              <h1 className="text-white text-4xl md:text-6xl lg:text-7xl font-serif mb-6 max-w-2xl leading-[1.1]">
                The Art of Arabian Perfumery
              </h1>
              <p className="text-white/80 text-sm md:text-base mb-8 max-w-md leading-relaxed">
                Discover fragrances that tell stories of heritage, craftsmanship, and timeless elegance.
              </p>
              <Link href="/collection">
                <span className="inline-block bg-white text-black px-8 py-4 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-[#c9a96e] hover:text-white transition-all duration-300 cursor-pointer">
                  Discover the Collection
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Editorial Split - Image Left, Content Right */}
        <section className="grid md:grid-cols-2">
          <div className="aspect-square md:aspect-auto">
            <img
              src="https://emiratespride.com/wp-content/uploads/2026/01/Future-Oud-scaled-1.webp"
              alt="Signature Fragrance"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center bg-[#1a1308] px-8 md:px-16 lg:px-20 py-16 md:py-0">
            <div className="max-w-md">
              <p className="text-[#c9a96e] text-[11px] uppercase tracking-[0.3em] mb-6">Signature Collection</p>
              <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-serif mb-6 leading-[1.15]">
                Future Oud
              </h2>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                A revolutionary interpretation of classic oud. Where tradition meets innovation 
                in a masterfully crafted fragrance experience.
              </p>
              <Link href="/product/53688">
                <span className="inline-flex items-center gap-3 text-white text-[11px] uppercase tracking-[0.2em] border-b border-white/40 pb-1 hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors cursor-pointer">
                  Explore
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Category Grid - Acqua di Parma Style */}
        <section className="py-20 md:py-28 px-6 md:px-16 lg:px-24">
          <div className="text-center mb-14">
            <h2 className="text-2xl md:text-3xl font-serif">Explore Our World</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {categories.slice(0, 3).map((cat) => (
              <Link key={cat.id} href="/collection">
                <div className="group cursor-pointer relative aspect-[4/5] overflow-hidden bg-[#f5f4f2]">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <h3 className="text-white text-lg md:text-xl font-serif">{cat.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Full Width Image Banner */}
        <section className="relative h-[60vh] md:h-[80vh]">
          <img
            src="https://emiratespride.com/wp-content/uploads/2026/01/Mostakbal-Lifestyle-scaled-1.webp"
            alt="Heritage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center text-center px-6">
            <div>
              <p className="text-white/80 text-[11px] uppercase tracking-[0.3em] mb-4">Our Heritage</p>
              <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-serif mb-6 max-w-3xl leading-[1.15]">
                Crafting Luxury Since 2010
              </h2>
              <Link href="/collection">
                <span className="inline-block border border-white text-white px-8 py-4 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-300 cursor-pointer">
                  Our Story
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Products Grid - Clean Minimal */}
        <section className="py-20 md:py-28 px-6 md:px-16 lg:px-24 bg-white">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-2xl md:text-3xl font-serif">New Arrivals</h2>
            <Link href="/collection">
              <span className="text-[11px] uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors cursor-pointer">
                View All
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Editorial Split - Content Left, Image Right */}
        <section className="grid md:grid-cols-2">
          <div className="flex items-center bg-[#f5f4f2] px-8 md:px-16 lg:px-20 py-16 md:py-0 order-2 md:order-1">
            <div className="max-w-md">
              <p className="text-[#c9a96e] text-[11px] uppercase tracking-[0.3em] mb-6">The Ritual</p>
              <h2 className="text-[#1a1308] text-3xl md:text-4xl font-serif mb-6 leading-[1.15]">
                An Olfactory Journey
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-8">
                Each fragrance is a voyage through time and tradition. From the first spritz 
                to the lingering base notes, experience the artistry of Arabian perfumery.
              </p>
              <Link href="/collection">
                <span className="inline-flex items-center gap-3 text-[#1a1308] text-[11px] uppercase tracking-[0.2em] border-b border-[#1a1308] pb-1 hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors cursor-pointer">
                  Discover More
                  <ArrowRight size={14} />
                </span>
              </Link>
            </div>
          </div>
          <div className="aspect-square md:aspect-auto order-1 md:order-2">
            <img
              src={categories[1]?.image || "https://emiratespride.com/wp-content/uploads/2026/01/Future-Oud-scaled-1.webp"}
              alt="The Ritual"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Signature Collection */}
        <section className="py-20 md:py-28 px-6 md:px-16 lg:px-24">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-2xl md:text-3xl font-serif">Signature Collection</h2>
            <Link href="/collection">
              <span className="text-[11px] uppercase tracking-[0.2em] border-b border-black pb-1 hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors cursor-pointer">
                Explore
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {signatureCollection.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Newsletter - Minimal */}
        <section className="py-20 md:py-28 bg-[#1a1308]">
          <div className="px-6 md:px-16 lg:px-24 max-w-2xl mx-auto text-center">
            <h2 className="text-white text-2xl md:text-3xl font-serif mb-4">Stay in Touch</h2>
            <p className="text-white/60 text-sm mb-10">
              Subscribe for exclusive access to new releases, events, and the art of perfumery.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-1 bg-transparent border-b border-white/30 px-0 py-3 text-white text-sm placeholder-white/40 focus:outline-none focus:border-white"
              />
              <button className="bg-white text-[#1a1308] px-8 py-3 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-[#c9a96e] hover:text-white transition-colors">
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
      <div className="relative aspect-[3/4] mb-5 overflow-hidden bg-[#f5f4f2]">
        <Link href={`/product/${product.id}`}>
          <img 
            src={isHovered && product.hoverImage ? product.hoverImage : product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
        </Link>
        
        {/* Minimal hover actions */}
        <div className={`absolute bottom-4 left-4 right-4 flex justify-between items-center transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}>
          <button
            onClick={handleAddToCart}
            className="w-10 h-10 bg-white flex items-center justify-center hover:bg-[#1a1308] hover:text-white transition-colors"
          >
            <Plus size={18} />
          </button>
          <button
            onClick={handleWishlist}
            className="w-10 h-10 bg-white flex items-center justify-center hover:bg-[#1a1308] hover:text-white transition-colors"
          >
            <Heart size={16} className={wishlisted ? "fill-[#c9a96e] text-[#c9a96e]" : ""} />
          </button>
        </div>
      </div>
      
      <div className="text-center">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-serif mb-2 hover:text-[#c9a96e] transition-colors cursor-pointer">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-600">{product.currency} {product.price}</p>
      </div>
    </div>
  );
}
