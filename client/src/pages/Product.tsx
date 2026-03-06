import { useState } from "react";
import { useParams, Link } from "wouter";
import { Minus, Plus, ShoppingBag, ArrowLeft, Star } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products } from "@/lib/data";

export default function Product() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.image);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-32 text-center px-4">
          <h1 className="text-4xl font-serif mb-4">Product Not Found</h1>
          <p className="text-foreground/70 mb-8">The fragrance you are looking for does not exist or has been removed.</p>
          <Link href="/collection" className="bg-primary text-primary-foreground px-8 py-4 text-sm font-medium tracking-widest uppercase hover:bg-accent hover:text-accent-foreground transition-colors">
            Return to Collection
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const images = [product.image, product.hoverImage].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 bg-white">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          {/* Breadcrumbs */}
          <div className="mb-8">
            <Link href="/collection" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors luxury-underline pb-1">
              <ArrowLeft size={14} /> Back to Collection
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            {/* Images */}
            <div className="flex flex-col md:flex-row-reverse gap-4 animate-in fade-in slide-in-from-left-8 duration-700">
              {/* Main Image */}
              <div className="flex-1 aspect-[4/5] bg-muted/10 relative overflow-hidden flex items-center justify-center">
                <img 
                  src={mainImage || product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-visible">
                  {images.map((img, i) => (
                    <button 
                      key={i} 
                      onClick={() => setMainImage(img)}
                      className={`w-20 md:w-24 aspect-[4/5] bg-muted/10 overflow-hidden flex-shrink-0 border-2 transition-colors ${
                        (mainImage || product.image) === img ? 'border-accent' : 'border-transparent hover:border-border'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${i}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center animate-in fade-in slide-in-from-right-8 duration-700 delay-150 py-8">
              <span className="text-accent tracking-[0.2em] text-xs uppercase mb-4 font-medium block">{product.collection}</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4 uppercase tracking-wider">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-8 pb-8 border-b border-border/50">
                <p className="text-2xl text-primary font-medium">
                  {product.currency} {product.price}
                </p>
                <div className="flex items-center gap-1 text-accent ml-auto">
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <Star size={16} fill="currentColor" />
                  <span className="text-foreground/50 text-sm ml-2 font-sans tracking-wide">(12 Reviews)</span>
                </div>
              </div>

              <p className="text-foreground/80 text-lg leading-relaxed mb-10 text-balance">
                {product.description}
                <br/><br/>
                Crafted with meticulous attention to detail, this masterpiece embodies the essence of luxury and sophistication that Emirates Pride is renowned for.
              </p>

              {/* Add to Cart Actions */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-border bg-white">
                    <button 
                      className="p-4 text-foreground/60 hover:text-foreground hover:bg-muted transition-colors"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      data-testid="button-decrease-qty"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-12 text-center font-medium" data-testid="text-quantity">{quantity}</span>
                    <button 
                      className="p-4 text-foreground/60 hover:text-foreground hover:bg-muted transition-colors"
                      onClick={() => setQuantity(quantity + 1)}
                      data-testid="button-increase-qty"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <button 
                    className="flex-1 bg-primary text-primary-foreground py-4 text-sm font-medium tracking-widest uppercase hover:bg-accent hover:text-accent-foreground transition-all duration-300 flex items-center justify-center gap-3"
                    data-testid="button-add-to-cart"
                  >
                    <ShoppingBag size={18} />
                    Add to Cart
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-4 pt-8 mt-8 border-t border-border/50 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-accent">✧</span>
                    <span className="text-xs tracking-widest uppercase text-foreground/70">Complimentary<br/>Shipping</span>
                  </div>
                  <div className="flex flex-col items-center gap-2 border-l border-r border-border/50">
                    <span className="text-accent">✧</span>
                    <span className="text-xs tracking-widest uppercase text-foreground/70">Luxury<br/>Packaging</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-accent">✧</span>
                    <span className="text-xs tracking-widest uppercase text-foreground/70">Secure<br/>Payment</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}