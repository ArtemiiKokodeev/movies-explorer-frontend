import { React } from 'react';
import './Movies.css'
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies( { 
  onGetAllMovies, 
  allMovies,
  isLoading,
  onShowPreloader,
  onSearchMovie,
  onShortMovieFilter,
  isFilterActive,
  onSaveMovie,
  savedMovies,
  onRemoveSavedMovie,
  movieArr
 } ) 
  {
    return (
      <>
        <section className="movies">
          <SearchForm 
            onGetAllMovies={onGetAllMovies}
            allMovies={allMovies}
            onSearchMovie={onSearchMovie}
            onShowPreloader={onShowPreloader}
            onShortMovieFilter={onShortMovieFilter}
            isFilterActive={isFilterActive}
          />
          {isLoading && <Preloader />}
          <div className="movies__line"></div>
          <MoviesCardList 
            movieArr={movieArr}
            onSaveMovie={onSaveMovie}
            savedMovies={savedMovies}
            onRemoveSavedMovie={onRemoveSavedMovie}
            movieIdKind="id"
          />
        </section>
        <Footer />
      </>
    )
};

export default Movies;