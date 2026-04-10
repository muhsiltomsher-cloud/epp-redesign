"use client";

import { Search, ShoppingBag, Menu, User, X, Heart, ChevronRight, Home, LayoutGrid, MapPin, ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getCart, getCartCount } from "@/lib/cart";
import { products } from "@/lib/data";

const megaMenus: Record<string, {
  columns: { heading: string; links: { label: string; href: string }[] }[];
  featured: { label: string; image: string; href: string };
}> = {
  Fragrances: {
    columns: [
      {
        heading: "Shop By Type",
        links: [
          { label: "All Fragrances", href: "/collection" },
          { label: "Perfume Collection", href: "/collection" },
          { label: "Oil Perfumes", href: "/collection" },
          { label: "Oud & Dakhoon", href: "/collection" },
          { label: "Home Collection", href: "/collection" },
        ],
      },
      {
        heading: "Explore",
        links: [
          { label: "Best Sellers", href: "/collection" },
          { label: "New Arrivals", href: "/collection" },
          { label: "Exclusives", href: "/collection" },
          { label: "Limited Editions", href: "/collection" },
        ],
      },
    ],
    featured: {
      label: "Future Collection",
      image: "https://emiratespride.com/wp-content/uploads/2026/01/Future-Bakhoor-Lifestyle-scaled-1.webp",
      href: "/collection",
    },
  },
  "Just Arrived": {
    columns: [
      {
        heading: "New In",
        links: [
          { label: "Future Bakhoor", href: "/product/53689" },
          { label: "Future Oud", href: "/product/53688" },
          { label: "Future Dakhoon", href: "/product/53691" },
          { label: "Future Traditional Set", href: "/product/53690" },
          { label: "Midnight Bloom Burgundy", href: "/product/51968" },
        ],
      },
      {
        heading: "Trending",
        links: [
          { label: "Hidden Leather", href: "/product/16476" },
          { label: "Al Emarat", href: "/product/16479" },
          { label: "Barjeel", href: "/product/16483" },
          { label: "Masters", href: "/product/1" },
        ],
      },
    ],
    featured: {
      label: "The Future Collection",
      image: "https://emiratespride.com/wp-content/uploads/2026/01/Future-Oud-scaled-1.webp",
      href: "/collection",
    },
  },
  Collections: {
    columns: [
      {
        heading: "Our Collections",
        links: [
          { label: "Oud & Dakhoon", href: "/collection" },
          { label: "Perfume Collection", href: "/collection" },
          { label: "Oil Perfumes", href: "/collection" },
          { label: "Accessories", href: "/collection" },
        ],
      },
      {
        heading: "Signature",
        links: [
          { label: "The Future Series", href: "/collection" },
          { label: "The Heritage Series", href: "/collection" },
          { label: "The Midnight Series", href: "/collection" },
        ],
      },
    ],
    featured: {
      label: "Natural Oud",
      image: "https://emiratespride.com/wp-content/uploads/2026/04/oud-hindi-malaki.webp",
      href: "/collection",
    },
  },
  "Gift Sets": {
    columns: [
      {
        heading: "Shop Gift Sets",
        links: [
          { label: "All Gift Sets", href: "/collection" },
          { label: "Future Traditional Set", href: "/product/53690" },
          { label: "Midnight Glow Set", href: "/product/50534" },
          { label: "Luxury Gift Boxes", href: "/collection" },
        ],
      },
      {
        heading: "Occasions",
        links: [
          { label: "Eid Gifts", href: "/collection" },
          { label: "Wedding Gifts", href: "/collection" },
          { label: "Corporate Gifts", href: "/collection" },
          { label: "Birthday Gifts", href: "/collection" },
        ],
      },
    ],
    featured: {
      label: "Gift with Elegance",
      image: "https://emiratespride.com/wp-content/uploads/2026/01/Mostakbal-scaled-1.webp",
      href: "/collection",
    },
  },
  "Home Collection": {
    columns: [
      {
        heading: "Home Fragrance",
        links: [
          { label: "Bakhoor & Dakhoon", href: "/collection" },
          { label: "Room Diffusers", href: "/collection" },
          { label: "Candles", href: "/collection" },
          { label: "Accessories", href: "/collection" },
        ],
      },
      {
        heading: "For Your Space",
        links: [
          { label: "Living Room", href: "/collection" },
          { label: "Bedroom", href: "/collection" },
          { label: "Office", href: "/collection" },
        ],
      },
    ],
    featured: {
      label: "Bakhoor Rituals",
      image: "https://emiratespride.com/wp-content/uploads/2026/01/Future-Bakhoor-scaled-1.webp",
      href: "/collection",
    },
  },
  "Body Collection": {
    columns: [
      {
        heading: "Body Care",
        links: [
          { label: "Body Lotions", href: "/collection" },
          { label: "Hair Mists", href: "/collection" },
          { label: "Shower Gels", href: "/collection" },
          { label: "Body Oils", href: "/collection" },
        ],
      },
      {
        heading: "Bath & Beyond",
        links: [
          { label: "Bath Sets", href: "/collection" },
          { label: "Luxury Soaps", href: "/collection" },
          { label: "Travel Kits", href: "/collection" },
        ],
      },
    ],
    featured: {
      label: "Body Rituals",
      image: "https://emiratespride.com/wp-content/uploads/2025/07/EP281124_40944-copy.webp",
      href: "/collection",
    },
  },
};

