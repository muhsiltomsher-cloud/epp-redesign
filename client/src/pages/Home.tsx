import { ArrowRight, Gift, Pencil, Truck, MailOpen } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products, categories } from "@/lib/data";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const newArrivals = products.slice(0, 4);
  const featureProduct = products.find(p => p.name.includes("Future Bakhoor")) || products[0];
  const featureProduct2 = products.find(p => p.name.includes("Hidden Leather")) || products[1];

  const heroRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const feature1Ref = useRef<HTMLDivElement>(null);
  const feature2Ref = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero Animation (Parallax & Reveal)
    if (heroRef.current) {
      const heroImage = heroRef.current.querySelector('.hero-image');
      const textElements = heroRef.current.querySelectorAll('.hero-text-reveal');
      
      // Initial text reveal
      gsap.fromTo(textElements, 
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.2, ease: "power4.out", delay: 0.2 }
      );

      // Parallax on scroll
      gsap.to(heroImage, {
        y: "25%",
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    }

    // Brand Text Reveal with split-like effect
    if (brandRef.current) {
      const text = brandRef.current.querySelector('p');
      gsap.fromTo(text, 
        { y: 30, opacity: 0, scale: 0.98 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          duration: 1.5, 
          ease: "power3.out",
          scrollTrigger: {
            trigger: brandRef.current,
            start: "top 75%",
          }
        }
      );
    }
    
    // Feature Banner Animations
    [feature1Ref, feature2Ref].forEach((ref) => {
      if (ref.current) {
        const imageWrapper = ref.current.querySelector('.image-wrapper');
        const image = ref.current.querySelector('img');
        const content = ref.current.querySelector('.feature-content');
        
        // Parallax wrapper
        gsap.fromTo(imageWrapper,
          { clipPath: "inset(10% 10% 10% 10%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
            }
          }
        );

        // Image subtle scale down
        gsap.fromTo(image,
          { scale: 1.2 },
          {
            scale: 1,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 80%",
            }
          }
        );
        
        // Content reveal
        gsap.fromTo(content,
          { x: ref === feature1Ref ? 50 : -50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            delay: 0.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ref.current,
              start: "top 70%",
            }
          }
        );
      }
    });

    // Staggered Gallery Reveal
    if (galleryRef.current) {
      const items = galleryRef.current.querySelectorAll('.gallery-item');
      gsap.fromTo(items,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 70%",
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Cinematic Hero Section */}
        <section ref={heroRef} className="relative h-screen w-full flex flex-col justify-center px-4 md:px-12 overflow-hidden bg-black">
          <div className="absolute inset-0 w-full h-full">
            <img 
              src="https://emiratespride.com/wp-content/uploads/2026/02/Desktop-Banner-ENG-scaled.jpg" 
              alt="Emirates Pride Perfumes" 
              className="hero-image w-full h-[120%] object-cover object-center absolute -top-[10%] opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-5xl text-left mt-20">
            <h1 className="hero-text-reveal text-[11px] md:text-[13px] font-medium tracking-[0.4em] uppercase text-white/70 mb-8">
              The Art of Gulf Perfumery
            </h1>
            <h2 className="hero-text-reveal text-6xl md:text-8xl lg:text-9xl font-serif text-white mb-10 leading-[0.9] tracking-tight">
              Emirates<br/>Pride
            </h2>
            <div className="hero-text-reveal flex flex-col sm:flex-row gap-6 mt-8">
              <Link href="/collection">
                <span className="inline-block bg-white text-black px-12 py-5 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-black hover:text-white border border-white transition-all duration-500 cursor-pointer text-center w-full sm:w-auto">
                  Explore Collections
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Brand Statement */}
        <section ref={brandRef} className="py-32 md:py-48 px-4 text-center max-w-5xl mx-auto bg-white">
          <p className="text-2xl md:text-4xl lg:text-5xl font-serif text-foreground/90 leading-tight text-balance">
            Dedicated to the creation of highly original, artisan fragrances. We source the finest ingredients globally to craft scents that evoke deep emotions and lasting memories.
          </p>
        </section>

        {/* Editorial Product Grid */}
        <section className="pb-32 px-4 md:px-12 container mx-auto bg-white overflow-hidden">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-b border-border pb-8">
            <div>
              <h2 className="text-[10px] font-medium tracking-[0.3em] uppercase text-foreground/50 mb-4">Masterpieces</h2>
              <h3 className="text-4xl md:text-5xl font-serif">Curated Selection</h3>
            </div>
            <Link href="/collection">
              <span className="hidden md:inline-block text-[11px] font-medium tracking-[0.2em] uppercase hover:text-foreground/60 transition-colors cursor-pointer border-b border-foreground pb-1">
                View All Products
              </span>
            </Link>
          </div>

          {/* Asymmetrical Artistic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-24 items-center">
            {newArrivals.map((product, index) => {
              // Creating an asymmetrical layout
              const colSpan = index === 0 ? 'md:col-span-7' : index === 1 ? 'md:col-span-5 md:-mt-32' : index === 2 ? 'md:col-span-5 md:mt-16' : 'md:col-span-7';
              
              return (
                <div key={product.id} className={`${colSpan} w-full`}>
                  <EditorialProductCard product={product} align={index % 2 !== 0 ? 'right' : 'left'} />
                </div>
              );
            })}
          </div>
          
          <div className="mt-24 text-center md:hidden">
            <Link href="/collection">
              <span className="inline-block border-b border-foreground pb-1 text-[11px] font-medium tracking-[0.2em] uppercase hover:text-foreground/60 transition-colors cursor-pointer">
                View All Collections
              </span>
            </Link>
          </div>
        </section>

        {/* Cinematic Feature Banner 1 */}
        <section ref={feature1Ref} className="w-full bg-[#FAFAFA] overflow-hidden">
          <div className="flex flex-col md:flex-row items-stretch w-full min-h-[80vh]">
            <div className="w-full md:w-1/2 relative image-wrapper overflow-hidden bg-muted">
              <img 
                src={featureProduct.hoverImage || featureProduct.image} 
                alt={featureProduct.name}
                className="absolute inset-0 w-full h-full object-cover transform origin-center"
              />
            </div>
            <div className="feature-content w-full md:w-1/2 flex flex-col justify-center items-start text-left p-12 md:p-24 lg:p-32 bg-[#FAFAFA]">
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-foreground/50 mb-8 border-l border-foreground/30 pl-4">The Future Collection</span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-8 leading-none tracking-tight">{featureProduct.name}</h2>
              <p className="text-foreground/70 text-base md:text-lg leading-relaxed mb-12 max-w-md font-light">
                Experience the future of bakhoor with this exquisite creation. Unearth the shared roots and nuances of our heritage, meticulously crafted for the modern connoisseur.
              </p>
              <Link href={`/product/${featureProduct.id}`}>
                <span className="creed-button-outline cursor-pointer inline-block">
                  Discover The Scent
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section ref={galleryRef} className="py-32 bg-white px-4 md:px-12">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-serif">A World of Fragrance</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/collection">
              <div className="gallery-item group relative aspect-[3/4] overflow-hidden bg-muted cursor-pointer">
                <img src={categories[0].image} className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110" alt="Oud" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700"></div>
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-white font-serif text-3xl md:text-4xl mb-2">{categories[0].name}</h3>
                  <div className="w-0 h-[1px] bg-white group-hover:w-full transition-all duration-700 ease-out"></div>
                </div>
              </div>
            </Link>
            <Link href="/collection">
              <div className="gallery-item group relative aspect-[3/4] overflow-hidden bg-muted cursor-pointer md:translate-y-16">
                <img src={categories[4].image} className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110" alt="Gifts" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700"></div>
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-white font-serif text-3xl md:text-4xl mb-2">{categories[4].name}</h3>
                  <div className="w-0 h-[1px] bg-white group-hover:w-full transition-all duration-700 ease-out"></div>
                </div>
              </div>
            </Link>
            <Link href="/collection">
              <div className="gallery-item group relative aspect-[3/4] overflow-hidden bg-muted cursor-pointer md:translate-y-32">
                <img src={categories[1].image} className="w-full h-full object-cover transition-transform duration-[2s] ease-out group-hover:scale-110" alt="Oils" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-700"></div>
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-white font-serif text-3xl md:text-4xl mb-2">{categories[1].name}</h3>
                  <div className="w-0 h-[1px] bg-white group-hover:w-full transition-all duration-700 ease-out"></div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        <div className="h-24 md:h-48 bg-white"></div> {/* Spacer for staggered gallery */}

        {/* Cinematic Feature Banner 2 (Reversed) */}
        <section ref={feature2Ref} className="w-full bg-[#111] text-white overflow-hidden">
          <div className="flex flex-col md:flex-row-reverse items-stretch w-full min-h-[80vh]">
            <div className="w-full md:w-1/2 relative image-wrapper overflow-hidden bg-black">
              <img 
                src={featureProduct2.hoverImage || featureProduct2.image} 
                alt={featureProduct2.name}
                className="absolute inset-0 w-full h-full object-cover transform origin-center"
              />
            </div>
            <div className="feature-content w-full md:w-1/2 flex flex-col justify-center items-start text-left p-12 md:p-24 lg:p-32 bg-[#111]">
              <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/50 mb-8 border-l border-white/30 pl-4">Signature Blend</span>
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-8 leading-none tracking-tight">{featureProduct2.name}</h2>
              <p className="text-white/70 text-base md:text-lg leading-relaxed mb-12 max-w-md font-light">
                A captivating journey into darkness. Discover a scent tailored to your most elegant moments, blending the finest leather accords with mysterious depths.
              </p>
              <Link href={`/product/${featureProduct2.id}`}>
                <span className="bg-transparent border border-white text-white px-10 py-4 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-all duration-500 cursor-pointer inline-block">
                  Read More
                </span>
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

