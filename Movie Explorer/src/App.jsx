import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { useState } from "react";
import "./index.css";

const movies = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    rating: 8.8,
  },
  {
    id: 2,
    title: "Interstellar",
    year: 2014,
    rating: 8.7,
  },
  {
    id: 3,
    title: "Avatar",
    year: 2009,
    rating: 7.8,
  },
];

function Header({ favorites }) {
  return (
    <nav>
      <Link to="/movies">Movies</Link>
      <Link to="/favorites">
        Favorites ({favorites.length})
      </Link>
    </nav>
  );
}

function Movies() {
  return (
    <div className="page">
      <h1>Movies</h1>

      {movies.map((movie) => (
        <div className="card" key={movie.id}>
          <h2>{movie.title}</h2>
          <p>{movie.year}</p>
          <p>⭐ {movie.rating}</p>

          <Link to={`/movies/${movie.id}`}>
            Details
          </Link>
        </div>
      ))}
    </div>
  );
}

function MovieDetails({ onFavorite }) {
  const { id } = useParams();

  const movie = movies.find(
    (movie) => movie.id === Number(id)
  );

  return (
    <div className="page">
      <h1>{movie.title}</h1>
      <p>Year: {movie.year}</p>
      <p>Rating: ⭐ {movie.rating}</p>

      <button onClick={() => onFavorite(movie)}>
        ❤️ Add to Favorites
      </button>
    </div>
  );
}

function Favorites({ favorites }) {
  return (
    <div className="page">
      <h1>Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorites yet.</p>
      ) : (
        favorites.map((movie) => (
          <div className="card" key={movie.id}>
            {movie.title}
          </div>
        ))
      )}
    </div>
  );
}

export default function App() {
  const [favorites, setFavorites] = useState([]);

  function handleFavorite(movie) {
    if (!favorites.some((item) => item.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  }

  return (
    <BrowserRouter>
      <Header favorites={favorites} />

      <Routes>
        <Route path="/movies" element={<Movies />} />

        <Route
          path="/movies/:id"
          element={
            <MovieDetails
              onFavorite={handleFavorite}
            />
          }
        />

        <Route
          path="/favorites"
          element={
            <Favorites favorites={favorites} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}