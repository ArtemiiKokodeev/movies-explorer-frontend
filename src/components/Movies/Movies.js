import React from 'react'
import './Movies.css'
import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function Movies() {
    return (
      <>
        <section className="movies">
          <SearchForm />
          {/* <Preloader /> */}
          <div className="movies__line"></div>
          <MoviesCardList />
        </section>
        <Footer />
      </>
    )
};

export default Movies;