"use client";

import { Search, ShoppingBag, Menu, User, X, ChevronDown, Globe, Instagram, Facebook, Twitter, Home, Grid3X3, Heart, LogOut, Package, MapPin, Settings, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { getCart, getCartCount } from "@/lib/cart";
import { products } from "@/lib/data";
import { isLoggedIn, getUser, logout } from "@/lib/auth";
import { getWishlist } from "@/lib/wishlist";

const megaMenuData: Record<string, { subcategories: { name: string; link: string }[]; featured: { name: string; image: string; price: number; id: string }[] }> = {
  "Oud & Dakhoon": {
    subcategories: [
      { name: "All Oud & Dakhoon", link: "/collection" },
      { name: "Premium Oud", link: "/collection" },
      { name: "Bakhoor", link: "/collection" },
      { name: "Dakhoon", link: "/collection" },
      { name: "Oud Oil", link: "/collection" },
    ],
    featured: products.filter(p => p.collection === "Oud & Dakhoon").slice(0, 3).map(p => ({ name: p.name, image: p.image, price: p.price, id: p.id })),
  },
  "Perfume": {
    subcategories: [
      { name: "All Perfumes", link: "/collection" },
      { name: "For Him", link: "/collection" },
      { name: "For Her", link: "/collection" },
      { name: "Unisex", link: "/collection" },
      { name: "Oil Perfumes", link: "/collection" },
      { name: "New Arrivals", link: "/collection" },
    ],
    featured: products.filter(p => p.collection === "Perfume Collection").slice(0, 3).map(p => ({ name: p.name, image: p.image, price: p.price, id: p.id })),
  },
  "Gifts": {
    subcategories: [
      { name: "All Gift Sets", link: "/collection" },
      { name: "For Him", link: "/collection" },
      { name: "For Her", link: "/collection" },
      { name: "Wedding Gifts", link: "/collection" },
      { name: "Corporate Gifts", link: "/collection" },
    ],
    featured: products.filter(p => p.collection === "Gift Sets").slice(0, 3).map(p => ({ name: p.name, image: p.image, price: p.price, id: p.id })),
  },
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
  const [activeCurrency, setActiveCurrency] = useState("AED");
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(() => getCartCount());
  const [cartProducts, setCartProducts] = useState<{ id: string; name: string; image: string; price: number; currency: string; qty: number }[]>([]);
  const [loggedIn, setLoggedIn] = useState(() => isLoggedIn());
  const [userDrawerOpen, setUserDrawerOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const router = useRouter();
  const location = usePathname();

  const currencies = ["AED", "USD", "EUR", "GBP", "SAR", "KWD", "QAR"];
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
    const updateAuth = () => setLoggedIn(isLoggedIn());
    const updateWishlist = () => setWishlistCount(getWishlist().length);
    updateWishlist();
    updateCart();
    window.addEventListener("cart-updated", updateCart);
    window.addEventListener("auth-updated", updateAuth);
    window.addEventListener("wishlist-updated", updateWishlist);
    return () => {
      window.removeEventListener("cart-updated", updateCart);
      window.removeEventListener("auth-updated", updateAuth);
      window.removeEventListener("wishlist-updated", updateWishlist);
    };
  }, []);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveMegaMenu(null);
    setUserDrawerOpen(false);
  }, [location]);

  const isDarkText = true;

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isDarkText
            ? "bg-white shadow-[0_1px_0_rgba(0,0,0,0.04)]" 
            : "bg-white"
        }`}
        onMouseEnter={() => setIsHoveringNav(true)}
        onMouseLeave={() => { setIsHoveringNav(false); setActiveMegaMenu(null); }}
      >
        <div className={`transition-all duration-500 overflow-hidden hidden md:block ${
          isScrolled ? "h-0 opacity-0" : "h-[32px] opacity-100 bg-[#1a1308] text-[#c9a96e]"
        }`}>
          <div className="px-5 md:px-10 lg:px-20 xl:px-28 h-full flex items-center justify-center text-[12px] tracking-[0.2em] uppercase font-light text-[#ffffff]">
            Free Shipping Worldwide on all orders above AED 1500
          </div>
        </div>
        
        <div className="px-4 md:px-10 lg:px-20 xl:px-28 relative text-[18px] font-medium">
          <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? "h-[52px] md:h-[64px]" : "h-[56px] md:h-[80px]"}`}>
            
            <button 
              className={`md:hidden p-2 -ml-2 transition-colors duration-300 ${
                isDarkText ? "text-black" : "text-white"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} strokeWidth={1} /> : <Menu size={20} strokeWidth={1} />}
            </button>

            <nav className="hidden md:flex items-center gap-6 flex-1">
              {Object.keys(megaMenuData).map((menuKey) => (
                <div
                  key={menuKey}
                  className="relative"
                  onMouseEnter={() => setActiveMegaMenu(menuKey)}
                >
                  <Link href="/collection">
                    <span className={`text-[10px] font-medium tracking-[0.15em] uppercase transition-colors luxury-underline cursor-pointer flex items-center gap-1 ${
                      !isDarkText ? "text-white hover:text-white" : "text-black hover:text-black"
                    } ${activeMegaMenu === menuKey ? "!text-[#c9a96e]" : ""}`}>
                      {menuKey}
                    </span>
                  </Link>
                </div>
              ))}
              <Link href="/collection">
                <span className={`text-[10px] font-medium tracking-[0.15em] uppercase transition-colors luxury-underline cursor-pointer ${
                  !isDarkText ? "text-white hover:text-white" : "text-black hover:text-black"
                }`}
                onMouseEnter={() => setActiveMegaMenu(null)}
                >
                  New Arrivals
                </span>
              </Link>
            </nav>

            <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center h-full max-w-[100px] md:max-w-[180px]">
              <img 
                src={logoUrl} 
                alt="Emirates Pride" 
                className={`transition-all duration-500 w-full object-contain ${isScrolled ? "max-h-[24px] md:max-h-[36px]" : "max-h-[30px] md:max-h-[50px]"} ${
                  !isDarkText ? "filter brightness-0 invert" : "filter-none"
                }`}
              />
            </Link>

            <div className="flex items-center gap-4 md:gap-6 flex-1 justify-end">
              <div 
                className="hidden md:block relative"
                onMouseEnter={() => { setIsCurrencyMenuOpen(true); setActiveMegaMenu(null); }}
                onMouseLeave={() => setIsCurrencyMenuOpen(false)}
              >
                <button className={`flex items-center gap-1.5 text-[10px] font-medium tracking-[0.1em] uppercase transition-colors ${
                  !isDarkText ? "text-white hover:text-white" : "text-black hover:text-black"
                }`}>
                  <Globe size={14} strokeWidth={1} />
                  <span>{activeCurrency}</span>
                  <ChevronDown size={12} strokeWidth={1} />
                </button>
                
                {isCurrencyMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-2xl border border-black/5 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-black/5">
                      <span className="text-[9px] uppercase tracking-widest text-black">Language</span>
                      <div className="flex gap-4 mt-2">
                        <button className="text-[11px] font-medium text-black border-b border-[#c9a96e] pb-0.5">EN</button>
                        <button className="text-[11px] font-arabic text-black hover:text-black transition-colors">العربية</button>
                      </div>
                    </div>
                    <div className="p-2 max-h-[200px] overflow-y-auto hide-scrollbar">
                      <span className="px-2 py-2 text-[9px] uppercase tracking-widest text-black block">Currency</span>
                      {currencies.map(currency => (
                        <button 
                          key={currency}
                          onClick={() => {
                            setActiveCurrency(currency);
                            setIsCurrencyMenuOpen(false);
                          }}
                          className={`w-full text-left px-2 py-2 text-[11px] uppercase tracking-wider transition-colors ${
                            activeCurrency === currency ? "bg-[#c9a96e]/10 font-medium text-[#c9a96e]" : "text-black hover:text-[#c9a96e] hover:bg-[#c9a96e]/5"
                          }`}
                        >
                          {currency}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button className={`hidden md:block transition-colors ${
                !isDarkText ? "text-white hover:text-white" : "text-black hover:text-black"
              }`}
              onMouseEnter={() => setActiveMegaMenu(null)}
              >
                <Search size={16} strokeWidth={1} />
              </button>
              
              <button
                className={`hidden md:block transition-colors ${
                  !isDarkText ? "text-white hover:text-white" : "text-black hover:text-black"
                }`}
                onClick={() => {
                  if (loggedIn) {
                    setUserDrawerOpen(true);
                    setActiveMegaMenu(null);
                  } else {
                    router.push("/login");
                  }
                }}
                onMouseEnter={() => setActiveMegaMenu(null)}
              >
                <User size={16} strokeWidth={1} />
              </button>
              
              <Link href="/wishlist">
                <button 
                  className={`transition-colors ${
                    !isDarkText ? "text-white hover:text-white" : "text-black hover:text-black"
                  }`}
                  onMouseEnter={() => setActiveMegaMenu(null)}
                  data-testid="button-wishlist-header"
                >
                  <Heart size={18} strokeWidth={1} />
                </button>
              </Link>

              <button 
                className={`flex items-center gap-2 transition-colors relative ${
                  !isDarkText ? "text-white hover:text-white" : "text-black hover:text-black"
                }`}
                onClick={() => setIsCartOpen(true)}
                onMouseEnter={() => setActiveMegaMenu(null)}
              >
                <ShoppingBag size={18} strokeWidth={1} />
                <span className="hidden md:inline text-[10px] font-medium tracking-[0.15em] uppercase">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-2 text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-medium bg-[#c9a96e] text-white">{cartCount}</span>
                )}
              </button>
            </div>
          </div>
        </div>

        {activeMegaMenu && megaMenuData[activeMegaMenu] && (
          <div 
            className="hidden md:block absolute top-full left-0 w-full bg-white shadow-xl border-t border-black/5 animate-in fade-in slide-in-from-top-1 duration-300 z-40"
            onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
            onMouseLeave={() => setActiveMegaMenu(null)}
          >
            <div className="px-10 lg:px-20 xl:px-28 py-10 flex gap-16">
              <div className="flex-shrink-0 w-48">
                <h3 className="text-[9px] font-medium tracking-[0.25em] uppercase text-[#c9a96e] mb-5">{activeMegaMenu}</h3>
                <ul className="flex flex-col gap-3">
                  {megaMenuData[activeMegaMenu].subcategories.map((sub) => (
                    <li key={sub.name}>
                      <Link href={sub.link}>
                        <span className="text-[12px] text-black hover:text-[#c9a96e] transition-colors cursor-pointer tracking-wide">
                          {sub.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex-1">
                <h4 className="text-[9px] font-medium tracking-[0.25em] uppercase text-black mb-5">Featured</h4>
                <div className="grid grid-cols-3 gap-5">
                  {megaMenuData[activeMegaMenu].featured.map((item) => (
                    <Link key={item.id} href={`/product/${item.id}`}>
                      <div className="group cursor-pointer">
                        <div className="aspect-[3/4] overflow-hidden bg-[#f8f8f8] mb-3">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                        </div>
                        <p className="text-[12px] font-serif text-black group-hover:text-[#c9a96e] transition-colors">{item.name}</p>
                        <p className="text-[10px] text-black mt-0.5">AED {item.price}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0 w-52 flex flex-col justify-between">
                <div>
                  <h4 className="text-[9px] font-medium tracking-[0.25em] uppercase text-black mb-4">Discover</h4>
                  <p className="text-[11px] text-black leading-relaxed font-light mb-5">Explore our complete {activeMegaMenu.toLowerCase()} collection, crafted with the finest ingredients.</p>
                </div>
                <Link href="/collection">
                  <span className="creed-button text-center block">View All</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        <div className={`absolute top-full left-0 w-full bg-white transition-all duration-500 ease-in-out origin-top border-t border-black/5 overflow-hidden md:hidden shadow-2xl ${
          isMenuOpen ? "max-h-[calc(100svh-56px)] opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="px-5 py-6 flex flex-col gap-0 h-[calc(100svh-56px)] overflow-y-auto">
            <Link href="/collection">
              <span className="text-[15px] font-serif tracking-wide uppercase border-b border-black/8 py-4 flex justify-between items-center block cursor-pointer active:bg-black/3 -mx-5 px-5">
                Oud & Dakhoon <ChevronDown size={12} className="-rotate-90 text-black" />
              </span>
            </Link>
            <Link href="/collection">
              <span className="text-[15px] font-serif tracking-wide uppercase border-b border-black/8 py-4 flex justify-between items-center block cursor-pointer active:bg-black/3 -mx-5 px-5">
                Perfume Collection <ChevronDown size={12} className="-rotate-90 text-black" />
              </span>
            </Link>
            <Link href="/collection">
              <span className="text-[15px] font-serif tracking-wide uppercase border-b border-black/8 py-4 flex justify-between items-center block cursor-pointer active:bg-black/3 -mx-5 px-5">
                Gift Sets <ChevronDown size={12} className="-rotate-90 text-black" />
              </span>
            </Link>
            <Link href="/collection">
              <span className="text-[15px] font-serif tracking-wide uppercase border-b border-black/8 py-4 flex justify-between items-center block cursor-pointer active:bg-black/3 -mx-5 px-5">
                New Arrivals <ChevronDown size={12} className="-rotate-90 text-black" />
              </span>
            </Link>
            
            <div className="flex items-center justify-between mt-6 py-4 border-b border-black/8">
              <div className="flex items-center gap-3">
                <Globe size={14} strokeWidth={1} className="text-black" />
                <span className="text-[10px] uppercase tracking-[0.15em] text-black">Region</span>
              </div>
              <div className="flex items-center gap-3">
                <button className="text-[10px] font-medium uppercase tracking-wider border-b border-[#c9a96e] text-black pb-0.5">EN</button>
                <span className="text-black">|</span>
                <button className="text-[11px] font-arabic text-black">العربية</button>
                <span className="text-black">|</span>
                <select 
                  value={activeCurrency}
                  onChange={(e) => setActiveCurrency(e.target.value)}
                  className="bg-transparent text-[10px] uppercase tracking-wider border-none outline-none cursor-pointer text-black font-medium"
                >
                  {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            
            <div className="mt-auto flex flex-col gap-4 pt-5 pb-6">
              {loggedIn ? (
                <>
                  <Link href="/account">
                    <span className="flex items-center justify-center gap-2.5 bg-[#1a1308] text-white py-3.5 text-[9px] tracking-[0.2em] uppercase font-medium cursor-pointer active:bg-[#c9a96e] transition-colors w-full">
                      <User size={14} strokeWidth={1} /> My Account
                    </span>
                  </Link>
                  <button
                    onClick={() => { logout(); router.push("/"); }}
                    className="flex items-center justify-center gap-2.5 border border-black/15 text-black py-3.5 text-[9px] tracking-[0.2em] uppercase font-medium cursor-pointer active:bg-black/5 transition-colors w-full"
                  >
                    <LogOut size={14} strokeWidth={1} /> Sign Out
                  </button>
                </>
              ) : (
                <Link href="/login">
                  <span className="flex items-center justify-center gap-2.5 bg-[#1a1308] text-white py-3.5 text-[9px] tracking-[0.2em] uppercase font-medium cursor-pointer active:bg-[#c9a96e] transition-colors w-full">
                    <User size={14} strokeWidth={1} /> Sign In / Register
                  </span>
                </Link>
              )}
              <div className="flex justify-center gap-6 pt-2">
                <a href="#" className="text-black"><Instagram size={18} strokeWidth={1}/></a>
                <a href="#" className="text-black"><Facebook size={18} strokeWidth={1}/></a>
                <a href="#" className="text-black"><Twitter size={18} strokeWidth={1}/></a>
              </div>
            </div>
          </div>
        </div>
      </header>
      {!location.startsWith("/product/") && (
        <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-black/10 safe-area-bottom">
          <div className="flex items-center justify-around h-14">
            <Link href="/">
              <span className={`flex flex-col items-center gap-1 cursor-pointer ${location === "/" ? "text-[#c9a96e]" : "text-black"}`} data-testid="nav-home">
                <Home size={18} strokeWidth={1.2} />
                <span className="text-[8px] tracking-wider uppercase font-medium">Home</span>
              </span>
            </Link>
            <Link href="/collection">
              <span className={`flex flex-col items-center gap-1 cursor-pointer ${location === "/collection" ? "text-[#c9a96e]" : "text-black"}`} data-testid="nav-shop">
                <Grid3X3 size={18} strokeWidth={1.2} />
                <span className="text-[8px] tracking-wider uppercase font-medium">Shop</span>
              </span>
            </Link>
            <Link href="/collection">
              <span className="flex flex-col items-center gap-1 cursor-pointer text-black" data-testid="nav-search">
                <Search size={18} strokeWidth={1.2} />
                <span className="text-[8px] tracking-wider uppercase font-medium">Search</span>
              </span>
            </Link>
            <Link href="/wishlist">
              <span className={`flex flex-col items-center gap-1 cursor-pointer ${location === "/wishlist" ? "text-[#c9a96e]" : "text-black"}`} data-testid="nav-wishlist">
                <Heart size={18} strokeWidth={1.2} />
                <span className="text-[8px] tracking-wider uppercase font-medium">Wishlist</span>
              </span>
            </Link>
            <button onClick={() => setIsCartOpen(true)} className="flex flex-col items-center gap-1 cursor-pointer text-black" data-testid="nav-cart">
              <ShoppingBag size={18} strokeWidth={1.2} />
              <span className="text-[8px] tracking-wider uppercase font-medium">Cart</span>
            </button>
          </div>
        </div>
      )}
      {/* User Account Drawer */}
      {userDrawerOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
            onClick={() => setUserDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 w-[88vw] max-w-[380px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out">
            <div className="flex items-center justify-between px-5 py-4 md:p-6 border-b border-black/10">
              <h2 className="text-[9px] md:text-[10px] font-medium uppercase tracking-[0.2em]">My Account</h2>
              <button
                onClick={() => setUserDrawerOpen(false)}
                className="text-black hover:text-black transition-transform hover:rotate-90 duration-300 p-1"
              >
                <X size={18} strokeWidth={1} />
              </button>
            </div>
            {loggedIn && getUser() ? (
              <div className="flex-1 flex flex-col overflow-y-auto">
                <div className="px-5 py-5 md:px-6 md:py-6 border-b border-black/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#8a6d3b] flex items-center justify-center text-white shadow-lg">
                      <span className="text-sm font-serif">{getUser()?.firstName[0]}{getUser()?.lastName[0]}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-serif text-black truncate">{getUser()?.firstName} {getUser()?.lastName}</p>
                      <p className="text-[10px] text-black/40 truncate">{getUser()?.email}</p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 py-2">
                  <Link href="/account" onClick={() => setUserDrawerOpen(false)}>
                    <span className="flex items-center gap-4 px-5 md:px-6 py-3.5 hover:bg-[#c9a96e]/5 transition-colors cursor-pointer">
                      <User size={18} strokeWidth={1.2} className="text-[#c9a96e]" />
                      <span className="flex-1 text-[12px] text-black tracking-wide">My Account</span>
                      <ChevronRight size={14} className="text-black/20" />
                    </span>
                  </Link>
                  <Link href="/account" onClick={() => setUserDrawerOpen(false)}>
                    <span className="flex items-center gap-4 px-5 md:px-6 py-3.5 hover:bg-[#c9a96e]/5 transition-colors cursor-pointer">
                      <Package size={18} strokeWidth={1.2} className="text-[#c9a96e]" />
                      <span className="flex-1 text-[12px] text-black tracking-wide">My Orders</span>
                      <ChevronRight size={14} className="text-black/20" />
                    </span>
                  </Link>
                  <Link href="/wishlist" onClick={() => setUserDrawerOpen(false)}>
                    <span className="flex items-center gap-4 px-5 md:px-6 py-3.5 hover:bg-[#c9a96e]/5 transition-colors cursor-pointer">
                      <Heart size={18} strokeWidth={1.2} className="text-[#c9a96e]" />
                      <span className="flex-1 text-[12px] text-black tracking-wide">My Wishlist</span>
                      {wishlistCount > 0 && <span className="text-[9px] text-[#c9a96e] font-medium">{wishlistCount}</span>}
                      <ChevronRight size={14} className="text-black/20" />
                    </span>
                  </Link>
                  <Link href="/account" onClick={() => setUserDrawerOpen(false)}>
                    <span className="flex items-center gap-4 px-5 md:px-6 py-3.5 hover:bg-[#c9a96e]/5 transition-colors cursor-pointer">
                      <MapPin size={18} strokeWidth={1.2} className="text-[#c9a96e]" />
                      <span className="flex-1 text-[12px] text-black tracking-wide">My Addresses</span>
                      <ChevronRight size={14} className="text-black/20" />
                    </span>
                  </Link>
                  <Link href="/account" onClick={() => setUserDrawerOpen(false)}>
                    <span className="flex items-center gap-4 px-5 md:px-6 py-3.5 hover:bg-[#c9a96e]/5 transition-colors cursor-pointer">
                      <Settings size={18} strokeWidth={1.2} className="text-[#c9a96e]" />
                      <span className="flex-1 text-[12px] text-black tracking-wide">Settings</span>
                      <ChevronRight size={14} className="text-black/20" />
                    </span>
                  </Link>
                </div>
                <div className="px-5 md:px-6 py-4 border-t border-black/5">
                  <button
                    onClick={() => { logout(); setUserDrawerOpen(false); router.push("/"); }}
                    className="flex items-center justify-center gap-2.5 w-full border border-black/10 text-black/60 py-3 text-[9px] tracking-[0.2em] uppercase font-medium hover:text-red-500 hover:border-red-200 transition-colors"
                  >
                    <LogOut size={14} strokeWidth={1} /> Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-14 h-14 mb-5 border border-black/10 rounded-full flex items-center justify-center bg-[#fafafa]">
                  <User size={18} strokeWidth={1} className="text-black/40" />
                </div>
                <p className="font-serif text-xl mb-2">Welcome</p>
                <p className="text-[11px] text-black/40 mb-6 max-w-[200px]">Sign in to access your account, orders, and wishlist.</p>
                <Link href="/login" onClick={() => setUserDrawerOpen(false)}>
                  <span className="creed-button inline-block cursor-pointer">Sign In</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}

      {isCartOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
            onClick={() => setIsCartOpen(false)}
          />
          
          <div className="absolute inset-y-0 right-0 w-[88vw] max-w-[400px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out">
            <div className="flex items-center justify-between px-5 py-4 md:p-6 border-b border-black/10">
              <h2 className="text-[9px] md:text-[10px] font-medium uppercase tracking-[0.2em]">Your Cart ({cartCount})</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-black hover:text-black transition-transform hover:rotate-90 duration-300 p-1"
              >
                <X size={18} strokeWidth={1} />
              </button>
            </div>

            {cartCount === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-8 text-center bg-[#fafafa]">
                <div className="w-14 h-14 md:w-16 md:h-16 mb-5 md:mb-6 border border-black/10 rounded-full flex items-center justify-center bg-white">
                  <ShoppingBag size={18} strokeWidth={1} className="text-black" />
                </div>
                <p className="font-serif text-xl md:text-2xl mb-2 md:mb-3">Your cart is empty.</p>
                <p className="text-[11px] md:text-xs text-black mb-6 md:mb-8 font-light max-w-[200px]">Explore our collections and discover your new signature scent.</p>
                <Link href="/collection">
                  <span 
                    onClick={() => setIsCartOpen(false)}
                    className="creed-button w-full block cursor-pointer"
                  >
                    Continue Shopping
                  </span>
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-5 md:p-6 flex flex-col gap-4">
                  {cartProducts.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 pb-4 border-b border-black/5 last:border-b-0">
                      <div className="w-16 h-16 bg-[#f5f5f5] flex-shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-serif text-black truncate">{item.name}</p>
                        <p className="text-[9px] text-black/50 mt-0.5">Qty: {item.qty}</p>
                        <p className="text-[11px] font-medium text-black mt-0.5">{item.currency} {item.price * item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-5 md:p-6 border-t border-black/10 flex flex-col gap-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-[10px] tracking-[0.15em] uppercase font-medium text-black">Total</span>
                    <span className="text-sm font-medium text-black">AED {cartProducts.reduce((s, i) => s + i.price * i.qty, 0)}</span>
                  </div>
                  <Link href="/checkout">
                    <span
                      onClick={() => setIsCartOpen(false)}
                      className="creed-button w-full block cursor-pointer text-center"
                    >
                      Checkout
                    </span>
                  </Link>
                  <Link href="/collection">
                    <span
                      onClick={() => setIsCartOpen(false)}
                      className="creed-button-outline w-full block cursor-pointer text-center"
                    >
                      Continue Shopping
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
