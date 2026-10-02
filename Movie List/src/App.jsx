import Cart from "./Cart";
import Modal from "./Modal";
import { useState } from "react";
import useFetch  from "./useFetch";

export default function App() {
  const [show, setShow] = useState(false);
  const [movies, setMovies] = useState([]);

  let url = "http://localhost:3000/movies";
  
  useFetch({url, setMovies});

  function handleAddMovie(movieTitle, movieYear, movieDescription) {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: movieTitle,
        year: movieYear,
        description: movieDescription,
      }),
    })
      .then((response) => response.json())
      .then((newMovie) => {
        setMovies([...movies, newMovie]);
        setShow(false);
      });
  }

  function handleCancelMovie() {
    setShow(false);
  }

  return (
    <div className="text-center mt-12">
      <h1 className="text-3xl font-bold mb-4">My Movie List</h1>
      {movies.map((movie, index) => (
        <Cart key={index} movie={movie} />
      ))}
      {show && (
        <Modal
          onHandleAddMovie={handleAddMovie}
          onHandleCancelMovie={handleCancelMovie}
        />
      )}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-5 cursor-pointer"
        onClick={() => setShow(!show)}
      >
        Add Movie
      </button>
    </div>
  );
}
