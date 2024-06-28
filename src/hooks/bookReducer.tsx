export type Book = {
  id: number;
  title: string;
  author: string;
  year: number;
};

type Action =
  | { type: 'add'; book: Book }
  | { type: 'update'; book: Book }
  | { type: 'delete'; id: number };

export function bookReducer(state: Book[], action: Action): Book[] {
  switch (action.type) {
    case 'add':
      return [...state, action.book];
    case 'update':
      return state.map((book) => (book.id === action.book.id ? action.book : book));
    case 'delete':
      return state.filter((book) => book.id !== action.id);
    default:
      return state;
  }
}
