import { Search, ShoppingBag, Menu, User, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { products } from "@/lib/data";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHoveringNav, setIsHoveringNav] = useState(false);

  return (
    <>
      <header className={`sticky top-0 z-40 w-full transition-all duration-300 bg-white border-b ${isHoveringNav ? 'border-border' : 'border-transparent'}`}
        onMouseEnter={() => setIsHoveringNav(true)}
        onMouseLeave={() => setIsHoveringNav(false)}
      >
        {/* Top Announcement Bar - Very minimal */}
        <div className="bg-primary text-primary-foreground text-[10px] py-2.5 text-center tracking-[0.15em] uppercase font-light">
          Free Shipping Worldwide on all orders above AED 1500.
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative">
          <div className="flex items-center justify-between h-[72px]">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 -ml-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X size={22} strokeWidth={1} /> : <Menu size={22} strokeWidth={1} />}
            </button>

            {/* Desktop Navigation - Left */}
            <nav className="hidden md:flex items-center gap-8 flex-1">
              <Link href="/collection" className="text-[11px] font-medium tracking-[0.15em] uppercase text-foreground/80 hover:text-foreground transition-colors">
                Oud & Dakhoon
              </Link>
              <Link href="/collection" className="text-[11px] font-medium tracking-[0.15em] uppercase text-foreground/80 hover:text-foreground transition-colors">
                Perfume Collection
              </Link>
              <Link href="/collection" className="text-[11px] font-medium tracking-[0.15em] uppercase text-foreground/80 hover:text-foreground transition-colors">
                Gifts
              </Link>
            </nav>

            {/* Logo - Centered */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
              <span className="text-3xl font-serif tracking-[0.1em] text-center uppercase leading-none">
                Emirates
              </span>
              <span className="text-xl font-serif tracking-[0.2em] text-center uppercase leading-none mt-1">
                Pride
              </span>
            </Link>

            {/* Actions - Right */}
            <div className="flex items-center gap-5 md:gap-6 flex-1 justify-end">
              <button className="hidden md:flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] uppercase text-foreground/80 hover:text-foreground transition-colors" data-testid="button-search">
                <Search size={18} strokeWidth={1} />
                <span>Search</span>
              </button>
              <button className="md:hidden text-foreground" data-testid="button-search-mobile">
                <Search size={20} strokeWidth={1} />
              </button>
              
              <button className="hidden md:flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] uppercase text-foreground/80 hover:text-foreground transition-colors" data-testid="button-account">
                <User size={18} strokeWidth={1} />
                <span>Sign In</span>
              </button>
              
              <button 
                className="flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] uppercase text-foreground/80 hover:text-foreground transition-colors" 
                onClick={() => setIsCartOpen(true)}
                data-testid="button-cart"
              >
                <ShoppingBag size={18} strokeWidth={1} />
                <span className="hidden md:inline">Cart (0)</span>
                <span className="md:hidden absolute top-3 right-3 text-[9px] bg-primary text-white w-4 h-4 rounded-full flex items-center justify-center">0</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-[108px] left-0 w-full h-[calc(100vh-108px)] bg-white border-t border-border md:hidden flex flex-col animate-in slide-in-from-left-8 duration-300 z-50 overflow-y-auto">
            <div className="p-6 flex flex-col gap-6">
              <Link href="/collection" className="text-xl font-serif tracking-wide uppercase border-b border-border pb-4 flex justify-between items-center" onClick={() => setIsMenuOpen(false)}>
                Oud & Dakhoon <ChevronDown size={16} className="-rotate-90" />
              </Link>
              <Link href="/collection" className="text-xl font-serif tracking-wide uppercase border-b border-border pb-4 flex justify-between items-center" onClick={() => setIsMenuOpen(false)}>
                Perfume Collection <ChevronDown size={16} className="-rotate-90" />
              </Link>
              <Link href="/collection" className="text-xl font-serif tracking-wide uppercase border-b border-border pb-4 flex justify-between items-center" onClick={() => setIsMenuOpen(false)}>
                Gift Sets <ChevronDown size={16} className="-rotate-90" />
              </Link>
              <Link href="/bestsellers" className="text-xl font-serif tracking-wide uppercase border-b border-border pb-4" onClick={() => setIsMenuOpen(false)}>
                Best Sellers
              </Link>
              
              <div className="mt-8 flex flex-col gap-6">
                <Link href="/account" className="text-[11px] tracking-[0.15em] uppercase flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
                  <User size={18} strokeWidth={1} /> Sign In / Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Very Minimal Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity animate-in fade-in"
            onClick={() => setIsCartOpen(false)}
          />
          
          <div className="absolute inset-y-0 right-0 max-w-[400px] w-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-[11px] font-medium uppercase tracking-[0.2em]">Your Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-foreground/50 hover:text-foreground transition-colors"
              >
                <X size={20} strokeWidth={1} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center">
              <ShoppingBag size={48} strokeWidth={0.5} className="mb-6 text-foreground/30" />
              <p className="font-serif text-2xl mb-2">Your cart is empty.</p>
              <p className="text-sm text-foreground/60 mb-8">Discover our exquisite collections.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="creed-button w-full"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}