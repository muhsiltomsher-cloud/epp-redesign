import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "wouter";
import { Minus, Plus, Heart, Check, ChevronLeft, ChevronRight, X } from "lucide-react";
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
  const [addedToCart, setAddedToCart] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const addedTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (id) {
      addRecentlyViewed(id);
      setWishlisted(isInWishlist(id));
      setAddedToCart(false);
      setQuantity(1);
      setSelectedImage(0);
      if (addedTimerRef.current) clearTimeout(addedTimerRef.current);
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) return null;

  const gallery = product.gallery || [product.image, product.hoverImage].filter(Boolean) as string[];
  const relatedProducts = products.filter(p => p.id !== product.id && p.collection === product.collection).slice(0, 4);

  const handleAddToCart = () => {
    if (!addedToCart) {
      addToCart(product.id, quantity);
      setAddedToCart(true);
      setQuantity(1);
      addedTimerRef.current = setTimeout(() => setAddedToCart(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-[120px] md:pt-[140px]">
        {/* Breadcrumb */}
        <div className="px-4 md:px-8 lg:px-16 xl:px-24 py-4 text-xs text-gray-500">
          <Link href="/" className="hover:text-black transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/collection" className="hover:text-black transition-colors">{product.collection}</Link>
          <span className="mx-2">/</span>
          <span className="text-black">{product.name}</span>
        </div>

        <div className="px-4 md:px-8 lg:px-16 xl:px-24 pb-16">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            {/* Images */}
            <div>
              <div 
                className="aspect-[3/4] bg-gray-100 mb-4 cursor-pointer overflow-hidden"
                onClick={() => setFullscreen(true)}
              >
                <img 
                  src={gallery[selectedImage]} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {gallery.length > 1 && (
                <div className="flex gap-3">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-20 h-24 bg-gray-100 overflow-hidden border-2 transition-colors ${
                        selectedImage === i ? "border-[#c9a96e]" : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="md:py-4">
              <p className="text-xs text-[#c9a96e] uppercase tracking-[0.2em] mb-3">{product.collection}</p>
              <h1 className="text-2xl md:text-4xl font-serif mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <p className="text-xl md:text-2xl font-medium">{product.currency} {product.price}</p>
                {product.badge && (
                  <span className="bg-[#c9a96e] text-white text-[10px] px-2.5 py-1 uppercase tracking-wider">{product.badge}</span>
                )}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-8">{product.description}</p>

              {/* Quantity & Add to Cart */}
              <div className="flex gap-4 mb-8">
                <div className="flex items-center border border-gray-200">
                  <button className="px-4 py-3.5 hover:bg-gray-50 transition-colors" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus size={16} />
                  </button>
                  <span className="w-14 text-center text-sm font-medium">{quantity}</span>
                  <button className="px-4 py-3.5 hover:bg-gray-50 transition-colors" onClick={() => setQuantity(quantity + 1)}>
                    <Plus size={16} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3.5 text-sm uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2 ${
                    addedToCart ? "bg-[#c9a96e] text-white" : "bg-[#1a1308] text-white hover:bg-[#c9a96e]"
                  }`}
                >
                  {addedToCart ? <><Check size={18} /> Added</> : "Add to Cart"}
                </button>
                <button
                  onClick={() => setWishlisted(toggleWishlist(product.id))}
                  className={`w-14 border flex items-center justify-center transition-colors ${
                    wishlisted ? "border-[#c9a96e] text-[#c9a96e] bg-[#c9a96e]/5" : "border-gray-200 hover:border-[#c9a96e]"
                  }`}
                >
                  <Heart size={20} fill={wishlisted ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Notes */}
              {product.notes && product.notes.length > 0 && (
                <div className="border-t pt-8">
                  <h3 className="text-xs uppercase tracking-[0.2em] mb-5 font-medium">Fragrance Notes</h3>
                  <div className="space-y-4">
                    {product.notes.map((note) => (
                      <div key={note.label} className="flex text-sm">
                        <span className="w-24 text-gray-500 uppercase tracking-wider text-xs">{note.label}</span>
                        <span className="flex-1">{note.items.join(", ")}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="px-4 md:px-8 lg:px-16 xl:px-24 py-16 md:py-20 bg-[#fafafa]">
            <div className="text-center mb-10">
              <p className="text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-3">Complete Your Collection</p>
              <h2 className="text-2xl md:text-3xl font-serif">You May Also Like</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`}>
                  <div className="group cursor-pointer">
                    <div className="aspect-[3/4] bg-gray-100 mb-3 overflow-hidden">
                      <img 
                        src={p.image} 
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <h3 className="text-sm md:text-base font-medium mb-1 group-hover:text-[#c9a96e] transition-colors">{p.name}</h3>
                    <p className="text-sm">{p.currency} {p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Mobile Sticky Add to Cart */}
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t p-4">
          <div className="flex gap-3">
            <div className="flex items-center border border-gray-200">
              <button className="px-3 py-2.5" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus size={14} />
              </button>
              <span className="w-10 text-center text-sm font-medium">{quantity}</span>
              <button className="px-3 py-2.5" onClick={() => setQuantity(quantity + 1)}>
                <Plus size={14} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3 text-xs uppercase tracking-[0.15em] transition-colors flex items-center justify-center gap-2 ${
                addedToCart ? "bg-[#c9a96e] text-white" : "bg-[#1a1308] text-white"
              }`}
            >
              {addedToCart ? <><Check size={16} /> Added</> : `Add to Cart — ${product.currency} ${product.price}`}
            </button>
          </div>
        </div>

        {/* Fullscreen Gallery */}
        {fullscreen && (
          <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
            <button 
              className="absolute top-4 right-4 text-white p-2 hover:opacity-70 transition-opacity"
              onClick={() => setFullscreen(false)}
            >
              <X size={28} />
            </button>
            {gallery.length > 1 && (
              <>
                <button 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 hover:opacity-70 transition-opacity"
                  onClick={() => setSelectedImage((selectedImage - 1 + gallery.length) % gallery.length)}
                >
                  <ChevronLeft size={36} />
                </button>
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 hover:opacity-70 transition-opacity"
                  onClick={() => setSelectedImage((selectedImage + 1) % gallery.length)}
                >
                  <ChevronRight size={36} />
                </button>
              </>
            )}
            <img 
              src={gallery[selectedImage]} 
              alt={product.name}
              className="max-w-[90vw] max-h-[90vh] object-contain"
            />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
