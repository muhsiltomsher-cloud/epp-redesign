import { Search, ShoppingBag, Menu, User, X, Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { getCart, getCartCount } from "@/lib/cart";
import { products } from "@/lib/data";

const menuItems = [
  { label: "Perfumes", href: "/collection" },
  { label: "Collection", href: "/collection" },
  { label: "Gift Sets", href: "/collection" },
  { label: "Accessories", href: "/collection" },
  { label: "Oud", href: "/collection" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(() => getCartCount());
  const [cartProducts, setCartProducts] = useState<{ id: string; name: string; image: string; price: number; currency: string; qty: number }[]>([]);
  const [location] = useLocation();

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
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 bg-white ${isScrolled ? "shadow-sm" : ""}`}>
        {/* Layer 1: Logo + Icons */}
        <div className="px-4 md:px-8 lg:px-16 xl:px-24 border-b border-black/5">
          <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? "h-14 md:h-16" : "h-16 md:h-20"}`}>
            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 -ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Empty space for desktop left side */}
            <div className="hidden md:block w-32"></div>

            {/* Logo - Center */}
            <Link href="/" className="flex items-center justify-center">
              <img 
                src={logoUrl} 
                alt="Emirates Pride" 
                className={`object-contain transition-all duration-300 ${isScrolled ? "h-8 md:h-10" : "h-10 md:h-14"}`}
              />
            </Link>

            {/* Right Icons */}
            <div className="flex items-center gap-4 md:gap-5">
              <button className="hidden md:flex items-center gap-2 hover:text-[#c9a96e] transition-colors">
                <Search size={18} />
              </button>
              <Link href="/account">
                <button className="hidden md:flex items-center gap-2 hover:text-[#c9a96e] transition-colors">
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
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#c9a96e] text-white text-[9px] rounded-full flex items-center justify-center font-medium">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Layer 2: Navigation Menu (Desktop) */}
        <div className={`hidden md:block transition-all duration-300 overflow-hidden ${isScrolled ? "h-0 opacity-0" : "h-10 opacity-100"} border-b border-black/5`}>
          <div className="h-full px-4 md:px-8 lg:px-16 xl:px-24">
            <nav className="h-full flex items-center justify-center gap-8 lg:gap-10">
              {menuItems.map((item) => (
                <Link key={item.label} href={item.href}>
                  <span className="text-[11px] tracking-[0.15em] uppercase font-medium hover:text-[#c9a96e] transition-colors cursor-pointer">
                    {item.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <nav className="px-4 py-4 flex flex-col">
              {menuItems.map((item) => (
                <Link key={item.label} href={item.href}>
                  <span className="block py-3 text-sm uppercase tracking-[0.15em] font-medium cursor-pointer border-b border-black/5">
                    {item.label}
                  </span>
                </Link>
              ))}
              <Link href="/account">
                <span className="block py-3 text-sm uppercase tracking-[0.15em] font-medium cursor-pointer border-b border-black/5">
                  Account
                </span>
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100]">
          <div className="absolute inset-0 bg-black/40" onClick={() => setIsCartOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="text-sm uppercase tracking-[0.15em] font-medium">Cart ({cartCount})</h2>
              <button onClick={() => setIsCartOpen(false)} className="p-1 hover:opacity-70 transition-opacity">
                <X size={22} />
              </button>
            </div>

            {cartCount === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                <ShoppingBag size={48} className="text-gray-200 mb-6" />
                <p className="text-xl font-serif mb-3">Your cart is empty</p>
                <p className="text-sm text-gray-500 mb-6">Discover our luxury fragrances</p>
                <Link href="/collection">
                  <span onClick={() => setIsCartOpen(false)} className="inline-block bg-[#1a1308] text-white px-8 py-3 text-xs uppercase tracking-[0.15em] hover:bg-[#c9a96e] transition-colors cursor-pointer">
                    Shop Now
                  </span>
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-5">
                  {cartProducts.map((item) => (
                    <div key={item.id} className="flex gap-4 py-5 border-b border-black/5">
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
                    <span className="text-lg font-medium">AED {cartProducts.reduce((s, i) => s + i.price * i.qty, 0)}</span>
                  </div>
                  <Link href="/checkout">
                    <span onClick={() => setIsCartOpen(false)} className="block w-full bg-[#1a1308] text-white text-center py-4 text-xs uppercase tracking-[0.15em] hover:bg-[#c9a96e] transition-colors cursor-pointer">
                      Checkout
                    </span>
                  </Link>
                  <Link href="/collection">
                    <span onClick={() => setIsCartOpen(false)} className="block w-full text-center py-3 mt-2 text-xs uppercase tracking-[0.15em] text-gray-600 hover:text-black transition-colors cursor-pointer">
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
