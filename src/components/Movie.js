import React from "react";

import classes from "./Movie.module.css";

const Movie = (props) => {
  return (
    <li className={classes.movie}>
      <img src={props.poster} alt={props.title} />
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
    </li>
  );
};

export default Movie;
