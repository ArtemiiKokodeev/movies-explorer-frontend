import { React, useState } from 'react';
import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import searchButton from '../../images/find.svg';
import verticalLine from '../../images/vertical-line.png';
import FilterSearch from '../FilterSearch/FilterSearch'

function SearchForm() {

  const [formValue, setFormValue] = useState({
    movie: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // onSearchMovies(formValue.movie);
  }

  return (
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
          <FilterSearch />
        </div>
      </div>
      <div className="search__filter-for-650px">
        <FilterSearch />
      </div>
    </form>
  )
}

export default SearchForm;