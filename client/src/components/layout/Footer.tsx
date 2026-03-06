import { Facebook, Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <>
    <footer className="bg-[#1a1308] text-white pt-10 md:pt-20 lg:pt-28 pb-6 md:pb-8 overflow-hidden relative border-t border-[#c9a96e]/20 flex flex-col">
      <div className="px-4 md:px-10 lg:px-20 xl:px-28 z-10 flex-1 flex flex-col">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-6 md:gap-6 lg:gap-10 mb-8 md:mb-20 lg:mb-28">
          
          {/* Brand Col */}
          <div className="col-span-2 md:col-span-4 lg:col-span-5 flex flex-col gap-4 md:gap-6 md:pr-8 lg:pr-12">
            <img 
              src="https://emiratespride.com/wp-content/uploads/2026/01/logo-epp.png" 
              alt="Emirates Pride" 
              className="h-7 md:h-10 w-auto object-contain filter invert brightness-0 origin-left object-left" 
            />
            <p className="text-[#c9a96e]/60 text-[11px] md:text-xs leading-relaxed max-w-xs font-light">
              Crafting exceptional fragrances that capture the essence of luxury, heritage, and modern elegance since 2011.
            </p>
            <div className="flex gap-5 mt-1 md:mt-2">
              <a href="#" className="text-[#c9a96e]/50 hover:text-[#c9a96e] transition-colors duration-300"><Instagram size={16} strokeWidth={1}/></a>
              <a href="#" className="text-[#c9a96e]/50 hover:text-[#c9a96e] transition-colors duration-300"><Facebook size={16} strokeWidth={1}/></a>
              <a href="#" className="text-[#c9a96e]/50 hover:text-[#c9a96e] transition-colors duration-300"><Twitter size={16} strokeWidth={1}/></a>
              <a href="#" className="text-[#c9a96e]/50 hover:text-[#c9a96e] transition-colors duration-300"><Youtube size={16} strokeWidth={1}/></a>
            </div>
          </div>

          {/* Links Cols */}
          <div className="flex flex-col gap-4 md:gap-5 md:col-span-2">
            <h4 className="text-[8px] md:text-[9px] font-medium tracking-[0.2em] uppercase text-[#c9a96e]/50">Shop</h4>
            <ul className="flex flex-col gap-2.5 md:gap-3">
              <li><a href="#" className="text-[10px] md:text-[11px] tracking-wider text-white/70 hover:text-[#c9a96e] transition-colors">Oud & Dakhoon</a></li>
              <li><a href="#" className="text-[10px] md:text-[11px] tracking-wider text-white/70 hover:text-[#c9a96e] transition-colors">Perfume Collection</a></li>
              <li><a href="#" className="text-[10px] md:text-[11px] tracking-wider text-white/70 hover:text-[#c9a96e] transition-colors">Gift Sets</a></li>
              <li><a href="#" className="text-[10px] md:text-[11px] tracking-wider text-white/70 hover:text-[#c9a96e] transition-colors">Accessories</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-4 md:gap-5 md:col-span-2">
            <h4 className="text-[8px] md:text-[9px] font-medium tracking-[0.2em] uppercase text-[#c9a96e]/50">Support</h4>
            <ul className="flex flex-col gap-2.5 md:gap-3">
              <li><a href="#" className="text-[10px] md:text-[11px] tracking-wider text-white/70 hover:text-[#c9a96e] transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-[10px] md:text-[11px] tracking-wider text-white/70 hover:text-[#c9a96e] transition-colors">Delivery</a></li>
              <li><a href="#" className="text-[10px] md:text-[11px] tracking-wider text-white/70 hover:text-[#c9a96e] transition-colors">Returns</a></li>
              <li><a href="#" className="text-[10px] md:text-[11px] tracking-wider text-white/70 hover:text-[#c9a96e] transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter Col */}
          <div className="col-span-2 md:col-span-4 lg:col-span-3 flex flex-col gap-4 md:gap-5">
            <h4 className="text-[8px] md:text-[9px] font-medium tracking-[0.2em] uppercase text-[#c9a96e]/50">Newsletter</h4>
            <p className="text-white/50 text-[11px] md:text-xs leading-relaxed font-light">Join the house to receive exclusive access to new arrivals and limited editions.</p>
            <form className="flex flex-col mt-1 group relative border-b border-[#c9a96e]/30 focus-within:border-[#c9a96e] transition-colors pb-2">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-transparent border-none text-[9px] md:text-[10px] tracking-[0.2em] focus:outline-none text-white placeholder:text-[#c9a96e]/30 py-1"
              />
              <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-[#c9a96e]/40 group-hover:text-[#c9a96e] transition-colors">
                <ArrowRight size={14} strokeWidth={1} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-auto pt-6 flex flex-col-reverse md:flex-row justify-between items-center gap-4 border-t border-[#c9a96e]/15 relative z-20">
          <p className="text-[8px] md:text-[9px] tracking-[0.2em] text-[#c9a96e]/40 uppercase text-center md:text-left">&copy; {new Date().getFullYear()} Emirates Pride</p>
          <div className="flex gap-6">
            <a href="#" className="text-[8px] md:text-[9px] tracking-[0.2em] text-[#c9a96e]/40 hover:text-[#c9a96e] transition-colors uppercase">Privacy</a>
            <a href="#" className="text-[8px] md:text-[9px] tracking-[0.2em] text-[#c9a96e]/40 hover:text-[#c9a96e] transition-colors uppercase">Terms</a>
          </div>
        </div>
      </div>

      {/* Decorative large text */}
      <div className="absolute bottom-[-2%] left-0 w-full overflow-hidden flex justify-center pointer-events-none opacity-[0.04] select-none z-0 hidden sm:flex">
        <span className="text-[12vw] font-serif leading-none whitespace-nowrap tracking-tighter text-[#c9a96e]">EMIRATES PRIDE</span>
      </div>
    </footer>
    <div className="h-14 md:hidden bg-[#1a1308]"></div>
    </>
  );
}
