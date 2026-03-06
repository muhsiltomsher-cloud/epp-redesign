# Emirates Pride Luxury E-Commerce

## Overview
A luxury e-commerce website for Emirates Pride perfumes, redesigned with an ultra-minimalist editorial aesthetic inspired by Creed Boutique. Built with React + TypeScript + Tailwind CSS + GSAP animations.

## Architecture
- **Frontend**: React + Vite + Tailwind CSS + Wouter (routing) + TanStack Query (data fetching) + GSAP (animations)
- **Backend**: Express.js + Drizzle ORM + PostgreSQL (Neon serverless)
- **Data**: Products and categories stored in PostgreSQL, served via REST API

## Key Files
- `shared/schema.ts` — Drizzle schema for products and categories tables
- `server/db.ts` — Database connection (Neon serverless)
- `server/storage.ts` — Storage interface with DatabaseStorage implementation
- `server/seed.ts` — Seeds database with Emirates Pride product data
- `server/routes.ts` — API routes (`/api/products`, `/api/categories`)
- `client/src/pages/Home.tsx` — Homepage with GSAP animations (parallax, pinned scroll, gallery reveal)
- `client/src/pages/Collection.tsx` — Filterable product grid
- `client/src/pages/Product.tsx` — Product detail with pinned image column
- `client/src/components/layout/Navbar.tsx` — Transparent/white header with currency/language selector
- `client/src/components/layout/Footer.tsx` — Dark footer with newsletter signup

## API Endpoints
- `GET /api/products` — All products
- `GET /api/products/:id` — Single product by externalId
- `GET /api/categories` — All categories

## Design System
- **Colors**: Pure black/white palette
- **Fonts**: Cormorant Garamond (serif), Montserrat (sans), Cairo/Tajawal (Arabic)
- **Style**: Sharp corners (radius 0), ultra-wide letter-spacing, uppercase labels
- **Images**: Real Emirates Pride CDN URLs, `mix-blend-multiply` on product images

## Database
- PostgreSQL via Neon serverless driver
- Tables: `products` (externalId, name, collection, price, currency, image, hoverImage, description), `categories` (slug, name, count, image)
- Auto-seeded on server startup
