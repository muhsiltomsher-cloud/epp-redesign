"use client";

import { Instagram, Facebook } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a1308] text-white py-14 md:py-20">
      <div className="px-4 md:px-8 lg:px-16 xl:px-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <img 
              src="https://emiratespride.com/wp-content/uploads/2026/01/logo-epp.png" 
              alt="Emirates Pride" 
              className="h-10 mb-5 brightness-0 invert"
            />
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Crafting exceptional luxury fragrances that capture the essence of Arabian heritage since 2011.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] mb-5 text-[#c9a96e]">Shop</h4>
            <ul className="space-y-3">
              <li><Link href="/collection"><span className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">All Products</span></Link></li>
              <li><Link href="/collection"><span className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">New Arrivals</span></Link></li>
              <li><Link href="/collection"><span className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Best Sellers</span></Link></li>
              <li><Link href="/collection"><span className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer">Gift Sets</span></Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] mb-5 text-[#c9a96e]">Help</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.2em] mb-5 text-[#c9a96e]">Connect</h4>
            <div className="flex gap-4 mb-5">
              <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:border-white/40 transition-colors">
                <Facebook size={18} />
              </a>
            </div>
            <p className="text-sm text-gray-400">Follow us for exclusive updates and offers</p>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500">&copy; {new Date().getFullYear()} Emirates Pride. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-gray-500 hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
