import React from 'react'
import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies() {
    return (
      <>
        <section className="saved-movies">
          <SearchForm />
          {/* <Preloader /> */}
          <div className="saved-movies__line"></div>
          <MoviesCardList />
          </section>
        <Footer />
      </>
    )
};

export default SavedMovies;