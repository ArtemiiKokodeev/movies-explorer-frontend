import React from 'react'
import './Movies.css'
import SearchForm from '../SearchForm/SearchForm';
// import Preloader from '../Preloader/Preloader';
import Footer from '../Footer/Footer';

function Movies() {
    return (
      <>
        <SearchForm />
        {/* <Preloader /> */}
        <Footer />
      </>
    )
};

export default Movies;