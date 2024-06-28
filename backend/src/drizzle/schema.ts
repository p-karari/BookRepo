// src/drizzle/schema.ts
import { pgTable, serial, text, varchar, integer } from 'drizzle-orm/pg-core';


export const BooksTable = pgTable('books', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  author: varchar('author', { length: 255 }).notNull(),
  year: integer('year').notNull(),
});

export type TIBook = typeof BooksTable.$inferInsert;
export type TSBook = typeof BooksTable.$inferSelect;

