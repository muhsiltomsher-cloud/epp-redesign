import { Instagram, Facebook } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-10 md:py-14">
      <div className="px-6 md:px-12 lg:px-20 xl:px-32">
        {/* Main Footer */}
        <div className="flex flex-col md:flex-row justify-between gap-8 md:gap-12 mb-8">
          {/* Brand */}
          <div className="md:max-w-xs">
            <img 
              src="https://emiratespride.com/wp-content/uploads/2026/01/logo-epp.png" 
              alt="Emirates Pride" 
              className="h-8 mb-4 brightness-0 invert"
            />
            <p className="text-xs text-gray-400 leading-relaxed">
              Luxury fragrances crafted with the finest Arabian ingredients.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-12 md:gap-16">
            <div>
              <h4 className="text-[10px] uppercase tracking-wider mb-3 text-gray-400">Shop</h4>
              <ul className="space-y-2">
                <li><Link href="/collection"><span className="text-xs text-gray-300 hover:text-white transition-colors cursor-pointer">All Products</span></Link></li>
                <li><Link href="/collection"><span className="text-xs text-gray-300 hover:text-white transition-colors cursor-pointer">New Arrivals</span></Link></li>
                <li><Link href="/collection"><span className="text-xs text-gray-300 hover:text-white transition-colors cursor-pointer">Gift Sets</span></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] uppercase tracking-wider mb-3 text-gray-400">Help</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">Shipping</a></li>
                <li><a href="#" className="text-xs text-gray-300 hover:text-white transition-colors">Returns</a></li>
              </ul>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-[10px] uppercase tracking-wider mb-3 text-gray-400">Follow</h4>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
                <Instagram size={14} />
              </a>
              <a href="#" className="w-8 h-8 border border-gray-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors">
                <Facebook size={14} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[10px] text-gray-500">&copy; {new Date().getFullYear()} Emirates Pride</p>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] text-gray-500 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-[10px] text-gray-500 hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
