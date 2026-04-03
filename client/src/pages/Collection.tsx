import { useState, useCallback } from "react";
import { Link } from "wouter";
import { ChevronDown, Heart, ShoppingBag } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products } from "@/lib/data";
import { addToCart } from "@/lib/cart";
import { toggleWishlist, isInWishlist } from "@/lib/wishlist";

const CATEGORIES = ["All", "Oud & Dakhoon", "Gift Sets", "Perfume Collection"];
const SORT_OPTIONS = [
  { label: "Best Sellers", value: "best" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A - Z", value: "name-asc" },
];

export default function Collection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("best");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const filteredProducts = (activeCategory === "All" 
    ? products 
    : products.filter(p => p.collection === activeCategory)
  ).sort((a, b) => {
    switch (sortBy) {
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "name-asc": return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 md:pt-28">
        {/* Header */}
        <header className="py-8 md:py-10 px-6 md:px-12 lg:px-20 xl:px-32 text-center">
          <h1 className="text-xl md:text-2xl font-serif">Our Collection</h1>
        </header>

        <section className="px-6 md:px-12 lg:px-20 xl:px-32 pb-12">
          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 pb-4 border-b border-gray-100">
            {/* Categories */}
            <div className="flex gap-4 md:gap-6 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[11px] tracking-wider uppercase whitespace-nowrap pb-1 transition-colors ${
                    activeCategory === cat 
                      ? "text-black font-medium border-b border-[#c9a96e]" 
                      : "text-gray-400 hover:text-black"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-1.5 text-[11px] tracking-wider uppercase text-gray-500 hover:text-black"
              >
                {SORT_OPTIONS.find(o => o.value === sortBy)?.label}
                <ChevronDown size={12} className={`transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
              </button>
              {isSortOpen && (
                <div className="absolute right-0 top-full mt-1 w-44 bg-white border shadow-md z-10">
                  {SORT_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      onClick={() => { setSortBy(option.value); setIsSortOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-[11px] tracking-wider ${
                        sortBy === option.value ? "text-[#c9a96e] bg-gray-50" : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-16 text-center text-gray-400 text-sm">
              No products found.
            </div>
          )}
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
