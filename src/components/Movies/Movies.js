import { React } from 'react';
import './Movies.css'
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies( { 
  onGetAllMovies, 
  allMovies,
  searchedMovies,
  isLoading,
  onShowPreloader,
  onSearchMovie,
  onShortMovieFilter,
  isFilterActive,
  movieArr
 } ) 
  {
    return (
      <>
        <section className="movies">
          <SearchForm 
            onGetAllMovies={onGetAllMovies}
            allMovies={allMovies}
            searchedMovies={searchedMovies}
            onSearchMovie={onSearchMovie}
            onShowPreloader={onShowPreloader}
            onShortMovieFilter={onShortMovieFilter}
            isFilterActive={isFilterActive}
          />
          {isLoading && <Preloader />}
          <div className="movies__line"></div>
          <MoviesCardList 
            movieArr={movieArr}
          />
        </section>
        <Footer />
      </>
    )
};

export default Movies;