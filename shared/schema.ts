import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, serial } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  externalId: varchar("external_id", { length: 50 }).notNull().unique(),
  name: text("name").notNull(),
  collection: text("collection").notNull(),
  price: integer("price").notNull(),
  currency: varchar("currency", { length: 10 }).notNull().default("AED"),
  image: text("image").notNull(),
  hoverImage: text("hover_image").notNull(),
  description: text("description").notNull(),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  name: text("name").notNull(),
  count: integer("count").notNull().default(0),
  image: text("image").notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type Product = typeof products.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;
