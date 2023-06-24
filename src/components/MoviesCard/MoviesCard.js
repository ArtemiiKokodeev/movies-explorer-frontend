import { React } from 'react';
import './MoviesCard.css'

function MoviesCard( { 
  movie,
  onSaveMovie, 
  savedMovies,
  onRemoveSavedMovie,
  movieIdKind, 
  movieImageKind
} ) {

  function handleSaveMovie() {
    !isSaved ? onSaveMovie(movie) 
    : movie._id ? onRemoveSavedMovie(movie)
    : onRemoveSavedMovie(movieIdOfSearchedMovie)
  }

  const idKind = movieIdKind === "movieId" ? movie.movieId : movie.id; // формат id из allMovies или savedMovies
  const isSaved = savedMovies.some(i => i.movieId === idKind); // сохранен ли фильм
  const movieSaveButtonClassName = (`movie__save-icon ${isSaved && "movie__save-icon_saved"}`); // смена иконки сохранения
  const movieIdOfSearchedMovie = savedMovies.find(i => i.movieId === movie.id) // найти фильм для удаления из сохранненных на странице /movies

  return (
    <li className="movie">
      <div className="movie__container">
        <div className="movie__info-container">
          <h3 className="movie__title">{movie.nameRU}</h3>
          <p className="movie__duration">{movie.duration}</p>
        </div>
        <button className={movieImageKind === "movie.image" ? "movie__delete-icon" :movieSaveButtonClassName} 
          type="button" onClick={handleSaveMovie} />
      </div>
      <a href={movie.trailerLink} className="movie__trailer-link" target="_blank" rel="noopener noreferrer">
        <img className="movie__image" 
          src={movieImageKind === "movie.image" ? movie.image : `https://api.nomoreparties.co${movie.image.url}`}
          alt={movie.nameRU} 
        />
      </a>
    </li>
  )
};

export default MoviesCard;