import { Facebook, Instagram, Twitter, Youtube, ArrowRight } from "lucide-react";

export default function Footer() {
  return (
    <>
      <footer className="bg-[#f7f5f2] text-black pt-10 md:pt-20 lg:pt-28 pb-6 md:pb-8 overflow-hidden relative border-t border-black/5 flex flex-col">
        <div className="px-4 md:px-10 lg:px-20 xl:px-28 z-10 flex-1 flex flex-col">
          <div className="grid grid-cols-2 md:grid-cols-12 gap-6 md:gap-6 lg:gap-10 mb-8 md:mb-20 lg:mb-28">
            
            <div className="col-span-2 md:col-span-4 lg:col-span-5 flex flex-col gap-4 md:gap-6 md:pr-8 lg:pr-12">
              <img 
                src="https://emiratespride.com/wp-content/uploads/2026/01/logo-epp.png" 
                alt="Emirates Pride" 
                className="h-7 md:h-10 w-auto object-contain origin-left object-left" 
              />
              <p className="text-[11px] md:text-xs leading-relaxed max-w-xs font-light text-black/50">
                Crafting exceptional fragrances that capture the essence of luxury, heritage, and modern elegance since 2011.
              </p>
              <div className="flex gap-5 mt-1 md:mt-2">
                <a href="#" className="text-black/40 hover:text-black transition-colors duration-300"><Instagram size={16} strokeWidth={1}/></a>
                <a href="#" className="text-black/40 hover:text-black transition-colors duration-300"><Facebook size={16} strokeWidth={1}/></a>
                <a href="#" className="text-black/40 hover:text-black transition-colors duration-300"><Twitter size={16} strokeWidth={1}/></a>
                <a href="#" className="text-black/40 hover:text-black transition-colors duration-300"><Youtube size={16} strokeWidth={1}/></a>
              </div>
            </div>

            <div className="flex flex-col gap-4 md:gap-5 md:col-span-2">
              <h4 className="text-[8px] md:text-[9px] font-medium tracking-[0.2em] uppercase text-[#8a6d3b]">Shop</h4>
              <ul className="flex flex-col gap-2.5 md:gap-3">
                <li><a href="#" className="text-[10px] md:text-[11px] tracking-wider text-black/50 hover:text-[#8a6d3b] transition-colors">Oud & Dakhoon</a></li>
                <li><a href="#" className="text-[10px] md:text-[11px] tracking-wider text-black/50 hover:text-[#8a6d3b] transition-colors">Perfume Collection</a></li>
                <li><a href="#" className="text-[10px] md:text-[11px] tracking-wider text-black/50 hover:text-[#8a6d3b] transition-colors">Gift Sets</a></li>
                <li><a href="#" className="text-[10px] md:text-[11px] tracking-wider text-black/50 hover:text-[#8a6d3b] transition-colors">Accessories</a></li>
              </ul>
            </div>

            <div className="flex flex-col gap-4 md:gap-5 md:col-span-2">
              <h4 className="text-[8px] md:text-[9px] font-medium tracking-[0.2em] uppercase text-[#8a6d3b]">Support</h4>
              <ul className="flex flex-col gap-2.5 md:gap-3">
                <li><a href="#" className="text-[10px] md:text-[11px] tracking-wider text-black/50 hover:text-[#8a6d3b] transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-[10px] md:text-[11px] tracking-wider text-black/50 hover:text-[#8a6d3b] transition-colors">Delivery</a></li>
                <li><a href="#" className="text-[10px] md:text-[11px] tracking-wider text-black/50 hover:text-[#8a6d3b] transition-colors">Returns</a></li>
                <li><a href="#" className="text-[10px] md:text-[11px] tracking-wider text-black/50 hover:text-[#8a6d3b] transition-colors">FAQ</a></li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-4 lg:col-span-3 flex flex-col gap-4 md:gap-5">
              <h4 className="text-[8px] md:text-[9px] font-medium tracking-[0.2em] uppercase text-[#8a6d3b]">Newsletter</h4>
              <p className="text-black/40 text-[11px] md:text-xs leading-relaxed font-light">Join the house to receive exclusive access to new arrivals and limited editions.</p>
              <form className="flex flex-col mt-1 group relative border-b border-black/15 focus-within:border-[#8a6d3b] transition-colors pb-2">
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="w-full bg-transparent border-none text-[9px] md:text-[10px] tracking-[0.2em] focus:outline-none text-black placeholder:text-black/25 py-1"
                />
                <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 text-black/30 group-hover:text-[#8a6d3b] transition-colors">
                  <ArrowRight size={14} strokeWidth={1} />
                </button>
              </form>
            </div>
          </div>

          <div className="mt-auto pt-6 flex flex-col-reverse md:flex-row justify-between items-center gap-4 border-t border-black/10 relative z-20">
            <p className="text-[8px] md:text-[9px] tracking-[0.2em] text-black/30 uppercase text-center md:text-left">&copy; {new Date().getFullYear()} Emirates Pride</p>
            <div className="flex gap-6">
              <a href="#" className="text-[8px] md:text-[9px] tracking-[0.2em] text-black/30 hover:text-black transition-colors uppercase">Privacy</a>
              <a href="#" className="text-[8px] md:text-[9px] tracking-[0.2em] text-black/30 hover:text-black transition-colors uppercase">Terms</a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-[-2%] left-0 w-full overflow-hidden flex justify-center pointer-events-none opacity-[0.04] select-none z-0 hidden sm:flex">
          <span className="text-[12vw] font-serif leading-none whitespace-nowrap tracking-tighter text-[#8a6d3b]">EMIRATES PRIDE</span>
        </div>
      </footer>
      <div className="h-14 md:hidden"></div>
    </>
  );
}
