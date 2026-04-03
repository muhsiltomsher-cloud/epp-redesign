"use client";

import { Search, ShoppingBag, Menu, User, X, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCart, getCartCount } from "@/lib/cart";
import { products } from "@/lib/data";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [cartProducts, setCartProducts] = useState<{ id: string; name: string; image: string; price: number; currency: string; qty: number }[]>([]);
  const pathname = usePathname();

  const logoUrl = "https://emiratespride.com/wp-content/uploads/2026/01/logo-epp.png";

  useEffect(() => {
    setCartCount(getCartCount());
    const updateCart = () => {
      setCartCount(getCartCount());
      const items = getCart();
      setCartProducts(items.map(ci => {
        const p = products.find(pr => pr.id === ci.productId);
        return p ? { id: p.id, name: p.name, image: p.image, price: p.price, currency: p.currency, qty: ci.quantity } : null;
      }).filter((x): x is { id: string; name: string; image: string; price: number; currency: string; qty: number } => x !== null));
    };
    updateCart();
    window.addEventListener("cart-updated", updateCart);
    return () => window.removeEventListener("cart-updated", updateCart);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white ${isScrolled ? "shadow-sm" : ""}`}>
        <div className="px-4 md:px-10 lg:px-20">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 -ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/collection">
                <span className="text-xs tracking-wider uppercase hover:text-[#c9a96e] transition-colors cursor-pointer">Shop</span>
              </Link>
              <Link href="/collection">
                <span className="text-xs tracking-wider uppercase hover:text-[#c9a96e] transition-colors cursor-pointer">New</span>
              </Link>
            </nav>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <img src={logoUrl} alt="Emirates Pride" className="h-8 md:h-10 object-contain" />
            </Link>

            {/* Right Icons */}
            <div className="flex items-center gap-4">
              <button className="hidden md:block hover:text-[#c9a96e] transition-colors">
                <Search size={18} />
              </button>
              <Link href="/account">
                <button className="hidden md:block hover:text-[#c9a96e] transition-colors">
                  <User size={18} />
                </button>
              </Link>
              <Link href="/wishlist">
                <button className="hover:text-[#c9a96e] transition-colors">
                  <Heart size={18} />
                </button>
              </Link>
              <button className="relative hover:text-[#c9a96e] transition-colors" onClick={() => setIsCartOpen(true)}>
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#c9a96e] text-white text-[10px] rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="px-4 py-4 flex flex-col gap-4">
              <Link href="/collection">
                <span className="block py-2 text-sm uppercase tracking-wider cursor-pointer">Shop All</span>
              </Link>
              <Link href="/collection">
                <span className="block py-2 text-sm uppercase tracking-wider cursor-pointer">New Arrivals</span>
              </Link>
              <Link href="/account">
                <span className="block py-2 text-sm uppercase tracking-wider cursor-pointer">Account</span>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/30" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-xl flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-sm uppercase tracking-wider">Cart ({cartCount})</h2>
              <button onClick={() => setIsCartOpen(false)}>
                <X size={20} />
              </button>
            </div>

            {cartCount === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <ShoppingBag size={40} className="text-gray-300 mb-4" />
                <p className="text-lg font-serif mb-2">Your cart is empty</p>
                <Link href="/collection">
                  <span onClick={() => setIsCartOpen(false)} className="text-sm text-[#c9a96e] hover:underline cursor-pointer">
                    Continue Shopping
                  </span>
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4">
                  {cartProducts.map((item) => (
                    <div key={item.id} className="flex gap-4 py-4 border-b">
                      <img src={item.image} alt={item.name} className="w-16 h-20 object-cover bg-gray-100" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                        <p className="text-sm mt-1">{item.currency} {item.price * item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Total</span>
                    <span className="font-medium">AED {cartProducts.reduce((s, i) => s + i.price * i.qty, 0)}</span>
                  </div>
                  <Link href="/checkout">
                    <span onClick={() => setIsCartOpen(false)} className="block w-full bg-[#1a1308] text-white text-center py-3 text-sm uppercase tracking-wider hover:bg-[#c9a96e] transition-colors cursor-pointer">
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
