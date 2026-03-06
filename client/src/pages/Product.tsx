import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "wouter";
import { Minus, Plus, ChevronDown, Star, Truck, ShieldCheck, Box } from "lucide-react";
import { gsap } from "gsap";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products } from "@/lib/data";
import { addRecentlyViewed } from "@/lib/recentlyViewed";

export default function Product() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  
  const detailsColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) addRecentlyViewed(id);
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
      <main className="flex-1 pt-[52px] md:pt-[70px]">
        <div className="flex flex-col md:flex-row w-full max-w-[1800px] mx-auto relative">
          
          <div className="w-full md:w-1/2">
            <div className="absolute top-3 left-4 md:top-6 md:left-6 z-10">
              <Link href="/collection" className="text-[8px] md:text-[9px] uppercase tracking-[0.2em] text-black/50 hover:text-black transition-colors flex items-center gap-2" data-testid="link-back-collection">
                <span className="w-3 md:w-4 h-[1px] bg-current"></span> Back
              </Link>
            </div>

            <div className="flex flex-col">
              {gallery.map((img, i) => (
                <div 
                  key={i} 
                  className="bg-[#f5f5f5] flex items-center justify-center p-6 md:p-12 lg:p-16 aspect-[3/4] pl-[0px] pr-[0px] pt-[0px] pb-[0px]"
                >
                  <img 
                    src={img} 
                    alt={`${product.name} - ${i + 1}`} 
                    className="w-full h-full object-contain mix-blend-multiply"
                    data-testid={`img-product-${i}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div ref={detailsColRef} className="w-full md:w-1/2 pb-20 md:pb-0">
            <div className="md:sticky md:top-[70px]">
              <div className="details-inner px-4 py-5 md:p-10 lg:p-16 xl:p-20 max-w-[650px] mx-auto w-full">
                
                <div className="mb-6 md:mb-10">
                  <span className="text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] mb-2 md:mb-4 block" data-testid="text-product-collection">
                    {product.collection}
                  </span>
                  <h1 className="text-2xl md:text-5xl lg:text-6xl font-serif mb-2 md:mb-4 text-black tracking-wide leading-tight" data-testid="text-product-name">
                    {product.name}
                  </h1>
                  
                  <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-6">
                    <p className="text-base md:text-xl text-black font-medium" data-testid="text-product-price">
                      {product.currency} {product.price}
                    </p>
                    <div className="flex items-center gap-0.5 text-[#c9a96e]">
                      <Star size={10} fill="currentColor" />
                      <Star size={10} fill="currentColor" />
                      <Star size={10} fill="currentColor" />
                      <Star size={10} fill="currentColor" />
                      <Star size={10} fill="currentColor" />
                      <span className="text-[8px] md:text-[10px] text-black/50 ml-1.5 tracking-wider uppercase">(12)</span>
                    </div>
                  </div>
                  
                  <p className="text-[11px] md:text-sm text-black/70 leading-relaxed font-light mt-4 md:mt-6 border-t border-black/5 pt-4 md:pt-6" data-testid="text-product-description">
                    {product.description}
                  </p>
                </div>

                <div className="hidden md:flex flex-col gap-4 mb-12">
                  <div className="flex items-stretch gap-4 h-14">
                    <div className="flex items-center border border-[#c9a96e]/30 bg-white w-32">
                      <button 
                        className="px-4 text-black/50 hover:text-black transition-colors"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        data-testid="button-quantity-minus"
                      >
                        <Minus size={14} strokeWidth={1} />
                      </button>
                      <span className="flex-1 text-center text-xs font-medium" data-testid="text-quantity">{quantity}</span>
                      <button 
                        className="px-4 text-black/50 hover:text-black transition-colors"
                        onClick={() => setQuantity(quantity + 1)}
                        data-testid="button-quantity-plus"
                      >
                        <Plus size={14} strokeWidth={1} />
                      </button>
                    </div>
                    
                    <button className="flex-1 bg-[#1a1308] text-white px-4 text-[10px] font-medium tracking-[0.2em] uppercase hover:bg-[#c9a96e] transition-colors text-center" data-testid="button-add-to-cart">
                      Add to Cart
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-6 py-6 border-y border-black/5">
                    <div className="flex flex-col items-center text-center gap-2">
                      <Truck size={16} strokeWidth={1} className="text-[#c9a96e]" />
                      <span className="text-[8px] uppercase tracking-widest text-black/60 font-medium">Free<br/>Shipping</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2 border-x border-black/5">
                      <Box size={16} strokeWidth={1} className="text-[#c9a96e]" />
                      <span className="text-[8px] uppercase tracking-widest text-black/60 font-medium">Luxury<br/>Packaging</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-2">
                      <ShieldCheck size={16} strokeWidth={1} className="text-[#c9a96e]" />
                      <span className="text-[8px] uppercase tracking-widest text-black/60 font-medium">100%<br/>Authentic</span>
                    </div>
                  </div>
                </div>

                <div className="flex md:hidden items-center justify-between py-4 mb-4 border-y border-black/5">
                  <div className="flex items-center gap-3 text-[8px] uppercase tracking-widest text-black/50">
                    <Truck size={13} strokeWidth={1} className="text-[#c9a96e]" />
                    <span>Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-3 text-[8px] uppercase tracking-widest text-black/50">
                    <Box size={13} strokeWidth={1} className="text-[#c9a96e]" />
                    <span>Gift Box</span>
                  </div>
                  <div className="flex items-center gap-3 text-[8px] uppercase tracking-widest text-black/50">
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
                      <p className="text-[11px] md:text-xs text-black/70 font-light leading-relaxed">
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
                      <div className="flex flex-col gap-3 text-[11px] md:text-xs text-black/70 font-light">
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
                      <p className="text-[11px] md:text-xs text-black/70 font-light leading-relaxed">
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
          <section className="px-4 md:px-10 lg:px-20 xl:px-28 py-10 md:py-20 bg-white border-t border-black/5">
            <h2 className="text-[8px] md:text-[10px] font-medium tracking-[0.3em] uppercase text-[#c9a96e] mb-2 md:mb-3 text-center">You May Also Like</h2>
            <h3 className="text-xl md:text-3xl lg:text-4xl font-serif text-center mb-6 md:mb-12">From {product.collection}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2.5 md:gap-x-4 lg:gap-x-6 gap-y-6 md:gap-y-10">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`}>
                  <div className="group flex flex-col cursor-pointer" data-testid={`card-related-${p.id}`}>
                    <div className="relative aspect-[3/5] mb-2.5 md:mb-3 overflow-hidden bg-[#f8f8f8]">
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <span className="text-sm md:text-base font-serif mb-0.5 text-black group-hover:text-black/60 transition-colors">{p.name}</span>
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
            className="px-3 text-black/50 active:text-black"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus size={12} strokeWidth={1.5} />
          </button>
          <span className="w-6 text-center text-[10px] font-medium">{quantity}</span>
          <button 
            className="px-3 text-black/50 active:text-black"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus size={12} strokeWidth={1.5} />
          </button>
        </div>
        <button className="flex-1 bg-[#1a1308] text-white h-10 text-[9px] font-medium tracking-[0.2em] uppercase active:bg-[#c9a96e] transition-colors" data-testid="button-add-to-cart-mobile">
          Add to Cart — {product.currency} {product.price}
        </button>
      </div>
      <Footer />
    </div>
  );
}
