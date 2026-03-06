import { eq } from "drizzle-orm";
import { db } from "./db";
import { products, categories, type Product, type Category, type InsertProduct, type InsertCategory } from "@shared/schema";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProduct(externalId: string): Promise<Product | undefined>;
  getProductsByCollection(collection: string): Promise<Product[]>;
  getCategories(): Promise<Category[]>;
  getCategory(slug: string): Promise<Category | undefined>;
  seedProducts(items: InsertProduct[]): Promise<void>;
  seedCategories(items: InsertCategory[]): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getProducts(): Promise<Product[]> {
    return db.select().from(products);
  }

  async getProduct(externalId: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.externalId, externalId));
    return product;
  }

  async getProductsByCollection(collection: string): Promise<Product[]> {
    return db.select().from(products).where(eq(products.collection, collection));
  }

  async getCategories(): Promise<Category[]> {
    return db.select().from(categories);
  }

  async getCategory(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category;
  }

  async seedProducts(items: InsertProduct[]): Promise<void> {
    for (const item of items) {
      const existing = await this.getProduct(item.externalId);
      if (!existing) {
        await db.insert(products).values(item);
      }
    }
  }

  async seedCategories(items: InsertCategory[]): Promise<void> {
    for (const item of items) {
      const existing = await this.getCategory(item.slug);
      if (!existing) {
        await db.insert(categories).values(item);
      }
    }
  }
}

export const storage = new DatabaseStorage();
