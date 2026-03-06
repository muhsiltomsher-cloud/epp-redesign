import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Newsletter */}
          <div className="flex flex-col gap-6 lg:col-span-1">
            <h3 className="font-serif text-3xl tracking-widest uppercase">Emirates Pride</h3>
            <p className="text-white/60 text-sm leading-relaxed mb-2">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-transparent border-b border-white/30 py-3 text-sm focus:outline-none focus:border-white transition-colors text-white placeholder:text-white/40"
                  data-testid="input-newsletter-email"
                />
                <button 
                  type="submit"
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[10px] tracking-[0.2em] uppercase font-medium hover:text-white/70 transition-colors"
                  data-testid="button-newsletter-submit"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          {/* Shop */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/50">Shop</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-sm text-white/80 hover:text-white transition-colors">All Fragrances</a></li>
              <li><a href="#" className="text-sm text-white/80 hover:text-white transition-colors">Oud & Dakhoon</a></li>
              <li><a href="#" className="text-sm text-white/80 hover:text-white transition-colors">Gift Sets</a></li>
              <li><a href="#" className="text-sm text-white/80 hover:text-white transition-colors">Bestsellers</a></li>
              <li><a href="#" className="text-sm text-white/80 hover:text-white transition-colors">Accessories</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/50">Customer Care</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-sm text-white/80 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-sm text-white/80 hover:text-white transition-colors">Delivery & Returns</a></li>
              <li><a href="#" className="text-sm text-white/80 hover:text-white transition-colors">Track Order</a></li>
              <li><a href="#" className="text-sm text-white/80 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="#" className="text-sm text-white/80 hover:text-white transition-colors">Store Locator</a></li>
            </ul>
          </div>

          {/* The House */}
          <div className="flex flex-col gap-6">
            <h4 className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/50">The House</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-sm text-white/80 hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#" className="text-sm text-white/80 hover:text-white transition-colors">Craftsmanship</a></li>
              <li><a href="#" className="text-sm text-white/80 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-white/80 hover:text-white transition-colors">Corporate Gifting</a></li>
            </ul>
            <div className="flex gap-4 mt-2">
              <a href="#" className="text-white/60 hover:text-white transition-colors"><Instagram size={18} strokeWidth={1.5}/></a>
              <a href="#" className="text-white/60 hover:text-white transition-colors"><Facebook size={18} strokeWidth={1.5}/></a>
              <a href="#" className="text-white/60 hover:text-white transition-colors"><Twitter size={18} strokeWidth={1.5}/></a>
              <a href="#" className="text-white/60 hover:text-white transition-colors"><Youtube size={18} strokeWidth={1.5}/></a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#" className="text-[11px] tracking-wider text-white/50 hover:text-white transition-colors uppercase">Privacy Policy</a>
            <a href="#" className="text-[11px] tracking-wider text-white/50 hover:text-white transition-colors uppercase">Terms & Conditions</a>
            <a href="#" className="text-[11px] tracking-wider text-white/50 hover:text-white transition-colors uppercase">Cookie Policy</a>
          </div>
          <p className="text-[11px] tracking-wider text-white/50 uppercase">© {new Date().getFullYear()} Emirates Pride Perfumes</p>
        </div>
      </div>
    </footer>
  );
}