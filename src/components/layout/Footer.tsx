"use client";

import { Instagram, Facebook, Linkedin, ArrowRight, ChevronDown } from "lucide-react";
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

      {/* Main footer body */}
      <div className="epp-container py-8 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 md:gap-12">

          {/* Link columns */}
          <div className="lg:col-span-3 space-y-4 md:space-y-0 md:grid md:grid-cols-3 md:gap-10">
            <FooterColumn title="Customer Care" items={footerLinks.services} />
            <FooterColumn title="About Us" items={footerLinks.company} />
            <FooterColumn title="Services" items={footerLinks.fragrances} />
          </div>

          {/* Newsletter + socials */}
          <div className="lg:col-span-2 flex flex-col gap-6 lg:items-end">
            <div className="w-full lg:w-[420px]">
              <p className="text-[10px] uppercase tracking-[0.25em] text-black mb-3">Sign up now</p>
              <form
                className="flex w-full border border-gray-300 h-12 pl-4 pr-1 focus-within:border-[var(--color-brand-gold)] transition-colors"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter e-mail address"
                  className="flex-1 text-[11px] placeholder-gray-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="w-12 h-full flex items-center justify-center text-gray-500 hover:text-[var(--color-brand-gold)] transition-colors"
                  aria-label="Submit newsletter"
                >
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-end w-full">
              <span className="text-[10px] uppercase tracking-[0.25em] text-black">Follow us</span>
              <div className="flex items-center gap-3 text-gray-600">
                <a href="https://www.facebook.com/emiratesprideofficial" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-[var(--color-brand-gold)] transition-colors">
                  <Facebook size={18} />
                </a>
                <a href="https://www.instagram.com/emiratesprideperfumes/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[var(--color-brand-gold)] transition-colors">
                  <Instagram size={18} />
                </a>
                <a href="https://www.linkedin.com/company/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[var(--color-brand-gold)] transition-colors">
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom meta links */}
        <div className="mt-10 border-t border-gray-100 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[10px] text-gray-500">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-gray-600">&copy; {new Date().getFullYear()} Emirates Pride</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 md:justify-end">
            <a href="https://emiratespride.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-brand-gold)] transition-colors">Privacy Policy</a>
            <a href="https://emiratespride.com/terms-conditions/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-brand-gold)] transition-colors">Terms &amp; Conditions</a>
            <a href="https://emiratespride.com/cookies/" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-brand-gold)] transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>

    </footer>
  );
}

function FooterColumn({ title, items }: { title: string; items: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 pb-3 md:border-0 md:pb-0">
      {/* Mobile accordion */}
      <button
        type="button"
        className="w-full flex items-center justify-between md:hidden text-[11px] uppercase tracking-[0.2em] text-black"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <ChevronDown size={16} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul className="mt-3 space-y-3 md:hidden">
          {items.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
              className="text-[11px] text-gray-500 hover:text-[var(--color-brand-gold)] transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Desktop lists */}
      <div className="hidden md:block">
        <h4 className="text-[10px] uppercase tracking-[0.25em] text-black font-medium mb-5">{title}</h4>
        <ul className="space-y-3">
          {items.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                target={l.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
              className="text-[11px] text-gray-500 hover:text-[var(--color-brand-gold)] transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
