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
  const featuredProducts = products.slice(0, 10);
  const newArrivals = products.filter(p => p.badge === "NEW").length > 0 
    ? products.filter(p => p.badge === "NEW").slice(0, 10) 
    : featuredProducts;
  
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollSlider = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const container = sliderRef.current;
      const cardWidth = container.querySelector('div')?.offsetWidth || 280;
      const gap = 16;
      const scrollAmount = (cardWidth + gap) * 3;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f6f2] flex flex-col overflow-x-clip">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full">
          <div className="hidden md:block aspect-[2560/1024] w-full overflow-hidden">
            <img
              src="https://emiratespride.com/wp-content/uploads/2026/02/Desktop-Banner-ENG-scaled.jpg"
              alt="Premium Fragrances"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:hidden aspect-[1080/1475] w-full overflow-hidden">
            <img
              src="https://emiratespride.com/wp-content/uploads/2026/02/Desktop-Banner-ENG-scaled.jpg"
              alt="Premium Fragrances"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-12 md:py-16 bg-[#f7f6f2]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#7a3205]">Shop by Category</h2>
              <p className="text-sm text-gray-600 mt-2">Discover our exclusive collection</p>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 md:gap-6">
              {categories.map((cat) => (
                <Link key={cat.name} href="/collection">
                  <div className="group cursor-pointer text-center">
                    <div className="relative aspect-square overflow-hidden bg-[#dad6cd] rounded-2xl mb-3">
                      <img 
                        src={cat.image} 
                        alt={cat.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                    </div>
                    <h3 className="text-xs md:text-sm font-bold text-[#7a3205] group-hover:text-[#5a2504] transition-colors">
                      {cat.name}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals Section */}
        <section className="py-12 md:py-16 bg-[#dad6cd]">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[#7a3205]">New Arrivals</h2>
                <p className="text-sm text-gray-700 mt-1">Fresh additions to our collection</p>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => scrollSlider("left")}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#7a3205] hover:text-white transition-all shadow-sm"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => scrollSlider("right")}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#7a3205] hover:text-white transition-all shadow-sm"
                >
                  <ChevronRight size={20} />
                </button>
                <Link href="/collection" className="hidden md:block">
                  <span className="ml-4 text-sm font-bold text-[#7a3205] hover:text-[#5a2504] transition-colors cursor-pointer">
                    View All Products →
                  </span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Products Slider */}
          <div 
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto scroll-smooth px-4 md:px-8 lg:px-16 pb-4 hide-scrollbar"
          >
            {newArrivals.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[48%] sm:w-[32%] md:w-[22%] lg:w-[18%]">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Mobile View All */}
          <div className="container mx-auto px-4 mt-6 md:hidden">
            <Link href="/collection">
              <span className="block w-full bg-[#7a3205] text-white text-center py-3 text-sm font-bold rounded-full hover:bg-[#5a2504] transition-colors cursor-pointer">
                View All Products
              </span>
            </Link>
          </div>
        </section>

        {/* Featured Products Grid */}
        <section className="py-12 md:py-16 bg-[#f7f6f2]">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#7a3205]">Best Sellers</h2>
              <p className="text-sm text-gray-600 mt-2">Our most loved fragrances</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {featuredProducts.slice(0, 10).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Promo Banner */}
        <section className="py-12 md:py-16 bg-[#7a3205]">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">Free Shipping</h2>
            <p className="text-white/80 text-lg mb-6">On all orders over 500 AED across the UAE</p>
            <Link href="/collection">
              <span className="inline-block bg-white text-[#7a3205] px-8 py-3 text-sm font-bold rounded-full hover:bg-[#f7f6f2] transition-colors cursor-pointer">
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
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative aspect-[3/4] bg-[#f7f6f2] overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        </Link>
        
        {product.badge && (
          <span className="absolute top-3 left-3 bg-[#7a3205] text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase">
            {product.badge}
          </span>
        )}

        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Heart size={14} className={wishlisted ? "fill-red-500 text-red-500" : "text-gray-500"} />
        </button>

        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform opacity-0 group-hover:opacity-100"
        >
          <ShoppingBag size={14} className={addedToCart ? "text-[#7a3205]" : "text-gray-500"} />
        </button>
      </div>
      
      <div className="p-3">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-bold text-gray-800 hover:text-[#7a3205] transition-colors cursor-pointer truncate">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm font-bold text-[#7a3205] mt-1">{product.currency} {product.price}</p>
      </div>
    </div>
  );
}
