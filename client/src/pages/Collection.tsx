import { useState, useCallback, useRef, useEffect } from "react";
import { Link } from "wouter";
import { ChevronDown, Heart, ShoppingBag, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products } from "@/lib/data";
import { addToCart } from "@/lib/cart";
import { toggleWishlist, isInWishlist } from "@/lib/wishlist";

const CATEGORIES = ["All", "Oud & Dakhoon", "Gift Sets", "Perfume Collection"];
const SORT_OPTIONS = [
  { label: "Best Sellers", value: "best" },
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A - Z", value: "name-asc" },
];

export default function Collection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("best");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isMobileSortOpen, setIsMobileSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(e.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categoryFiltered = activeCategory === "All" 
    ? products 
    : products.filter(p => p.collection === activeCategory);

  const filteredProducts = [...categoryFiltered].sort((a, b) => {
    switch (sortBy) {
      case "price-asc": return a.price - b.price;
      case "price-desc": return b.price - a.price;
      case "name-asc": return a.name.localeCompare(b.name);
      case "newest": return 0;
      case "best":
      default: return 0;
    }
  });

  const activeSortLabel = SORT_OPTIONS.find(o => o.value === sortBy)?.label || "Best Sellers";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[52px] md:pt-24">
        <header className="bg-white py-3 md:py-6 lg:py-8 px-4 md:px-10 lg:px-20 xl:px-28 text-center border-b border-black/5">
          <h1 className="md:text-3xl lg:text-4xl font-serif mb-2 md:mb-4 uppercase tracking-wider text-black animate-in fade-in slide-in-from-bottom-4 text-[30px]" data-testid="text-collection-title">Our Collections</h1>
          <p className="text-black/50 max-w-2xl mx-auto text-[11px] md:text-sm lg:text-base font-light animate-in fade-in slide-in-from-bottom-6 delay-150">
            Explore our curated selection of masterful fragrances.
          </p>
        </header>

        <section className="px-4 md:px-10 lg:px-20 xl:px-28 py-4 md:py-8 lg:py-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-4 md:mb-6 gap-3 md:gap-4 pb-3 md:pb-4 border-b border-black/5">
            <div className="flex md:hidden items-center justify-between w-full">
              <div className="flex items-center gap-4 overflow-x-auto pb-1 hide-scrollbar flex-1">
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
              <button
                onClick={() => setIsMobileSortOpen(true)}
                className="flex items-center gap-1 text-[9px] tracking-[0.15em] uppercase text-black/50 ml-3 flex-shrink-0"
                data-testid="button-sort-mobile"
              >
                Sort
                <ChevronDown size={12} strokeWidth={1.5} />
              </button>
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

            <div ref={sortRef} className="hidden md:block relative flex-shrink-0">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-black/60 hover:text-black transition-colors"
                data-testid="button-sort-desktop"
              >
                <span>{activeSortLabel}</span>
                <ChevronDown size={14} strokeWidth={1} className={`transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
              </button>

              {isSortOpen && (
                <div className="absolute right-0 top-full mt-3 w-52 bg-white border border-black/10 shadow-lg z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {SORT_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      onClick={() => { setSortBy(option.value); setIsSortOpen(false); }}
                      data-testid={`button-sort-${option.value}`}
                      className={`w-full text-left px-5 py-3 text-[10px] tracking-[0.15em] uppercase transition-colors ${
                        sortBy === option.value
                          ? "text-[#c9a96e] bg-[#c9a96e]/5 font-medium"
                          : "text-black/60 hover:text-black hover:bg-black/[0.02]"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {isMobileSortOpen && (
            <div className="fixed inset-0 z-50 md:hidden">
              <div className="absolute inset-0 bg-black/40" onClick={() => setIsMobileSortOpen(false)}></div>
              <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl animate-in slide-in-from-bottom duration-300 pb-safe">
                <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
                  <h3 className="text-sm font-serif">Sort By</h3>
                  <button onClick={() => setIsMobileSortOpen(false)} data-testid="button-sort-close">
                    <X size={18} strokeWidth={1.5} className="text-black/40" />
                  </button>
                </div>
                <div className="py-2">
                  {SORT_OPTIONS.map(option => (
                    <button
                      key={option.value}
                      onClick={() => { setSortBy(option.value); setIsMobileSortOpen(false); }}
                      data-testid={`button-sort-mobile-${option.value}`}
                      className={`w-full text-left px-5 py-3.5 text-[11px] tracking-[0.15em] uppercase transition-colors flex items-center justify-between ${
                        sortBy === option.value
                          ? "text-[#c9a96e] font-medium"
                          : "text-black/60"
                      }`}
                    >
                      {option.label}
                      {sortBy === option.value && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c9a96e]"></div>
                      )}
                    </button>
                  ))}
                </div>
                <div className="h-6"></div>
              </div>
            </div>
          )}

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

        {product.badge && (
          <span className={`absolute top-2 left-2 md:top-3 md:left-3 z-30 px-2 py-0.5 md:px-2.5 md:py-1 text-[8px] md:text-[9px] font-medium tracking-[0.15em] uppercase border ${
            product.badge === 'NEW'
              ? 'bg-white text-[#1a1308] border-[#c9a96e]/30'
              : 'bg-[#c9a96e] text-white border-[#c9a96e]'
          }`}>
            {product.badge}
          </span>
        )}

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
