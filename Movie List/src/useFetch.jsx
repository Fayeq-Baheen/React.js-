import { useEffect } from "react";

export default function useFetch({url, setMovies}) {

  useEffect(() => {
    const fetchMovies = async (url) => {
      const response = await fetch(url);
      const data = await response.json();
      setMovies(data);
    };

    fetchMovies(url);
  }, [url, setMovies]);

}
