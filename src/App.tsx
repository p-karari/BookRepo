import{ useReducer, useEffect, useState } from 'react';
import useLocalStorage from '../src/hooks/useLocalStorage';
import BookForm from '../src/components/BookForm';
import BookList from '../src/components/bookList';
import {Book, bookReducer} from '../src/hooks/bookReducer'

function App() {
  const [books, setBooks] = useLocalStorage<Book[]>('books', []);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [state, dispatch] = useReducer(bookReducer, books);

  useEffect(() => {
    setBooks(state);
    setFilteredBooks(state);
  }, [state, setBooks]);

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, books]);

  const handleAddBook = (book: Book) => {
    dispatch({ type: 'add', book });
  };

  const handleUpdateBook = (book: Book) => {
    dispatch({ type: 'update', book });
  };

  const handleDeleteBook = (id: number) => {
    dispatch({ type: 'delete', id });
  };

  return (
    <div>
      <h1>Book Repository</h1>
      <input
        type="text"
        placeholder="Search by title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <BookForm onAddBook={handleAddBook} />
      <BookList
        books={filteredBooks}
        onDeleteBook={handleDeleteBook}
        onUpdateBook={handleUpdateBook}
      />
    </div>
  );
}

export default App;