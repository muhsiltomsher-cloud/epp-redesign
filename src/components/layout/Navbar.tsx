"use client";

import { Search, ShoppingBag, Menu, User, X, Heart, Globe, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCart, getCartCount } from "@/lib/cart";
import { products } from "@/lib/data";

const menuItems = [
  { label: "Shop All", href: "/collection" },
  { label: "Perfumes", href: "/collection" },
  { label: "Oils", href: "/collection" },
  { label: "Personal Care", href: "/collection" },
  { label: "Home Fragrances", href: "/collection" },
  { label: "Gift Sets", href: "/collection" },
];

const currencies = [
  { code: "AED", symbol: "د.إ", flag: "ae" },
  { code: "USD", symbol: "$", flag: "us" },
  { code: "EUR", symbol: "€", flag: "eu" },
  { code: "GBP", symbol: "£", flag: "gb" },
  { code: "SAR", symbol: "ر.س", flag: "sa" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(() => getCartCount());
  const [cartProducts, setCartProducts] = useState<{ id: string; name: string; image: string; price: number; currency: string; qty: number }[]>([]);
  const pathname = usePathname();
  
  const [language, setLanguage] = useState<"EN" | "AR">("EN");
  const [currency, setCurrency] = useState("AED");
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
    setIsMenuOpen(false);
    setShowCurrencyMenu(false);
  }, [pathname]);

  const currentCurrency = currencies.find(c => c.code === currency) || currencies[0];

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        {/* Top Utility Bar */}
        <div className="border-b border-gray-100 bg-[#f7f6f2] h-8">
          <div className="container mx-auto flex h-8 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <button 
                className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-medium transition-all hover:bg-gray-100"
                onClick={() => setLanguage(language === "EN" ? "AR" : "EN")}
              >
                <Globe className="h-3.5 w-3.5 text-[#7a3205]" />
                <span className="text-gray-600">{language === "EN" ? "العربية" : "English"}</span>
              </button>

              {/* Currency Selector */}
              <div className="relative hidden xl:block">
                <button 
                  className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-medium transition-all hover:bg-gray-100"
                  onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
                >
                  <img 
                    src={`https://flagcdn.com/w40/${currentCurrency.flag}.png`}
                    alt={currentCurrency.code}
                    className="w-5 h-4 object-cover"
                  />
                  <span className="font-semibold text-[#7a3205]">{currentCurrency.symbol}</span>
                  <span className="text-gray-600">{currentCurrency.code}</span>
                  <ChevronDown className="h-3 w-3 text-gray-400" />
                </button>
                {showCurrencyMenu && (
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[140px] py-1">
                    {currencies.map((c) => (
                      <button 
                        key={c.code}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2 ${currency === c.code ? "text-[#7a3205] font-medium" : "text-gray-700"}`}
                        onClick={() => { setCurrency(c.code); setShowCurrencyMenu(false); }}
                      >
                        <img 
                          src={`https://flagcdn.com/w40/${c.flag}.png`}
                          alt={c.code}
                          className="w-5 h-4 object-cover"
                        />
                        <span>{c.code}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Free Shipping Banner */}
            <div className="hidden text-sm text-gray-600 xl:block">
              Free shipping on orders over 500 AED
            </div>

            {/* Mobile Currency */}
            <div className="xl:hidden">
              <button 
                className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-sm font-medium transition-all hover:bg-gray-100"
                onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
              >
                <img 
                  src={`https://flagcdn.com/w40/${currentCurrency.flag}.png`}
                  alt={currentCurrency.code}
                  className="w-5 h-4 object-cover"
                />
                <span className="font-semibold text-[#7a3205]">{currentCurrency.symbol}</span>
                <ChevronDown className="h-3 w-3 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="border-b border-gray-100 bg-[#dad6cd] backdrop-blur supports-[backdrop-filter]:bg-[#dad6cd]/95">
          <div className="container mx-auto px-4">
            <div className="relative flex items-center justify-between h-16 xl:h-20">
              {/* Mobile Menu Button */}
              <button 
                className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 xl:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center absolute left-1/2 -translate-x-1/2 xl:static xl:translate-x-0">
                <img 
                  src={logoUrl} 
                  alt="Emirates Pride"
                  className="h-12 md:h-16 object-contain"
                />
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden xl:flex xl:gap-x-8">
                {menuItems.map((item) => (
                  <Link 
                    key={item.label} 
                    href={item.href}
                    className="text-sm font-bold text-[#7a3205] transition-colors hover:text-[#5a2504]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              {/* Right Icons */}
              <div className="flex items-center gap-2 xl:gap-4">
                {/* Search */}
                <div className="relative hidden lg:block">
                  <div className="relative">
                    <input 
                      type="text"
                      placeholder="Search products..."
                      className="w-48 rounded-full border border-gray-200 bg-gray-50 py-2 text-sm text-gray-900 placeholder-gray-500 transition-all focus:w-64 focus:border-[#633d1f] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#633d1f] lg:w-56 lg:focus:w-72 pl-10 pr-4"
                    />
                    <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* Account */}
                <Link href="/account" className="hidden p-2 text-[#7a3205] hover:text-[#5a2504] xl:block">
                  <User className="h-5 w-5" />
                </Link>

                {/* Wishlist */}
                <Link href="/wishlist" className="relative p-2 text-[#7a3205] hover:text-[#5a2504]">
                  <Heart className="h-5 w-5" />
                </Link>

                {/* Cart */}
                <button 
                  className="relative p-2 text-[#7a3205] hover:text-[#5a2504]"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingBag className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#7a3205] text-white text-[10px] rounded-full flex items-center justify-center font-medium">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="xl:hidden border-t border-gray-200">
              <nav className="px-4 py-3 bg-[#f7f6f2]">
                {menuItems.map((item) => (
                  <Link key={item.label} href={item.href}>
                    <span className="block py-3 text-sm font-bold text-[#7a3205] hover:bg-gray-100 hover:text-[#5a2504] px-3 rounded-lg cursor-pointer">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-lg font-bold text-[#7a3205]">Cart ({cartCount})</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-1 hover:bg-gray-100 rounded-full">
                <X size={22} />
              </button>
            </div>

            {cartCount === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <ShoppingBag size={48} className="text-gray-300 mb-5" />
                <p className="text-lg font-bold text-gray-800 mb-2">Your cart is empty</p>
                <Link href="/collection">
                  <span 
                    onClick={() => setIsCartOpen(false)} 
                    className="text-sm text-[#7a3205] font-medium hover:underline cursor-pointer"
                  >
                    Continue Shopping
                  </span>
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-5">
                  {cartProducts.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4 border-b border-gray-100">
                      <img src={item.image} alt={item.name} className="w-20 h-24 object-cover bg-gray-100 rounded-lg" />
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-800 mb-1">{item.name}</p>
                        <p className="text-xs text-gray-500 mb-2">Qty: {item.qty}</p>
                        <p className="text-sm font-bold text-[#7a3205]">{item.currency} {item.price * item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-5 border-t bg-[#f7f6f2]">
                  <div className="flex justify-between mb-5">
                    <span className="text-sm font-medium text-gray-600">Total</span>
                    <span className="text-lg font-bold text-[#7a3205]">{currency} {cartProducts.reduce((s, i) => s + i.price * i.qty, 0)}</span>
                  </div>
                  <Link href="/checkout">
                    <span 
                      onClick={() => setIsCartOpen(false)} 
                      className="block w-full bg-[#7a3205] text-white text-center py-3 text-sm font-bold rounded-full hover:bg-[#5a2504] transition-colors cursor-pointer"
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
