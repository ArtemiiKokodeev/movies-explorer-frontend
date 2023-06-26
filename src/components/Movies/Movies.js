import { React } from 'react';
import './Movies.css'
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MovieNotFound from '../MovieNotFound/MovieNotFound';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies( { 
  isLoading,
  isMoviesLoadingError,
  onSearchMovie,
  searchedMovieName,
  onShortMovieFilter,
  isFilterActive,
  isFound,
  isElseButtonShown,
  onShowMoreMovies,
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
            onSearchMovie={onSearchMovie}
            searchedMovieName={searchedMovieName}
            onShortMovieFilter={onShortMovieFilter}
            isFilterActive={isFilterActive}
          />
          {isLoading ? <Preloader /> 
            : isMoviesLoadingError ? 
              <MovieNotFound text="Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз" />
                : !isFound ? <MovieNotFound text="Не найдено" /> : ""}
          <div className="movies__line"></div>
          <MoviesCardList 
            movieArr={movieArr}
            isElseButtonShown={isElseButtonShown}
            onShowMoreMovies={onShowMoreMovies}
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