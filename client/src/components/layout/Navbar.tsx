import { Search, ShoppingBag, Menu, User, X, ChevronDown, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHoveringNav, setIsHoveringNav] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
  const [activeCurrency, setActiveCurrency] = useState("AED");
  const [location] = useLocation();

  const currencies = ["AED", "USD", "EUR", "GBP", "SAR", "KWD", "QAR"];
  
  // Update header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isScrolled || isHoveringNav || isMenuOpen
            ? "bg-white shadow-sm" 
            : "bg-transparent"
        }`}
        onMouseEnter={() => setIsHoveringNav(true)}
        onMouseLeave={() => setIsHoveringNav(false)}
      >
        {/* Top Announcement Bar */}
        <div className={`transition-all duration-500 overflow-hidden ${
          isScrolled ? "h-0 opacity-0" : "h-[36px] opacity-100 bg-primary text-primary-foreground"
        }`}>
          <div className="container mx-auto px-4 h-full flex items-center justify-center text-[10px] tracking-[0.15em] uppercase font-light">
            Free Shipping Worldwide on all orders above AED 1500.
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative">
          <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? "h-[70px]" : "h-[90px]"}`}>
            {/* Mobile Menu Button */}
            <button 
              className={`md:hidden p-2 -ml-2 transition-colors ${
                (!isScrolled && !isHoveringNav && !isMenuOpen && location === "/") ? "text-white" : "text-foreground"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={22} strokeWidth={1} /> : <Menu size={22} strokeWidth={1} />}
            </button>

            {/* Desktop Navigation - Left */}
            <nav className="hidden md:flex items-center gap-8 flex-1">
              <Link href="/collection">
                <span className={`text-[11px] font-medium tracking-[0.15em] uppercase transition-colors luxury-underline cursor-pointer ${
                  (!isScrolled && !isHoveringNav && location === "/") ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-foreground"
                }`}>
                  Oud & Dakhoon
                </span>
              </Link>
              <Link href="/collection">
                <span className={`text-[11px] font-medium tracking-[0.15em] uppercase transition-colors luxury-underline cursor-pointer ${
                  (!isScrolled && !isHoveringNav && location === "/") ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-foreground"
                }`}>
                  Perfume
                </span>
              </Link>
              <Link href="/collection">
                <span className={`text-[11px] font-medium tracking-[0.15em] uppercase transition-colors luxury-underline cursor-pointer ${
                  (!isScrolled && !isHoveringNav && location === "/") ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-foreground"
                }`}>
                  Gifts
                </span>
              </Link>
            </nav>

            {/* Logo - Centered */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center h-full">
              <img 
                src={(!isScrolled && !isHoveringNav && !isMenuOpen && location === "/") 
                  ? "https://emiratespride.com/wp-content/uploads/2023/12/Emirates-pride-White-Logo.png" 
                  : "https://emiratespride.com/wp-content/uploads/2023/12/Emirates-pride-Black-Logo.png"
                } 
                alt="Emirates Pride Logo" 
                className={`transition-all duration-500 ${isScrolled ? "h-8 md:h-10" : "h-10 md:h-12"} object-contain`}
              />
            </Link>

            {/* Actions - Right */}
            <div className="flex items-center gap-4 md:gap-6 flex-1 justify-end">
              {/* Region/Currency Selector */}
              <div 
                className="hidden md:block relative"
                onMouseEnter={() => setIsCurrencyMenuOpen(true)}
                onMouseLeave={() => setIsCurrencyMenuOpen(false)}
              >
                <button className={`flex items-center gap-1.5 text-[10px] font-medium tracking-[0.1em] uppercase transition-colors ${
                  (!isScrolled && !isHoveringNav && location === "/") ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-foreground"
                }`}>
                  <Globe size={14} strokeWidth={1} />
                  <span>{activeCurrency}</span>
                  <ChevronDown size={12} strokeWidth={1} />
                </button>
                
                {isCurrencyMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-xl border border-border py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-2 border-b border-border/50">
                      <span className="text-[9px] uppercase tracking-widest text-foreground/50">Language</span>
                      <div className="flex gap-4 mt-2">
                        <button className="text-xs font-medium border-b border-black pb-0.5">EN</button>
                        <button className="text-xs font-arabic text-foreground/60 hover:text-foreground">العربية</button>
                      </div>
                    </div>
                    <div className="p-2 max-h-[200px] overflow-y-auto">
                      <span className="px-2 text-[9px] uppercase tracking-widest text-foreground/50 mb-1 block">Currency</span>
                      {currencies.map(currency => (
                        <button 
                          key={currency}
                          onClick={() => {
                            setActiveCurrency(currency);
                            setIsCurrencyMenuOpen(false);
                          }}
                          className={`w-full text-left px-2 py-1.5 text-xs transition-colors ${
                            activeCurrency === currency ? "bg-muted font-medium" : "hover:bg-muted/50"
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
                (!isScrolled && !isHoveringNav && location === "/") ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-foreground"
              }`}>
                <Search size={18} strokeWidth={1} />
              </button>
              
              <button className={`hidden md:block transition-colors ${
                (!isScrolled && !isHoveringNav && location === "/") ? "text-white/90 hover:text-white" : "text-foreground/80 hover:text-foreground"
              }`}>
                <User size={18} strokeWidth={1} />
              </button>
              
              <button 
                className={`flex items-center gap-2 transition-colors relative ${
                  (!isScrolled && !isHoveringNav && location === "/" && !isMenuOpen) ? "text-white hover:text-white" : "text-foreground/80 hover:text-foreground"
                }`}
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag size={18} strokeWidth={1} />
                <span className="hidden md:inline text-[11px] font-medium tracking-[0.1em] uppercase">Cart</span>
                <span className={`absolute -top-1.5 -right-2 text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-medium ${
                  (!isScrolled && !isHoveringNav && location === "/" && !isMenuOpen) ? "bg-white text-black" : "bg-primary text-white"
                }`}>0</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`absolute top-full left-0 w-full bg-white transition-all duration-500 ease-in-out origin-top border-t border-border overflow-hidden md:hidden ${
          isMenuOpen ? "max-h-[calc(100vh-70px)] opacity-100 shadow-xl" : "max-h-0 opacity-0"
        }`}>
          <div className="p-6 flex flex-col gap-6 h-full overflow-y-auto pb-24">
            <Link href="/collection">
              <span className="text-xl font-serif tracking-wide uppercase border-b border-border pb-4 flex justify-between items-center block cursor-pointer">
                Oud & Dakhoon <ChevronDown size={16} className="-rotate-90" />
              </span>
            </Link>
            <Link href="/collection">
              <span className="text-xl font-serif tracking-wide uppercase border-b border-border pb-4 flex justify-between items-center block cursor-pointer">
                Perfume Collection <ChevronDown size={16} className="-rotate-90" />
              </span>
            </Link>
            <Link href="/collection">
              <span className="text-xl font-serif tracking-wide uppercase border-b border-border pb-4 flex justify-between items-center block cursor-pointer">
                Gift Sets <ChevronDown size={16} className="-rotate-90" />
              </span>
            </Link>
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex flex-col gap-4 border-r border-border">
                <span className="text-[9px] uppercase tracking-widest text-foreground/50">Language</span>
                <button className="text-left text-sm font-medium">English</button>
                <button className="text-left text-sm font-arabic">العربية</button>
              </div>
              <div className="flex flex-col gap-4 pl-4">
                <span className="text-[9px] uppercase tracking-widest text-foreground/50">Currency</span>
                <select 
                  value={activeCurrency}
                  onChange={(e) => setActiveCurrency(e.target.value)}
                  className="bg-transparent text-sm border-none outline-none cursor-pointer"
                >
                  {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            
            <div className="mt-8 flex flex-col gap-6">
              <Link href="/account">
                <span className="text-[11px] tracking-[0.15em] uppercase flex items-center gap-3 cursor-pointer">
                  <User size={18} strokeWidth={1} /> Sign In / Register
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
            onClick={() => setIsCartOpen(false)}
          />
          
          <div className="absolute inset-y-0 right-0 max-w-[400px] w-full bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-[11px] font-medium uppercase tracking-[0.2em]">Your Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-foreground/50 hover:text-foreground transition-transform hover:rotate-90 duration-300"
              >
                <X size={20} strokeWidth={1} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center">
              <ShoppingBag size={48} strokeWidth={0.5} className="mb-6 text-foreground/20" />
              <p className="font-serif text-2xl mb-2">Your cart is empty.</p>
              <p className="text-sm text-foreground/60 mb-8 font-light">Discover our exquisite collections.</p>
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