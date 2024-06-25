import { useCallback, useState } from 'react';
import {Book} from '../hooks/bookReducer';
import './booklist.scss'


function BookList({ books, onDeleteBook, onUpdateBook }: { books: Book[], onDeleteBook: (id: number) => void, onUpdateBook: (book: Book) => void }) {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  const handleNext = useCallback(() => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(books.length / booksPerPage)));
  }, [books.length]);

  const handlePrevious = useCallback(() => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }, []);

  const handleDelete = (id: number) => {
    onDeleteBook(id);
  };

  const handleUpdate = (book: Book) => {
    onUpdateBook(book);
  };

  const startIndex = (currentPage - 1) * booksPerPage;
  const selectedBooks = books.slice(startIndex, startIndex + booksPerPage);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {selectedBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.year}</td>
              <td>
                <button onClick={() => handleUpdate(book)}>Edit</button>
                <button onClick={() => handleDelete(book.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
        <button onClick={handleNext} disabled={currentPage === Math.ceil(books.length / booksPerPage)}>Next</button>
      </div>
    </div>
  );
}

export default BookList;
