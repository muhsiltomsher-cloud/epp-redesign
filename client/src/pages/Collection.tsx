import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown, Filter } from "lucide-react";
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

      <main className="flex-1 pt-24">
        <header className="bg-white py-16 md:py-24 px-4 text-center border-b border-black/5">
          <h1 className="text-4xl md:text-6xl font-serif mb-6 uppercase tracking-wider text-black animate-in fade-in slide-in-from-bottom-4" data-testid="text-collection-title">Our Collections</h1>
          <p className="text-black/60 max-w-2xl mx-auto text-sm md:text-base font-light animate-in fade-in slide-in-from-bottom-6 delay-150">
            Explore our curated selection of masterful fragrances, crafted with the world's most precious ingredients.
          </p>
        </header>

        <section className="container mx-auto px-4 md:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 pb-6 border-b border-black/5">
            <div className="hidden md:flex items-center gap-10 overflow-x-auto w-full md:w-auto pb-4 md:pb-0">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`text-[10px] tracking-[0.2em] uppercase transition-colors whitespace-nowrap ${
                    activeCategory === category 
                      ? 'text-black font-medium border-b border-black pb-1' 
                      : 'text-black/50 hover:text-black pb-1'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            <button className="md:hidden w-full flex items-center justify-between py-4 border-b border-black/10 text-[10px] uppercase tracking-[0.2em] font-medium text-black" data-testid="button-mobile-filter">
              <span>Filter: {activeCategory}</span>
              <Filter size={16} strokeWidth={1} />
            </button>

            <div className="flex items-center gap-2 text-[10px] tracking-[0.2em] uppercase text-black/60 cursor-pointer hover:text-black transition-colors group w-full md:w-auto justify-between md:justify-end py-4 md:py-0 border-b border-black/10 md:border-none">
              <span className="group-hover:border-b group-hover:border-black pb-0.5">Sort By</span>
              <ChevronDown size={14} strokeWidth={1} />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12 md:gap-y-20">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="group flex flex-col w-full cursor-pointer animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
                data-testid={`card-product-${product.id}`}
              >
                <Link href={`/product/${product.id}`}>
                  <div className="block relative aspect-[3/4] mb-4 overflow-hidden bg-[#f8f8f8]">
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
                      <button className="w-full py-4 text-[10px] font-medium tracking-[0.2em] uppercase hover:bg-black hover:text-white transition-colors" data-testid={`button-discover-${product.id}`}>
                        Discover
                      </button>
                    </div>
                  </div>
                </Link>
                
                <div className="flex flex-col items-center px-1 text-center">
                  <Link href={`/product/${product.id}`}>
                    <span className="text-base md:text-xl font-serif mb-1 text-black hover:text-black/60 transition-colors cursor-pointer" data-testid={`text-product-name-${product.id}`}>
                      {product.name}
                    </span>
                  </Link>
                  <span className="text-[8px] md:text-[9px] tracking-[0.2em] uppercase text-black/40 mb-2">
                    {product.collection}
                  </span>
                  <p className="text-xs font-medium text-black" data-testid={`text-price-${product.id}`}>
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
