import React from 'react'
import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies( { 
  isLoading,
  onShowPreloader,
  movieArr,
  onSaveMovie,
  savedMovies,
  onRemoveSavedMovie
 } ) {

  return (
    <>
      <section className="saved-movies">
        <SearchForm 
          onShowPreloader={onShowPreloader}
          // onShortMovieFilter={onShortMovieFilter}
          // isFilterActive={isFilterActive}
        />
        {isLoading && <Preloader />}
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