const navItems = Object.entries(megaMenus).map(([label, data]) => ({
  label,
  href: data.featured?.href || "/collection",
}));

const labelMap: Record<string, string> = {
  "Fragrances": "العطور",
  "Just Arrived": "وصل حديثاً",
  "Collections": "المجموعات",
  "Gift Sets": "هدايا العطور",
  "Home Collection": "مجموعة المنزل",
  "Body Collection": "مجموعة الجسم",
  "Store Locator": "موقع المتاجر",
  "New In": "جديد",
  "Trending": "الأكثر رواجاً",
  "Our Collections": "مجموعاتنا",
  "Signature": "توقيعات",
  "Shop Gift Sets": "تسوق الهدايا",
  "Occasions": "المناسبات",
  "Home Fragrance": "عطور المنزل",
  "For Your Space": "لمساحتك",
  "Body Care": "عناية الجسم",
  "Bath & Beyond": "استحمام وما بعده",
};

const translateLabel = (text: string, isAr: boolean) => (isAr ? (labelMap[text] || text) : text);
const currencyList = [
  { code: "USD", flag: "🇺🇸" },
  { code: "EUR", flag: "🇪🇺" },
  { code: "AED", flag: "🇦🇪" },
  { code: "SAR", flag: "🇸🇦" },
  { code: "KWD", flag: "🇰🇼" },
  { code: "QAR", flag: "🇶🇦" },
  { code: "BHD", flag: "🇧🇭" },
  { code: "OMR", flag: "🇴🇲" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartProducts, setCartProducts] = useState<{ id: string; name: string; image: string; price: number; currency: string; qty: number }[]>([]);
  const [openMobileSection, setOpenMobileSection] = useState<string | null>(null);
  const [currency, setCurrency] = useState<string>("AED");
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
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
    setIsCartOpen(false);
    setIsCurrencyMenuOpen(false);
  }, [pathname]);

  const navBg = "bg-white border-b border-gray-100";
  const iconColor = "text-black hover:text-[var(--color-brand-gold)]";
  const logoFilter = "";
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const isArabic = pathname.startsWith("/ar");
  const toggleLocale = () => {
    if (isArabic) {
      const target = pathname.replace(/^\/ar/, "") || "/";
      router.push(target);
    } else {
      router.push(pathname === "/" ? "/ar" : `/ar${pathname}`);
    }
  };

  return (
    <>
      <header className={`fixed top-0 w-full z-50 ${navBg}`}>

        {/* ROW 1: top bar â€” country left, logo center, icons right */}
        <div className="epp-container">
          <div className="h-14 md:h-16 flex items-center justify-between relative">

            {/* Left: locale + currency */}
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
              {/* Desktop: locale + currency */}
              <div className="hidden md:flex items-center">
                <div className="relative flex items-center gap-3 border border-gray-200 px-3 py-1.5 rounded-full text-[10px] uppercase tracking-[0.15em]">
                  <button
                    className={`${iconColor} ${isArabic ? "opacity-60" : "font-medium"}`}
                    onClick={toggleLocale}
                  >
                    EN
                  </button>
                  <span className="text-black/30">|</span>
                  <button
                    className={`${iconColor} ${isArabic ? "font-medium" : "opacity-60"}`}
                    onClick={toggleLocale}
                  >
                    AR
                  </button>
                  <span className="text-black/30 mx-1">·</span>
                  <button
                    className={`${iconColor} flex items-center gap-1 ${currency === "AED" ? "font-medium" : ""}`}
                    onClick={() => setIsCurrencyMenuOpen((v) => !v)}
                  >
                    <span className="text-base leading-none" aria-hidden>{currencyList.find((c) => c.code === currency)?.flag || "🏳️"}</span> {currency}
                    <ChevronDown size={12} />
                  </button>
                  {isCurrencyMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-32 bg-white border border-gray-100 shadow-lg rounded-md z-50">
                      {currencyList.map((c) => (
                        <button
                          key={c.code}
                          onClick={() => { setCurrency(c.code); setIsCurrencyMenuOpen(false); }}
                          className={`w-full text-left px-3 py-2 text-[10px] uppercase tracking-[0.12em] flex items-center gap-2 hover:text-[var(--color-brand-gold)] hover:bg-[#fdf7ef] ${currency === c.code ? "text-[var(--color-brand-gold)]" : "text-gray-700"}`}
                        >
                          <span className="text-base leading-none" aria-hidden>{c.flag}</span>
                          <span>{c.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Center: Logo â€” absolutely centered */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <img
                src={logoUrl}
                alt="Emirates Pride"
                className={`h-10 md:h-11 object-contain transition-all duration-300 ${logoFilter}`}
              />
            </Link>

            {/* Right: search, account, wishlist, bag */}
            <div className="flex items-center gap-3 md:gap-4">
              <Link href="/store-locator" className={`transition-colors ${iconColor}`} aria-label="Store Locator">
                <MapPin size={18} />
              </Link>
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

        {/* ROW 2: main nav links â€” centered, desktop only */}
        <div className="hidden md:block border-t border-gray-100">
          <nav className="h-10 flex items-center justify-center gap-7 epp-container">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                <span className={`text-[10px] uppercase tracking-[0.15em] transition-colors cursor-pointer ${iconColor}`}>
                  {translateLabel(item.label, isArabic)}
                </span>
              </Link>
            ))}
          </nav>
        </div>

      </header>

      {/* Mobile full-screen menu â€” outside header so it truly covers everything */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-[200] flex flex-col md:hidden animate-slide-right">
          <div className="flex items-center justify-between epp-container h-14 border-b border-gray-100 flex-shrink-0">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <img src={logoUrl} alt="Emirates Pride" className="h-10 object-contain" />
            </Link>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 border border-gray-200 px-3 py-1 rounded-full text-[10px] uppercase tracking-[0.15em]">
                <button
                  onClick={toggleLocale}
                  className={`${isArabic ? "opacity-60" : "font-medium"} text-black hover:text-[var(--color-brand-gold)] transition-colors`}
                >
                  EN
                </button>
                <span className="text-black/30">|</span>
                <button
                  onClick={toggleLocale}
                  className={`${isArabic ? "font-medium" : "opacity-60"} text-black hover:text-[var(--color-brand-gold)] transition-colors`}
                >
                  AR
                </button>
                <span className="text-black/30 mx-1">·</span>
                <button
                  onClick={() => setIsCurrencyMenuOpen((v) => !v)}
                  className="text-black hover:text-[var(--color-brand-gold)] transition-colors flex items-center gap-1"
                >
                  <span className="text-base leading-none" aria-hidden>{currencyList.find((c) => c.code === currency)?.flag || "🏳️"}</span> {currency}
                </button>
              </div>
              <button onClick={() => setIsMenuOpen(false)}><X size={20} /></button>
            </div>
          </div>
          {isCurrencyMenuOpen && (
            <div className="px-4 pb-4 md:hidden">
              <div className="mt-2 w-full bg-white border border-gray-100 shadow rounded-md">
                {currencyList.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => { setCurrency(c.code); setIsCurrencyMenuOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-[11px] uppercase tracking-[0.12em] flex items-center gap-2 hover:text-[var(--color-brand-gold)] hover:bg-[#fdf7ef] ${currency === c.code ? "text-[var(--color-brand-gold)]" : "text-gray-700"}`}
                  >
                    <span className="text-base leading-none" aria-hidden>{c.flag}</span>
                    <span>{c.code}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          <nav className="flex-1 overflow-y-auto epp-container py-2 divide-y divide-gray-100">
            {navItems.map((item) => {
              const menu = (megaMenus as any)[item.label];
              const isOpen = openMobileSection === item.label;
              return (
                <div key={item.label}>
                  <button
                    className="w-full flex items-center justify-between py-4 text-[11px] uppercase tracking-[0.2em]"
                    onClick={() => setOpenMobileSection(isOpen ? null : item.label)}
                    aria-expanded={isOpen}
                  >
                    <span className="text-left">{translateLabel(item.label, isArabic)}</span>
                    <ChevronRight size={14} className={`transition-transform ${isOpen ? "rotate-90" : ""}`} />
                  </button>
                  {menu && isOpen && (
                    <div className="pb-4 space-y-4 pl-2">
                      {menu.columns.map((col: any) => (
                        <div key={col.heading} className="space-y-2">
                          <p className="text-[10px] uppercase tracking-[0.15em] text-gray-500">{translateLabel(col.heading, isArabic)}</p>
                          <div className="grid grid-cols-1 gap-2">
                            {col.links.map((link: any) => (
                              <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-[11px] text-gray-700 hover:text-[var(--color-brand-gold)] tracking-[0.05em]"
                              >
                                {translateLabel(link.label, isArabic)}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                      {menu.featured && (
                        <Link
                          href={menu.featured.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="block w-full bg-[var(--color-brand-gold)] text-white text-[10px] uppercase tracking-[0.2em] text-center py-3"
                        >
                          {menu.featured.label}
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>
      )}

      {/* Cart drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/50 animate-fade" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white flex flex-col animate-slide-left">
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
                className="text-[10px] uppercase tracking-[0.2em] border-b border-black pb-0.5 hover:text-[var(--color-brand-gold)] hover:border-[var(--color-brand-gold)] transition-colors cursor-pointer"
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
                    className="block w-full bg-[var(--color-brand-gold)] text-white text-center py-3.5 text-[10px] uppercase tracking-[0.2em] hover:bg-[var(--color-brand-gold-light)] transition-colors cursor-pointer"
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

      {/* Mobile bottom bar */}
      <nav className="fixed bottom-0 left-0 right-0 md:hidden bg-white/92 backdrop-blur border-t border-gray-200 shadow-[0_-6px_16px_rgba(0,0,0,0.07)] z-40 safe-area-bottom">
        <div className="grid grid-cols-5 h-[64px] text-[11px] uppercase tracking-[0.12em]">
          {[
            { label: "Home", href: "/", icon: <Home size={18} />, action: () => {} },
            { label: "Menu", href: "#", icon: <LayoutGrid size={18} />, action: () => setIsMenuOpen(true) },
            { label: "Wishlist", href: "/wishlist", icon: <Heart size={18} />, action: () => {} },
            { label: "Account", href: "/account", icon: <User size={18} />, action: () => {} },
            { label: "Bag", href: "#", icon: <ShoppingBag size={18} />, action: () => { refreshCart(); setIsCartOpen(true); }, badge: cartCount },
          ].map((item) => {
            const active = item.href !== "#" && isActive(item.href);
            const content = (
              <div className={`relative flex flex-col items-center justify-center h-full rounded-lg mx-0.5 px-0 transition-colors ${active ? "text-[var(--color-brand-gold)]" : "text-gray-600 hover:text-[var(--color-brand-gold)]"}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${active ? "bg-[var(--color-brand-gold-light)]/22" : "bg-transparent"}`}>
                  {item.icon}
                </div>
                <span className="mt-0.5">{item.label}</span>
                {item.badge ? (
                  <span className="absolute -top-1 right-2 min-w-[18px] h-[18px] px-[5px] rounded-full bg-[var(--color-brand-gold-dark)] text-white text-[9px] flex items-center justify-center">
                    {Math.min(item.badge, 9)}
                    {item.badge > 9 ? "+" : ""}
                  </span>
                ) : null}
              </div>
            );
            if (item.href === "#") {
              return (
                <button key={item.label} className="w-full h-full" onClick={item.action}>
                  {content}
                </button>
              );
            }
            return (
              <Link key={item.label} href={item.href}>
                {content}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}



