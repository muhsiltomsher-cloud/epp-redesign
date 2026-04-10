"use client";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const highlights = [
  { label: "تأسسنا", value: "2010" },
  { label: "المعارض", value: "12" },
  { label: "الإبداعات", value: "40+" },
];

export default function AboutUsAr() {
  return (
    <div className="min-h-screen flex flex-col bg-white" dir="rtl">
      <Navbar />
      <main className="flex-1 pt-[88px] md:pt-[106px] pb-24 md:pb-0">
        <section className="epp-container py-10 md:py-14 text-right">
          <p className="text-[10px] uppercase tracking-[0.35em] text-gray-400 mb-2">إمارات برايد</p>
          <h1 className="text-2xl md:text-4xl font-serif mb-4">قصتنا</h1>
          <p className="max-w-3xl text-sm md:text-base text-gray-600 leading-relaxed">
            وُلدت إمارات برايد من شغف بالعود التراثي وفن العطور الحديثة. كل زجاجة تُصنع بمكونات مختارة بعناية وتُقدّم بأناقة تعكس روح المنطقة.
          </p>
        </section>

        <section className="epp-container grid md:grid-cols-2 gap-8 md:gap-12 items-center pb-12 md:pb-16">
          <div className="space-y-4 fade-in-up text-right">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[var(--color-brand-gold)]">حرفية</p>
            <h2 className="text-xl md:text-2xl font-serif">متجذّرون في التراث، مهيّأون للحاضر</h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              من خلاصات العود النادرة إلى التركيبات المعاصرة، يعمل عطارونا بتقنيات عريقة ومختبرات حديثة لنقدم عطوراً مألوفة وجديدة في الوقت نفسه.
            </p>
          </div>
          <div className="w-full aspect-[4/3] bg-[#f5f3ef] overflow-hidden fade-in-up">
            <img
              src="https://emiratespride.com/wp-content/uploads/2026/04/oud-hindi-malaki.webp"
              alt="الحرفية"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

        <section className="bg-[#f5f3ef] py-10 md:py-14">
          <div className="epp-container grid md:grid-cols-3 gap-6 text-center md:text-right">
            {highlights.map((item) => (
              <div key={item.label} className="fade-in-up">
                <p className="text-[10px] uppercase tracking-[0.25em] text-gray-500 mb-2">{item.label}</p>
                <p className="text-2xl font-serif text-[var(--color-brand-gold)]">{item.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="epp-container py-12 md:py-16 text-center md:text-right fade-in-up">
          <h2 className="text-xl md:text-2xl font-serif mb-4">اكتشف المزيد</h2>
          <p className="text-sm md:text-base text-gray-600 max-w-2xl mx-auto md:ml-0 md:mr-auto mb-6">
            زر معارضنا أو استكشف المجموعة كاملة لتعيش تجربة إمارات برايد.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <a
              href="/collection"
              className="inline-block bg-[var(--color-brand-gold)] text-white px-8 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-[var(--color-brand-gold-light)] transition-colors"
            >
              استكشف المجموعة
            </a>
            <a
              href="https://emiratespride.com/store-locator/"
              className="inline-block border border-[var(--color-brand-gold)] text-[var(--color-brand-gold)] px-8 py-3 text-[10px] uppercase tracking-[0.2em] hover:bg-[var(--color-brand-gold)] hover:text-white transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              اعثر على متجر
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
