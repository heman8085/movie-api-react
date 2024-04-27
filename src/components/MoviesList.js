import React from "react";
import Movie from "./Movie";
import classes from "./MoviesList.module.css";

const MovieList = (props) => {

    const handleDelete = async (id) => {
      try {
        await fetch(
          `https://react-https-f2a6c-default-rtdb.firebaseio.com/movies/${id}.json`,
          {
            method: "DELETE",
          }
        );
          props.setMovies((prevMovies) =>
              prevMovies.filter((movie) => movie.id !== id)
          );
          
      } catch (error) {
        console.error(error);
      }
    };


  return (
    <ul className={classes["movies-list"]}>
      {props.movies.map((movie) => (
        <div>
          <Movie
            key={movie.id}
            poster={movie.poster}
            title={movie.title}
            releaseDate={movie.releaseDate}
          />
          <div>
            <button onClick={() => handleDelete(movie.id)}>Delete</button>
          </div>
        </div>
      ))}
    </ul>
  );
};

export default MovieList;
