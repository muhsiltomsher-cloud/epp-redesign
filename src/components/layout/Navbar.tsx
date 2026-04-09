"use client";

import { Search, ShoppingBag, Menu, User, X, Heart, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCart, getCartCount } from "@/lib/cart";
import { products } from "@/lib/data";

// Main nav categories — matches AdP structure exactly
const navItems = [
  { label: "Fragrances", href: "/collection" },
  { label: "Just Arrived", href: "/collection" },
  { label: "Collections", href: "/collection" },
  { label: "Gift Sets", href: "/collection" },
  { label: "Home Collection", href: "/collection" },
  { label: "Body Collection", href: "/collection" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(() => getCartCount());
  const [cartProducts, setCartProducts] = useState<{ id: string; name: string; image: string; price: number; currency: string; qty: number }[]>([]);
  const pathname = usePathname();
  const logoUrl = "https://emiratespride.com/wp-content/uploads/2026/01/logo-epp.png";

  const refreshCart = () => {
    setCartCount(getCartCount());
    const items = getCart();
    setCartProducts(items.map(ci => {
      const p = products.find(pr => pr.id === ci.productId);
      return p ? { id: p.id, name: p.name, image: p.image, price: p.price, currency: p.currency, qty: ci.quantity } : null;
    }).filter((x): x is { id: string; name: string; image: string; price: number; currency: string; qty: number } => x !== null));
  };

  useEffect(() => {
    refreshCart();
    window.addEventListener("cart-updated", refreshCart);
    return () => window.removeEventListener("cart-updated", refreshCart);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navBg = "bg-white border-b border-gray-100";
  const iconColor = "text-black hover:text-gray-500";
  const logoFilter = "";

  return (
    <>
      <header className={`fixed top-0 w-full z-50 ${navBg}`}>

        {/* ROW 1: top bar — country left, logo center, icons right */}
        <div className="epp-container">
          <div className="h-14 md:h-16 flex items-center justify-between relative">

            {/* Left: country selector + store locator */}
            <div className="flex items-center gap-4">
              {/* Mobile: hamburger */}
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Menu"
              >
                {isMenuOpen
                  ? <X size={20} className="text-black" />
                  : <Menu size={20} className="text-black" />
                }
              </button>
              {/* Desktop: store locator + country */}
              <div className="hidden md:flex items-center gap-4">
                <button className={`flex items-center gap-1 text-[10px] uppercase tracking-[0.15em] transition-colors ${iconColor}`}>
                  <MapPin size={13} />
                  <span>Store Locator</span>
                </button>
                <span className="text-[10px] uppercase tracking-[0.15em] text-black opacity-50">|</span>
                <button className={`text-[10px] uppercase tracking-[0.15em] transition-colors ${iconColor}`}>
                  AE / EN
                </button>
              </div>
            </div>

            {/* Center: Logo — absolutely centered */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <img
                src={logoUrl}
                alt="Emirates Pride"
                className={`h-8 md:h-9 object-contain transition-all duration-300 ${logoFilter}`}
              />
            </Link>

            {/* Right: search, account, wishlist, bag */}
            <div className="flex items-center gap-3 md:gap-4">
              <button className={`hidden md:block transition-colors ${iconColor}`} aria-label="Search">
                <Search size={18} />
              </button>
              <Link href="/account" className={`hidden md:block transition-colors ${iconColor}`} aria-label="Account">
                <User size={18} />
              </Link>
              <Link href="/wishlist" className={`transition-colors ${iconColor}`} aria-label="Wishlist">
                <Heart size={18} />
              </Link>
              <button
                className={`relative transition-colors ${iconColor}`}
                onClick={() => { refreshCart(); setIsCartOpen(true); }}
                aria-label="Bag"
              >
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-black text-white text-[8px] flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ROW 2: main nav links — centered, desktop only */}
        <div className="hidden md:block border-t border-gray-100">
          <nav className="h-10 flex items-center justify-center gap-7 epp-container">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <span className={`text-[10px] uppercase tracking-[0.15em] transition-colors cursor-pointer ${iconColor}`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile full-screen slide-in menu */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-[200] md:hidden flex flex-col">
            <div className="flex items-center justify-between epp-container h-14 border-b border-gray-100">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <img src={logoUrl} alt="Emirates Pride" className="h-8 object-contain" />
              </Link>
              <button onClick={() => setIsMenuOpen(false)}><X size={20} /></button>
            </div>
            <nav className="flex-1 overflow-y-auto epp-container py-6">
              {navItems.map((item) => (
                <Link key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}>
                  <div className="py-4 border-b border-gray-100 text-[11px] uppercase tracking-[0.2em]">
                    {item.label}
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Cart drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white flex flex-col">
            <div className="flex items-center justify-between px-6 h-14 border-b border-gray-100">
              <span className="text-[10px] uppercase tracking-[0.2em]">Shopping Bag ({cartCount})</span>
              <button onClick={() => setIsCartOpen(false)}><X size={18} /></button>
            </div>

            {cartCount === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
                <ShoppingBag size={36} className="text-gray-300 mb-5" />
                <p className="text-sm font-serif mb-4">Your bag is empty</p>
                <Link href="/collection">
                  <span
                    onClick={() => setIsCartOpen(false)}
                    className="text-[10px] uppercase tracking-[0.2em] border-b border-black pb-0.5 hover:text-gray-500 hover:border-gray-500 transition-colors cursor-pointer"
                  >
                    Continue Shopping
                  </span>
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {cartProducts.map((item) => (
                    <div key={item.id} className="flex gap-4 py-5 border-b border-gray-100 last:border-0">
                      <div className="w-16 h-20 bg-[#f5f3ef] flex-shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] uppercase tracking-[0.1em] mb-1 truncate">{item.name}</p>
                        <p className="text-[10px] text-gray-400 mb-2">Qty: {item.qty}</p>
                        <p className="text-[11px]">{item.currency} {item.price * item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-6 py-5 border-t border-gray-100">
                  <div className="flex justify-between mb-5">
                    <span className="text-[10px] uppercase tracking-[0.15em]">Subtotal</span>
                    <span className="text-[11px]">AED {cartProducts.reduce((s, i) => s + i.price * i.qty, 0)}</span>
                  </div>
                  <Link href="/checkout">
                    <span
                      onClick={() => setIsCartOpen(false)}
                      className="block w-full bg-black text-white text-center py-3.5 text-[10px] uppercase tracking-[0.2em] hover:bg-gray-800 transition-colors cursor-pointer"
                    >
                      Checkout
                    </span>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
