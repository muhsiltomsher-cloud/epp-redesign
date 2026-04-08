"use client";

import { Search, ShoppingBag, Menu, User, X, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCart, getCartCount } from "@/lib/cart";
import { products } from "@/lib/data";

const menuItems = [
  { label: "Fragrances", href: "/collection" },
  { label: "Collections", href: "/collection" },
  { label: "Gifts", href: "/collection" },
  { label: "Our World", href: "/collection" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(() => getCartCount());
  const [cartProducts, setCartProducts] = useState<{ id: string; name: string; image: string; price: number; currency: string; qty: number }[]>([]);
  const pathname = usePathname();

  const logoUrl = "https://emiratespride.com/wp-content/uploads/2026/01/logo-epp.png";

  useEffect(() => {
    const updateCart = () => {
      setCartCount(getCartCount());
      const items = getCart();
      setCartProducts(items.map(ci => {
        const p = products.find(pr => pr.id === ci.productId);
        return p ? { id: p.id, name: p.name, image: p.image, price: p.price, currency: p.currency, qty: ci.quantity } : null;
      }).filter((x): x is { id: string; name: string; image: string; price: number; currency: string; qty: number } => x !== null));
    };
    window.addEventListener("cart-updated", updateCart);
    return () => window.removeEventListener("cart-updated", updateCart);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-white" : "bg-transparent"
      }`}>
        <div className="px-6 md:px-16 lg:px-24">
          <div className="h-20 md:h-24 flex items-center justify-between">
            
            {/* Left - Menu Button (Mobile) + Nav (Desktop) */}
            <div className="flex items-center">
              <button 
                className="md:hidden p-2 -ml-2"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X size={22} className={isScrolled ? "text-black" : "text-white"} />
                ) : (
                  <Menu size={22} className={isScrolled ? "text-black" : "text-white"} />
                )}
              </button>
              
              <nav className="hidden md:flex items-center gap-8">
                {menuItems.map((item) => (
                  <Link key={item.label} href={item.href}>
                    <span className={`text-[11px] tracking-[0.15em] uppercase transition-colors cursor-pointer ${
                      isScrolled ? "text-black hover:text-[#c9a96e]" : "text-white hover:text-white/70"
                    }`}>
                      {item.label}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Center - Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <img 
                src={logoUrl} 
                alt="Emirates Pride" 
                className={`h-10 md:h-12 object-contain transition-all duration-300 ${
                  isScrolled ? "" : "brightness-0 invert"
                }`} 
              />
            </Link>

            {/* Right - Icons */}
            <div className="flex items-center gap-5">
              <button className={`hidden md:block transition-colors ${
                isScrolled ? "text-black hover:text-[#c9a96e]" : "text-white hover:text-white/70"
              }`}>
                <Search size={20} />
              </button>
              <Link href="/account" className={`hidden md:block transition-colors ${
                isScrolled ? "text-black hover:text-[#c9a96e]" : "text-white hover:text-white/70"
              }`}>
                <User size={20} />
              </Link>
              <Link href="/wishlist" className={`transition-colors ${
                isScrolled ? "text-black hover:text-[#c9a96e]" : "text-white hover:text-white/70"
              }`}>
                <Heart size={20} />
              </Link>
              <button 
                className={`relative transition-colors ${
                  isScrolled ? "text-black hover:text-[#c9a96e]" : "text-white hover:text-white/70"
                }`}
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#c9a96e] text-white text-[9px] rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu - Full Screen Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white z-50 md:hidden">
            <div className="px-6 py-6 flex justify-between items-center border-b">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <img src={logoUrl} alt="Emirates Pride" className="h-10 object-contain" />
              </Link>
              <button onClick={() => setIsMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <nav className="px-6 py-8">
              {menuItems.map((item) => (
                <Link key={item.label} href={item.href} onClick={() => setIsMenuOpen(false)}>
                  <span className="block py-4 text-xl font-serif border-b border-gray-100 cursor-pointer">
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Cart Drawer - Minimal Style */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white flex flex-col">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-sm uppercase tracking-[0.15em]">Shopping Bag ({cartCount})</h2>
              <button onClick={() => setIsCartOpen(false)}>
                <X size={22} />
              </button>
            </div>

            {cartCount === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <ShoppingBag size={40} className="text-gray-300 mb-6" />
                <p className="text-lg font-serif mb-3">Your bag is empty</p>
                <Link href="/collection">
                  <span 
                    onClick={() => setIsCartOpen(false)} 
                    className="text-[11px] uppercase tracking-[0.15em] border-b border-black pb-1 hover:text-[#c9a96e] hover:border-[#c9a96e] transition-colors cursor-pointer"
                  >
                    Continue Shopping
                  </span>
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-6">
                  {cartProducts.map((item) => (
                    <div key={item.id} className="flex gap-4 py-5 border-b border-gray-100">
                      <div className="w-20 h-24 bg-[#f5f4f2]">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-serif mb-1">{item.name}</p>
                        <p className="text-xs text-gray-500 mb-3">Quantity: {item.qty}</p>
                        <p className="text-sm">{item.currency} {item.price * item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 border-t">
                  <div className="flex justify-between mb-6">
                    <span className="text-sm uppercase tracking-[0.1em]">Subtotal</span>
                    <span className="text-sm">AED {cartProducts.reduce((s, i) => s + i.price * i.qty, 0)}</span>
                  </div>
                  <Link href="/checkout">
                    <span 
                      onClick={() => setIsCartOpen(false)} 
                      className="block w-full bg-black text-white text-center py-4 text-[11px] uppercase tracking-[0.15em] hover:bg-[#c9a96e] transition-colors cursor-pointer"
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
