import { Facebook, Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 md:pt-24 pb-6 overflow-hidden relative border-t border-white/10 flex flex-col">
      <div className="container mx-auto px-4 md:px-8 z-10 flex-1 flex flex-col">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 mb-16 md:mb-24">
          
          {/* Brand Col */}
          <div className="sm:col-span-2 md:col-span-4 lg:col-span-5 flex flex-col gap-6 md:pr-12">
            <img 
              src="https://emiratespride.com/wp-content/uploads/2026/01/logo-epp.png" 
              alt="Emirates Pride" 
              className="h-8 md:h-10 w-auto object-contain filter invert brightness-0 origin-left object-left" 
            />
            <p className="text-white/60 text-xs leading-relaxed max-w-xs font-light">
              Crafting exceptional fragrances that capture the essence of luxury, heritage, and modern elegance since 2011.
            </p>
            <div className="flex gap-5 mt-2">
              <a href="#" className="text-white/50 hover:text-white transition-colors duration-300"><Instagram size={18} strokeWidth={1}/></a>
              <a href="#" className="text-white/50 hover:text-white transition-colors duration-300"><Facebook size={18} strokeWidth={1}/></a>
              <a href="#" className="text-white/50 hover:text-white transition-colors duration-300"><Twitter size={18} strokeWidth={1}/></a>
              <a href="#" className="text-white/50 hover:text-white transition-colors duration-300"><Youtube size={18} strokeWidth={1}/></a>
            </div>
          </div>

          {/* Links Cols */}
          <div className="flex flex-col gap-5 md:col-span-2">
            <h4 className="text-[9px] font-medium tracking-[0.2em] uppercase text-white/40">Shop</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-[11px] tracking-wider text-white/80 hover:text-white transition-colors">Oud & Dakhoon</a></li>
              <li><a href="#" className="text-[11px] tracking-wider text-white/80 hover:text-white transition-colors">Perfume Collection</a></li>
              <li><a href="#" className="text-[11px] tracking-wider text-white/80 hover:text-white transition-colors">Gift Sets</a></li>
              <li><a href="#" className="text-[11px] tracking-wider text-white/80 hover:text-white transition-colors">Accessories</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-5 md:col-span-2">
            <h4 className="text-[9px] font-medium tracking-[0.2em] uppercase text-white/40">Support</h4>
            <ul className="flex flex-col gap-3">
              <li><a href="#" className="text-[11px] tracking-wider text-white/80 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-[11px] tracking-wider text-white/80 hover:text-white transition-colors">Delivery</a></li>
              <li><a href="#" className="text-[11px] tracking-wider text-white/80 hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="text-[11px] tracking-wider text-white/80 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="sm:col-span-2 md:col-span-4 lg:col-span-3 flex flex-col gap-5">
            <h4 className="text-[9px] font-medium tracking-[0.2em] uppercase text-white/40">Newsletter</h4>
            <p className="text-white/60 text-xs leading-relaxed font-light">Join the house to receive exclusive access to new arrivals and limited editions.</p>
            <form className="flex flex-col mt-1 group relative border-b border-white/20 focus-within:border-white transition-colors pb-2">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-transparent border-none text-[10px] tracking-[0.2em] focus:outline-none text-white placeholder:text-white/30"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 group-hover:text-white transition-colors">
                <ArrowRight size={14} strokeWidth={1} />
              </button>
            form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-auto pt-6 flex flex-col-reverse md:flex-row justify-between items-center gap-4 border-t border-white/10 relative z-20">
          <p className="text-[8px] md:text-[9px] tracking-[0.2em] text-white/40 uppercase text-center md:text-left">© {new Date().getFullYear()} Emirates Pride</p>
          <div className="flex gap-6">
            <a href="#" className="text-[8px] md:text-[9px] tracking-[0.2em] text-white/40 hover:text-white transition-colors uppercase">Privacy</a>
            <a href="#" className="text-[8px] md:text-[9px] tracking-[0.2em] text-white/40 hover:text-white transition-colors uppercase">Terms</a>
          </div>
        </div>
      </div>

      {/* Decorative large text - Hidden on very small mobile to prevent issues, scaled correctly on larger */}
      <div className="absolute bottom-[-2%] left-0 w-full overflow-hidden flex justify-center pointer-events-none opacity-[0.03] select-none z-0 hidden sm:flex">
        <span className="text-[12vw] font-serif leading-none whitespace-nowrap tracking-tighter">EMIRATES PRIDE</span>
      </div>
    </footer>
  );
}