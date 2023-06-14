import { React, useState } from 'react';
import './FilterSearch.css'

function FilterSearch() {

  const [isFilterActive, setIsFilterActive] = useState(true);

  function handleFilterChange() {
    setIsFilterActive(!isFilterActive);
  }

  return (
    <div className="filter-search">
      <input type="checkbox" name="filter" id="filter-button" class="filter-search__icon" onChange={handleFilterChange}/>
      <label for="filter-button" className="filter-search__text">Короткометражки</label>
    </div>
  )
}

export default FilterSearch;