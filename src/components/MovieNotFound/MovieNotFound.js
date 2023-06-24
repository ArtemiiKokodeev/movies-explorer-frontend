import { React } from 'react';
import './MovieNotFound.css';

function MovieNotFound( { text } ) {

  return (
    <p className="movie-notfound">{text}</p>
  )
}

export default MovieNotFound;
