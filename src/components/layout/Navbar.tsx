"use client";

import { Search, ShoppingBag, Menu, User, X, Heart, Globe, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCart, getCartCount } from "@/lib/cart";
import { products } from "@/lib/data";

const menuItems = [
  { label: "Perfumes", href: "/collection" },
  { label: "Collection", href: "/collection" },
  { label: "Gift Sets", href: "/collection" },
  { label: "Accessories", href: "/collection" },
  { label: "Oud", href: "/collection" },
];

const currencies = [
  { code: "AED", symbol: "د.إ" },
  { code: "USD", symbol: "$" },
  { code: "EUR", symbol: "€" },
  { code: "GBP", symbol: "£" },
  { code: "SAR", symbol: "ر.س" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(() => getCartCount());
  const [cartProducts, setCartProducts] = useState<{ id: string; name: string; image: string; price: number; currency: string; qty: number }[]>([]);
  const pathname = usePathname();
  
  const [language, setLanguage] = useState<"EN" | "AR">("EN");
  const [currency, setCurrency] = useState("AED");
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);

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
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setShowLangMenu(false);
    setShowCurrencyMenu(false);
  }, [pathname]);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-white shadow-sm">
        {/* Top Bar - Logo + Icons (visible when not scrolled) */}
        <div 
          className={`px-4 md:px-8 lg:px-16 xl:px-24 border-b border-gray-100 transition-all duration-300 ${
            isScrolled ? "h-0 overflow-hidden opacity-0" : "h-14 md:h-16 opacity-100"
          }`}
        >
          <div className="h-14 md:h-16 flex items-center justify-between">
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 -ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Left - Language & Currency */}
            <div className="hidden md:flex items-center gap-3">
              <div className="relative">
                <button 
                  className="flex items-center gap-1 text-[11px] tracking-wider uppercase hover:text-[#c9a96e] transition-colors"
                  onClick={() => { setShowLangMenu(!showLangMenu); setShowCurrencyMenu(false); }}
                >
                  <Globe size={14} />
                  <span>{language}</span>
                  <ChevronDown size={12} />
                </button>
                {showLangMenu && (
                  <div className="absolute top-full left-0 mt-2 bg-white border shadow-lg z-50 min-w-[110px]">
                    <button 
                      className={`w-full text-left px-4 py-2.5 text-[11px] tracking-wider hover:bg-gray-50 ${language === "EN" ? "text-[#c9a96e]" : ""}`}
                      onClick={() => { setLanguage("EN"); setShowLangMenu(false); }}
                    >
                      English
                    </button>
                    <button 
                      className={`w-full text-left px-4 py-2.5 text-[11px] tracking-wider hover:bg-gray-50 ${language === "AR" ? "text-[#c9a96e]" : ""}`}
                      onClick={() => { setLanguage("AR"); setShowLangMenu(false); }}
                    >
                      العربية
                    </button>
                  </div>
                )}
              </div>
              <div className="relative">
                <button 
                  className="flex items-center gap-1 text-[11px] tracking-wider uppercase hover:text-[#c9a96e] transition-colors"
                  onClick={() => { setShowCurrencyMenu(!showCurrencyMenu); setShowLangMenu(false); }}
                >
                  <span>{currency}</span>
                  <ChevronDown size={12} />
                </button>
                {showCurrencyMenu && (
                  <div className="absolute top-full left-0 mt-2 bg-white border shadow-lg z-50 min-w-[110px]">
                    {currencies.map((c) => (
                      <button 
                        key={c.code}
                        className={`w-full text-left px-4 py-2.5 text-[11px] tracking-wider hover:bg-gray-50 ${currency === c.code ? "text-[#c9a96e]" : ""}`}
                        onClick={() => { setCurrency(c.code); setShowCurrencyMenu(false); }}
                      >
                        {c.code}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Logo - Center */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <img src={logoUrl} alt="Emirates Pride" className="h-8 md:h-10 object-contain" />
            </Link>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <button className="hidden md:block hover:text-[#c9a96e] transition-colors">
                <Search size={20} />
              </button>
              <Link href="/account" className="hidden md:block hover:text-[#c9a96e] transition-colors">
                <User size={20} />
              </Link>
              <Link href="/wishlist" className="hover:text-[#c9a96e] transition-colors">
                <Heart size={20} />
              </Link>
              <button className="relative hover:text-[#c9a96e] transition-colors" onClick={() => setIsCartOpen(true)}>
                <ShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#c9a96e] text-white text-[9px] rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Menu Bar - Always visible */}
        <div className={`hidden md:block bg-white transition-all duration-300 ${isScrolled ? "border-b border-gray-100" : ""}`}>
          <div className="h-11 px-4 md:px-8 lg:px-16 xl:px-24 flex items-center justify-center relative">
            {/* Logo on left when scrolled */}
            {isScrolled && (
              <Link href="/" className="absolute left-4 md:left-8 lg:left-16 xl:left-24">
                <img src={logoUrl} alt="Emirates Pride" className="h-7 object-contain" />
              </Link>
            )}
            
            {/* Menu Items - Center */}
            <nav className="flex items-center gap-8">
              {menuItems.map((item) => (
                <Link key={item.label} href={item.href}>
                  <span className="text-[11px] tracking-[0.15em] uppercase font-medium hover:text-[#c9a96e] transition-colors cursor-pointer">
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>

            {/* Icons on right when scrolled */}
            {isScrolled && (
              <div className="absolute right-4 md:right-8 lg:right-16 xl:right-24 flex items-center gap-4">
                <button className="hover:text-[#c9a96e] transition-colors">
                  <Search size={18} />
                </button>
                <Link href="/wishlist" className="hover:text-[#c9a96e] transition-colors">
                  <Heart size={18} />
                </Link>
                <button className="relative hover:text-[#c9a96e] transition-colors" onClick={() => setIsCartOpen(true)}>
                  <ShoppingBag size={18} />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-[#c9a96e] text-white text-[8px] rounded-full flex items-center justify-center font-medium">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="px-4 py-3">
              {menuItems.map((item) => (
                <Link key={item.label} href={item.href}>
                  <span className="block py-3 text-sm uppercase tracking-wider cursor-pointer border-b border-gray-100">
                    {item.label}
                  </span>
                </Link>
              ))}
              <div className="flex items-center justify-between py-4 mt-2">
                <div className="flex gap-4">
                  <button 
                    className={`text-sm ${language === "EN" ? "text-[#c9a96e] font-medium" : "text-gray-500"}`}
                    onClick={() => setLanguage("EN")}
                  >EN</button>
                  <button 
                    className={`text-sm ${language === "AR" ? "text-[#c9a96e] font-medium" : "text-gray-500"}`}
                    onClick={() => setLanguage("AR")}
                  >AR</button>
                </div>
                <select 
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="text-sm bg-transparent border-none outline-none"
                >
                  {currencies.map((c) => (
                    <option key={c.code} value={c.code}>{c.code}</option>
                  ))}
                </select>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-sm uppercase tracking-wider font-medium">Cart ({cartCount})</h2>
              <button onClick={() => setIsCartOpen(false)}>
                <X size={22} />
              </button>
            </div>

            {cartCount === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <ShoppingBag size={48} className="text-gray-200 mb-5" />
                <p className="text-lg font-medium mb-2">Your cart is empty</p>
                <Link href="/collection">
                  <span onClick={() => setIsCartOpen(false)} className="text-sm text-[#c9a96e] underline cursor-pointer">
                    Continue Shopping
                  </span>
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-5">
                  {cartProducts.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4 border-b border-gray-100">
                      <img src={item.image} alt={item.name} className="w-20 h-24 object-cover bg-gray-100" />
                      <div className="flex-1">
                        <p className="text-sm font-medium mb-1">{item.name}</p>
                        <p className="text-xs text-gray-500 mb-2">Qty: {item.qty}</p>
                        <p className="text-sm font-medium">{item.currency} {item.price * item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-5 border-t bg-gray-50">
                  <div className="flex justify-between mb-5">
                    <span className="text-sm uppercase tracking-wider">Total</span>
                    <span className="text-lg font-medium">{currency} {cartProducts.reduce((s, i) => s + i.price * i.qty, 0)}</span>
                  </div>
                  <Link href="/checkout">
                    <span onClick={() => setIsCartOpen(false)} className="block w-full bg-[#1a1308] text-white text-center py-4 text-xs uppercase tracking-wider hover:bg-[#c9a96e] transition-colors cursor-pointer">
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
