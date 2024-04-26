import React, { useState } from 'react'
import Form from './Form';

const NewMovies = (props) => {

    const [isEditing, setIsEditing] = useState(false);

    const onSaveMovieData = (movieDetail) => {
        const newMovie = { ...movieDetail, id: Math.random().toString() }
        props.addMoviesHandler(newMovie);
        setIsEditing(false);
    }

    const startEditingHandler = () => {
        setIsEditing(true)
    }
    const stopEditingHandler = () => {
        setIsEditing(false)
    }

  return (
    <div>
          {!isEditing && <button type='submit' onClick={startEditingHandler}>Add Movies</button>}
          {isEditing && <Form onSaveMovieData={onSaveMovieData} onCancel={stopEditingHandler}/>}
    </div>
  )
}

export default NewMovies
