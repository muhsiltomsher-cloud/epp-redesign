import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          
          {/* Brand */}
          <div className="flex flex-col gap-6 md:col-span-1">
            <h3 className="font-serif text-2xl tracking-widest uppercase">Emirates Pride</h3>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-xs">
              Crafting exceptional fragrances that capture the essence of luxury, heritage, and modern elegance since 2011.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors"><Instagram size={20} strokeWidth={1.5}/></a>
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors"><Facebook size={20} strokeWidth={1.5}/></a>
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors"><Twitter size={20} strokeWidth={1.5}/></a>
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors"><Youtube size={20} strokeWidth={1.5}/></a>
            </div>
          </div>

          {/* Shop */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-medium tracking-widest uppercase text-primary-foreground/50">Shop</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="#" className="text-sm hover:text-accent transition-colors">All Perfumes</a></li>
              <li><a href="#" className="text-sm hover:text-accent transition-colors">Best Sellers</a></li>
              <li><a href="#" className="text-sm hover:text-accent transition-colors">New Arrivals</a></li>
              <li><a href="#" className="text-sm hover:text-accent transition-colors">Gift Sets</a></li>
              <li><a href="#" className="text-sm hover:text-accent transition-colors">Home Fragrances</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-medium tracking-widest uppercase text-primary-foreground/50">Support</h4>
            <ul className="flex flex-col gap-4">
              <li><a href="#" className="text-sm hover:text-accent transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-sm hover:text-accent transition-colors">FAQ</a></li>
              <li><a href="#" className="text-sm hover:text-accent transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-sm hover:text-accent transition-colors">Track Order</a></li>
              <li><a href="#" className="text-sm hover:text-accent transition-colors">Store Locator</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-6">
            <h4 className="text-sm font-medium tracking-widest uppercase text-primary-foreground/50">Newsletter</h4>
            <p className="text-primary-foreground/70 text-sm">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-transparent border-b border-primary-foreground/30 py-2 text-sm focus:outline-none focus:border-accent transition-colors"
                data-testid="input-newsletter-email"
              />
              <button 
                type="submit"
                className="text-left text-sm tracking-widest uppercase font-medium mt-2 hover:text-accent transition-colors w-fit luxury-underline"
                data-testid="button-newsletter-submit"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        <div className="mt-20 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-primary-foreground/50">© 2024 Emirates Pride Perfumes. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-primary-foreground/50 hover:text-primary-foreground transition-colors">Privacy Policy</a>
            <a href="#" className="text-xs text-primary-foreground/50 hover:text-primary-foreground transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}