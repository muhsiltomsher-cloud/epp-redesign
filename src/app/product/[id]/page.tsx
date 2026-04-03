"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Minus, Plus, Heart, Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products } from "@/lib/data";
import { addRecentlyViewed } from "@/lib/recentlyViewed";
import { addToCart } from "@/lib/cart";
import { toggleWishlist, isInWishlist } from "@/lib/wishlist";

export default function Product() {
  const params = useParams();
  const id = params.id as string;
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
      <main className="flex-1 pt-14 md:pt-16">
        {/* Breadcrumb */}
        <div className="px-4 md:px-10 lg:px-20 py-4 text-xs text-gray-500">
          <Link href="/" className="hover:text-black">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/collection" className="hover:text-black">{product.collection}</Link>
          <span className="mx-2">/</span>
          <span className="text-black">{product.name}</span>
        </div>

        <div className="px-4 md:px-10 lg:px-20 pb-16">
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
                <div className="flex gap-2">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-16 h-20 bg-gray-100 overflow-hidden border-2 transition-colors ${
                        selectedImage === i ? "border-black" : "border-transparent"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="md:py-8">
              <p className="text-xs text-[#c9a96e] uppercase tracking-wider mb-2">{product.collection}</p>
              <h1 className="text-2xl md:text-4xl font-serif mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-6">
                <p className="text-xl font-medium">{product.currency} {product.price}</p>
                {product.badge && (
                  <span className="bg-[#c9a96e] text-white text-[10px] px-2 py-1 uppercase">{product.badge}</span>
                )}
              </div>

              <p className="text-sm text-gray-600 leading-relaxed mb-8">{product.description}</p>

              {/* Quantity & Add to Cart */}
              <div className="flex gap-4 mb-6">
                <div className="flex items-center border">
                  <button className="px-4 py-3" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                    <Minus size={14} />
                  </button>
                  <span className="w-12 text-center text-sm">{quantity}</span>
                  <button className="px-4 py-3" onClick={() => setQuantity(quantity + 1)}>
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 text-sm uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                    addedToCart ? "bg-[#c9a96e] text-white" : "bg-[#1a1308] text-white hover:bg-[#c9a96e]"
                  }`}
                >
                  {addedToCart ? <><Check size={16} /> Added</> : "Add to Cart"}
                </button>
                <button
                  onClick={() => setWishlisted(toggleWishlist(product.id))}
                  className={`w-12 border flex items-center justify-center transition-colors ${
                    wishlisted ? "border-[#c9a96e] text-[#c9a96e]" : "border-gray-200 hover:border-black"
                  }`}
                >
                  <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Notes */}
              {product.notes && product.notes.length > 0 && (
                <div className="border-t pt-6">
                  <h3 className="text-xs uppercase tracking-wider mb-4">Fragrance Notes</h3>
                  <div className="space-y-3">
                    {product.notes.map((note) => (
                      <div key={note.label} className="flex text-sm">
                        <span className="w-20 text-gray-500">{note.label}</span>
                        <span>{note.items.join(", ")}</span>
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
          <section className="px-4 md:px-10 lg:px-20 py-16 bg-[#fafafa]">
            <h2 className="text-2xl font-serif text-center mb-8">You May Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <Link key={p.id} href={`/product/${p.id}`}>
                  <div className="group cursor-pointer">
                    <div className="aspect-[3/4] bg-gray-100 mb-3 overflow-hidden">
                      <img 
                        src={p.image} 
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-sm font-medium mb-1">{p.name}</h3>
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
            <div className="flex items-center border">
              <button className="px-3 py-2" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus size={12} />
              </button>
              <span className="w-8 text-center text-xs">{quantity}</span>
              <button className="px-3 py-2" onClick={() => setQuantity(quantity + 1)}>
                <Plus size={12} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-3 text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 ${
                addedToCart ? "bg-[#c9a96e] text-white" : "bg-[#1a1308] text-white"
              }`}
            >
              {addedToCart ? <><Check size={14} /> Added</> : `Add to Cart — ${product.currency} ${product.price}`}
            </button>
          </div>
        </div>

        {/* Fullscreen Gallery */}
        {fullscreen && (
          <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center">
            <button 
              className="absolute top-4 right-4 text-white p-2"
              onClick={() => setFullscreen(false)}
            >
              <X size={24} />
            </button>
            {gallery.length > 1 && (
              <>
                <button 
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2"
                  onClick={() => setSelectedImage((selectedImage - 1 + gallery.length) % gallery.length)}
                >
                  <ChevronLeft size={32} />
                </button>
                <button 
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2"
                  onClick={() => setSelectedImage((selectedImage + 1) % gallery.length)}
                >
                  <ChevronRight size={32} />
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
