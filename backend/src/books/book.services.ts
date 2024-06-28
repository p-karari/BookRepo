import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { BooksTable, TSBook, TIBook } from "../drizzle/schema";

export class BookService {
  async getAllBooks(): Promise<TSBook[]> {
    return await db.query.BooksTable.findMany();
  }

  async getBookById(id: number): Promise<TIBook | undefined> {
    const book = await db.query.BooksTable.findFirst({ where: eq(BooksTable.id, id) });
    return book;
  }

  async createBook(book: TIBook): Promise<TIBook> {
    const [newBook] = await db.insert(BooksTable).values(book).returning();
    return newBook;
  }

  async updateBook(id: number, bookData: Partial<TIBook>): Promise<TIBook | null> {
    const [updatedBook] = await db.update(BooksTable)
      .set(bookData)
      .where(eq(BooksTable.id, id))
      .returning();
    return updatedBook;
  }

  async deleteBook(id: number) {
    await db.delete(BooksTable).where(eq(BooksTable.id, id));
    return "Book deleted successfully";
  }
}
