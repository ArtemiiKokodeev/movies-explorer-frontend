import React from 'react'
import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import MovieNotFound from '../MovieNotFound/MovieNotFound';

function SavedMovies( { 
  movieArr,
  onSearchSavedMovie,
  searchedSavedMovieName,
  onShortSavedMoviesFilter,
  isFilterSavedMoviesActive,
  isSavedMovieFound,
  onSaveMovie,
  savedMovies,
  onRemoveSavedMovie
 } ) {

  return (
    <>
      <section className="saved-movies">
        <SearchForm
          onSearchMovie={onSearchSavedMovie}
          searchedMovieName={searchedSavedMovieName}
          onShortMovieFilter={onShortSavedMoviesFilter}
          isFilterActive={isFilterSavedMoviesActive}
        />
        {!isSavedMovieFound && <MovieNotFound text="Не найдено" />}
        <div className="saved-movies__line"></div>
        <MoviesCardList 
          movieArr={movieArr}
          onSaveMovie={onSaveMovie}
          savedMovies={savedMovies}
          onRemoveSavedMovie={onRemoveSavedMovie}
          movieIdKind="movieId"
          movieImageKind="movie.image"
        />
      </section>
      <Footer />
    </>
  )
};

export default SavedMovies;