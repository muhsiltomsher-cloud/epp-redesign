import { Gift, Pencil, Truck, MailOpen } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products, categories } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const newArrivals = products.slice(0, 4);
  const featureProduct = products.find(p => p.name.includes("Future Bakhoor")) || products[0];
  const featureProduct2 = products.find(p => p.name.includes("Hidden Leather")) || products[1];

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

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section ref={heroRef} className="relative h-[85vh] md:h-screen w-full flex flex-col justify-end pb-16 md:pb-32 px-4 md:px-8 overflow-hidden bg-black">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="https://emiratespride.com/wp-content/uploads/2026/02/Desktop-Banner-ENG-scaled.jpg" 
              alt="Emirates Pride Perfumes" 
              className="hero-image w-full h-[120%] object-cover object-center md:object-top absolute -top-[10%] opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
          </div>
          
          
        </section>

        <section ref={galleryRef} className="py-6 md:py-12 bg-[#fafafa] px-4 md:px-8 lg:px-16">
          <div className="text-center mb-6 md:mb-10">
            <h2 className="text-[9px] md:text-[10px] font-medium tracking-[0.3em] uppercase text-[#c9a96e] mb-2">Explore</h2>
            <h3 className="text-2xl md:text-4xl font-serif">A World of Fragrance</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <Link href="/collection">
              <div className="gallery-item group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-muted cursor-pointer mb-4 md:mb-0">
                <img src={categories[0].image} className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110" alt="Oud" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700"></div>
                <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8">
                  <h3 className="text-white font-serif text-2xl md:text-3xl lg:text-4xl mb-2">{categories[0].name}</h3>
                  <div className="w-0 h-[1px] bg-[#c9a96e] group-hover:w-full transition-all duration-700 ease-out"></div>
                </div>
              </div>
            </Link>
            
            <Link href="/collection">
              <div className="gallery-item group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-muted cursor-pointer md:translate-y-12 mb-4 md:mb-0">
                <img src={categories[4].image} className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110" alt="Gifts" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700"></div>
                <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8">
                  <h3 className="text-white font-serif text-2xl md:text-3xl lg:text-4xl mb-2">{categories[4].name}</h3>
                  <div className="w-0 h-[1px] bg-[#c9a96e] group-hover:w-full transition-all duration-700 ease-out"></div>
                </div>
              </div>
            </Link>
            
            <Link href="/collection">
              <div className="gallery-item group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-muted cursor-pointer md:translate-y-24">
                <img src={categories[1].image} className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110" alt="Oils" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700"></div>
                <div className="absolute bottom-6 md:bottom-8 left-6 md:left-8">
                  <h3 className="text-white font-serif text-2xl md:text-3xl lg:text-4xl mb-2">{categories[1].name}</h3>
                  <div className="w-0 h-[1px] bg-[#c9a96e] group-hover:w-full transition-all duration-700 ease-out"></div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        <section ref={pinnedSectionRef} className="relative w-full bg-[#fcfcfc] flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 md:h-screen md:sticky top-0 pinned-content flex flex-col justify-center items-center md:items-start text-center md:text-left p-8 md:p-16 lg:p-24 z-10 relative bg-cover bg-center" style={{ backgroundImage: "url('https://emiratespride.com/wp-content/uploads/2026/01/Mostakbal-Lifestyle-scaled-1-1200x1490.webp')" }}>
            <div className="absolute inset-0 bg-black/50"></div>
            <span className="relative z-10 text-[9px] md:text-[10px] font-medium tracking-[0.3em] uppercase text-[#c9a96e] mb-4 md:mb-6 md:border-l md:border-[#c9a96e]/50 md:pl-4">Signature Blend</span>
            <h2 className="relative z-10 text-3xl md:text-5xl lg:text-6xl font-serif mb-4 md:mb-6 leading-tight text-white">{featureProduct2.name}</h2>
            <p className="relative z-10 text-white/70 text-sm leading-relaxed mb-8 md:mb-10 max-w-md font-light">
              A captivating journey into darkness. Discover a scent tailored to your most elegant moments, blending the finest leather accords with mysterious depths.
            </p>
            <Link href={`/product/${featureProduct2.id}`}>
              <span className="relative z-10 inline-block bg-[#c9a96e] text-white px-8 py-3.5 md:py-4 text-[9px] md:text-[10px] font-medium tracking-[0.2em] uppercase hover:bg-[#b8954f] transition-colors cursor-pointer">
                Discover The Scent
              </span>
            </Link>
          </div>
          
          <div className="w-full md:w-1/2 flex flex-col scrolling-images relative bg-white">
            <div className="grid grid-cols-2 gap-3 md:gap-6 p-4 md:p-8">
              {products.slice(0, 4).map((product) => (
                <div key={product.id} className="group flex flex-col cursor-pointer" data-testid={`card-scroll-product-${product.id}`}>
                  <Link href={`/product/${product.id}`}>
                    <div className="relative aspect-[3/5] mb-3 overflow-hidden bg-[#f5f5f5]">
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
                  <div className="flex flex-col items-center text-center px-1">
                    <Link href={`/product/${product.id}`}>
                      <span className="text-sm md:text-base font-serif mb-1 text-black hover:text-black/60 transition-colors cursor-pointer">{product.name}</span>
                    </Link>
                    <span className="text-[7px] md:text-[8px] tracking-[0.2em] uppercase text-black/40 mb-1">{product.collection}</span>
                    <p className="text-[10px] md:text-xs font-medium text-black">{product.currency} {product.price}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 md:gap-6 p-4 md:p-8 pt-0 md:pt-0">
              {products.slice(3, 7).map((product) => (
                <div key={product.id} className="group flex flex-col cursor-pointer" data-testid={`card-scroll-product-${product.id}`}>
                  <Link href={`/product/${product.id}`}>
                    <div className="relative aspect-[3/5] mb-3 overflow-hidden bg-[#f5f5f5]">
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
                  <div className="flex flex-col items-center text-center px-1">
                    <Link href={`/product/${product.id}`}>
                      <span className="text-sm md:text-base font-serif mb-1 text-black hover:text-black/60 transition-colors cursor-pointer">{product.name}</span>
                    </Link>
                    <span className="text-[7px] md:text-[8px] tracking-[0.2em] uppercase text-black/40 mb-1">{product.collection}</span>
                    <p className="text-[10px] md:text-xs font-medium text-black">{product.currency} {product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-6 md:py-10 px-4 md:px-8 lg:px-16 bg-white overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-4 md:mb-8 border-b border-black/10 pb-3 md:pb-5 text-center md:text-left">
            <div>
              <h2 className="text-[9px] md:text-[10px] font-medium tracking-[0.3em] uppercase text-[#c9a96e] mb-2 md:mb-3">Masterpieces</h2>
              <h3 className="text-2xl md:text-4xl font-serif text-black">New & Trending</h3>
            </div>
            <Link href="/collection">
              <span className="hidden md:inline-block text-[10px] font-medium tracking-[0.2em] uppercase hover:text-black/60 transition-colors cursor-pointer luxury-underline pb-1">
                View All Products
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-2 md:gap-x-4 gap-y-6 md:gap-y-10">
            {newArrivals.map((product) => (
              <CreativeProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-8 text-center md:hidden">
            <Link href="/collection">
              <span className="inline-block text-[9px] font-medium tracking-[0.2em] uppercase hover:text-[#c9a96e] transition-colors cursor-pointer border-b border-[#c9a96e] text-[#c9a96e] pb-1">
                View All Collections
              </span>
            </Link>
          </div>
        </section>

        <section ref={bloomBannerRef} className="relative w-full h-[50vh] md:h-[70vh] overflow-hidden">
          <img 
            src="https://emiratespride.com/ae/wp-content/uploads/sites/10/2025/10/BLOOM-AR-scaled.webp" 
            alt="Bloom Collection" 
            className="bloom-banner-img absolute inset-0 w-full h-[130%] object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/20"></div>
        </section>

        <section ref={brandRef} className="relative py-16 md:py-28 px-6 md:px-12 lg:px-20 bg-[#1a1308] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('https://emiratespride.com/wp-content/uploads/2026/01/Mostakbal-Lifestyle-scaled-1-1200x1490.webp')", backgroundSize: "cover", backgroundPosition: "center" }}></div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 md:gap-16 lg:gap-24 max-w-7xl mx-auto">
            <div className="flex-1 text-center lg:text-left">
              <div className="w-12 h-[1px] bg-[#c9a96e] mb-6 mx-auto lg:mx-0"></div>
              <h2 className="text-[9px] md:text-[10px] font-medium tracking-[0.3em] uppercase text-[#c9a96e] mb-4 md:mb-6">Our Philosophy</h2>
              <p className="text-xl md:text-3xl lg:text-4xl font-serif text-white leading-relaxed md:leading-snug text-balance font-light">
                Dedicated to the creation of highly original, artisan fragrances.
              </p>
              <p className="text-sm md:text-base text-white/50 font-light mt-4 md:mt-6 leading-relaxed max-w-xl mx-auto lg:mx-0">
                We source the finest ingredients globally to craft scents that evoke deep emotions and lasting memories.
              </p>
            </div>
            <div className="flex-shrink-0 grid grid-cols-2 gap-4 md:gap-6 w-full lg:w-auto lg:max-w-md">
              <div className="group flex flex-col items-center text-center p-4 md:p-6 border border-[#c9a96e]/15 hover:border-[#c9a96e]/40 transition-all duration-500 cursor-pointer">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e]/80 mb-3 md:mb-4 group-hover:bg-[#c9a96e] group-hover:text-white transition-colors duration-500">
                  <Pencil strokeWidth={1} className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h3 className="text-xs md:text-sm font-serif mb-1 text-white">Personalization</h3>
                <p className="text-[9px] md:text-[10px] text-white/40 font-light leading-relaxed hidden sm:block">Custom engraving</p>
              </div>
              <div className="group flex flex-col items-center text-center p-4 md:p-6 border border-[#c9a96e]/15 hover:border-[#c9a96e]/40 transition-all duration-500 cursor-pointer">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e]/80 mb-3 md:mb-4 group-hover:bg-[#c9a96e] group-hover:text-white transition-colors duration-500">
                  <Gift strokeWidth={1} className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h3 className="text-xs md:text-sm font-serif mb-1 text-white">Gift Wrapping</h3>
                <p className="text-[9px] md:text-[10px] text-white/40 font-light leading-relaxed hidden sm:block">Luxurious finishing</p>
              </div>
              <div className="group flex flex-col items-center text-center p-4 md:p-6 border border-[#c9a96e]/15 hover:border-[#c9a96e]/40 transition-all duration-500 cursor-pointer">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e]/80 mb-3 md:mb-4 group-hover:bg-[#c9a96e] group-hover:text-white transition-colors duration-500">
                  <Truck strokeWidth={1} className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h3 className="text-xs md:text-sm font-serif mb-1 text-white">Global Delivery</h3>
                <p className="text-[9px] md:text-[10px] text-white/40 font-light leading-relaxed hidden sm:block">Free over AED 1500</p>
              </div>
              <div className="group flex flex-col items-center text-center p-4 md:p-6 border border-[#c9a96e]/15 hover:border-[#c9a96e]/40 transition-all duration-500 cursor-pointer">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-[#c9a96e]/30 flex items-center justify-center text-[#c9a96e]/80 mb-3 md:mb-4 group-hover:bg-[#c9a96e] group-hover:text-white transition-colors duration-500">
                  <MailOpen strokeWidth={1} className="w-4 h-4 md:w-5 md:h-5" />
                </div>
                <h3 className="text-xs md:text-sm font-serif mb-1 text-white">Free Samples</h3>
                <p className="text-[9px] md:text-[10px] text-white/40 font-light leading-relaxed hidden sm:block">With every order</p>
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
        <div className="block relative aspect-[3/5] mb-3 md:mb-4 overflow-hidden bg-[#f5f5f5]">
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
          <span className="text-sm md:text-lg font-serif mb-1 text-black hover:text-black/60 transition-colors cursor-pointer" data-testid={`text-product-name-${product.id}`}>
            {product.name}
          </span>
        </Link>
        <span className="text-[7px] md:text-[8px] tracking-[0.2em] uppercase text-black/40 mb-1.5 line-clamp-1">
          {product.collection}
        </span>
        <p className="text-[10px] md:text-xs font-medium text-black" data-testid={`text-price-${product.id}`}>
          {product.currency} {product.price}
        </p>
      </div>
    </div>
  );
}