// Editorial / Creative Product Card using GSAP styles
function EditorialProductCard({ product, align = 'left' }: { product: any, align?: 'left' | 'right' }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (cardRef.current && imageRef.current) {
      // Subtle parallax on the product image within the card
      gsap.to(imageRef.current, {
        y: "15%",
        ease: "none",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });
    }
  }, []);

  return (
    <div ref={cardRef} className={`group relative w-full flex flex-col ${align === 'right' ? 'md:items-end' : 'md:items-start'}`}>
      <Link href={`/product/${product.id}`} className="block w-full max-w-[500px]">
        {/* Creative Image Container */}
        <div className="relative w-full aspect-[4/5] bg-[#F7F7F7] overflow-hidden mb-8 group-hover:shadow-2xl transition-shadow duration-700 ease-out">
          
          <img 
            ref={imageRef}
            src={product.image} 
            alt={product.name} 
            className="absolute -top-[10%] left-0 w-full h-[120%] object-contain p-8 mix-blend-multiply z-10 transition-transform duration-1000 group-hover:scale-105"
          />
          
          {/* Subtle reveal overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 z-20"></div>
          
          {/* Animated "Add" Button overlay */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 overflow-hidden">
            <div className="transform translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out delay-100">
              <span className="inline-block bg-primary text-primary-foreground px-8 py-3 text-[10px] tracking-[0.2em] uppercase whitespace-nowrap">
                Discover Fragrance
              </span>
            </div>
          </div>
        </div>

        {/* Typography-focused details */}
        <div className={`flex flex-col ${align === 'right' ? 'md:text-right' : 'md:text-left'} text-center md:px-0 px-4`}>
          <span className="text-[9px] tracking-[0.3em] uppercase text-foreground/40 mb-3 block">
            {product.collection}
          </span>
          <h3 className="text-3xl font-serif mb-2 text-foreground group-hover:text-foreground/70 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm font-light text-foreground/60 tracking-wide mt-2">
            {product.currency} {product.price}
          </p>
        </div>
      </Link>
    </div>
  );
}