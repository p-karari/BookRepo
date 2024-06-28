import { Hono } from "hono";
import { BookController } from "./book.controller";

const bookRouter = new Hono();

bookRouter.get("/books", BookController.getAllBooks);
bookRouter.get("/books/:id", BookController.getBookById);
bookRouter.post("/books", BookController.createBook);
bookRouter.put("/books/:id", BookController.updateBook);
bookRouter.delete("/books/:id", BookController.deleteBook);

export default bookRouter
