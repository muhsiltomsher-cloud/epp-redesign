"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function BlogAr() {
  return (
    <div className="min-h-screen flex flex-col bg-white" dir="rtl">
      <Navbar />
      <main className="flex-1 pt-[88px] md:pt-[106px] pb-24 md:pb-0">
        <section className="epp-container py-12 md:py-16 text-center space-y-4 fade-in-up">
          <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400">قصص</p>
          <h1 className="text-2xl md:text-3xl font-serif">من المدونة</h1>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto">
            اقرأ أحدث الإصدارات والكواليس وأدلة العطور من دار إمارات برايد.
          </p>
          <a
            href="https://emiratespride.com/blogs/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[var(--color-brand-gold)] text-white px-8 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-[var(--color-brand-gold-light)] transition-colors"
          >
            زيارة المدونة
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
