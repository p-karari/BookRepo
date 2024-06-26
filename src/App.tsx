import { useEffect, useState } from 'react';
import useLocalStorage from '../src/hooks/useLocalStorage';
import BookForm from '../src/components/BookForm';
import BookList from '../src/components/bookList';
import { Book } from '../src/hooks/bookReducer';
import './App.scss';
function App() {
  const [books, setBooks] = useLocalStorage<Book[]>('books', []);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, books]);

  const handleAddBook = (book: Book) => {
    setBooks([...books, book]);
  };

  const handleUpdateBook = (book: Book) => {
    const updatedBooks = books.map((b) => (b.id === book.id ? book : b));
    setBooks(updatedBooks);
  };

  const handleDeleteBook = (id: number) => {
    const updatedBooks = books.filter((b) => b.id !== id);
    setBooks(updatedBooks);
  };

  return (
    <div className="app">
      <h1>Book Repository</h1>
      <span className="search-container">
        <input
          type="text"
          placeholder="Search by title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={() => setFilteredBooks(
          books.filter((book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )}>Search</button>
      </span>
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

