import React, { useState, useEffect, useCallback } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://www.omdbapi.com/?s=star wars&apikey=57b475c3"
      );
      if (!response.ok) {
        throw new Error("Something went wrong ...");
      }
      const data = await response.json();

      const transformedMovies = data.Search.map((movieData) => ({
        id: movieData.imdbID,
        poster: movieData.Poster,
        title: movieData.Title,
        releaseDate: movieData.Year,
      }));

      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  let content = <p>Found no movies.</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = (
      <div>
        <p>Error fetching movies: {error}</p>
      </div>
    );
  }
  if (loading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
