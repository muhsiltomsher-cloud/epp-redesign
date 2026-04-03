import { Instagram, Facebook } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[#1a1308] text-white py-12 md:py-16">
      <div className="px-4 md:px-10 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <img 
              src="https://emiratespride.com/wp-content/uploads/2026/01/logo-epp.png" 
              alt="Emirates Pride" 
              className="h-8 mb-4 brightness-0 invert"
            />
            <p className="text-xs text-gray-400 leading-relaxed">
              Luxury fragrances crafted with excellence since 2011.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs uppercase tracking-wider mb-4 text-[#c9a96e]">Shop</h4>
            <ul className="space-y-2">
              <li><Link href="/collection"><span className="text-xs text-gray-400 hover:text-white cursor-pointer">All Products</span></Link></li>
              <li><Link href="/collection"><span className="text-xs text-gray-400 hover:text-white cursor-pointer">New Arrivals</span></Link></li>
              <li><Link href="/collection"><span className="text-xs text-gray-400 hover:text-white cursor-pointer">Best Sellers</span></Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs uppercase tracking-wider mb-4 text-[#c9a96e]">Help</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-xs text-gray-400 hover:text-white">Contact</a></li>
              <li><a href="#" className="text-xs text-gray-400 hover:text-white">Shipping</a></li>
              <li><a href="#" className="text-xs text-gray-400 hover:text-white">Returns</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs uppercase tracking-wider mb-4 text-[#c9a96e]">Follow Us</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white"><Instagram size={18} /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Facebook size={18} /></a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Emirates Pride. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-gray-500 hover:text-white">Privacy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
