"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

interface NotesTier {
  label: string;
  items: string[];
}

const TIER_META: Record<string, { time: string; description: string; color: string; icon: string }> = {
  Top: {
    time: 'First 15 minutes',
    description: 'The opening burst — bright and inviting. These notes create the unforgettable first impression.',
    color: '#E2C98A',
    icon: '◇',
  },
  Heart: {
    time: '15 min — 3 hours',
    description: 'The soul of the fragrance — deep and mysterious. The heart unfolds slowly on warm skin.',
    color: '#C9A96E',
    icon: '◈',
  },
  Base: {
    time: '3+ hours',
    description: 'The lasting foundation — warm, sensual, and unforgettable. These notes linger for hours.',
    color: '#8B6914',
    icon: '◆',
  },
};

const DEFAULT_TIER_IMAGES: Record<string, string> = {
  Top: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&h=800&fit=crop&q=80',
  Heart: 'https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800&h=800&fit=crop&q=80',
  Base: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&h=800&fit=crop&q=80',
};

function Particles({ color, count = 10 }: { color: string; count?: number }) {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: count }).map((_, i) => {
        const angle = (360 / count) * i;
        const delay = i * 0.4;
        const size = 2 + (i % 3);
        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              left: '50%',
              top: '50%',
              opacity: 0,
              animation: `scentParticle 5s ${delay}s ease-in-out infinite`,
              ['--angle' as string]: `${angle}deg`,
            }}
          />
        );
      })}
    </div>
  );
}

