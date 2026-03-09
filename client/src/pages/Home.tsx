import { Gift, Pencil, Truck, MailOpen } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products, categories } from "@/lib/data";
import { getRecentlyViewedIds } from "@/lib/recentlyViewed";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const newArrivals = products.slice(0, 4);
  const featureProduct = products.find(p => p.name.includes("Future Bakhoor")) || products[0];
  const featureProduct2 = products.find(p => p.name.includes("Hidden Leather")) || products[1];

  const [recentlyViewed, setRecentlyViewed] = useState<typeof products>([]);

  const heroRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const pinnedSectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const bloomBannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (heroRef.current) {
        const heroImage = heroRef.current.querySelector('.hero-image');
        const textElements = heroRef.current.querySelectorAll('.hero-text-reveal');
        
        gsap.fromTo(textElements, 
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1.2, stagger: 0.1, ease: "power2.out", delay: 0.1 }
        );

        gsap.to(heroImage, {
          y: "15%",
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          }
        });
      }

      if (brandRef.current) {
        const text = brandRef.current.querySelector('p');
        gsap.fromTo(text, 
          { y: 20, opacity: 0 },
          { 
            y: 0, 
            opacity: 1, 
            duration: 1, 
            ease: "power2.out",
            scrollTrigger: {
              trigger: brandRef.current,
              start: "top 85%",
            }
          }
        );
      }
      
      if (pinnedSectionRef.current) {
        let mm = gsap.matchMedia();
        
        mm.add("(min-width: 768px)", () => {
          const leftContent = pinnedSectionRef.current?.querySelector('.pinned-content');
          
          ScrollTrigger.create({
            trigger: pinnedSectionRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: leftContent,
            pinSpacing: false,
          });
        });
      }

      if (galleryRef.current) {
        const items = galleryRef.current.querySelectorAll('.gallery-item');
        gsap.fromTo(items,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: galleryRef.current,
              start: "top 80%",
            }
          }
        );
      }

      if (bloomBannerRef.current) {
        const bannerImg = bloomBannerRef.current.querySelector('.bloom-banner-img');
        gsap.fromTo(bannerImg,
          { y: "-15%", scale: 1.15 },
          {
            y: "15%",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: bloomBannerRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ids = getRecentlyViewedIds();
    const viewed = ids
      .map(id => products.find(p => p.id === id))
      .filter(Boolean) as typeof products;
    setRecentlyViewed(viewed);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section ref={heroRef} className="relative h-[70svh] md:h-[75vh] w-full flex flex-col justify-end pb-8 md:pb-24 lg:pb-32 px-4 md:px-10 lg:px-20 xl:px-28 overflow-hidden bg-black">
          <div className="absolute inset-0 w-full h-full">
            <video
              autoPlay
              muted
              loop
              playsInline
              poster="https://emiratespride.com/wp-content/uploads/2026/02/Desktop-Banner-ENG-scaled.jpg"
              className="hero-image w-full h-full object-cover object-center absolute inset-0"
            >
              <source src="https://videos.pexels.com/video-files/5765297/5765297-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            </video>
          </div>
        </section>

        <section ref={galleryRef} className="py-5 md:py-10 lg:py-14 bg-[#e6cebb33] px-4 md:px-10 lg:px-20 xl:px-28">
          <div className="text-center mb-6 md:mb-14">
            <h2 className="text-[8px] md:text-[10px] font-medium tracking-[0.3em] uppercase text-[#c9a96e] mb-2 md:mb-3">Explore</h2>
            <h3 className="text-lg md:text-2xl lg:text-3xl font-serif">A World of Fragrance</h3>
          </div>
          
          <div className="flex md:hidden gap-3 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 hide-scrollbar">
            {categories.map((cat) => (
              <Link key={cat.name} href="/collection">
                <div className="gallery-item group relative aspect-[3/4] w-[45vw] flex-shrink-0 snap-start overflow-hidden bg-muted cursor-pointer">
                  <img src={cat.image} className="w-full h-full object-cover" alt={cat.name} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-serif text-sm mb-1 line-clamp-1">{cat.name}</h3>
                    <span className="text-[7px] tracking-[0.2em] uppercase text-[#c9a96e]">Explore</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="hidden md:grid md:grid-cols-6 gap-3 lg:gap-4">
            {categories.map((cat) => (
              <Link key={cat.name} href="/collection">
                <div className="gallery-item group relative aspect-[3/4] overflow-hidden bg-muted cursor-pointer">
                  <img src={cat.image} className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110" alt={cat.name} />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700"></div>
                  <div className="absolute bottom-5 lg:bottom-6 left-5 lg:left-6">
                    <h3 className="text-white font-serif text-sm lg:text-base mb-1 leading-tight">{cat.name}</h3>
                    <div className="w-0 h-[1px] bg-[#c9a96e] group-hover:w-full transition-all duration-700 ease-out"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section ref={pinnedSectionRef} className="relative w-full bg-[#fcfcfc] flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:h-screen md:sticky top-0 pinned-content flex flex-col justify-center items-center md:items-start text-center md:text-left px-6 py-14 md:p-14 lg:p-20 xl:p-28 z-10 relative bg-cover bg-center min-h-[100svh] md:min-h-0" style={{ backgroundImage: "url('https://emiratespride.com/wp-content/uploads/2026/01/Mostakbal-Lifestyle-scaled-1-1200x1490.webp')" }}>
            <div className="absolute inset-0 bg-black/55 md:bg-black/50"></div>
            <span className="relative z-10 text-[8px] md:text-[10px] font-medium tracking-[0.3em] uppercase text-[#c9a96e] mb-2 md:mb-5 lg:mb-7 md:border-l md:border-[#c9a96e]/50 md:pl-4">Signature Blend</span>
            <h2 className="relative z-10 text-xl md:text-3xl lg:text-4xl xl:text-5xl font-serif mb-2.5 md:mb-5 lg:mb-7 leading-tight text-white">{featureProduct2.name}</h2>
            <p className="relative z-10 text-white/70 text-[10px] md:text-xs lg:text-sm leading-relaxed mb-5 md:mb-8 lg:mb-12 max-w-xs md:max-w-md font-light">
              A captivating journey into darkness. Discover a scent tailored to your most elegant moments.
            </p>
            <Link href={`/product/${featureProduct2.id}`}>
              <span className="relative z-10 inline-block bg-[#c9a96e] text-white px-5 md:px-8 lg:px-10 py-2.5 md:py-3.5 lg:py-4 text-[8px] md:text-[10px] font-medium tracking-[0.2em] uppercase hover:bg-[#b8954f] transition-colors cursor-pointer">
                Discover The Scent
              </span>
            </Link>
          </div>
          
          <div className="w-full md:w-1/2 flex flex-col scrolling-images relative bg-white">
            <div className="grid grid-cols-2 gap-2.5 md:gap-4 lg:gap-6 p-3 md:p-6 lg:p-10">
              {products.slice(0, 4).map((product) => (
                <div key={product.id} className="group flex flex-col cursor-pointer" data-testid={`card-scroll-product-${product.id}`}>
                  <Link href={`/product/${product.id}`}>
                    <div className="relative aspect-[3/5] mb-1.5 md:mb-3 overflow-hidden bg-[#f5f5f5]">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-1000 group-hover:scale-105"
                      />
                      {product.hoverImage && (
                        <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden hidden md:block">
                          <img src={product.hoverImage} alt={`${product.name} lifestyle`} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/10"></div>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="flex flex-col items-center text-center px-0.5">
                    <Link href={`/product/${product.id}`}>
                      <span className="text-[11px] md:text-sm lg:text-base font-serif mb-0.5 text-black hover:text-black/60 transition-colors cursor-pointer line-clamp-1">{product.name}</span>
                    </Link>
                    <p className="text-[8px] md:text-[10px] lg:text-xs font-medium text-black/70">{product.currency} {product.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2.5 md:gap-4 lg:gap-6 p-3 md:p-6 lg:p-10 pt-0 md:pt-0 lg:pt-0">
              {products.slice(3, 7).map((product) => (
                <div key={product.id} className="group flex flex-col cursor-pointer" data-testid={`card-scroll-product-${product.id}`}>
                  <Link href={`/product/${product.id}`}>
                    <div className="relative aspect-[3/5] mb-1.5 md:mb-3 overflow-hidden bg-[#f5f5f5]">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-1000 group-hover:scale-105"
                      />
                      {product.hoverImage && (
                        <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden hidden md:block">
                          <img src={product.hoverImage} alt={`${product.name} lifestyle`} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/10"></div>
                        </div>
                      )}
                    </div>
                  </Link>
                  <div className="flex flex-col items-center text-center px-0.5">
                    <Link href={`/product/${product.id}`}>
                      <span className="text-[11px] md:text-sm lg:text-base font-serif mb-0.5 text-black hover:text-black/60 transition-colors cursor-pointer line-clamp-1">{product.name}</span>
                    </Link>
                    <p className="text-[8px] md:text-[10px] lg:text-xs font-medium text-black/70">{product.currency} {product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-8 md:py-16 lg:py-24 px-4 md:px-10 lg:px-20 xl:px-28 bg-white overflow-hidden">
          <div className="flex justify-between items-end mb-5 md:mb-10 lg:mb-14 border-b border-black/10 pb-3 md:pb-6">
            <div>
              <h2 className="text-[8px] md:text-[10px] font-medium tracking-[0.3em] uppercase text-[#c9a96e] mb-1.5 md:mb-3">Masterpieces</h2>
              <h3 className="text-base md:text-2xl lg:text-3xl font-serif text-black">New & Trending</h3>
            </div>
            <Link href="/collection">
              <span className="text-[8px] md:text-[10px] font-medium tracking-[0.2em] uppercase text-black/40 hover:text-black/60 transition-colors cursor-pointer luxury-underline pb-1">
                View All
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2.5 md:gap-x-4 lg:gap-x-6 gap-y-5 md:gap-y-8 lg:gap-y-12">
            {newArrivals.map((product) => (
              <CreativeProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {recentlyViewed.length > 0 && (
          <section className="py-8 md:py-16 lg:py-24 px-4 md:px-10 lg:px-20 xl:px-28 bg-[#fafafa] overflow-hidden">
            <div className="flex justify-between items-end mb-5 md:mb-10 lg:mb-14 border-b border-black/10 pb-3 md:pb-6">
              <div>
                <h2 className="text-[8px] md:text-[10px] font-medium tracking-[0.3em] uppercase text-[#c9a96e] mb-1.5 md:mb-3">Your Journey</h2>
                <h3 className="text-base md:text-2xl lg:text-3xl font-serif text-black">Recently Viewed</h3>
              </div>
            </div>
            <div className="flex md:hidden gap-3 overflow-x-auto snap-x snap-mandatory pb-2 -mx-4 px-4 hide-scrollbar">
              {recentlyViewed.slice(0, 6).map((product) => (
                <Link key={product.id} href={`/product/${product.id}`}>
                  <div className="group flex flex-col w-[40vw] flex-shrink-0 snap-start cursor-pointer" data-testid={`card-recent-${product.id}`}>
                    <div className="relative aspect-[3/5] mb-2 overflow-hidden bg-[#f5f5f5]">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <span className="text-xs font-serif mb-0.5 text-black line-clamp-1">{product.name}</span>
                      <p className="text-[9px] font-medium text-black/70">{product.currency} {product.price}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div className="hidden md:grid md:grid-cols-4 gap-x-4 lg:gap-x-6 gap-y-8">
              {recentlyViewed.slice(0, 4).map((product) => (
                <CreativeProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        <section ref={bloomBannerRef} className="relative w-full h-[100svh] md:h-screen overflow-hidden">
          <img 
            src="https://emiratespride.com/ae/wp-content/uploads/sites/10/2025/10/BLOOM-AR-scaled.webp" 
            alt="Bloom Collection" 
            className="bloom-banner-img absolute inset-0 w-full h-[130%] object-cover object-center"
          />
        </section>

        <section ref={brandRef} className="relative py-10 md:py-24 lg:py-32 px-4 md:px-10 lg:px-20 xl:px-28 bg-[#1a1308] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('https://emiratespride.com/wp-content/uploads/2026/01/Mostakbal-Lifestyle-scaled-1-1200x1490.webp')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 md:gap-16 lg:gap-24 max-w-7xl mx-auto">
            <div className="flex-1 text-center lg:text-left">
              <div className="w-10 md:w-12 h-[1px] bg-[#c9a96e] mb-4 md:mb-6 mx-auto lg:mx-0"></div>
              <h2 className="text-[8px] md:text-[10px] font-medium tracking-[0.3em] uppercase text-[#c9a96e] mb-3 md:mb-6">Our Philosophy</h2>
              <p className="text-base md:text-xl lg:text-2xl font-serif text-white leading-relaxed md:leading-snug text-balance font-light">
                Dedicated to the creation of highly original, artisan fragrances.
              </p>
              <p className="text-[10px] md:text-sm text-white/50 font-light mt-3 md:mt-6 leading-relaxed max-w-xl mx-auto lg:mx-0">
                We source the finest ingredients globally to craft scents that evoke deep emotions and lasting memories.
              </p>
            </div>
            <div className="flex-shrink-0 grid grid-cols-2 gap-3 md:gap-4 lg:gap-6 w-full lg:w-auto lg:max-w-md">
              <div className="group flex flex-col items-center text-center p-4 md:p-5 lg:p-7 border border-[#c9a96e]/15 hover:border-[#c9a96e]/40 transition-all duration-500 cursor-pointer">
                <div className="w-9 h-9 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e]/80 mb-2.5 md:mb-3.5 lg:mb-4 group-hover:bg-[#c9a96e] group-hover:text-white transition-colors duration-500">
                  <Pencil strokeWidth={1} className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                </div>
                <h3 className="text-[10px] md:text-xs lg:text-sm font-serif mb-1 text-white">Personalization</h3>
                <p className="text-[8px] md:text-[9px] lg:text-[10px] text-white/40 font-light leading-relaxed hidden sm:block">Custom engraving</p>
              </div>
              <div className="group flex flex-col items-center text-center p-4 md:p-5 lg:p-7 border border-[#c9a96e]/15 hover:border-[#c9a96e]/40 transition-all duration-500 cursor-pointer">
                <div className="w-9 h-9 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e]/80 mb-2.5 md:mb-3.5 lg:mb-4 group-hover:bg-[#c9a96e] group-hover:text-white transition-colors duration-500">
                  <Gift strokeWidth={1} className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                </div>
                <h3 className="text-[10px] md:text-xs lg:text-sm font-serif mb-1 text-white">Gift Wrapping</h3>
                <p className="text-[8px] md:text-[9px] lg:text-[10px] text-white/40 font-light leading-relaxed hidden sm:block">Luxurious finishing</p>
              </div>
              <div className="group flex flex-col items-center text-center p-4 md:p-5 lg:p-7 border border-[#c9a96e]/15 hover:border-[#c9a96e]/40 transition-all duration-500 cursor-pointer">
                <div className="w-9 h-9 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e]/80 mb-2.5 md:mb-3.5 lg:mb-4 group-hover:bg-[#c9a96e] group-hover:text-white transition-colors duration-500">
                  <Truck strokeWidth={1} className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                </div>
                <h3 className="text-[10px] md:text-xs lg:text-sm font-serif mb-1 text-white">Global Delivery</h3>
                <p className="text-[8px] md:text-[9px] lg:text-[10px] text-white/40 font-light leading-relaxed hidden sm:block">Free over AED 1500</p>
              </div>
              <div className="group flex flex-col items-center text-center p-4 md:p-5 lg:p-7 border border-[#c9a96e]/15 hover:border-[#c9a96e]/40 transition-all duration-500 cursor-pointer">
                <div className="w-9 h-9 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e]/80 mb-2.5 md:mb-3.5 lg:mb-4 group-hover:bg-[#c9a96e] group-hover:text-white transition-colors duration-500">
                  <MailOpen strokeWidth={1} className="w-3.5 h-3.5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                </div>
                <h3 className="text-[10px] md:text-xs lg:text-sm font-serif mb-1 text-white">Free Samples</h3>
                <p className="text-[8px] md:text-[9px] lg:text-[10px] text-white/40 font-light leading-relaxed hidden sm:block">With every order</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function CreativeProductCard({ product }: { product: any }) {
  return (
    <div className="group flex flex-col w-full cursor-pointer" data-testid={`card-product-${product.id}`}>
      <Link href={`/product/${product.id}`}>
        <div className="block relative aspect-[3/5] mb-2 md:mb-3 lg:mb-4 overflow-hidden bg-[#f5f5f5]">
          <img 
            src={product.image} 
            alt={product.name} 
            className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-1000 group-hover:scale-105"
          />
          {product.hoverImage && (
            <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden hidden md:block">
              <img 
                src={product.hoverImage} 
                alt={`${product.name} lifestyle`} 
                className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-black/10"></div>
            </div>
          )}
          
          <div className="absolute bottom-0 left-0 w-full z-30 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out bg-white hidden md:block">
            <button className="w-full py-3 text-[9px] font-medium tracking-[0.2em] uppercase hover:bg-[#1a1308] hover:text-white transition-colors" data-testid={`button-quickview-${product.id}`}>
              Quick View
            </button>
          </div>
        </div>
      </Link>
      
      <div className="flex flex-col items-center px-1 text-center">
        <Link href={`/product/${product.id}`}>
          <span className="text-xs md:text-sm lg:text-base font-serif mb-1 text-black hover:text-black/60 transition-colors cursor-pointer" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </span>
        </Link>
        <span className="text-[7px] md:text-[8px] lg:text-[9px] tracking-[0.2em] uppercase text-black/40 mb-1 lg:mb-1.5 line-clamp-1">
          {product.collection}
        </span>
        <p className="text-[9px] md:text-[11px] lg:text-xs font-medium text-black" data-testid={`text-price-${product.id}`}>
          {product.currency} {product.price}
        </p>
      </div>
    </div>
  );
}

