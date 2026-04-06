"use client";

import { Instagram, Facebook, Twitter } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#633d1f] text-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <img 
              src="https://emiratespride.com/wp-content/uploads/2026/01/logo-epp.png" 
              alt="Emirates Pride" 
              className="h-12 mb-5 brightness-0 invert"
            />
            <p className="text-sm text-white/80 leading-relaxed mb-5">
              Premium perfumes, Arabian oud & handcrafted fragrances. Free delivery across the UAE.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              <a 
                href="https://www.instagram.com/emiratesprideperfumes/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#633d1f] transition-all"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.facebook.com/emiratesprideofficial" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#633d1f] transition-all"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://twitter.com/emiratespride" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#633d1f] transition-all"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-bold mb-4 text-white">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/collection">
                  <span className="text-sm text-white/80 hover:text-white transition-colors cursor-pointer">All Products</span>
                </Link>
              </li>
              <li>
                <Link href="/collection">
                  <span className="text-sm text-white/80 hover:text-white transition-colors cursor-pointer">Perfumes</span>
                </Link>
              </li>
              <li>
                <Link href="/collection">
                  <span className="text-sm text-white/80 hover:text-white transition-colors cursor-pointer">Oils</span>
                </Link>
              </li>
              <li>
                <Link href="/collection">
                  <span className="text-sm text-white/80 hover:text-white transition-colors cursor-pointer">Gift Sets</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-sm font-bold mb-4 text-white">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://emiratespride.com/contact-us/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="https://emiratespride.com/faqs/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">
                  FAQs
                </a>
              </li>
              <li>
                <a href="https://emiratespride.com/order-tracking/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">
                  Track Your Order
                </a>
              </li>
              <li>
                <a href="https://emiratespride.com/delivery-returns/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">
                  Delivery & Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-sm font-bold mb-4 text-white">Company</h4>
            <ul className="space-y-3">
              <li>
                <a href="https://emiratespride.com/about-us/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="https://emiratespride.com/store-locator/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">
                  Store Locator
                </a>
              </li>
              <li>
                <a href="https://emiratespride.com/careers/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="https://emiratespride.com/blogs/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">
                  Blogs
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/60">&copy; {new Date().getFullYear()} Emirates Pride. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://emiratespride.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="https://emiratespride.com/terms-conditions/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/60 hover:text-white transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
