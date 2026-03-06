import { ArrowRight, Gift, Pencil, Truck, MailOpen } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { heroImg, products, categories } from "@/lib/data";

export default function Home() {
  const newArrivals = products.slice(0, 4);
  const bestSellers = products.slice(3, 7);
  const featureProduct = products.find(p => p.name.includes("Future Bakhoor")) || products[0];
  const featureProduct2 = products.find(p => p.name.includes("Hidden Leather")) || products[1];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Minimal Hero Section */}
        <section className="relative h-[70vh] md:h-[90vh] w-full flex flex-col justify-end pb-16 md:pb-24 px-4 overflow-hidden bg-muted/20">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={heroImg} 
              alt="Emirates Pride Perfumes" 
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle gradient for text readability if needed, but Creed keeps it very clean */}
            <div className="absolute inset-0 bg-black/5"></div>
          </div>
          
          <div className="relative z-10 text-center max-w-3xl mx-auto flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="text-[10px] md:text-[12px] font-medium tracking-[0.2em] uppercase text-white mb-4">
              Exclusive Preview
            </h1>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white mb-6 leading-tight">
              The Essence of Elegance
            </h2>
            <p className="text-white/90 text-sm md:text-base font-light mb-8 max-w-lg">
              Be the first to experience our latest masterpiece, a fragrance of untamed elegance crafted with the finest ingredients.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/collection" className="bg-white text-black px-10 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-white/90 transition-colors">
                Shop The Collection
              </Link>
              <Link href="/about" className="bg-transparent border border-white text-white px-10 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors">
                Discover More
              </Link>
            </div>
          </div>
        </section>

        {/* Brand Description - Very Minimal */}
        <section className="py-20 md:py-28 px-4 text-center max-w-4xl mx-auto">
          <p className="text-lg md:text-2xl font-serif text-foreground/80 leading-relaxed text-balance">
            <span className="italic">Emirates Pride</span> is an authentic perfume house dedicated to the creation of highly original, artisan fragrances, made from the finest ingredients the world has to offer since 2011.
          </p>
        </section>

        {/* New & Trending (Creed Style) */}
        <section className="pb-24 px-4 md:px-8 container mx-auto">
          <div className="flex justify-between items-end mb-10 border-b border-border pb-4">
            <h2 className="text-2xl md:text-3xl font-serif">New & Trending</h2>
            <Link href="/collection" className="text-[11px] font-medium tracking-[0.2em] uppercase hover:text-foreground/70 transition-colors flex items-center gap-2">
              Shop Now <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {newArrivals.map((product) => (
              <MinimalProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Full Width Feature Banner 1 */}
        <section className="py-12 md:py-0 w-full overflow-hidden bg-muted/10">
          <div className="flex flex-col md:flex-row items-center w-full">
            <div className="w-full md:w-1/2 aspect-square md:aspect-[4/3]">
              <img 
                src={featureProduct.hoverImage || featureProduct.image} 
                alt={featureProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center p-12 md:p-20 lg:p-32">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">{featureProduct.name}</h2>
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed mb-8 max-w-md">
                Experience the future of bakhoor with this exquisite creation. Unearth the shared roots and nuances of our heritage.
              </p>
              <Link href={`/product/${featureProduct.id}`} className="creed-button-outline">
                Shop Now
              </Link>
            </div>
          </div>
        </section>

        {/* Full Width Feature Banner 2 (Reversed) */}
        <section className="py-12 md:py-0 w-full overflow-hidden bg-white">
          <div className="flex flex-col md:flex-row-reverse items-center w-full">
            <div className="w-full md:w-1/2 aspect-square md:aspect-[4/3]">
              <img 
                src={featureProduct2.hoverImage || featureProduct2.image} 
                alt={featureProduct2.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center p-12 md:p-20 lg:p-32">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-6">A Tale Of Two Scents</h2>
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed mb-8 max-w-md">
                The House presents a captivating journey with {featureProduct2.name}. Discover a scent tailored to your most elegant moments.
              </p>
              <Link href={`/product/${featureProduct2.id}`} className="creed-button-outline">
                Read Now
              </Link>
            </div>
          </div>
        </section>

        {/* Fragrance Finder / Quiz Feature */}
        <section className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0">
            <img 
              src={categories[3].image} 
              alt="Fragrance Finder" 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/30"></div>
          </div>
          <div className="relative z-10 text-center px-4 max-w-2xl text-white">
            <h2 className="text-3xl md:text-5xl font-serif mb-6">Hand-Picked For You</h2>
            <p className="text-white/90 text-sm md:text-base font-light mb-8 max-w-md mx-auto">
              Venture into our Fragrance Finder experience and unearth a signature scent tailored specifically to you or someone else.
            </p>
            <button className="bg-white text-black px-10 py-3.5 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-white/90 transition-colors">
              Start The Experience
            </button>
          </div>
        </section>

        {/* Exclusively For You (Services Grid) */}
        <section className="py-24 px-4 md:px-8 container mx-auto">
          <h2 className="text-3xl font-serif text-center mb-16">Exclusively For You</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard 
              icon={<Pencil strokeWidth={1} size={32} />}
              title="Complimentary Personalization"
              description="Make your fragrance bottle uniquely yours with complimentary custom engraving."
              linkText="About Personalization"
              image={categories[0].image}
            />
            <ServiceCard 
              icon={<Gift strokeWidth={1} size={32} />}
              title="Signature Gift Wrapping"
              description="Enhance your purchase with the finest finishing touches, from gift boxes to custom messages."
              linkText="About The Art of Gifting"
              image={categories[4].image}
            />
            <ServiceCard 
              icon={<Truck strokeWidth={1} size={32} />}
              title="Complimentary Delivery"
              description="Your chosen scented indulgence is yours to enjoy with complimentary standard delivery."
              linkText="Shop Now"
              image={categories[1].image}
            />
            <ServiceCard 
              icon={<MailOpen strokeWidth={1} size={32} />}
              title="Complimentary Samples"
              description="Take your experience to the next level with complimentary samples available on select orders."
              linkText="Shop Now"
              image={categories[2].image}
            />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// Minimalist Creed-style Product Card
function MinimalProductCard({ product }: { product: any }) {
  return (
    <div className="group flex flex-col w-full text-center" data-testid={`card-product-${product.id}`}>
      <Link href={`/product/${product.id}`} className="block relative aspect-[3/4] bg-muted/10 mb-6 overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105 p-4"
        />
        {/* Subtle quick view on hover for desktop */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-6">
          <span className="text-[10px] font-medium tracking-[0.2em] uppercase bg-white px-6 py-2 shadow-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
            Quick View
          </span>
        </div>
      </Link>
      
      <div className="flex flex-col items-center px-2">
        <Link href={`/product/${product.id}`} className="text-xl font-serif mb-1 hover:text-foreground/70 transition-colors">
          {product.name}
        </Link>
        <p className="text-[11px] tracking-wide text-foreground/50 mb-3 min-h-[32px] line-clamp-2">
          {product.collection}
        </p>
        <p className="text-sm">
          <span className="text-foreground/50 mr-1">From</span>
          {product.currency} {product.price}
        </p>
      </div>
    </div>
  );
}

function ServiceCard({ icon, title, description, linkText, image }: any) {
  return (
    <div className="flex flex-col group cursor-pointer">
      <div className="aspect-square relative overflow-hidden mb-6 bg-muted">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
      </div>
      <h3 className="text-lg font-serif mb-3">{title}</h3>
      <p className="text-sm text-foreground/70 leading-relaxed mb-4 flex-1">{description}</p>
      <span className="text-[11px] font-medium tracking-[0.1em] uppercase border-b border-foreground w-fit pb-0.5 hover:text-foreground/60 hover:border-foreground/60 transition-colors">
        {linkText}
      </span>
    </div>
  );
}