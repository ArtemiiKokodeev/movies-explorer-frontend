import { React, useState } from 'react';
import { useForm } from 'react-hook-form';
import './SearchForm.css';
import searchIcon from '../../images/search-icon.svg';
import searchButton from '../../images/find.svg';
import verticalLine from '../../images/vertical-line.png';
import FilterSearch from '../FilterSearch/FilterSearch'

function SearchForm( { 
  onSearchMovie, 
  searchedMovieName,
  onShortMovieFilter,
  isFilterActive
} ) {

  const { register, formState: { errors }, handleSubmit} = useForm();

  const [movie, setMovie] = useState(searchedMovieName || "" );

  const onSubmit = (data) => {
    onSearchMovie(data.movie);
  }

  return (
    <form name="search" className="search" onSubmit={handleSubmit(onSubmit)}>
      <div className="search__bar">
        <div className="search__container">
          <div className="search__input-container">
            <img className="search__icon" src={searchIcon} alt="Значок лупы" />
            <input className="search__input" 
              placeholder="Фильм"
              {...register("movie", {
                required: "Введите ключевое слово",
                value: movie,
                onChange: (e) => 
                  setMovie(e.target.value)
              })} 
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
      {errors?.movie && 
        <span className="search__validation-error">
          {errors?.movie?.message || "Ошибка! Что-то пошло не так..."}
        </span> }
      <div className={`search__filter-for-650px ${!errors?.movie && "search__filter-for-650px_margin-top"}`}>
          <FilterSearch 
            onShortMovieFilter={onShortMovieFilter}
            isFilterActive={isFilterActive}
          />
      </div>
    </form>
  )
}

export default SearchForm;