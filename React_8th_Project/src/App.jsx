import { useState } from "react";
import "./index.css";

const movies = [
  { id: 1, title: "Inception", rating: 8 },
  { id: 2, title: "Interstellar", rating: 9 },
  { id: 3, title: "Avatar", rating: 7 },
];

function MovieCard({
  movie,
  onIncrease,
  onDecrease,
}) {
  return (
    <div className="movie-card">
      <div>
        <h2>{movie.title}</h2>

        <p>⭐ {movie.rating} / 10</p>
      </div>

      <div className="buttons">
        <button onClick={() => onDecrease(movie.id)}>
          −
        </button>

        <button onClick={() => onIncrease(movie.id)}>
          +
        </button>
      </div>
    </div>
  );
}

function MovieList({
  movies,
  onIncrease,
  onDecrease,
}) {
  return (
    <div className="movie-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      ))}
    </div>
  );
}

export default function App() {
  const [items, setItems] = useState(movies);

  function handleIncrease(id) {
    setItems(
      items.map((movie) =>
        movie.id === id && movie.rating < 10
          ? {
              ...movie,
              rating: movie.rating + 1,
            }
          : movie
      )
    );
  }

  function handleDecrease(id) {
    setItems(
      items.map((movie) =>
        movie.id === id && movie.rating > 0
          ? {
              ...movie,
              rating: movie.rating - 1,
            }
          : movie
      )
    );
  }

  return (
    <div className="container">
      <h1>Movie Ratings</h1>

      <MovieList
        movies={items}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
      />
    </div>
  );
}