import React from 'react'
import './MoviesCardList.css'
import moviesSampleList from '../../utils/constants';
import MovieCard from '../MoviesCard/MoviesCard';

function MovieCardList() {

    return (
      <div className="movies-cards">
        <ul className="movies-cards__list">
          {moviesSampleList.map((movie) => (
            <MovieCard key={movie._id} 
              movie={movie} 
            />
          ))} 
        </ul> 
        <div className="movies__button-container">
          <button className="movies__items-loading-button" type="button" name="submitButton">Ещё</button>
        </div>
      </div>
    )
};

export default MovieCardList;