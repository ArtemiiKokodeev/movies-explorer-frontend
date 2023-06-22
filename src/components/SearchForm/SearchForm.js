import { React, useState, useEffect } from 'react';
import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import searchButton from '../../images/find.svg';
import verticalLine from '../../images/vertical-line.png';
import FilterSearch from '../FilterSearch/FilterSearch'

function SearchForm( { 
  onGetAllMovies, 
  allMovies,
  onSearchMovie, 
  onShowPreloader,
  onShortMovieFilter,
  isFilterActive } ) 
  {

  const [formValue, setFormValue] = useState(() => {
    const savedItem = localStorage.getItem("movie");
    const parsedItem = JSON.parse(savedItem);
    return { movie: parsedItem || "" };
}); // стейт введенного в поиск названия фильма, сохраняется в LocalStorage
  
  useEffect(() => {
    localStorage.setItem('movie', JSON.stringify(formValue.movie));
  }, [formValue.movie]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  // получить один раз все фильмы с api.beatfilm и сохранить в переменной allMovies
  function handleGetAllMoviesOnce() {
    if (allMovies.length === 0) {
      onGetAllMovies();
      onShowPreloader();
    } else {
      return;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGetAllMoviesOnce();
    onSearchMovie(formValue.movie);
  }

  return (
    
    // Routes

    <form name="search" className="search" onSubmit={handleSubmit}>
      <div className="search__bar">
        <div className="search__container">
          <div className="search__input-container">
            <img className="search__icon" src={searchIcon} alt="Значок лупы" />
            <input 
                id="movie" 
                name="movie" 
                type="text" 
                placeholder="Фильм"
                value={formValue.movie || ""} 
                onChange={handleChange}
                className="search__input" 
                required
            />
          </div>
          <button type="submit" name="submitButton" className="search__submit-button">
            <img src={searchButton} alt="Значок поиска" />
          </button>
        </div>
        <div className="search__filter-container">
          <img className="search__vertical-line" src={verticalLine} alt="Вертикальная линия" />
          
          <FilterSearch 
            onShortMovieFilter={onShortMovieFilter}
            isFilterActive={isFilterActive}
          />
        </div>
      </div>
      <div className="search__filter-for-650px">
          <FilterSearch 
            onShortMovieFilter={onShortMovieFilter}
            isFilterActive={isFilterActive}
          />
      </div>
    </form>
  )
}

export default SearchForm;