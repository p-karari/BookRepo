import { Context } from "hono";
import { BookService } from "./book.services";

const bookService = new BookService();

export class BookController {
  static async getAllBooks(c: Context) {
    const books = await bookService.getAllBooks();
    return c.json(books, 200);
  }

  static async getBookById(c: Context) {
    const id = Number(c.req.param("id"));
    const book = await bookService.getBookById(id);
    if (book) {
      return c.json(book, 200);
    } else {
      return c.json({ message: "Book not found" }, 404);
    }
  }

  static async createBook(c: Context) {
    const book = await c.req.json();
    if (!book) {
      return c.text("Invalid request", 400);
    } else {
      const newBook = await bookService.createBook(book);
      return c.json(newBook, 201);
    }
  }

  static async updateBook(c: Context) {
    const id = Number(c.req.param("id"));
    const bookData = await c.req.json();
    const updatedBook = await bookService.updateBook(id, bookData);
    if (updatedBook) {
      return c.json(updatedBook, 200);
    } else {
      return c.text("Book not found", 404);
    }
  }

  static async deleteBook(c: Context) {
    const id = Number(c.req.param("id"));
    try {
      await bookService.deleteBook(id);
      return c.text("Book deleted successfully", 200);
    } catch (error) {
      console.error("Error deleting book: ", error);
      return c.text("Failed to delete book", 500);
    }
  }
}
