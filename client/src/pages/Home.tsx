import { ArrowRight, ShoppingBag, Instagram, Truck, Gift, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { heroImg, products, categories } from "@/lib/data";

export default function Home() {
  const newArrivals = products.slice(0, 4);
  const bestSellers = products.slice(3, 7);
  const futureCollection = products.filter(p => p.name.includes("Future"));

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[90vh] w-full flex items-center justify-center overflow-hidden bg-white">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={heroImg} 
              alt="Emirates Pride Perfumes" 
              className="w-full h-full object-cover object-center md:object-top"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-black/10"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000 mt-32 md:mt-48">
            <Link 
              href="/collection"
              className="bg-secondary text-primary px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-accent hover:text-accent-foreground transition-all duration-300 flex items-center gap-3 group mt-12 md:mt-24 shadow-xl"
              data-testid="link-explore-collection"
            >
              Shop New Arrivals
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Brand Philosophy - Quick Intro */}
        <section className="py-16 md:py-24 bg-white text-center px-4 border-b border-border/40">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl md:text-4xl font-serif leading-relaxed text-foreground/90 uppercase tracking-wide">
              "Crafting exceptional fragrances that capture the essence of luxury, heritage, and modern elegance since 2011."
            </h2>
            <div className="w-16 h-px bg-accent mx-auto mt-10"></div>
          </div>
        </section>

        {/* The Future Collection Highlight */}
        {futureCollection.length > 0 && (
          <section className="py-20 md:py-32 px-4 md:px-6 container mx-auto">
            <div className="flex flex-col md:flex-row gap-12 items-center">
              <div className="flex-1 space-y-6">
                <span className="text-accent tracking-[0.2em] text-sm uppercase font-medium">Exclusive Release</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif uppercase tracking-wider leading-tight">The Future<br />Collection</h2>
                <p className="text-foreground/70 text-lg leading-relaxed max-w-md">
                  A revolutionary interpretation of classic middle eastern perfumery. Discover the harmonious blend of traditional craftsmanship and modern innovation.
                </p>
                <div className="pt-4">
                  <Link 
                    href="/collection" 
                    className="inline-flex items-center gap-3 border border-foreground px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-foreground hover:text-background transition-colors"
                  >
                    Explore The Collection
                  </Link>
                </div>
              </div>
              
              <div className="flex-1 grid grid-cols-2 gap-4 md:gap-6 w-full">
                {futureCollection.slice(0, 2).map((product, idx) => (
                  <div key={product.id} className={`relative aspect-[3/4] group overflow-hidden ${idx === 1 ? 'mt-8 md:mt-16' : ''}`}>
                    <img 
                      src={product.hoverImage || product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6">
                      <h3 className="text-white font-serif text-xl">{product.name}</h3>
                      <Link href={`/product/${product.id}`} className="text-white/80 text-sm tracking-widest uppercase mt-2 hover:text-accent transition-colors flex items-center gap-1">
                        View Product <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* New Arrivals Section */}
        <section className="py-16 md:py-24 px-4 md:px-6 container mx-auto bg-muted/20">
          <div className="flex flex-col items-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4 uppercase tracking-wider">New Arrivals</h2>
            <div className="w-16 h-0.5 bg-accent mb-6"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {newArrivals.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
          
          <div className="flex justify-center mt-12">
            <Link 
              href="/collection" 
              className="text-sm font-medium tracking-widest uppercase luxury-underline pb-1 flex items-center gap-2"
            >
              View All Arrivals <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        {/* Discover Categories */}
        <section className="py-24 bg-white px-4 md:px-6">
          <div className="container mx-auto">
            <div className="flex flex-col items-center mb-16">
              <h2 className="text-3xl md:text-4xl font-serif mb-4 uppercase tracking-wider">Discover More</h2>
              <div className="w-16 h-0.5 bg-accent mb-6"></div>
            </div>

            <div className="flex overflow-x-auto pb-8 -mx-4 px-4 md:mx-0 md:px-0 md:grid md:grid-cols-3 lg:grid-cols-5 gap-6 snap-x snap-mandatory hide-scrollbar">
              {categories.map((category) => (
                <Link 
                  key={category.id} 
                  href="/collection" 
                  className="min-w-[280px] md:min-w-0 snap-center group block relative overflow-hidden aspect-[2/3] md:aspect-[3/4]"
                >
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white font-serif text-xl md:text-2xl mb-1">{category.name}</h3>
                    <p className="text-white/70 text-sm tracking-widest uppercase">{category.count} Products</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Best Sellers Section */}
        <section className="py-16 md:py-24 px-4 md:px-6 container mx-auto">
          <div className="flex flex-col items-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-serif mb-4 uppercase tracking-wider">Best Sellers</h2>
            <div className="w-16 h-0.5 bg-accent mb-6"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {bestSellers.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} badge="Best Seller" />
            ))}
          </div>
        </section>

        {/* Signature Services */}
        <section className="py-20 bg-primary text-primary-foreground border-y border-primary-foreground/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-primary-foreground/20">
              <div className="flex flex-col items-center pt-8 md:pt-0 px-4">
                <Truck size={36} className="mb-6 text-accent" strokeWidth={1.5} />
                <h3 className="font-serif text-2xl mb-3 uppercase tracking-wider">Worldwide Shipping</h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
                  Free shipping on all orders above AED 1500. Experience global delivery with premium care.
                </p>
              </div>
              <div className="flex flex-col items-center pt-12 md:pt-0 px-4">
                <Gift size={36} className="mb-6 text-accent" strokeWidth={1.5} />
                <h3 className="font-serif text-2xl mb-3 uppercase tracking-wider">Luxury Packaging</h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
                  Every order is beautifully wrapped in our signature Emirates Pride gift box.
                </p>
              </div>
              <div className="flex flex-col items-center pt-12 md:pt-0 px-4">
                <ShieldCheck size={36} className="mb-6 text-accent" strokeWidth={1.5} />
                <h3 className="font-serif text-2xl mb-3 uppercase tracking-wider">Authenticity Guaranteed</h3>
                <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
                  100% authentic fragrances crafted in the UAE with the finest global ingredients.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Brand Story Highlight */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
              <span className="text-accent tracking-[0.2em] text-sm uppercase mb-6 font-medium">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Buy Luxury Arabic Perfumes, Oud & Dakhoon Online</h2>
              <p className="text-foreground/70 text-lg md:text-xl leading-relaxed mb-10 text-balance">
                Emirates Pride is your trusted destination for luxury Arabic perfumes, authentic oud, and traditional dakhoon crafted in the UAE. Explore our exclusive collection of long-lasting eau de parfum for men, women, and unisex — from rich oriental oud perfumes and musky fragrances to floral scents and handcrafted bakhoor.
              </p>
              <Link 
                href="/about" 
                className="text-sm font-medium tracking-widest uppercase luxury-underline pb-1 flex items-center gap-2"
              >
                Read Our Full Story
              </Link>
            </div>
          </div>
        </section>
        
        {/* Instagram/Social Section */}
        <section className="py-12 md:py-20 border-t border-border/50 overflow-hidden bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center mb-12">
              <Instagram size={28} className="mb-4 text-accent" />
              <h2 className="text-2xl md:text-3xl font-serif mb-2 uppercase tracking-wider">@EmiratesPride</h2>
              <p className="text-foreground/60 text-sm">Follow us on Instagram for the latest updates</p>
            </div>
            
            {/* Mock Instagram Feed */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {products.slice(0,4).map((p, i) => (
                <div key={i} className="aspect-square relative group overflow-hidden bg-muted">
                  <img src={p.hoverImage || p.image} alt="Social post" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Instagram className="text-white" size={32} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Reusable Product Card Component
function ProductCard({ product, index, badge }: { product: any, index: number, badge?: string }) {
  return (
    <div 
      className="group flex flex-col hover-trigger animate-in fade-in slide-in-from-bottom-8"
      style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}
      data-testid={`card-product-${product.id}`}
    >
      <Link href={`/product/${product.id}`} className="block mb-6 relative aspect-[4/5] bg-white overflow-hidden border border-border/40">
        {badge && (
          <div className="absolute top-4 left-4 z-10 bg-black text-white text-[10px] tracking-widest uppercase px-3 py-1">
            {badge}
          </div>
        )}
        
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-opacity duration-500 absolute inset-0 opacity-100 group-hover:opacity-0 p-4"
        />
        {product.hoverImage && (
          <img 
            src={product.hoverImage} 
            alt={`${product.name} lifestyle`} 
            className="w-full h-full object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 scale-105 group-hover:scale-100"
          />
        )}
        
        {/* Quick Add Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-black/60 to-transparent flex justify-center z-20">
          <button 
            className="bg-white text-black px-6 py-3 w-full text-sm font-medium tracking-widest uppercase hover:bg-accent hover:text-white transition-colors flex items-center justify-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              // Add to cart logic
            }}
            data-testid={`button-quick-add-${product.id}`}
          >
            <ShoppingBag size={16} /> Quick View
          </button>
        </div>
      </Link>
      
      <div className="flex flex-col flex-1 text-center">
        <Link href={`/product/${product.id}`} className="text-lg font-serif mb-2 hover:text-accent transition-colors">
          {product.name}
        </Link>
        <p className="text-accent font-medium mt-auto tracking-wide">
          {product.currency} {product.price}
        </p>
      </div>
    </div>
  );
}