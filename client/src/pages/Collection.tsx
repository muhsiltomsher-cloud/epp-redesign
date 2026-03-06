import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products } from "@/lib/data";

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
        <header className="bg-white py-8 md:py-20 lg:py-28 px-4 md:px-10 lg:px-20 xl:px-28 text-center border-b border-black/5 pt-[60px] pb-[60px]">
          <h1 className="text-[40px] md:text-5xl lg:text-6xl font-serif mb-2 md:mb-6 uppercase tracking-wider text-black animate-in fade-in slide-in-from-bottom-4" data-testid="text-collection-title">Our Collections</h1>
          <p className="text-black/50 max-w-2xl mx-auto text-[11px] md:text-sm lg:text-base font-light animate-in fade-in slide-in-from-bottom-6 delay-150">
            Explore our curated selection of masterful fragrances.
          </p>
        </header>

        <section className="px-4 md:px-10 lg:px-20 xl:px-28 py-6 md:py-14 lg:py-20">
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

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-2.5 md:gap-x-4 lg:gap-x-6 gap-y-6 md:gap-y-12 lg:gap-y-16">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="group flex flex-col w-full cursor-pointer animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
                data-testid={`card-product-${product.id}`}
              >
                <Link href={`/product/${product.id}`}>
                  <div className="block relative aspect-[3/5] mb-2.5 md:mb-3 lg:mb-4 overflow-hidden bg-[#f8f8f8]">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-1000 group-hover:scale-105"
                    />
                    {product.hoverImage && (
                      <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden">
                        <img 
                          src={product.hoverImage} 
                          alt={`${product.name} lifestyle`} 
                          className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
                        />
                        <div className="absolute inset-0 bg-black/5"></div>
                      </div>
                    )}
                    
                    <div className="absolute bottom-0 left-0 w-full z-30 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-white hidden md:block">
                      <button className="w-full py-4 text-[10px] font-medium tracking-[0.2em] uppercase hover:bg-[#1a1308] hover:text-white transition-colors" data-testid={`button-discover-${product.id}`}>
                        Discover
                      </button>
                    </div>
                  </div>
                </Link>
                
                <div className="flex flex-col items-center px-1 text-center">
                  <Link href={`/product/${product.id}`}>
                    <span className="text-sm md:text-lg lg:text-xl font-serif mb-1 text-black hover:text-black/60 transition-colors cursor-pointer" data-testid={`text-product-name-${product.id}`}>
                      {product.name}
                    </span>
                  </Link>
                  <span className="text-[7px] md:text-[8px] lg:text-[9px] tracking-[0.2em] uppercase text-black/40 mb-1 lg:mb-2">
                    {product.collection}
                  </span>
                  <p className="text-[10px] md:text-xs lg:text-sm font-medium text-black" data-testid={`text-price-${product.id}`}>
                    {product.currency} {product.price}
                  </p>
                </div>
              </div>
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
