import { React } from 'react';
import './FilterSearch.css'

function FilterSearch( { onShortMovieFilter, isFilterActive } ) {
  return (
    <div className="filter-search">
      <input 
        type="checkbox" 
        name="filter" 
        id="filter-button" 
        className="filter-search__icon" 
        onChange={onShortMovieFilter}
        checked={isFilterActive}/>
      <label htmlFor="filter-button" className="filter-search__text">Короткометражки</label>
    </div>
  )
}

export default FilterSearch;