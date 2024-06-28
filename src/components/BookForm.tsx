import React, { useRef } from 'react';
import {Book} from '../hooks/bookReducer'
import './bookform.scss'


function BookForm({ onAddBook }: { onAddBook: (book: Book) => void }) {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newBook = {
      id:0,
      title: titleRef.current?.value || '',
      author: authorRef.current?.value || '',
      year: Number(yearRef.current?.value || ''),
    };
    onAddBook(newBook);
    titleRef.current!.value = '';
    authorRef.current!.value = '';
    yearRef.current!.value = '';
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Title" ref={titleRef} required /> 
      <input type="text" placeholder="Author" ref={authorRef} required />
      <input type="text" placeholder="Publication Year" ref={yearRef} required />
      <button className='add' type="submit">Add Book</button>
    </form>
  );
}

export default BookForm;