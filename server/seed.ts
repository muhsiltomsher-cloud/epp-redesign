import { storage } from "./storage";

const seedProducts = [
  {
    externalId: "53689",
    name: "Future Bakhoor",
    collection: "Oud & Dakhoon",
    price: 695,
    currency: "AED",
    image: "https://emiratespride.com/wp-content/uploads/2026/01/Future-Bakhoor-scaled-1-300x376.webp",
    hoverImage: "https://emiratespride.com/wp-content/uploads/2026/01/Future-Bakhoor-Lifestyle-scaled-1-300x372.webp",
    description: "Experience the future of bakhoor with this exquisite creation.",
  },
  {
    externalId: "53690",
    name: "Future Traditional Set",
    collection: "Gift Sets",
    price: 1490,
    currency: "AED",
    image: "https://emiratespride.com/wp-content/uploads/2026/01/Mostakbal-scaled-1-300x376.webp",
    hoverImage: "https://emiratespride.com/wp-content/uploads/2026/01/Mostakbal-Lifestyle-scaled-1-300x372.webp",
    description: "A traditional set reimagined for the modern connoisseur.",
  },
  {
    externalId: "51968",
    name: "Midnight Bloom (Burgundy)",
    collection: "Perfume Collection",
    price: 585,
    currency: "AED",
    image: "https://emiratespride.com/wp-content/uploads/2025/09/Burgundy-300x376.webp",
    hoverImage: "https://emiratespride.com/wp-content/uploads/2025/09/MIDNIGHT-BLOOM-300x376.webp",
    description: "A captivating nocturnal floral fragrance.",
  },
  {
    externalId: "50534",
    name: "Midnight Glow Set",
    collection: "Gift Sets",
    price: 870,
    currency: "AED",
    image: "https://emiratespride.com/wp-content/uploads/2025/05/Midnight-glow-set-300x376.webp",
    hoverImage: "https://emiratespride.com/wp-content/uploads/2025/05/Untitled-6-03-300x376.webp",
    description: "The perfect glowing set for special moments.",
  },
  {
    externalId: "53688",
    name: "Future Oud",
    collection: "Oud & Dakhoon",
    price: 795,
    currency: "AED",
    image: "https://emiratespride.com/wp-content/uploads/2026/01/Future-Oud-scaled-1-300x376.webp",
    hoverImage: "https://emiratespride.com/wp-content/uploads/2026/01/Future-Oud-Lifestyle-scaled-1-300x349.webp",
    description: "A revolutionary interpretation of classic oud.",
  },
  {
    externalId: "16476",
    name: "Hidden Leather",
    collection: "Perfume Collection",
    price: 465,
    currency: "AED",
    image: "https://emiratespride.com/wp-content/uploads/2021/03/HIDDEN-LEATHER-01-300x376.webp",
    hoverImage: "https://emiratespride.com/wp-content/uploads/2021/03/Hidden-leather-with-box-300x375.webp",
    description: "A mysterious and elegant leather fragrance.",
  },
  {
    externalId: "1",
    name: "Masters",
    collection: "Perfume Collection",
    price: 650,
    currency: "AED",
    image: "https://emiratespride.com/wp-content/uploads/2024/02/Masters-01-300x376.webp",
    hoverImage: "https://emiratespride.com/wp-content/uploads/2024/02/Masters-02-300x376.webp",
    description: "Masterfully crafted signature blend.",
  },
];

const seedCategories = [
  {
    slug: "oud",
    name: "Oud & Dakhoon",
    count: 15,
    image: "https://emiratespride.com/wp-content/uploads/2024/10/Untitled-1-03-440x700.webp",
  },
  {
    slug: "oil",
    name: "Oil Perfumes",
    count: 4,
    image: "https://emiratespride.com/wp-content/uploads/2024/10/Untitled-1-02-440x700.webp",
  },
  {
    slug: "accessories",
    name: "Accessories for Bakhoor",
    count: 3,
    image: "https://emiratespride.com/wp-content/uploads/2025/07/EP_villa_2840-copy-440x700.webp",
  },
  {
    slug: "collection",
    name: "Perfume Collection",
    count: 40,
    image: "https://emiratespride.com/wp-content/uploads/2024/10/Untitled-1-04-440x700.webp",
  },
  {
    slug: "gifts",
    name: "Perfume Gift Sets",
    count: 8,
    image: "https://emiratespride.com/wp-content/uploads/2025/07/EP281124_40944-copy-440x700.webp",
  },
];

export async function seed() {
  console.log("Seeding database...");
  await storage.seedProducts(seedProducts);
  await storage.seedCategories(seedCategories);
  console.log("Seeding complete.");
}
