import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { heroImg, products } from "@/lib/data";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={heroImg} 
              alt="Luxury perfume collection" 
              className="w-full h-full object-cover object-center"
            />
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-primary/20 to-transparent"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <span className="text-secondary/80 tracking-[0.3em] text-xs md:text-sm uppercase mb-6 font-medium">New Collection</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-secondary mb-6 leading-tight">
              The Essence of <br /> Elegance
            </h1>
            <p className="text-secondary/90 text-lg md:text-xl font-light mb-10 max-w-xl text-balance">
              Discover our latest collection of artisanal fragrances, crafted with the world's most precious ingredients.
            </p>
            <Link 
              href="/collection"
              className="bg-secondary text-primary px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-accent hover:text-accent-foreground transition-all duration-300 flex items-center gap-3 group"
              data-testid="link-explore-collection"
            >
              Explore Collection
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24 md:py-32 px-4 md:px-6 container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-serif mb-4">Signature Scents</h2>
              <p className="text-foreground/70 text-lg">Curated masterpieces that define the Emirates Pride legacy.</p>
            </div>
            <Link 
              href="/bestsellers" 
              className="text-sm font-medium tracking-widest uppercase luxury-underline pb-1 flex items-center gap-2"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {products.map((product, index) => (
              <div 
                key={product.id} 
                className="group flex flex-col hover-trigger animate-in fade-in slide-in-from-bottom-8"
                style={{ animationDelay: `${index * 150}ms`, animationFillMode: 'both' }}
                data-testid={`card-product-${product.id}`}
              >
                <Link href={`/product/${product.id}`} className="block mb-6 relative aspect-[3/4] bg-white overflow-hidden image-zoom-container">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-contain p-8"
                  />
                  
                  {/* Quick Add Overlay */}
                  <div className="absolute bottom-0 left-0 w-full p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-gradient-to-t from-black/50 to-transparent flex justify-center">
                    <button 
                      className="bg-background text-foreground px-6 py-3 w-full text-sm font-medium tracking-widest uppercase hover:bg-accent hover:text-accent-foreground transition-colors flex items-center justify-center gap-2"
                      onClick={(e) => {
                        e.preventDefault();
                        // Add to cart logic would go here
                      }}
                      data-testid={`button-quick-add-${product.id}`}
                    >
                      <ShoppingBag size={16} /> Add to Cart
                    </button>
                  </div>
                </Link>
                
                <div className="flex flex-col flex-1">
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
        </section>

        {/* Brand Story Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1 flex flex-col justify-center max-w-lg mx-auto md:mx-0">
                <span className="text-accent tracking-[0.2em] text-sm uppercase mb-4 font-medium">Our Heritage</span>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-8 leading-tight">Mastery in Every Drop</h2>
                <p className="text-foreground/70 text-lg mb-8 leading-relaxed">
                  Founded on a passion for exceptional ingredients and traditional craftsmanship, Emirates Pride merges the rich perfumery heritage of the Middle East with contemporary luxury design.
                </p>
                <Link 
                  href="/about" 
                  className="text-sm font-medium tracking-widest uppercase luxury-underline pb-1 w-fit flex items-center gap-2"
                >
                  Read Our Story <ArrowRight size={14} />
                </Link>
              </div>
              <div className="order-1 md:order-2 relative aspect-[4/5] md:aspect-square overflow-hidden bg-muted">
                {/* We'll use one of the generated product images as a mood shot here */}
                <img 
                  src={products[0].image} 
                  alt="Craftsmanship" 
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}