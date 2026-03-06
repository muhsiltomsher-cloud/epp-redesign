# Emirates Pride Luxury E-Commerce

## Overview
A luxury e-commerce website for Emirates Pride perfumes, redesigned with an ultra-minimalist editorial aesthetic inspired by Creed Boutique. Built as a frontend-only static site with React + TypeScript + Tailwind CSS + GSAP animations.

## Architecture
- **Frontend-only**: React + Vite + Tailwind CSS + Wouter (routing) + TanStack Query + GSAP (animations)
- **Backend**: Express.js serves the Vite dev server (no API routes used)
- **Data**: All products/categories hardcoded in `client/src/lib/data.ts` (16 products, 5 categories)

## Key Files
- `client/src/lib/data.ts` — All static product and category data with real CDN image URLs
- `client/src/pages/Home.tsx` — Homepage with GSAP animations (parallax, pinned scroll, gallery reveal)
- `client/src/pages/Collection.tsx` — Filterable product grid with category tabs
- `client/src/pages/Product.tsx` — Product detail with fixed details column (right) and scrollable image (left), related products section
- `client/src/components/layout/Navbar.tsx` — Transparent/white header with mega menu, currency/language selector, mobile bottom nav bar, cart drawer
- `client/src/components/layout/Footer.tsx` — Dark footer with newsletter signup, 2-col mobile grid
- `client/src/index.css` — CSS variables, creed-button, hide-scrollbar, safe-area-bottom utilities

## Design System
- **Colors**: Gold `#c9a96e`, Dark brown `#1a1308`, pure black/white palette
- **Fonts**: Cormorant Garamond (serif), Montserrat (sans), Cairo/Tajawal (Arabic)
- **Style**: Sharp corners (radius 0), ultra-wide letter-spacing, uppercase labels
- **Images**: Real Emirates Pride CDN URLs, `mix-blend-multiply` on product images
- **Responsive padding**: `px-4 md:px-10 lg:px-20 xl:px-28`

## Mobile Features
- Full-height hero (`100svh`) with mobile-only text overlay
- Horizontal snap-scroll gallery carousel on mobile
- Compact navbar (52px) with full-screen mobile menu
- Persistent bottom navigation bar (Home, Shop, Search, Wishlist, Account)
- Sticky Add to Cart bar on product pages
- Horizontal category filter chips on collection page

## Desktop Features
- Desktop mega menu with subcategories and featured product previews
- Staggered 3-column gallery grid
- Hover effects on product cards with Quick View slide-up
- GSAP parallax and scroll-triggered animations
