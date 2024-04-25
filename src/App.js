import React, { useState, useEffect } from "react";
import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [retrying, setRetrying] = useState(false);

  const fetchMoviesHandler = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong ... Retrying");
      }
      const data = await response.json();

      const transformedMovies = data.results.map((movieData) => ({
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      }));

      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
      setRetrying(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let retryTimer;
    if (retrying) {
      retryTimer = setInterval(() => {
        fetchMoviesHandler();
      }, 5000);
    }
    return () => clearInterval(retryTimer);
  }, [retrying]);

  const cancelRetryHandler = () => {
    setRetrying(false);
  };

  let content = <p>Found no movies.</p>;
  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }
  if (error) {
    content = (
      <div>
        <p>Error fetching movies: {error}</p>
        <button onClick={cancelRetryHandler}>Cancel</button>
      </div>
    );
  }
  if (loading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler} disabled={retrying}>
          Fetch Movies
        </button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
