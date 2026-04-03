import { Instagram, Facebook } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-[#1a1308] text-white py-12 md:py-16">
      <div className="px-6 md:px-12 lg:px-20 xl:px-32">
        {/* Main Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <img 
              src="https://emiratespride.com/wp-content/uploads/2026/01/logo-epp.png" 
              alt="Emirates Pride" 
              className="h-10 mb-5 brightness-0 invert"
            />
            <p className="text-sm text-white/70 leading-relaxed">
              Luxury fragrances crafted with the finest Arabian ingredients.
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-5">
              <a href="https://www.instagram.com/emiratesprideperfumes/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:border-white/60 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="https://www.facebook.com/emiratesprideofficial" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:border-white/60 transition-colors">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] mb-4 text-[#c9a96e] font-medium">Shop</h4>
            <ul className="space-y-3">
              <li><Link href="/collection"><span className="text-sm text-white/80 hover:text-white transition-colors cursor-pointer">All Products</span></Link></li>
              <li><Link href="/collection"><span className="text-sm text-white/80 hover:text-white transition-colors cursor-pointer">New Arrivals</span></Link></li>
              <li><Link href="/collection"><span className="text-sm text-white/80 hover:text-white transition-colors cursor-pointer">Gift Sets</span></Link></li>
              <li><a href="https://emiratespride.com/blogs/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">Blogs</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] mb-4 text-[#c9a96e] font-medium">Customer Service</h4>
            <ul className="space-y-3">
              <li><a href="https://emiratespride.com/contact-us/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="https://emiratespride.com/faqs/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">FAQs</a></li>
              <li><a href="https://emiratespride.com/order-tracking/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">Track Your Order</a></li>
              <li><a href="https://emiratespride.com/delivery-returns/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">Delivery & Returns</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.15em] mb-4 text-[#c9a96e] font-medium">Company</h4>
            <ul className="space-y-3">
              <li><a href="https://emiratespride.com/about-us/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">About Us</a></li>
              <li><a href="https://emiratespride.com/store-locator/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">Store Locator</a></li>
              <li><a href="https://emiratespride.com/careers/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/80 hover:text-white transition-colors">Careers</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/50">&copy; {new Date().getFullYear()} Emirates Pride. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="https://emiratespride.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">Privacy Policy</a>
            <a href="https://emiratespride.com/terms-conditions/" target="_blank" rel="noopener noreferrer" className="text-sm text-white/50 hover:text-white transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
