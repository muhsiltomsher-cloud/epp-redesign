import { Search, ShoppingBag, Menu, User, X, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { products } from "@/lib/data";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-background/90 backdrop-blur-md border-b border-border/50 transition-all duration-300">
        {/* Top Announcement Bar */}
        <div className="bg-primary text-primary-foreground text-xs py-2 text-center tracking-[0.2em] uppercase font-medium">
          Complimentary shipping on orders over 500 AED
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 -ml-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMenuOpen ? <X size={24} strokeWidth={1} /> : <Menu size={24} strokeWidth={1} />}
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <div 
                className="group py-8 cursor-pointer"
                onMouseEnter={() => setIsMegaMenuOpen(true)}
                onMouseLeave={() => setIsMegaMenuOpen(false)}
              >
                <Link href="/collection" className="text-sm font-medium tracking-widest uppercase luxury-underline pb-1 text-foreground/80 hover:text-foreground flex items-center gap-1">
                  Collections <ChevronRight size={14} className="rotate-90" />
                </Link>
                
                {/* Mega Menu Dropdown */}
                {isMegaMenuOpen && (
                  <div className="absolute top-full left-0 w-full bg-white border-b border-border/50 shadow-xl shadow-black/5 animate-in slide-in-from-top-2 duration-300">
                    <div className="container mx-auto px-6 py-12 flex gap-16">
                      <div className="w-1/4">
                        <h3 className="font-serif text-2xl mb-6">Our Collections</h3>
                        <ul className="flex flex-col gap-4">
                          <li><Link href="/collection" className="text-sm tracking-widest uppercase text-foreground/70 hover:text-accent transition-colors">Heritage Collection</Link></li>
                          <li><Link href="/collection" className="text-sm tracking-widest uppercase text-foreground/70 hover:text-accent transition-colors">Floral Collection</Link></li>
                          <li><Link href="/collection" className="text-sm tracking-widest uppercase text-foreground/70 hover:text-accent transition-colors">Signature Collection</Link></li>
                          <li><Link href="/collection" className="text-sm tracking-widest uppercase text-foreground/70 hover:text-accent transition-colors">Private Blends</Link></li>
                        </ul>
                      </div>
                      <div className="flex-1 grid grid-cols-3 gap-8">
                        {products.slice(0, 3).map(product => (
                          <Link href={`/product/${product.id}`} key={product.id} className="group/item block text-center">
                            <div className="bg-muted aspect-square mb-4 p-4 overflow-hidden relative">
                              <img src={product.image} alt={product.name} className="w-full h-full object-contain transition-transform duration-700 group-hover/item:scale-105" />
                            </div>
                            <h4 className="font-serif text-lg mb-1">{product.name}</h4>
                            <p className="text-accent text-sm">{product.currency} {product.price}</p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <Link href="/bestsellers" className="text-sm font-medium tracking-widest uppercase luxury-underline pb-1 text-foreground/80 hover:text-foreground">
                Bestsellers
              </Link>
              <Link href="/about" className="text-sm font-medium tracking-widest uppercase luxury-underline pb-1 text-foreground/80 hover:text-foreground">
                Our Story
              </Link>
            </nav>

            {/* Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-2xl md:text-3xl font-serif font-medium tracking-wide text-center uppercase">
              Emirates<br/>Pride
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-4 md:gap-6">
              <button className="text-foreground hover:text-accent transition-colors" data-testid="button-search">
                <Search size={20} strokeWidth={1.5} />
              </button>
              <button className="hidden md:block text-foreground hover:text-accent transition-colors" data-testid="button-account">
                <User size={20} strokeWidth={1.5} />
              </button>
              <button 
                className="relative text-foreground hover:text-accent transition-colors" 
                onClick={() => setIsCartOpen(true)}
                data-testid="button-cart"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                <span className="absolute -top-1 -right-2 bg-accent text-accent-foreground text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                  2
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="absolute top-[116px] left-0 w-full h-[calc(100vh-116px)] bg-background border-t border-border/50 md:hidden flex flex-col p-6 gap-6 animate-in slide-in-from-top-4 overflow-y-auto">
            <Link href="/collection" className="text-2xl font-serif tracking-wide uppercase border-b border-border pb-4" onClick={() => setIsMenuOpen(false)}>Collections</Link>
            <div className="pl-4 flex flex-col gap-4 pb-4 border-b border-border">
              <Link href="/collection" className="text-sm tracking-widest uppercase text-foreground/70" onClick={() => setIsMenuOpen(false)}>Heritage Collection</Link>
              <Link href="/collection" className="text-sm tracking-widest uppercase text-foreground/70" onClick={() => setIsMenuOpen(false)}>Floral Collection</Link>
              <Link href="/collection" className="text-sm tracking-widest uppercase text-foreground/70" onClick={() => setIsMenuOpen(false)}>Signature Collection</Link>
            </div>
            <Link href="/bestsellers" className="text-2xl font-serif tracking-wide uppercase border-b border-border pb-4" onClick={() => setIsMenuOpen(false)}>Bestsellers</Link>
            <Link href="/about" className="text-2xl font-serif tracking-wide uppercase border-b border-border pb-4" onClick={() => setIsMenuOpen(false)}>Our Story</Link>
            <Link href="/account" className="text-xl font-serif tracking-wide uppercase mt-auto pt-6 flex items-center gap-3" onClick={() => setIsMenuOpen(false)}>
              <User size={24} strokeWidth={1} /> Account
            </Link>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in"
            onClick={() => setIsCartOpen(false)}
          />
          
          {/* Drawer */}
          <div className="absolute inset-y-0 right-0 max-w-md w-full bg-background shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <h2 className="text-2xl font-serif uppercase tracking-wider">Your Cart (2)</h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-muted rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {/* Cart Item 1 */}
              <div className="flex gap-4 border-b border-border/30 pb-6">
                <div className="w-24 h-32 bg-white flex items-center justify-center p-2 flex-shrink-0">
                  <img src={products[0].image} alt={products[0].name} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-serif text-lg">{products[0].name}</h3>
                    <button className="text-foreground/50 hover:text-destructive transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                  <span className="text-xs tracking-widest text-foreground/50 uppercase mb-auto">{products[0].collection}</span>
                  
                  <div className="flex items-end justify-between mt-4">
                    <div className="flex items-center border border-border bg-white w-fit">
                      <button className="px-3 py-1 text-foreground/60 hover:text-foreground transition-colors">-</button>
                      <span className="w-8 text-center text-sm font-medium">1</span>
                      <button className="px-3 py-1 text-foreground/60 hover:text-foreground transition-colors">+</button>
                    </div>
                    <p className="font-medium text-accent">{products[0].currency} {products[0].price}</p>
                  </div>
                </div>
              </div>

              {/* Cart Item 2 */}
              <div className="flex gap-4 border-b border-border/30 pb-6">
                <div className="w-24 h-32 bg-white flex items-center justify-center p-2 flex-shrink-0">
                  <img src={products[1].image} alt={products[1].name} className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-serif text-lg">{products[1].name}</h3>
                    <button className="text-foreground/50 hover:text-destructive transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                  <span className="text-xs tracking-widest text-foreground/50 uppercase mb-auto">{products[1].collection}</span>
                  
                  <div className="flex items-end justify-between mt-4">
                    <div className="flex items-center border border-border bg-white w-fit">
                      <button className="px-3 py-1 text-foreground/60 hover:text-foreground transition-colors">-</button>
                      <span className="w-8 text-center text-sm font-medium">1</span>
                      <button className="px-3 py-1 text-foreground/60 hover:text-foreground transition-colors">+</button>
                    </div>
                    <p className="font-medium text-accent">{products[1].currency} {products[1].price}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-border bg-muted/30">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm tracking-widest uppercase font-medium">Subtotal</span>
                <span className="text-xl font-serif">AED 1,500</span>
              </div>
              <p className="text-xs text-foreground/60 mb-6 text-center">Shipping & taxes calculated at checkout</p>
              <button className="w-full bg-primary text-primary-foreground py-4 text-sm font-medium tracking-widest uppercase hover:bg-accent hover:text-accent-foreground transition-all duration-300">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}