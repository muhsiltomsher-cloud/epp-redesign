"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Careers() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-[88px] md:pt-[106px] pb-24 md:pb-0">
        <section className="epp-container py-12 md:py-16 text-center space-y-4 fade-in-up">
          <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400">Join Us</p>
          <h1 className="text-2xl md:3xl font-serif">Careers at Emirates Pride</h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            Work with our perfumers, creatives, and retail teams to shape the next chapter of Arabian luxury.
          </p>
          <a
            href="https://emiratespride.com/careers/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[var(--color-brand-gold)] text-white px-8 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-[var(--color-brand-gold-light)] transition-colors"
          >
            View Open Roles
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
