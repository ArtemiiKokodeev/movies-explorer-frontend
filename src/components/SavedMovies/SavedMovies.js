import React from 'react'
import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies() {
    return (
      <section>
        <SearchForm />
        {/* <Preloader /> */}
        <div className="movies__line"></div>
        <MoviesCardList />
        <Footer />
        </section>
    )
};

export default SavedMovies;