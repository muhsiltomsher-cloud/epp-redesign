"use client";

import { Instagram, Facebook, Twitter, Youtube, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const footerLinks = {
  fragrances: [
    { label: "All Fragrances", href: "/collection" },
    { label: "New Arrivals", href: "/collection" },
    { label: "Collections", href: "/collection" },
    { label: "Gift Sets", href: "/collection" },
    { label: "Bestsellers", href: "/collection" },
  ],
  services: [
    { label: "Contact Us", href: "https://emiratespride.com/contact-us/" },
    { label: "FAQs", href: "https://emiratespride.com/faqs/" },
    { label: "Track Your Order", href: "https://emiratespride.com/order-tracking/" },
    { label: "Delivery & Returns", href: "https://emiratespride.com/delivery-returns/" },
    { label: "Store Locator", href: "https://emiratespride.com/store-locator/" },
  ],
  company: [
    { label: "About Us", href: "https://emiratespride.com/about-us/" },
    { label: "Our Story", href: "https://emiratespride.com/about-us/" },
    { label: "Journal", href: "https://emiratespride.com/blogs/" },
    { label: "Careers", href: "https://emiratespride.com/careers/" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-white border-t border-gray-100">

      {/* Newsletter strip */}
      <div className="bg-[#f5f3ef] py-10 md:py-12">
        <div className="px-6 md:px-12 lg:px-20 xl:px-32 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mb-1">Stay Connected</p>
            <h3 className="text-lg md:text-xl font-serif">Subscribe to our newsletter</h3>
          </div>
          <form
            className="flex w-full md:w-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 md:w-72 border border-gray-300 border-r-0 px-4 py-3 text-[11px] placeholder-gray-400 focus:outline-none focus:border-black bg-white"
            />
            <button
              type="submit"
              className="bg-black text-white px-5 py-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] hover:bg-[#c9a96e] transition-colors flex-shrink-0"
            >
              Subscribe
              <ArrowRight size={13} />
            </button>
          </form>
        </div>
      </div>

      {/* Main footer body */}
      <div className="px-6 md:px-12 lg:px-20 xl:px-32 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 md:gap-8">

          {/* Brand column — spans 2 */}
          <div className="md:col-span-2">
            <img
              src="https://emiratespride.com/wp-content/uploads/2026/01/logo-epp.png"
              alt="Emirates Pride"
              className="h-10 mb-6 object-contain object-left"
            />
            <p className="text-[11px] text-gray-500 leading-relaxed max-w-xs mb-8">
              Luxury Arabian fragrances crafted with the finest ingredients. 
              Each scent is a story of heritage, elegance, and timeless artistry.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {[
                { href: "https://www.instagram.com/emiratesprideperfumes/", icon: <Instagram size={15} /> },
                { href: "https://www.facebook.com/emiratesprideofficial", icon: <Facebook size={15} /> },
                { href: "#", icon: <Twitter size={15} /> },
                { href: "#", icon: <Youtube size={15} /> },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-black hover:text-white hover:border-black transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Fragrances */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-black font-medium mb-5">Fragrances</h4>
            <ul className="space-y-3">
              {footerLinks.fragrances.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}>
                    <span className="text-[11px] text-gray-500 hover:text-black transition-colors cursor-pointer">
                      {l.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-black font-medium mb-5">Customer Care</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-[11px] text-gray-500 hover:text-black transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.25em] text-black font-medium mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-[11px] text-gray-500 hover:text-black transition-colors"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100 px-6 md:px-12 lg:px-20 xl:px-32 py-5">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[10px] text-gray-400">
            &copy; {new Date().getFullYear()} Emirates Pride. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="https://emiratespride.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-gray-400 hover:text-black transition-colors">
              Privacy Policy
            </a>
            <span className="text-gray-200">|</span>
            <a href="https://emiratespride.com/terms-conditions/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-gray-400 hover:text-black transition-colors">
              Terms & Conditions
            </a>
            <span className="text-gray-200">|</span>
            <a href="https://emiratespride.com/cookies/" target="_blank" rel="noopener noreferrer" className="text-[10px] text-gray-400 hover:text-black transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>

    </footer>
  );
}
