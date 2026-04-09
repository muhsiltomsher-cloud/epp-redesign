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
  const [openAccordion, setOpenAccordion] = useState<string | null>("description");
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

  const toggleAccordion = (key: string) => {
    setOpenAccordion(prev => prev === key ? null : key);
  };

  const accordionItems = [
    {
      key: "description",
      label: "Description",
      content: product.description || "A masterfully crafted fragrance that captures the essence of Arabian luxury.",
    },
    {
      key: "notes",
      label: "Fragrance Notes",
      content: product.notes && product.notes.length > 0 ? null : "Top, heart, and base notes crafted from the finest ingredients.",
      notes: product.notes,
    },
    {
      key: "delivery",
      label: "Delivery & Returns",
      content: "Complimentary standard delivery on all orders above 500 AED. Express delivery available. Free returns within 14 days.",
    },
  ];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-[104px] md:pt-[106px]">

        {/* Breadcrumb */}
        <div className="epp-container py-4 border-b border-gray-100">
          <nav className="flex items-center gap-2 text-[10px] uppercase tracking-[0.15em] text-gray-400">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <span>/</span>
            <Link href="/collection" className="hover:text-black transition-colors">Collection</Link>
            <span>/</span>
            <span className="text-black">{product.name}</span>
          </nav>
        </div>

        {/* Product layout */}
        <div className="epp-container py-8 md:py-12">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-16">

            {/* LEFT — gallery: main image + thumbnails below */}
            <div className="flex flex-col gap-3">
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
                        selectedImage === i ? "border-black" : "border-transparent hover:border-gray-300"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT — details */}
            <div className="md:py-2">
              {/* Collection label */}
              <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-3">{product.collection}</p>

              {/* Product name */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-serif mb-4 leading-tight">{product.name}</h1>

              {/* Price */}
              <p className="text-lg md:text-xl mb-8 font-light">
                {product.currency} {product.price}
              </p>

              {/* Quantity + Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-3 mb-4">
                {/* Qty stepper */}
                <div className="flex items-center border border-gray-200 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-12 text-center text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                {/* Add to cart */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 h-12 text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-colors ${
                    addedToCart
                      ? "bg-[#c9a96e] text-white"
                      : "bg-black text-white hover:bg-[#1a1308]"
                  }`}
                >
                  {addedToCart ? <><Check size={15} /> Added to Bag</> : "Add to Bag"}
                </button>

                {/* Wishlist */}
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

              {/* Free delivery note */}
              <p className="text-[10px] text-gray-400 uppercase tracking-[0.15em] mb-8">
                Complimentary delivery on orders above 500 AED
              </p>

              {/* Accordion */}
              <div className="border-t border-gray-100">
                {accordionItems.map(item => (
                  <div key={item.key} className="border-b border-gray-100">
                    <button
                      onClick={() => toggleAccordion(item.key)}
                      className="w-full flex items-center justify-between py-4 text-left"
                    >
                      <span className="text-[10px] uppercase tracking-[0.25em] font-medium">{item.label}</span>
                      <span className="text-gray-400 text-lg leading-none">{openAccordion === item.key ? "−" : "+"}</span>
                    </button>
                    {openAccordion === item.key && (
                      <div className="pb-5">
                        {item.notes && item.notes.length > 0 ? (
                          <div className="space-y-3">
                            {item.notes.map((note: any) => (
                              <div key={note.label} className="flex gap-4">
                                <span className="text-[10px] uppercase tracking-[0.15em] text-gray-400 w-20 flex-shrink-0 pt-0.5">{note.label}</span>
                                <span className="text-[11px] text-gray-700 leading-relaxed">{note.items.join(", ")}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-[11px] text-gray-600 leading-relaxed">{item.content}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

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
                  <span className="text-[10px] uppercase tracking-[0.2em] border-b border-black pb-0.5 hover:text-gray-500 hover:border-gray-500 transition-colors cursor-pointer">
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
  const [wishlisted, setWishlisted] = useState(() => isInWishlist(product.id));

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
        <h3 className="text-[11px] uppercase tracking-[0.08em] hover:text-gray-500 transition-colors cursor-pointer mb-1 line-clamp-1">{product.name}</h3>
      </Link>
      <p className="text-[11px] text-gray-600">{product.currency} {product.price}</p>
    </div>
  );
}
