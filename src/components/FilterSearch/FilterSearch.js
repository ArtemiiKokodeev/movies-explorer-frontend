import { React, useState } from 'react';
import './FilterSearch.css'

function FilterSearch() {

  const [isFilterActive, setIsFilterActive] = useState(true);

  function handleFilterChange() {
    setIsFilterActive(!isFilterActive);
    console.log(isFilterActive);
  }

  return (
    <div className="filter-search">
      <input type="checkbox" name="filter" id="filter-button" className="filter-search__icon" onChange={handleFilterChange}/>
      <label htmlFor="filter-button" className="filter-search__text">Короткометражки</label>
    </div>
  )
}

export default FilterSearch;