export function ProductScentJourney({ notes, productImage, productTitle, tierImages }: {
  notes: NotesTier[];
  productImage: string;
  productTitle: string;
  tierImages?: Record<string, string>;
}) {
  const [activeLayer, setActiveLayer] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [displayedImage, setDisplayedImage] = useState(0);
  const [prevImage, setPrevImage] = useState(-1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [pillsVisible, setPillsVisible] = useState(true);
  const autoTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoInnerTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const progressRef = useRef(0);

  const images = tierImages ?? DEFAULT_TIER_IMAGES;

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      const next = progressRef.current + 0.8;
      if (next >= 100) {
        progressRef.current = 0;
        setProgress(0);
        setIsAnimating(true);
        setPillsVisible(false);
        autoTimeoutRef.current = setTimeout(() => {
          setActiveLayer(l => {
            const nextLayer = (l + 1) % notes.length;
            setPrevImage(l);
            setDisplayedImage(nextLayer);
            return nextLayer;
          });
          autoInnerTimeoutRef.current = setTimeout(() => {
            setIsAnimating(false);
            setPillsVisible(true);
          }, 400);
        }, 500);
      } else {
        progressRef.current = next;
        setProgress(next);
      }
    }, 50);
    return () => {
      clearInterval(interval);
      if (autoTimeoutRef.current) clearTimeout(autoTimeoutRef.current);
      if (autoInnerTimeoutRef.current) clearTimeout(autoInnerTimeoutRef.current);
    };
  }, [inView, notes.length]);

  const handleLayerClick = useCallback((i: number) => {
    if (i === activeLayer) return;
    if (autoTimeoutRef.current) clearTimeout(autoTimeoutRef.current);
    if (autoInnerTimeoutRef.current) clearTimeout(autoInnerTimeoutRef.current);
    setIsAnimating(true);
    setPillsVisible(false);
    setPrevImage(activeLayer);
    setTimeout(() => {
      setActiveLayer(i);
      setDisplayedImage(i);
      progressRef.current = 0;
      setProgress(0);
      setTimeout(() => {
        setIsAnimating(false);
        setPillsVisible(true);
      }, 400);
    }, 400);
  }, [activeLayer]);

  const tier = notes[activeLayer];
  const meta = TIER_META[tier.label] ?? { time: '', description: '', color: '#C9A96E', icon: '◇' };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scentRingSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes scentRingSpinReverse { 0% { transform: rotate(360deg); } 100% { transform: rotate(0deg); } }
        @keyframes scentRingBreathe { 0%, 100% { opacity: 0.15; transform: scale(var(--ring-scale)); } 50% { opacity: 0.35; transform: scale(calc(var(--ring-scale) * 1.04)); } }
        @keyframes scentParticle { 0%, 100% { opacity: 0; transform: rotate(var(--angle)) translateY(-130px) scale(0); } 30% { opacity: 0.7; transform: rotate(var(--angle)) translateY(-150px) scale(1); } 70% { opacity: 0.3; transform: rotate(var(--angle)) translateY(-170px) scale(0.5); } }
        @keyframes scentGlowPulse { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.45; } }
        @keyframes scentFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes scentPillEnter { 0% { opacity: 0; transform: translateY(10px) scale(0.85); } 100% { opacity: 1; transform: translateY(0) scale(1); } }
      ` }} />

      <section ref={sectionRef} className="relative overflow-hidden bg-[#faf9f7]">
        {/* Animated background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${meta.color}12 0%, ${meta.color}06 40%, transparent 70%)`,
              transition: 'background 1.5s ease',
              animation: 'scentGlowPulse 6s ease-in-out infinite',
            }}
          />
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full"
            style={{
              background: `radial-gradient(circle, ${meta.color}08 0%, transparent 60%)`,
              transition: 'background 1.5s ease',
              animation: 'scentGlowPulse 8s 2s ease-in-out infinite',
            }}
          />
        </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-14 py-16 md:py-24">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <p className="text-[9px] uppercase tracking-[0.7em] text-[#C9A96E] mb-3">Interactive Experience</p>
          <h2 className="font-serif text-black text-3xl md:text-5xl leading-[1.1] mb-4">
            The Scent Journey
          </h2>
          <p className="text-black text-sm max-w-lg mx-auto">
            Discover how {productTitle} unfolds on your skin — from the first spritz to the lasting dry-down
          </p>
        </div>

        {/* Main 3-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-0 items-center">

          {/* Left: Layer selector cards */}
          <div className="space-y-3 order-2 lg:order-1 lg:pr-12"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s',
            }}
          >
            {notes.map((t, i) => {
              const isActive = i === activeLayer;
              const tierMeta = TIER_META[t.label] ?? { time: '', color: '#C9A96E', icon: '◇' };
              return (
                <button
                  key={t.label}
                  onClick={() => handleLayerClick(i)}
                  className={`w-full text-left p-4 md:p-5 border transition-all duration-700 relative overflow-hidden group ${
                    isActive
                      ? 'border-[#C9A96E] bg-white shadow-lg shadow-[#C9A96E]/10'
                      : 'border-gray-200 bg-white/50 hover:border-[#C9A96E]/40 hover:bg-white'
                  }`}
                >
                  {/* Active indicator bar with gradient */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-700"
                    style={{
                      background: isActive
                        ? `linear-gradient(180deg, ${tierMeta.color}80, ${tierMeta.color}, ${tierMeta.color}80)`
                        : 'transparent',
                      boxShadow: isActive ? `2px 0 8px ${tierMeta.color}40` : 'none',
                    }}
                  />

                  {/* Hover shimmer */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: `linear-gradient(135deg, transparent 30%, ${tierMeta.color}08 50%, transparent 70%)`,
                    }}
                  />

                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full transition-all duration-700"
                        style={{
                          backgroundColor: isActive ? tierMeta.color : '#d1d5db',
                          boxShadow: isActive ? `0 0 12px ${tierMeta.color}80, 0 0 4px ${tierMeta.color}` : 'none',
                          transform: isActive ? 'scale(1.1)' : 'scale(1)',
                        }}
                      />
                      <span className="text-[11px] uppercase tracking-[0.4em] font-semibold text-black">
                        {t.label} Notes
                      </span>
                    </div>
                    <span className="text-[9px] tracking-wider text-black transition-all duration-500"
                      style={{ opacity: isActive ? 1 : 0.5 }}>
                      {tierMeta.time}
                    </span>
                  </div>

                  {/* Progress bar with glow */}
                  {isActive && (
                    <div className="h-[2px] bg-gray-200 overflow-hidden mb-3 rounded-full">
                      <div
                        className="h-full rounded-full transition-all duration-100 ease-linear"
                        style={{
                          width: `${progress}%`,
                          backgroundColor: tierMeta.color,
                          boxShadow: `0 0 8px ${tierMeta.color}80`,
                        }}
                      />
                    </div>
                  )}

                  {/* Notes pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {t.items.map((n, ni) => (
                      <span
                        key={n}
                        className={`text-[9px] uppercase tracking-[0.15em] px-2.5 py-1 border transition-all duration-500 ${
                          isActive
                            ? 'border-[#C9A96E] text-black bg-[#C9A96E]/10'
                            : 'border-gray-200 text-black'
                        }`}
                        style={{ transitionDelay: isActive ? `${ni * 60}ms` : '0ms' }}
                      >
                        {n}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Center: Tier image with SVG rotating rings + crossfade */}
          <div className="flex items-center justify-center order-1 lg:order-2 py-6 lg:py-0"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'scale(1)' : 'scale(0.9)',
              transition: 'opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s',
            }}
          >
            <div
              className="relative w-64 h-64 md:w-80 md:h-80"
              style={{ animation: 'scentFloat 6s ease-in-out infinite' }}
            >
              {/* Breathing CSS rings */}
              {[0, 1, 2, 3].map(ring => (
                <div
                  key={ring}
                  className="absolute inset-0 rounded-full border transition-all duration-1000"
                  style={{
                    borderColor: meta.color,
                    ['--ring-scale' as string]: `${1 + ring * 0.18}`,
                    animation: `scentRingBreathe ${4 + ring * 1.5}s ${ring * 0.5}s ease-in-out infinite`,
                  }}
                />
              ))}

              {/* SVG rotating rings */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 320 320">
                <circle
                  cx="160" cy="160" r="155"
                  fill="none"
                  stroke={meta.color}
                  strokeWidth="1"
                  strokeDasharray="4 8"
                  opacity="0.4"
                  style={{ animation: 'scentRingSpin 30s linear infinite', transformOrigin: 'center' }}
                />
                <circle
                  cx="160" cy="160" r="148"
                  fill="none"
                  stroke={meta.color}
                  strokeWidth="0.5"
                  strokeDasharray="2 12"
                  opacity="0.25"
                  style={{ animation: 'scentRingSpinReverse 45s linear infinite', transformOrigin: 'center' }}
                />
                <circle
                  cx="160" cy="160" r="140"
                  fill="none"
                  stroke={meta.color}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 140}`}
                  strokeDashoffset={`${2 * Math.PI * 140 * (1 - progress / 100)}`}
                  opacity="0.6"
                  style={{ transition: 'stroke-dashoffset 0.15s linear, stroke 1s ease', transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                />
              </svg>

              {/* Floating particles */}
              <Particles color={meta.color} count={12} />

              {/* Glow behind image */}
              <div
                className="absolute inset-2 rounded-full transition-all duration-1000"
                style={{
                  background: `radial-gradient(circle, ${meta.color}35 0%, ${meta.color}10 40%, transparent 70%)`,
                  animation: 'scentGlowPulse 4s ease-in-out infinite',
                }}
              />

              {/* Tier images container with enhanced crossfade */}
              <div className="absolute inset-4 md:inset-6 rounded-full overflow-hidden">
                {notes.map((t, i) => {
                  const tierImg = images[t.label] || productImage;
                  const isShowing = displayedImage === i;
                  const wasPrev = prevImage === i;
                  return (
                    <div
                      key={t.label}
                      className="absolute inset-0 rounded-full overflow-hidden"
                      style={{
                        opacity: isShowing ? (isAnimating ? 0.4 : 1) : (wasPrev && isAnimating ? 0.3 : 0),
                        filter: isAnimating ? 'blur(2px)' : 'blur(0px)',
                        transform: isShowing
                          ? (isAnimating ? 'scale(1.08) rotate(1deg)' : 'scale(1) rotate(0deg)')
                          : (wasPrev && isAnimating ? 'scale(0.92) rotate(-1deg)' : 'scale(0.85) rotate(-2deg)'),
                        zIndex: isShowing ? 2 : (wasPrev ? 1 : 0),
                        transition: 'opacity 0.8s cubic-bezier(0.4,0,0.2,1), transform 0.8s cubic-bezier(0.4,0,0.2,1), filter 0.6s ease',
                      }}
                    >
                      <img
                        src={tierImg}
                        alt={`${t.label} notes - ${productTitle}`}
                        className="w-full h-full object-cover"
                      />
                      <div
                        className="absolute inset-0 transition-opacity duration-700"
                        style={{
                          background: `linear-gradient(135deg, ${(TIER_META[t.label]?.color || '#C9A96E')}25, transparent 60%)`,
                          opacity: isShowing ? 1 : 0,
                        }}
                      />
                    </div>
                  );
                })}

                {/* Inner border ring */}
                <div
                  className="absolute inset-0 rounded-full border-2 z-10 pointer-events-none transition-colors duration-700"
                  style={{ borderColor: `${meta.color}50` }}
                />
              </div>

              {/* Tier label badge with enhanced morph */}
              <div
                className="absolute -bottom-2 left-1/2 z-20 px-5 py-2 bg-white shadow-lg transition-all duration-600"
                style={{
                  borderBottom: `2px solid ${meta.color}`,
                  boxShadow: `0 4px 20px ${meta.color}20`,
                  opacity: isAnimating ? 0 : 1,
                  transform: isAnimating
                    ? 'translateX(-50%) translateY(10px) scale(0.9)'
                    : 'translateX(-50%) translateY(0) scale(1)',
                  transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
                }}
              >
                <span className="text-[9px] uppercase tracking-[0.4em] font-semibold" style={{ color: meta.color }}>
                  {tier.label} Notes
                </span>
              </div>
            </div>
          </div>

          {/* Right: Active layer description */}
          <div className="text-center lg:text-left order-3 lg:pl-12"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? 'translateX(0)' : 'translateX(30px)',
              transition: 'opacity 0.8s ease 0.4s, transform 0.8s ease 0.4s',
            }}
          >
            <div
              className="transition-all duration-600"
              style={{
                opacity: isAnimating ? 0 : 1,
                transform: isAnimating ? 'translateY(8px)' : 'translateY(0)',
                transition: 'opacity 0.5s cubic-bezier(0.4,0,0.2,1), transform 0.5s cubic-bezier(0.4,0,0.2,1)',
              }}
            >
              <div className="inline-flex items-center gap-2 mb-4">
                <span
                  className="h-px transition-all duration-700"
                  style={{ width: '32px', backgroundColor: meta.color }}
                />
                <span className="text-[9px] uppercase tracking-[0.5em]" style={{ color: meta.color }}>
                  {meta.time}
                </span>
                <span
                  className="h-px transition-all duration-700"
                  style={{ width: '16px', backgroundColor: meta.color, opacity: 0.4 }}
                />
              </div>

              <h3 className="font-serif text-3xl md:text-4xl text-black mb-4">
                {tier.label} Notes
              </h3>

              <p className="text-black text-sm md:text-base leading-[1.9] max-w-sm mx-auto lg:mx-0 mb-8">
                {meta.description}
              </p>

              {/* Note badges with stagger entrance */}
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {tier.items.map((n, i) => (
                  <span
                    key={n}
                    className="text-[10px] uppercase tracking-[0.2em] px-4 py-2 border-2 font-medium"
                    style={{
                      borderColor: meta.color,
                      color: 'black',
                      backgroundColor: `${meta.color}15`,
                      animation: pillsVisible ? `scentPillEnter 0.5s ${i * 100}ms ease-out both` : 'none',
                      opacity: pillsVisible ? undefined : 0,
                    }}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>

            {/* Step indicators with glow */}
            <div className="flex items-center gap-2 mt-8 justify-center lg:justify-start">
              {notes.map((t, i) => {
                const dotMeta = TIER_META[t.label] ?? { color: '#C9A96E' };
                return (
                  <button
                    key={i}
                    onClick={() => handleLayerClick(i)}
                    className="transition-all duration-600"
                    style={{
                      width: i === activeLayer ? '32px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      backgroundColor: i === activeLayer ? dotMeta.color : '#d1d5db',
                      boxShadow: i === activeLayer ? `0 0 10px ${dotMeta.color}60` : 'none',
                      transition: 'all 0.6s cubic-bezier(0.4,0,0.2,1)',
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}
