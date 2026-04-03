import { Instagram, Facebook } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[#1a1308] text-white py-12 md:py-16">
      <div className="px-6 md:px-12 lg:px-20 xl:px-32">
        {/* Main Footer */}
        <div className="flex flex-col md:flex-row justify-between gap-10 md:gap-12 mb-10">
          {/* Brand */}
          <div className="md:max-w-xs">
            <img 
              src="https://emiratespride.com/wp-content/uploads/2026/01/logo-epp.png" 
              alt="Emirates Pride" 
              className="h-10 mb-5 brightness-0 invert"
            />
            <p className="text-sm text-white/70 leading-relaxed">
              Luxury fragrances crafted with the finest Arabian ingredients.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16 md:gap-20">
            <div>
              <h4 className="text-xs uppercase tracking-[0.15em] mb-4 text-[#c9a96e] font-medium">Shop</h4>
              <ul className="space-y-3">
                <li><Link href="/collection"><span className="text-sm text-white/80 hover:text-white transition-colors cursor-pointer">All Products</span></Link></li>
                <li><Link href="/collection"><span className="text-sm text-white/80 hover:text-white transition-colors cursor-pointer">New Arrivals</span></Link></li>
                <li><Link href="/collection"><span className="text-sm text-white/80 hover:text-white transition-colors cursor-pointer">Gift Sets</span></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-[0.15em] mb-4 text-[#c9a96e] font-medium">Help</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-white/80 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-sm text-white/80 hover:text-white transition-colors">Shipping</a></li>
                <li><a href="#" className="text-sm text-white/80 hover:text-white transition-colors">Returns</a></li>
              </ul>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] mb-4 text-[#c9a96e] font-medium">Follow Us</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:border-white/60 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:border-white/60 transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">&copy; {new Date().getFullYear()} Emirates Pride. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-sm text-white/50 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
