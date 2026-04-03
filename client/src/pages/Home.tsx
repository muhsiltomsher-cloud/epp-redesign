import { Heart, ShoppingBag, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { useState, useCallback, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products, categories } from "@/lib/data";
import { addToCart } from "@/lib/cart";
import { toggleWishlist, isInWishlist } from "@/lib/wishlist";
import heroVideoUrl from "@assets/Image_to_Slow_Motion_Video_1773040640384.mp4";

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
      const scrollAmount = (cardWidth + gap) * 5;
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Video */}
        <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="https://emiratespride.com/wp-content/uploads/2026/02/Desktop-Banner-ENG-scaled.jpg"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={heroVideoUrl} type="video/mp4" />
          </video>
        </section>

        {/* Categories */}
        <section className="py-12 md:py-16 px-6 md:px-12 lg:px-20 xl:px-32">
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-serif">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {categories.map((cat) => (
              <Link key={cat.name} href="/collection">
                <div className="group cursor-pointer">
                  <div className="relative aspect-square overflow-hidden bg-gray-100">
                    <img 
                      src={cat.image} 
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white text-xs md:text-sm font-medium text-center px-2">{cat.name}</h3>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* New Arrivals - Slider */}
        <section className="py-12 md:py-16 bg-[#f8f8f8]">
          <div className="px-6 md:px-12 lg:px-20 xl:px-32">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl md:text-2xl font-serif">New Arrivals</h2>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => scrollSlider("left")}
                  className="w-9 h-9 border border-gray-300 rounded-full flex items-center justify-center hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>
                <button 
                  onClick={() => scrollSlider("right")}
                  className="w-9 h-9 border border-gray-300 rounded-full flex items-center justify-center hover:border-[#c9a96e] hover:text-[#c9a96e] transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
                <Link href="/collection">
                  <span className="hidden md:inline text-xs uppercase tracking-wider text-gray-600 hover:text-[#c9a96e] transition-colors cursor-pointer ml-2">
                    View All
                  </span>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Slider */}
          <div 
            ref={sliderRef}
            className="flex gap-4 overflow-x-auto scroll-smooth px-6 md:px-12 lg:px-20 xl:px-32 pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {newArrivals.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[48%] sm:w-[32%] md:w-[18.5%]">
                <ProductCard product={product} />
              </div>
            ))}
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
    <div className="group">
      <div className="relative aspect-[3/4] bg-gray-100 mb-2 overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        </Link>
        
        {product.badge && (
          <span className="absolute top-2 left-2 bg-[#c9a96e] text-white text-[9px] px-2 py-0.5 uppercase tracking-wider">
            {product.badge}
          </span>
        )}

        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Heart size={14} className={wishlisted ? "fill-red-500 text-red-500" : "text-gray-500"} />
        </button>

        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform opacity-0 group-hover:opacity-100"
        >
          <ShoppingBag size={14} className={addedToCart ? "text-[#c9a96e]" : "text-gray-500"} />
        </button>
      </div>
      
      <Link href={`/product/${product.id}`}>
        <h3 className="text-xs md:text-sm font-medium mb-0.5 hover:text-[#c9a96e] transition-colors cursor-pointer truncate">{product.name}</h3>
      </Link>
      <p className="text-xs font-medium text-gray-700">{product.currency} {product.price}</p>
    </div>
  );
}
