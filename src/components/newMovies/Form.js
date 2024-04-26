import React, { useState } from "react";
import classes from './Form.module.css';

const Form = (props) => {
  const [newTitle, setNewTitle] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newReleseDate, setNewReleseDate] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const newMovie = {
      title: newTitle,
      poster: newUrl,
      releaseDate: newReleseDate,
    };
    props.onSaveMovieData(newMovie);
  };
  return (
    <form onSubmit={handleFormSubmit} className={classes.form}>
      <div className={classes.form_data}>
        <label>Title</label>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
      </div>
      <div className={classes.form_data}>
        <label>Poster URL</label>
        <input
          type="url"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
      </div>
      <div className={classes.form_data}>
        <label>Released Year</label>
        <input
          type="text"
          value={newReleseDate}
          onChange={(e) => setNewReleseDate(e.target.value)}
        />
      </div>
      <div>
        <button type="button" onClick={props.onCancel}>Cancel</button>
        <button type="submit">Add Movie</button>
      </div>
    </form>
  );
};

export default Form;
