import { useEffect, useState } from 'react';
import useLocalStorage from '../src/hooks/useLocalStorage';
import BookForm from '../src/components/BookForm';
import BookList from '../src/components/bookList';
import axios from 'axios';
import { Book } from '../src/hooks/bookReducer';
import './App.scss';

function App() {
  const [books, setBooks] = useLocalStorage<Book[]>('books', []);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchBookApi = async () => {
    try {
      const {data} = await axios.get('http://localhost:8000/books');
      console.log(data);
      if (Array.isArray(data)) {
        setBooks(data);
      } else {
        console.error('API response is not an array:', data);
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBookApi();
  }, []);

  useEffect(() => {
    setFilteredBooks(
      books.filter((book) =>
        book.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, books]);

  const handleAddBook = async (book: Book) => {
    try {
      const maxId = books.reduce((max, b) => (b.id > max ? b.id : max), 0);
      const newBook = { ...book, id: maxId + 1 };
      console.log('Adding book:', newBook); 
      const response = await axios.post('http://localhost:8000/books', newBook);
      console.log('Response from API:', response.data);
      setBooks([...books, response.data]);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleUpdateBook = async (book: Book) => {
    try {
      const response = await axios.put(`http://localhost:8000/books/${book.id}`, book);
      const updatedBooks = books.map((b) => (b.id === book.id ? response.data : b));
      setBooks(updatedBooks);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDeleteBook = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/books/${id}`);
      const updatedBooks = books.filter((b) => b.id !== id);
      setBooks(updatedBooks);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
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
