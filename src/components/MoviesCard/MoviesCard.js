import { React, useState } from 'react';
import './MoviesCard.css'

function MoviesCard( { movie } ) {

  const [isSavedMovie, setIsSavedMovie] = useState(false);

  function handleSaveMovie() {
    setIsSavedMovie(!isSavedMovie);
  }

    return (
      <li className="movie">
        <div className="movie__container">
          <div className="movie__info-container">
            <h3 className="movie__title">{movie.nameRU}</h3>
            <p className="movie__duration">{movie.duration}</p>
          </div>
          <button className={`movie__save-icon ${isSavedMovie && "movie__save-icon_saved"}`} 
            type="button" onClick={handleSaveMovie} />
        </div>
        <img className="movie__image" 
          src={`https://api.nomoreparties.co${movie.image.url}`}
          alt={movie.nameRU} />
      </li>
    )
};

export default MoviesCard;