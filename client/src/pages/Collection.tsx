import { useState, useCallback } from "react";
import { Link } from "wouter";
import { ChevronDown, Heart, ShoppingBag } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products } from "@/lib/data";
import { addToCart } from "@/lib/cart";
import { toggleWishlist, isInWishlist } from "@/lib/wishlist";

const CATEGORIES = ["All", "Oud & Dakhoon", "Gift Sets", "Perfume Collection"];

export default function Collection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.collection === activeCategory);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[52px] md:pt-24">
        <header className="bg-white py-4 md:py-10 lg:py-14 px-4 md:px-10 lg:px-20 xl:px-28 text-center border-b border-black/5">
          <h1 className="text-xl md:text-3xl lg:text-4xl font-serif mb-2 md:mb-4 uppercase tracking-wider text-black animate-in fade-in slide-in-from-bottom-4" data-testid="text-collection-title">Our Collections</h1>
          <p className="text-black/50 max-w-2xl mx-auto text-[11px] md:text-sm lg:text-base font-light animate-in fade-in slide-in-from-bottom-6 delay-150">
            Explore our curated selection of masterful fragrances.
          </p>
        </header>

        <section className="px-4 md:px-10 lg:px-20 xl:px-28 py-6 md:py-14 lg:py-20 pl-[112px] pr-[112px] pt-[40px] pb-[40px]">
          <div className="flex flex-col md:flex-row justify-between items-center mb-5 md:mb-12 gap-4 md:gap-6 pb-4 md:pb-6 border-b border-black/5">
            <div className="flex md:hidden items-center gap-4 overflow-x-auto w-full pb-1 hide-scrollbar">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`text-[9px] tracking-[0.15em] uppercase transition-colors whitespace-nowrap py-1.5 ${
                    activeCategory === category 
                      ? 'text-[#c9a96e] font-medium border-b-2 border-[#c9a96e]' 
                      : 'text-black/40'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center gap-10 overflow-x-auto w-full md:w-auto pb-4 md:pb-0">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  data-testid={`button-category-desktop-${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`text-[10px] tracking-[0.2em] uppercase transition-colors whitespace-nowrap ${
                    activeCategory === category 
                      ? 'text-[#c9a96e] font-medium border-b border-[#c9a96e] pb-1' 
                      : 'text-black/50 hover:text-[#c9a96e] pb-1'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-black/60 cursor-pointer hover:text-black transition-colors group w-full md:w-auto justify-between md:justify-end py-4 md:py-0 border-b border-black/10 md:border-none">
              <span className="group-hover:border-b group-hover:border-black pb-0.5">Sort By</span>
              <ChevronDown size={14} strokeWidth={1} />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2.5 md:gap-x-3 lg:gap-x-5 gap-y-4 md:gap-y-6 lg:gap-y-8">
            {filteredProducts.map((product, index) => (
              <CollectionProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-24 text-center text-black/40 font-serif text-xl">
              No products found in this collection.
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

function CollectionProductCard({ product, index }: { product: any; index: number }) {
  const [wishlisted, setWishlisted] = useState(() => isInWishlist(product.id));
  const [addedToCart, setAddedToCart] = useState(false);

  const handleWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const result = toggleWishlist(product.id);
    setWishlisted(result);
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
      className="group flex flex-col w-full cursor-pointer animate-in fade-in slide-in-from-bottom-8"
      style={{ animationDelay: `${index * 80}ms`, animationFillMode: 'both' }}
      data-testid={`card-product-${product.id}`}
    >
      <div className="block relative aspect-[3/5] mb-1.5 md:mb-2 lg:mb-3 overflow-hidden bg-[#f5f5f5]">
        <Link href={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-1000 group-hover:scale-105"
          />
          {product.hoverImage && (
            <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden hidden md:block">
              <img
                src={product.hoverImage}
                alt={`${product.name} lifestyle`}
                className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          )}
        </Link>

        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 md:top-3 md:right-3 z-30 w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-sm"
          data-testid={`button-wishlist-${product.id}`}
        >
          <Heart
            size={14}
            strokeWidth={1.5}
            className={`transition-colors duration-300 ${wishlisted ? "fill-red-500 text-red-500" : "text-black/60 hover:text-black"}`}
          />
        </button>

        <div className="absolute bottom-0 left-0 w-full z-30 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out hidden md:block">
          <button
            onClick={handleAddToCart}
            className="w-full py-3 text-[11px] font-medium tracking-[0.2em] uppercase bg-white hover:bg-[#1a1308] hover:text-white transition-colors flex items-center justify-center gap-2"
            data-testid={`button-add-to-cart-${product.id}`}
          >
            <ShoppingBag size={13} strokeWidth={1.5} />
            {addedToCart ? "Added!" : "Add to Cart"}
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="absolute bottom-2 right-2 z-30 w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 shadow-sm md:hidden"
          data-testid={`button-add-to-cart-mobile-${product.id}`}
        >
          <ShoppingBag size={14} strokeWidth={1.5} className={`transition-colors duration-300 ${addedToCart ? "text-[#c9a96e]" : "text-black/60"}`} />
        </button>
      </div>

      <div className="flex flex-col items-center px-1 text-center">
        <Link href={`/product/${product.id}`}>
          <span className="text-xs md:text-sm lg:text-base font-serif mb-1 text-black hover:text-black/60 transition-colors cursor-pointer" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </span>
        </Link>
        <span className="text-[10px] md:text-[11px] lg:text-xs tracking-[0.2em] uppercase text-black/40 mb-1 lg:mb-1.5 line-clamp-1">
          {product.collection}
        </span>
        <p className="text-[9px] md:text-[11px] lg:text-xs font-medium text-black" data-testid={`text-price-${product.id}`}>
          {product.currency} {product.price}
        </p>
      </div>
    </div>
  );
}
