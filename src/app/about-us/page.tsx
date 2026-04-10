"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const highlights = [
  { label: "Founded", value: "2010" },
  { label: "Flagship Boutiques", value: "12" },
  { label: "Signature Creations", value: "40+" },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-[88px] md:pt-[106px] pb-24 md:pb-0">
        <section className="epp-container py-10 md:py-14">
          <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-2">Emirates Pride</p>
          <h1 className="text-2xl md:text-4xl font-serif mb-4">Our Story</h1>
          <p className="max-w-3xl text-sm md:text-base text-gray-600 leading-relaxed">
            Emirates Pride was born from a devotion to heritage oud and the artistry of modern perfumery. Every bottle is
            crafted with carefully sourced ingredients, refined in our ateliers, and presented with the elegance our region is
            known for.
          </p>
        </section>

        <section className="epp-container grid md:grid-cols-2 gap-8 md:gap-12 items-center pb-12 md:pb-16">
          <div className="space-y-4 fade-in-up">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-brand-gold)]">Craftsmanship</p>
            <h2 className="text-xl md:text-2xl font-serif">Rooted in heritage. Elevated for today.</h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              From rare oud extractions to contemporary blends, our perfumers work with time-honoured techniques and
              state-of-the-art labs to deliver scents that feel both familiar and new. Each launch is small-batch, quality-led,
              and personally approved by our founders.
            </p>
          </div>
          <div className="w-full aspect-[4/3] bg-[#f5f3ef] overflow-hidden fade-in-up">
            <img
              src="https://emiratespride.com/wp-content/uploads/2026/04/oud-hindi-malaki.webp"
              alt="Craftsmanship"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        <section className="bg-[#f5f3ef] py-10 md:py-14">
          <div className="epp-container grid md:grid-cols-3 gap-6">
            {highlights.map((item) => (
              <div key={item.label} className="text-center fade-in-up">
                <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-2">{item.label}</p>
                <p className="text-2xl font-serif text-[var(--color-brand-gold)]">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="epp-container py-12 md:py-16 text-center fade-in-up">
          <h2 className="text-xl md:text-2xl font-serif mb-4">Discover More</h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto mb-6">
            Visit our boutiques or explore the full collection to experience Emirates Pride in person.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="/collection"
              className="inline-block bg-[var(--color-brand-gold)] text-white px-8 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-[var(--color-brand-gold-light)] transition-colors"
            >
              Explore Collection
            </a>
            <a
              href="https://emiratespride.com/store-locator/"
              className="inline-block border border-[var(--color-brand-gold)] text-[var(--color-brand-gold)] px-8 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-[var(--color-brand-gold)] hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Find a Store
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
