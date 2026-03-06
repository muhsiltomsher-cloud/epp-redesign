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
  // Use the official logo that has dark text, and we invert it when needed.
  const logoUrl = "https://emiratespride.com/wp-content/uploads/2026/01/logo-epp.png";
  
  // Update header on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Determine if header should be dark text or light text
  const isDarkText = isScrolled || isHoveringNav || isMenuOpen || location !== "/";

  return (
    <>
      <header 
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${
          isDarkText
            ? "bg-white shadow-sm" 
            : "bg-transparent"
        }`}
        onMouseEnter={() => setIsHoveringNav(true)}
        onMouseLeave={() => setIsHoveringNav(false)}
      >
        {/* Top Announcement Bar - hidden on mobile for cleaner look */}
        <div className={`transition-all duration-500 overflow-hidden hidden md:block ${
          isScrolled ? "h-0 opacity-0" : "h-[32px] opacity-100 bg-black text-white"
        }`}>
          <div className="container mx-auto px-4 h-full flex items-center justify-center text-[10px] tracking-[0.2em] uppercase font-light">
            Free Shipping Worldwide on all orders above AED 1500
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative">
          <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? "h-[60px] md:h-[70px]" : "h-[60px] md:h-[90px]"}`}>
            
            {/* Mobile Menu Button */}
            <button 
              className={`md:hidden p-2 -ml-2 transition-colors duration-300 ${
                isDarkText ? "text-black" : "text-white"
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} strokeWidth={1} /> : <Menu size={20} strokeWidth={1} />}
            </button>

            {/* Desktop Navigation - Left */}
            <nav className="hidden md:flex items-center gap-8 flex-1">
              <Link href="/collection">
                <span className={`text-[10px] font-medium tracking-[0.2em] uppercase transition-colors luxury-underline cursor-pointer ${
                  !isDarkText ? "text-white/90 hover:text-white" : "text-black/80 hover:text-black"
                }`}>
                  Oud & Dakhoon
                </span>
              </Link>
              <Link href="/collection">
                <span className={`text-[10px] font-medium tracking-[0.2em] uppercase transition-colors luxury-underline cursor-pointer ${
                  !isDarkText ? "text-white/90 hover:text-white" : "text-black/80 hover:text-black"
                }`}>
                  Perfume
                </span>
              </Link>
              <Link href="/collection">
                <span className={`text-[10px] font-medium tracking-[0.2em] uppercase transition-colors luxury-underline cursor-pointer ${
                  !isDarkText ? "text-white/90 hover:text-white" : "text-black/80 hover:text-black"
                }`}>
                  Gifts
                </span>
              </Link>
            </nav>

            {/* Logo - Centered */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center h-full max-w-[120px] md:max-w-[180px]">
              <img 
                src={logoUrl} 
                alt="Emirates Pride" 
                className={`transition-all duration-500 w-full object-contain ${isScrolled ? "max-h-[24px] md:max-h-[30px]" : "max-h-[28px] md:max-h-[40px]"} ${
                  !isDarkText ? "filter brightness-0 invert" : "filter-none"
                }`}
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
                  !isDarkText ? "text-white/90 hover:text-white" : "text-black/80 hover:text-black"
                }`}>
                  <Globe size={14} strokeWidth={1} />
                  <span>{activeCurrency}</span>
                  <ChevronDown size={12} strokeWidth={1} />
                </button>
                
                {isCurrencyMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-2xl border border-black/5 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-black/5">
                      <span className="text-[9px] uppercase tracking-widest text-black/40">Language</span>
                      <div className="flex gap-4 mt-2">
                        <button className="text-[11px] font-medium text-black border-b border-black pb-0.5">EN</button>
                        <button className="text-[11px] font-arabic text-black/50 hover:text-black transition-colors">العربية</button>
                      </div>
                    </div>
                    <div className="p-2 max-h-[200px] overflow-y-auto hide-scrollbar">
                      <span className="px-2 py-2 text-[9px] uppercase tracking-widest text-black/40 block">Currency</span>
                      {currencies.map(currency => (
                        <button 
                          key={currency}
                          onClick={() => {
                            setActiveCurrency(currency);
                            setIsCurrencyMenuOpen(false);
                          }}
                          className={`w-full text-left px-2 py-2 text-[11px] uppercase tracking-wider transition-colors ${
                            activeCurrency === currency ? "bg-black/5 font-medium text-black" : "text-black/60 hover:text-black hover:bg-black/5"
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
                !isDarkText ? "text-white/90 hover:text-white" : "text-black/80 hover:text-black"
              }`}>
                <Search size={16} strokeWidth={1} />
              </button>
              
              <button className={`hidden md:block transition-colors ${
                !isDarkText ? "text-white/90 hover:text-white" : "text-black/80 hover:text-black"
              }`}>
                <User size={16} strokeWidth={1} />
              </button>
              
              <button 
                className={`flex items-center gap-2 transition-colors relative ${
                  !isDarkText ? "text-white/90 hover:text-white" : "text-black/80 hover:text-black"
                }`}
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag size={18} strokeWidth={1} />
                <span className="hidden md:inline text-[10px] font-medium tracking-[0.2em] uppercase">Cart</span>
                <span className={`absolute -top-1 -right-2 text-[8px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-medium ${
                  !isDarkText ? "bg-white text-black" : "bg-black text-white"
                }`}>0</span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`absolute top-full left-0 w-full bg-white transition-all duration-500 ease-in-out origin-top border-t border-black/5 overflow-hidden md:hidden shadow-2xl ${
          isMenuOpen ? "max-h-[calc(100vh-60px)] opacity-100" : "max-h-0 opacity-0"
        }`}>
          <div className="p-6 flex flex-col gap-6 h-[calc(100vh-60px)] overflow-y-auto pb-24">
            <Link href="/collection">
              <span className="text-lg font-serif tracking-wide uppercase border-b border-black/10 pb-4 flex justify-between items-center block cursor-pointer">
                Oud & Dakhoon <ChevronDown size={14} className="-rotate-90 text-black/30" />
              </span>
            </Link>
            <Link href="/collection">
              <span className="text-lg font-serif tracking-wide uppercase border-b border-black/10 pb-4 flex justify-between items-center block cursor-pointer">
                Perfume Collection <ChevronDown size={14} className="-rotate-90 text-black/30" />
              </span>
            </Link>
            <Link href="/collection">
              <span className="text-lg font-serif tracking-wide uppercase border-b border-black/10 pb-4 flex justify-between items-center block cursor-pointer">
                Gift Sets <ChevronDown size={14} className="-rotate-90 text-black/30" />
              </span>
            </Link>
            
            <div className="grid grid-cols-2 gap-4 mt-2 bg-black/5 p-4 rounded-sm">
              <div className="flex flex-col gap-4 border-r border-black/10">
                <span className="text-[9px] uppercase tracking-widest text-black/40">Language</span>
                <button className="text-left text-xs font-medium uppercase tracking-wider">English</button>
                <button className="text-left text-sm font-arabic">العربية</button>
              </div>
              <div className="flex flex-col gap-4 pl-4">
                <span className="text-[9px] uppercase tracking-widest text-black/40">Currency</span>
                <select 
                  value={activeCurrency}
                  onChange={(e) => setActiveCurrency(e.target.value)}
                  className="bg-transparent text-xs uppercase tracking-wider border-none outline-none cursor-pointer"
                >
                  {currencies.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            
            <div className="mt-auto flex flex-col gap-6 pt-6 border-t border-black/10">
              <Link href="/account">
                <span className="text-[10px] tracking-[0.2em] uppercase flex items-center gap-3 cursor-pointer">
                  <User size={16} strokeWidth={1} /> Sign In / Register
                </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-out Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[100] overflow-hidden">
          <div 
            className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
            onClick={() => setIsCartOpen(false)}
          />
          
          <div className="absolute inset-y-0 right-0 w-[85vw] max-w-[400px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out">
            <div className="flex items-center justify-between p-6 border-b border-black/10">
              <h2 className="text-[10px] font-medium uppercase tracking-[0.2em]">Your Cart (0)</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-black/40 hover:text-black transition-transform hover:rotate-90 duration-300"
              >
                <X size={20} strokeWidth={1} />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#fafafa]">
              <div className="w-16 h-16 mb-6 border border-black/10 rounded-full flex items-center justify-center bg-white">
                <ShoppingBag size={20} strokeWidth={1} className="text-black/30" />
              </div>
              <p className="font-serif text-2xl mb-3">Your cart is empty.</p>
              <p className="text-xs text-black/50 mb-8 font-light max-w-[200px]">Explore our collections and discover your new signature scent.</p>
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