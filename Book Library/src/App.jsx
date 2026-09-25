import { useState } from "react";
import "./index.css";

const initialBooks = [
  {
    id: 1,
    title: "Clean Code",
    author: "Robert Martin",
    read: false,
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    read: true,
  },
  {
    id: 3,
    title: "The Pragmatic Programmer",
    author: "David Thomas",
    read: false,
  },
];

function BookCard({ book, onToggle }) {
  return (
    <div className="card">
      <div>
        <h2>{book.title}</h2>
        <p>{book.author}</p>

        <span className={book.read ? "read" : "not-read"}>
          {book.read ? "✓ Read" : "✕ Not Read"}
        </span>
      </div>

      <button onClick={() => onToggle(book.id)}>
        {book.read ? "Mark as Unread" : "Mark as Read"}
      </button>
    </div>
  );
}

function BookList({ books, onToggle }) {
  return (
    <div className="list">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [books, setBooks] = useState(initialBooks);

  function handleToggle(id) {
    setBooks(
      books.map((book) =>
        book.id === id
          ? { ...book, read: !book.read }
          : book
      )
    );
  }

  const readCount = books.filter((book) => book.read).length;

  return (
    <div className="container">
      <h1>My Library</h1>

      <BookList
        books={books}
        onToggle={handleToggle}
      />

      <h3>
        Read: {readCount} / {books.length}
      </h3>
    </div>
  );
}