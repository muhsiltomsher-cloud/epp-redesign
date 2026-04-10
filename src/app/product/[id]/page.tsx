"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Minus, Plus, Heart, Check, ChevronLeft, ChevronRight, X, Share2 } from "lucide-react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products } from "@/lib/data";
import { addRecentlyViewed } from "@/lib/recentlyViewed";
import { addToCart } from "@/lib/cart";
import { toggleWishlist, isInWishlist } from "@/lib/wishlist";

export default function Product() {
  const params = useParams();
  const id = params.id as string;
  const product = products.find(p => p.id === id) as any;

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

  const p = product as any;
  const gallery = (p.gallery as string[] | undefined) || ([p.image, p.hoverImage].filter(Boolean) as string[]);
  const relatedProducts = products.filter(p => p.id !== product.id && p.collection === product.collection).slice(0, 4);

  const handleAddToCart = () => {
    if (!addedToCart) {
      addToCart(product.id, quantity);
      setAddedToCart(true);
      addedTimerRef.current = setTimeout(() => setAddedToCart(false), 2500);
    }
  };



  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-[88px] md:pt-[106px] pb-24 md:pb-0">

        {/* Breadcrumb */}
        <div className="epp-container py-4 border-b border-gray-100">
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-gray-400">
            <Link href="/" className="hover:text-[var(--color-brand-gold)] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/collection" className="hover:text-[var(--color-brand-gold)] transition-colors">Collection</Link>
            <span>/</span>
            <span className="text-black">{product.name}</span>
          </nav>
        </div>

        {/* Product layout */}
        <div className="epp-container py-8 md:py-12">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">

            {/* LEFT — gallery: main image + thumbnails below */}
            <div className="flex flex-col gap-3 fade-in-up">
              {/* Main image */}
              <div
                className="relative aspect-[3/4] bg-[#f5f3ef] overflow-hidden cursor-zoom-in"
                onClick={() => setFullscreen(true)}
              >
                <img
                  src={gallery[selectedImage]}
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 text-[9px] uppercase tracking-[0.15em] bg-white/90 text-black px-2.5 py-1">
                    {product.badge === "NEW" ? "New In" : product.badge === "BESTSELLER" ? "Best Seller" : product.badge}
                  </span>
                )}
              </div>

              {/* Thumbnails — horizontal row below main image, all screen sizes */}
              {gallery.length > 1 && (
                <div className="flex gap-2">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`w-16 aspect-square bg-[#f5f3ef] overflow-hidden border flex-shrink-0 transition-colors ${
                        selectedImage === i ? "border-[var(--color-brand-gold)]" : "border-transparent hover:border-[var(--color-brand-gold-light)]"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT — details */}
            <div className="md:py-2 fade-in-up">
              {/* Collection label */}
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-3">{product.collection}</p>

              {/* Product name */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif mb-4 leading-tight">{product.name}</h1>

              {/* Price */}
              <p className="text-lg md:text-xl mb-8 font-light">
                {product.currency} {product.price}
              </p>

              {/* Quantity + Add to Cart */}
              <div className="flex flex-col gap-3 mb-4">
                {/* Qty + wishlist row */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-gray-200 w-fit">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-12 flex items-center justify-center hover:bg-[#fdf7ef] transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-12 text-center text-sm">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-12 flex items-center justify-center hover:bg-[#fdf7ef] transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => setWishlisted(toggleWishlist(product.id))}
                    className={`w-12 h-12 border flex items-center justify-center transition-colors flex-shrink-0 ${
                      wishlisted ? "border-black bg-black text-white" : "border-gray-200 hover:border-black text-black"
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart size={17} fill={wishlisted ? "currentColor" : "none"} />
                  </button>
                </div>

                {/* Add to cart full width on mobile */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full h-12 text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors ${
                    addedToCart
                      ? "bg-[var(--color-brand-gold-light)] text-white"
                      : "bg-[var(--color-brand-gold)] text-white hover:bg-[var(--color-brand-gold-light)]"
                  }`}
                >
                  {addedToCart ? <><Check size={15} /> Added to Bag</> : "Add to Bag"}
                </button>
              </div>

              {/* Free delivery note */}
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em] mb-8">
                Complimentary delivery on orders above 500 AED
              </p>

              {/* Description — always visible */}
              <div className="border-t border-gray-100 pt-6 mb-6">
                <p className="text-[10px] uppercase tracking-[0.25em] font-medium mb-3">Description</p>
                <p className="text-[12px] text-gray-600 leading-relaxed">
                  {p.description || "A masterfully crafted fragrance that captures the essence of Arabian luxury."}
                </p>
                {p.descriptionExtra && (
                  <p className="text-[12px] text-gray-600 leading-relaxed mt-3">{p.descriptionExtra}</p>
                )}
              </div>

              {/* Fragrance Notes — pyramid design */}
              {p.notes && p.notes.length > 0 && (
                <div className="border-t border-gray-100 pt-6 mb-6">
                  <p className="text-[10px] uppercase tracking-[0.25em] font-medium mb-6">Fragrance Notes</p>
                  <div className="space-y-5">
                    {p.notes.map((note: any, i: number) => {
                      const configs: Record<string, { dot: string; bg: string; label: string }> = {
                        Top:    { dot: "bg-[#c9a96e]",   bg: "bg-[#fdf8f0]", label: "Top Notes" },
                        Heart:  { dot: "bg-[#9b7ea0]",   bg: "bg-[#f8f4fb]", label: "Heart Notes" },
                        Base:   { dot: "bg-[#5c5248]",   bg: "bg-[#f5f3ef]", label: "Base Notes" },
                      };
                      const cfg = configs[note.label] || { dot: "bg-gray-400", bg: "bg-gray-50", label: note.label + " Notes" };
                      return (
                        <div key={note.label} className={`${cfg.bg} px-4 py-4`}>
                          <div className="flex items-center gap-2 mb-3">
                            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dot}`} />
                            <span className="text-[9px] uppercase tracking-[0.25em] text-gray-500 font-medium">{cfg.label}</span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {note.items.map((item: string) => (
                              <span key={item} className="text-[10px] uppercase tracking-[0.1em] text-gray-700 border border-gray-200 bg-white px-3 py-1">
                                {item}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Share */}
              <button className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors">
                <Share2 size={13} />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        {relatedProducts.length > 0 && (
          <section className="bg-[#f5f3ef] py-12 md:py-16">
            <div className="epp-container">
              <div className="flex items-end justify-between mb-8">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">Related</p>
                  <h2 className="text-xl md:text-2xl font-serif">You May Also Like</h2>
                </div>
                <Link href="/collection">
                  <span className="text-[10px] uppercase tracking-[0.2em] border-b border-black pb-0.5 hover:text-[var(--color-brand-gold)] hover:border-[var(--color-brand-gold)] transition-colors cursor-pointer">
                    View All
                  </span>
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6">
                {relatedProducts.map(p => (
                  <RelatedCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Mobile sticky bar */}
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-100 safe-area-bottom">
          <div className="flex gap-3 p-3">
            <div className="flex items-center border border-gray-200">
              <button className="w-9 h-10 flex items-center justify-center" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                <Minus size={13} />
              </button>
              <span className="w-9 text-center text-sm">{quantity}</span>
              <button className="w-9 h-10 flex items-center justify-center" onClick={() => setQuantity(quantity + 1)}>
                <Plus size={13} />
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex-1 h-10 text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors ${
                addedToCart ? "bg-[#c9a96e] text-white" : "bg-black text-white"
              }`}
            >
              {addedToCart ? <><Check size={14} /> Added</> : `Add to Bag — ${product.currency} ${product.price}`}
            </button>
          </div>
        </div>

        {/* Fullscreen lightbox */}
        {fullscreen && (
          <div className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center">
            <button
              className="absolute top-5 right-5 text-white p-2 hover:opacity-60 transition-opacity"
              onClick={() => setFullscreen(false)}
            >
              <X size={24} />
            </button>
            {gallery.length > 1 && (
              <>
                <button
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-white p-2 hover:opacity-60 transition-opacity"
                  onClick={() => setSelectedImage((selectedImage - 1 + gallery.length) % gallery.length)}
                >
                  <ChevronLeft size={32} />
                </button>
                <button
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-white p-2 hover:opacity-60 transition-opacity"
                  onClick={() => setSelectedImage((selectedImage + 1) % gallery.length)}
                >
                  <ChevronRight size={32} />
                </button>
              </>
            )}
            <img
              src={gallery[selectedImage]}
              alt={product.name}
              className="max-w-[88vw] max-h-[88vh] object-contain"
            />
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-colors ${i === selectedImage ? "bg-white" : "bg-white/30"}`}
                />
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function RelatedCard({ product }: { product: any }) {
  const [isHovered, setIsHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  useEffect(() => { setWishlisted(isInWishlist(product.id)); }, [product.id]);

  const handleWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlisted(toggleWishlist(product.id));
  }, [product.id]);

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product.id);
  }, [product.id]);

  return (
    <div
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] bg-white mb-3 overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <img
            src={isHovered && product.hoverImage ? product.hoverImage : product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </Link>
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 w-8 h-8 bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Heart size={13} className={wishlisted ? "fill-black text-black" : "text-black"} />
        </button>
        <button
          onClick={handleAddToCart}
          className="absolute bottom-0 left-0 right-0 bg-black text-white text-[9px] uppercase tracking-[0.2em] py-2.5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
        >
          Quick Add
        </button>
      </div>
      <p className="text-[9px] uppercase tracking-[0.15em] text-gray-400 mb-0.5">{product.collection}</p>
      <Link href={`/product/${product.id}`}>
        <h3 className="text-[11px] uppercase tracking-[0.08em] hover:text-[var(--color-brand-gold)] transition-colors cursor-pointer mb-1 line-clamp-1">{product.name}</h3>
      </Link>
      <p className="text-[11px] text-gray-600">{product.currency} {product.price}</p>
    </div>
  );
}
