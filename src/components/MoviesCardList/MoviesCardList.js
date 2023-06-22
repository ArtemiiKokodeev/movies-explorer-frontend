import React from 'react'
import './MoviesCardList.css'
// import { moviesSampleList } from '../../utils/constants';
import MovieCard from '../MoviesCard/MoviesCard';

function MovieCardList( { 
  movieArr, 
  onSaveMovie, 
  savedMovies,
  onRemoveSavedMovie,
  movieIdKind, 
  movieImageKind
} ) {
    return (
      <div className="movies-cards">
        <ul className="movies-cards__list">
          {movieArr.map((movie) => (
            <MovieCard key={movieIdKind === "movieId" ? movie.movieId : movie.id}
              movie={movie}
              onSaveMovie={onSaveMovie}
              savedMovies={savedMovies}
              onRemoveSavedMovie={onRemoveSavedMovie}
              movieIdKind={movieIdKind}
              movieImageKind={movieImageKind}
            />
          ))} 
        </ul> 
        <div className="movies-cards__button-container">
          <button className="movies-cards__items-loading-button" type="button" name="submitButton">Ещё</button>
        </div>
      </div>
    )
};

export default MovieCardList;