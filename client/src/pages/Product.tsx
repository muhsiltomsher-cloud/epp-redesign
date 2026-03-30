import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "wouter";
import { Minus, Plus, ChevronDown, Star, Truck, ShieldCheck, Box, Maximize2, X, ChevronLeft, ChevronRight, Heart, Check } from "lucide-react";
import { gsap } from "gsap";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products } from "@/lib/data";
import { addRecentlyViewed } from "@/lib/recentlyViewed";
import { addToCart } from "@/lib/cart";
import { toggleWishlist, isInWishlist } from "@/lib/wishlist";

export default function Product() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [hoveredRelated, setHoveredRelated] = useState<string | null>(null);
  
  const detailsColRef = useRef<HTMLDivElement>(null);
  const addedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (id) {
      addRecentlyViewed(id);
      setWishlisted(isInWishlist(id));
      setAddedToCart(false);
      setQuantity(1);
      setFullscreenIndex(null);
      if (addedTimerRef.current) clearTimeout(addedTimerRef.current);
    }
  }, [id]);

  useEffect(() => {
    if (detailsColRef.current) {
      const children = detailsColRef.current.querySelector('.details-inner');
      if (children) {
        gsap.fromTo(children.children, 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.2 }
        );
      }
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return null;

  const gallery = product.gallery || [product.image, product.hoverImage].filter(Boolean) as string[];
  const relatedProducts = products.filter(p => p.id !== product.id && p.collection === product.collection).slice(0, 4);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[80px] md:pt-[116px]">
        <div className="flex flex-col md:flex-row w-full max-w-[1800px] mx-auto relative">
          
          <div className="w-full md:w-1/2">
            <div className="absolute top-3 left-4 md:top-6 md:left-6 z-10">
              <nav className="flex items-center gap-1.5 text-[8px] md:text-[9px] uppercase tracking-[0.15em]" data-testid="breadcrumb-nav">
                <Link href="/" className="text-black hover:text-black transition-colors">Home</Link>
                <span className="text-black">/</span>
                <Link href="/collection" className="text-black hover:text-black transition-colors">{product.collection}</Link>
                <span className="text-black">/</span>
                <span className="text-black">{product.name}</span>
              </nav>
            </div>

            <div className="flex flex-col">
              {gallery.map((img, i) => (
                <div 
                  key={i} 
                  className="bg-[#f5f5f5] relative aspect-[3/4] overflow-hidden group/img cursor-pointer"
                  onClick={() => setFullscreenIndex(i)}
                >
                  <img 
                    src={img} 
                    alt={`${product.name} - ${i + 1}`} 
                    className="w-full h-full object-cover"
                    data-testid={`img-product-${i}`}
                  />
                  <button 
                    className="absolute top-3 right-3 md:top-4 md:right-4 w-8 h-8 md:w-9 md:h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 text-black hover:text-black hover:bg-white"
                    data-testid={`button-fullscreen-${i}`}
                  >
                    <Maximize2 size={14} strokeWidth={1.5} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div ref={detailsColRef} className="w-full md:w-1/2 pb-20 md:pb-0">
            <div className="md:sticky md:top-[70px]">
              <div className="details-inner px-4 py-5 md:p-10 lg:p-16 xl:p-20 max-w-[650px] mx-auto w-full">
                
                <div className="mb-6 md:mb-10">
                  <div className="flex items-center gap-3 mb-2 md:mb-4">
                    <span className="text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-[#c9a96e]" data-testid="text-product-collection">
                      {product.collection}
                    </span>
                    {product.badge && (
                      <span 
                        className={`text-[7px] md:text-[8px] font-semibold tracking-[0.15em] uppercase px-2.5 py-0.5 ${
                          product.badge === 'BESTSELLER' 
                            ? 'bg-[#c9a96e] text-white' 
                            : 'bg-white text-[#1a1308] border border-[#c9a96e]/40'
                        }`}
                        data-testid="badge-product"
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl md:text-5xl lg:text-6xl font-serif mb-2 md:mb-4 text-black tracking-wide leading-tight" data-testid="text-product-name">
                    {product.name}
                  </h1>
                  
                  <div className="flex items-center justify-between mb-3 md:mb-6">
                    <div className="flex items-center gap-3 md:gap-4">
                      <p className="text-base md:text-xl text-black font-medium" data-testid="text-product-price">
                        {product.currency} {product.price}
                      </p>
                      <div className="flex items-center gap-0.5 text-[#c9a96e]">
                        <Star size={10} fill="currentColor" />
                        <Star size={10} fill="currentColor" />
                        <Star size={10} fill="currentColor" />
                        <Star size={10} fill="currentColor" />
                        <Star size={10} fill="currentColor" />
                        <span className="text-[8px] md:text-[10px] text-black ml-1.5 tracking-wider uppercase">(12)</span>
                      </div>
                    </div>
                    <button
                      className={`w-9 h-9 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        wishlisted 
                          ? 'border-[#c9a96e] bg-[#c9a96e]/10 text-[#c9a96e]' 
                          : 'border-black/15 text-black hover:border-[#c9a96e] hover:text-[#c9a96e]'
                      }`}
                      onClick={() => {
                        if (id) {
                          const added = toggleWishlist(id);
                          setWishlisted(added);
                        }
                      }}
                      data-testid="button-wishlist"
                    >
                      <Heart size={15} strokeWidth={1.5} fill={wishlisted ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  
                  <p className="text-[11px] md:text-sm text-black leading-relaxed font-light mt-4 md:mt-6 border-t border-black/5 pt-4 md:pt-6" data-testid="text-product-description">
                    {product.description}
                  </p>
                </div>

                <div className="hidden md:flex flex-col gap-4 mb-12">
                  <div className="mb-2">
                    <span className="text-[8px] md:text-[9px] tracking-[0.2em] uppercase text-black mb-2 block">Size</span>
                    <div className="flex gap-2">
                      <span className="px-4 py-2 text-[9px] md:text-[10px] tracking-[0.15em] uppercase font-medium border-2 border-[#c9a96e] text-[#1a1308] bg-[#c9a96e]/5 cursor-default" data-testid="size-selector">
                        50 ML
                      </span>
                    </div>
                  </div>
                  <div className="flex items-stretch gap-4 h-14">
                    <div className="flex items-center border border-[#c9a96e]/30 bg-white w-32">
                      <button 
                        className="px-4 text-black hover:text-black transition-colors"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        data-testid="button-quantity-minus"
                      >
                        <Minus size={14} strokeWidth={1} />
                      </button>
                      <span className="flex-1 text-center text-xs font-medium" data-testid="text-quantity">{quantity}</span>
                      <button 
                        className="px-4 text-black hover:text-black transition-colors"
                        onClick={() => setQuantity(quantity + 1)}
                        data-testid="button-quantity-plus"
                      >
                        <Plus size={14} strokeWidth={1} />
                      </button>
                    </div>
                    
                    <button 
                      className={`flex-1 px-4 text-[10px] font-medium tracking-[0.2em] uppercase transition-all duration-500 text-center flex items-center justify-center gap-2 ${
                        addedToCart 
                          ? 'bg-[#c9a96e] text-white' 
                          : 'bg-[#1a1308] text-white hover:bg-[#c9a96e]'
                      }`}
                      onClick={() => {
                        if (product && !addedToCart) {
                          addToCart(product.id, quantity);
                          setAddedToCart(true);
                          setQuantity(1);
                          addedTimerRef.current = setTimeout(() => setAddedToCart(false), 2500);
                        }
                      }}
                      data-testid="button-add-to-cart"
                    >
                      {addedToCart ? (
                        <><Check size={14} strokeWidth={2} /> Added to Cart</>
                      ) : (
                        'Add to Cart'
                      )}
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-6 py-6 border-y border-black/5">
                    <div className="flex flex-col items-center text-center gap-2">
                      <Truck size={16} strokeWidth={1} className="text-[#c9a96e]" />
                      <span className="text-[8px] uppercase tracking-widest text-black font-medium">Free<br/>Shipping</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2 border-x border-black/5">
                      <Box size={16} strokeWidth={1} className="text-[#c9a96e]" />
                      <span className="text-[8px] uppercase tracking-widest text-black font-medium">Luxury<br/>Packaging</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2">
                      <ShieldCheck size={16} strokeWidth={1} className="text-[#c9a96e]" />
                      <span className="text-[8px] uppercase tracking-widest text-black font-medium">100%<br/>Authentic</span>
                    </div>
                  </div>
                </div>

                <div className="flex md:hidden items-center justify-between py-4 mb-4 border-y border-black/5">
                  <div className="flex items-center gap-3 text-[8px] uppercase tracking-widest text-black">
                    <Truck size={13} strokeWidth={1} className="text-[#c9a96e]" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-3 text-[8px] uppercase tracking-widest text-black">
                    <Box size={13} strokeWidth={1} className="text-[#c9a96e]" />
                    <span>Gift Box</span>
                  </div>
                  <div className="flex items-center gap-3 text-[8px] uppercase tracking-widest text-black">
                    <ShieldCheck size={13} strokeWidth={1} className="text-[#c9a96e]" />
                    <span>Authentic</span>
                  </div>
                </div>

                <div className="flex flex-col border-b border-black/10">
                  
                  <div className="border-t border-black/10">
                    <button 
                      className="w-full py-5 flex justify-between items-center text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-medium text-black"
                      onClick={() => setActiveTab(activeTab === 'description' ? '' : 'description')}
                      data-testid="button-tab-inspiration"
                    >
                      <span>The Inspiration</span>
                      {activeTab === 'description' ? <Minus size={14} strokeWidth={1}/> : <Plus size={14} strokeWidth={1}/>}
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeTab === 'description' ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
                      <p className="text-[11px] md:text-xs text-black font-light leading-relaxed">
                        Crafted with meticulous attention to detail, this masterpiece embodies the essence of luxury and sophistication that Emirates Pride is renowned for. The fragrance journey begins with vibrant top notes, settling into a rich, complex heart before revealing a long-lasting, profound base.
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-black/10">
                    <button 
                      className="w-full py-5 flex justify-between items-center text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-medium text-black"
                      onClick={() => setActiveTab(activeTab === 'notes' ? '' : 'notes')}
                      data-testid="button-tab-notes"
                    >
                      <span>Olfactory Notes</span>
                      {activeTab === 'notes' ? <Minus size={14} strokeWidth={1}/> : <Plus size={14} strokeWidth={1}/>}
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeTab === 'notes' ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
                      <div className="flex flex-col gap-3 text-[11px] md:text-xs text-black font-light">
                        <div className="flex border-b border-black/5 pb-2">
                          <span className="w-24 font-medium text-black uppercase tracking-wider text-[9px]">Top:</span>
                          <span>Bergamot, Saffron, Pink Pepper</span>
                        </div>
                        <div className="flex border-b border-black/5 pb-2">
                          <span className="w-24 font-medium text-black uppercase tracking-wider text-[9px]">Heart:</span>
                          <span>Rose, Jasmine, Cedarwood</span>
                        </div>
                        <div className="flex">
                          <span className="w-24 font-medium text-black uppercase tracking-wider text-[9px]">Base:</span>
                          <span>Oud, Amber, Vanilla, Musk</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-black/10">
                    <button 
                      className="w-full py-5 flex justify-between items-center text-[9px] md:text-[10px] tracking-[0.2em] uppercase font-medium text-black"
                      onClick={() => setActiveTab(activeTab === 'delivery' ? '' : 'delivery')}
                      data-testid="button-tab-delivery"
                    >
                      <span>Delivery & Returns</span>
                      {activeTab === 'delivery' ? <Minus size={14} strokeWidth={1}/> : <Plus size={14} strokeWidth={1}/>}
                    </button>
                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${activeTab === 'delivery' ? 'max-h-96 opacity-100 pb-5' : 'max-h-0 opacity-0'}`}>
                      <p className="text-[11px] md:text-xs text-black font-light leading-relaxed">
                        Enjoy complimentary standard shipping on all orders over AED 1500. Every order is carefully packed in our signature luxurious gift wrapping. You may return any unopened item within 14 days of delivery.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>

        {relatedProducts.length > 0 && (
          <section className="px-4 md:px-10 lg:px-20 xl:px-28 py-10 md:py-20 bg-[#faf9f7]">
            <div className="w-12 h-[1px] bg-[#c9a96e] mx-auto mb-4 md:mb-6"></div>
            <h2 className="text-[8px] md:text-[10px] font-medium tracking-[0.3em] uppercase text-[#c9a96e] mb-2 md:mb-3 text-center">You May Also Like</h2>
            <h3 className="text-xl md:text-3xl lg:text-4xl font-serif text-center mb-6 md:mb-12">From {product.collection}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2.5 md:gap-x-4 lg:gap-x-6 gap-y-6 md:gap-y-10">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`}>
                  <div 
                    className="group flex flex-col cursor-pointer" 
                    data-testid={`card-related-${p.id}`}
                    onMouseEnter={() => setHoveredRelated(p.id)}
                    onMouseLeave={() => setHoveredRelated(null)}
                  >
                    <div className="relative aspect-[3/5] mb-2.5 md:mb-3 overflow-hidden bg-[#f8f8f8]">
                      <img 
                        src={hoveredRelated === p.id && p.hoverImage ? p.hoverImage : p.image} 
                        alt={p.name} 
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" 
                      />
                      {p.badge && (
                        <span 
                          className={`absolute top-2 left-2 md:top-3 md:left-3 text-[7px] md:text-[8px] font-semibold tracking-[0.15em] uppercase px-2 py-0.5 ${
                            p.badge === 'BESTSELLER' 
                              ? 'bg-[#c9a96e] text-white' 
                              : 'bg-white text-[#1a1308] border border-[#c9a96e]/40'
                          }`}
                        >
                          {p.badge}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <span className="text-sm md:text-base font-serif mb-0.5 text-black group-hover:text-black transition-colors">{p.name}</span>
                      <p className="text-[10px] md:text-xs font-medium text-black">{p.currency} {p.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-black/10 px-4 py-3 flex items-center gap-3 safe-area-bottom">
        <div className="flex items-center border border-[#c9a96e]/30 h-10 bg-white">
          <button 
            className="px-3 text-black active:text-black"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus size={12} strokeWidth={1.5} />
          </button>
          <span className="w-6 text-center text-[10px] font-medium">{quantity}</span>
          <button 
            className="px-3 text-black active:text-black"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus size={12} strokeWidth={1.5} />
          </button>
        </div>
        <button 
          className={`flex-1 h-10 text-[9px] font-medium tracking-[0.2em] uppercase transition-all duration-500 flex items-center justify-center gap-1.5 ${
            addedToCart 
              ? 'bg-[#c9a96e] text-white' 
              : 'bg-[#1a1308] text-white active:bg-[#c9a96e]'
          }`}
          onClick={() => {
            if (product && !addedToCart) {
              addToCart(product.id, quantity);
              setAddedToCart(true);
              setQuantity(1);
              addedTimerRef.current = setTimeout(() => setAddedToCart(false), 2500);
            }
          }}
          data-testid="button-add-to-cart-mobile"
        >
          {addedToCart ? (
            <><Check size={12} strokeWidth={2} /> Added</>
          ) : (
            <>Add to Cart — {product.currency} {product.price}</>
          )}
        </button>
      </div>
      {fullscreenIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
          onClick={() => setFullscreenIndex(null)}
        >
          <button 
            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:text-white hover:bg-white/20 transition-colors z-10"
            onClick={() => setFullscreenIndex(null)}
            data-testid="button-close-fullscreen"
          >
            <X size={20} strokeWidth={1.5} />
          </button>

          {gallery.length > 1 && (
            <>
              <button 
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:text-white hover:bg-white/20 transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); setFullscreenIndex((fullscreenIndex - 1 + gallery.length) % gallery.length); }}
                data-testid="button-fullscreen-prev"
              >
                <ChevronLeft size={20} strokeWidth={1.5} />
              </button>
              <button 
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:text-white hover:bg-white/20 transition-colors z-10"
                onClick={(e) => { e.stopPropagation(); setFullscreenIndex((fullscreenIndex + 1) % gallery.length); }}
                data-testid="button-fullscreen-next"
              >
                <ChevronRight size={20} strokeWidth={1.5} />
              </button>
            </>
          )}

          <img 
            src={gallery[fullscreenIndex]} 
            alt={`${product.name} fullscreen`}
            className="max-w-[90vw] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
            {gallery.map((_, i) => (
              <button 
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${i === fullscreenIndex ? 'bg-[#c9a96e] scale-125' : 'bg-white/30 hover:bg-white/60'}`}
                onClick={(e) => { e.stopPropagation(); setFullscreenIndex(i); }}
              />
            ))}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
