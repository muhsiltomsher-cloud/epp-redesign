import { useState } from "react";
import { Link } from "wouter";
import { ChevronDown, Filter, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products } from "@/lib/data";

const CATEGORIES = ["All", "Heritage Collection", "Floral Collection", "Signature Collection"];

export default function Collection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(p => p.collection === activeCategory);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Header */}
        <header className="bg-white py-20 px-4 text-center border-b border-border/50">
          <h1 className="text-5xl md:text-6xl font-serif mb-6 animate-in fade-in slide-in-from-bottom-4">Our Collections</h1>
          <p className="text-foreground/70 max-w-2xl mx-auto text-lg animate-in fade-in slide-in-from-bottom-6 delay-150">
            Explore our curated selection of masterful fragrances, designed to evoke emotions and create lasting memories.
          </p>
        </header>

        <section className="container mx-auto px-4 md:px-6 py-12">
          {/* Controls */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 pb-6 border-b border-border/50">
            {/* Desktop Categories */}
            <div className="hidden md:flex items-center gap-8">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`text-sm tracking-widest uppercase transition-colors luxury-underline ${
                    activeCategory === category 
                      ? 'text-foreground font-medium border-b border-foreground' 
                      : 'text-foreground/60 hover:text-foreground'
                  }`}
                  data-testid={`filter-${category.toLowerCase().replace(' ', '-')}`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Mobile Filter Button */}
            <button className="md:hidden w-full flex items-center justify-between py-3 border border-border px-4 bg-white text-sm uppercase tracking-widest font-medium">
              <span>Filter: {activeCategory}</span>
              <Filter size={16} />
            </button>

            {/* Sort */}
            <div className="flex items-center gap-2 text-sm tracking-widest uppercase text-foreground/80 cursor-pointer hover:text-foreground transition-colors group ml-auto md:ml-0">
              <span className="group-hover:luxury-underline">Sort By</span>
              <ChevronDown size={16} />
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {filteredProducts.map((product, index) => (
              <div 
                key={product.id} 
                className="group flex flex-col hover-trigger animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}
                data-testid={`card-product-${product.id}`}
              >
                <Link href={`/product/${product.id}`} className="block mb-6 relative aspect-[3/4] bg-white overflow-hidden image-zoom-container">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain p-8"
                  />
                  
                  <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-black/50 to-transparent flex justify-center">
                    <button 
                      className="bg-background text-foreground px-6 py-3 w-full text-sm font-medium tracking-widest uppercase hover:bg-accent hover:text-accent-foreground transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      data-testid={`button-quick-add-${product.id}`}
                    >
                      Quick Add
                    </button>
                  </div>
                </Link>
                
                <div className="flex flex-col flex-1 text-center">
                  <span className="text-xs tracking-widest text-foreground/50 uppercase mb-2">{product.collection}</span>
                  <Link href={`/product/${product.id}`} className="text-xl font-serif mb-2 hover:text-accent transition-colors">
                    {product.name}
                  </Link>
                  <p className="text-accent font-medium mt-auto">
                    {product.currency} {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-24 text-center text-foreground/60 font-serif text-xl">
              No products found in this collection.
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}