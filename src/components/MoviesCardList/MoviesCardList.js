import React from 'react'
import './MoviesCardList.css'
// import { moviesSampleList } from '../../utils/constants';
import MovieCard from '../MoviesCard/MoviesCard';

function MovieCardList( { movieArr } ) {
    return (
      <div className="movies-cards">
        <ul className="movies-cards__list">
          {movieArr.map((movie) => (
            <MovieCard key={movie.id}
              movie={movie} 
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