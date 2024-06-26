import { useCallback, useState, useRef } from 'react';
import { Book } from '../hooks/bookReducer';
import './BookList.scss';

function BookList({ books, onDeleteBook, onUpdateBook }: { books: Book[]; onDeleteBook: (id: number) => void; onUpdateBook: (book: Book) => void }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const booksPerPage = 5;

  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleNext = useCallback(() => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(books.length / booksPerPage)));
  }, [books.length]);

  const handlePrevious = useCallback(() => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }, []);

  const handleEdit = (index: number) => {
    setEditIndex(index);
  };

  const handleSave = (book: Book) => {
    const updatedBook = {
      ...book,
      title: titleRef.current?.value || book.title,
      author: authorRef.current?.value || book.author,
      year: yearRef.current?.value || book.year
    };
    onUpdateBook(updatedBook);
    setEditIndex(null);
  };

  const handleDelete = (id: number) => {
    onDeleteBook(id);
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
          {selectedBooks.map((book, index) => (
            <tr key={book.id}>
              <td>
                {editIndex === index ? (
                  <input type="text" defaultValue={book.title} ref={titleRef} />
                ) : (
                  book.title
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input type="text" defaultValue={book.author} ref={authorRef} />
                ) : (
                  book.author
                )}
              </td>
              <td>
                {editIndex === index ? (
                  <input type="text" defaultValue={book.year} ref={yearRef} />
                ) : (
                  book.year
                )}
              </td>
              <td className="btns">
                {editIndex === index ? (
                  <button onClick={() => handleSave(book)}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEdit(index)}>Edit</button>
                    <button onClick={() => handleDelete(book.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="btns2">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNext} disabled={currentPage === Math.ceil(books.length / booksPerPage)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default BookList;
