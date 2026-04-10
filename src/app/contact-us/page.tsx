"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ContactUs() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-[88px] md:pt-[106px] pb-24 md:pb-0">
        <section className="epp-container py-12 md:py-16 text-center space-y-4 fade-in-up">
          <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400">Support</p>
          <h1 className="text-2xl md:text-3xl font-serif">Contact Us</h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            We’re here to help with orders, product questions, or boutique visits. Choose your preferred way to reach us.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://emiratespride.com/contact-us/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[var(--color-brand-gold)] text-white px-8 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-[var(--color-brand-gold-light)] transition-colors"
            >
              Submit a Request
            </a>
            <a
              href="tel:+97180037847"
              className="inline-block border border-[var(--color-brand-gold)] text-[var(--color-brand-gold)] px-8 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-[var(--color-brand-gold)] hover:text-white transition-colors"
            >
              Call 800 EPRIDE
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
