import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "wouter";
import { Minus, Plus, ChevronDown, ChevronUp, Star, Truck, ShieldCheck, Box } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Product() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [mainImage, setMainImage] = useState(product?.image);
  
  const mainRef = useRef<HTMLDivElement>(null);
  const imageColRef = useRef<HTMLDivElement>(null);
  const detailsColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (imageColRef.current && window.innerWidth >= 768) {
        ScrollTrigger.create({
          trigger: mainRef.current,
          start: "top top+=70", 
          end: "bottom bottom",
          pin: imageColRef.current,
          pinSpacing: false,
        });
      }
      
      if (detailsColRef.current) {
        gsap.fromTo(detailsColRef.current.children, 
          { y: 30, opacity: 0 }, 
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.2 }
        );
      }
    });

    window.scrollTo(0, 0);

    return () => ctx.revert();
  }, [id]);

  if (!product) return null;

  const images = [product.image, product.hoverImage].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main ref={mainRef} className="flex-1 pt-[60px] md:pt-[70px] relative">
        <div className="flex flex-col md:flex-row w-full max-w-[1800px] mx-auto min-h-[calc(100vh-70px)]">
          
          <div ref={imageColRef} className="w-full md:w-1/2 md:h-[calc(100vh-70px)] bg-[#f5f5f5] flex flex-col overflow-hidden relative">
            <div className="w-full h-full relative flex items-center justify-center p-8 md:p-16">
              <img 
                src={mainImage || product.image} 
                alt={product.name} 
                className="w-full h-full object-contain mix-blend-multiply"
                data-testid="img-product-main"
              />
            </div>
            
            <div className="absolute top-6 left-6 z-10">
              <Link href="/collection" className="text-[9px] uppercase tracking-[0.2em] text-black/50 hover:text-black transition-colors flex items-center gap-2" data-testid="link-back-collection">
                <span className="w-4 h-[1px] bg-current"></span> Back to Collection
              </Link>
            </div>
            
            {images.length > 1 && (
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-4 z-10">
                {images.map((img, i) => (
                  <button 
                    key={i} 
                    onClick={() => setMainImage(img)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      (mainImage || product.image) === img ? 'bg-[#c9a96e] scale-125' : 'bg-black/20 hover:bg-[#c9a96e]/50'
                    }`}
                    aria-label={`View image ${i+1}`}
                    data-testid={`button-thumbnail-${i}`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 flex flex-col bg-white">
            <div ref={detailsColRef} className="p-6 md:p-12 lg:p-20 max-w-[650px] mx-auto w-full">
              
              <div className="mb-10">
                <span className="text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-[#c9a96e] mb-4 block" data-testid="text-product-collection">
                  {product.collection}
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif mb-4 text-black tracking-wide leading-tight" data-testid="text-product-name">
                  {product.name}
                </h1>
                
                <div className="flex items-center gap-4 mb-6">
                  <p className="text-lg md:text-xl text-black font-medium" data-testid="text-product-price">
                    {product.currency} {product.price}
                  </p>
                  <div className="flex items-center gap-1 text-[#c9a96e]">
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <Star size={12} fill="currentColor" />
                    <span className="text-[10px] text-black/50 ml-2 tracking-wider uppercase">(12 Reviews)</span>
                  </div>
                </div>
                
                <p className="text-xs md:text-sm text-black/70 leading-relaxed font-light mt-6 border-t border-black/5 pt-6" data-testid="text-product-description">
                  {product.description}
                </p>
              </div>

              <div className="flex flex-col gap-4 mb-12">
                <div className="flex items-stretch gap-4 h-12 md:h-14">
                  <div className="flex items-center border border-[#c9a96e]/30 bg-white w-28 md:w-32">
                    <button 
                      className="px-3 py-2 md:px-4 text-black/50 hover:text-black transition-colors"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      data-testid="button-quantity-minus"
                    >
                      <Minus size={14} strokeWidth={1} />
                    </button>
                    <span className="flex-1 text-center text-[11px] md:text-xs font-medium" data-testid="text-quantity">{quantity}</span>
                    <button 
                      className="px-3 py-2 md:px-4 text-black/50 hover:text-black transition-colors"
                      onClick={() => setQuantity(quantity + 1)}
                      data-testid="button-quantity-plus"
                    >
                      <Plus size={14} strokeWidth={1} />
                    </button>
                  </div>
                  
                  <button className="flex-1 bg-[#1a1308] text-white px-4 text-[9px] md:text-[10px] font-medium tracking-[0.2em] uppercase hover:bg-[#c9a96e] transition-colors text-center" data-testid="button-add-to-cart">
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
            
            {product.hoverImage && (
              <div className="w-full h-[40vh] md:h-[60vh] mt-auto relative">
                <img src={product.hoverImage} className="w-full h-full object-cover" alt="Lifestyle context" />
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
