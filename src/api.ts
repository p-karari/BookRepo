import axios from 'axios';

// Define API endpoint base URL (replace with your actual backend URL)
const API_URL = 'http://localhost:8000';  // Replace with your backend URL

// Interface for a Book object
interface Book {
  id: number;
  title: string;
  author: string; // Example additional properties
  genre: string;
  publishedDate: Date;
  // ... other book properties (add as needed)
}

// Function to fetch all books
export async function fetchBooks(): Promise<Book[]> {
  try {
    const response = await axios.get(`${API_URL}/books`);
    return response.data as Book[]; // Type assertion (optional)
  } catch (error) {
    throw new Error('Failed to fetch books');
  }
}

// Function to add a new book
export async function addBook(book: Book): Promise<Book> {
  try {
    const response = await axios.post(`${API_URL}/books`, book);
    return response.data as Book; // Type assertion (optional)
  } catch (error) {
    throw new Error('Failed to add book');
  }
}

// Function to update an existing book
export async function updateBook(bookId: number, updatedBook: Partial<Book>): Promise<Book> {
  try {
    const response = await axios.put(`${API_URL}/books/${bookId}`, updatedBook);
    return response.data as Book; // Type assertion (optional)
  } catch (error) {
    throw new Error('Failed to update book');
  }
}

// Function to delete a book by ID
export async function deleteBook(bookId: number): Promise<void> {
  try {
    await axios.delete(`${API_URL}/books/${bookId}`);
  } catch (error) {
    throw new Error('Failed to delete book');
  }
}
