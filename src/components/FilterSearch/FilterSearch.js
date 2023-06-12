import { React, useState } from 'react';
import './FilterSearch.css'
import filterIconActive from '../../images/filter-icon-active.svg';
import filterIconDisabled from '../../images/filter-icon-disabled.svg';

function FilterSearch() {

  const [isFilterActive, setIsFilterActive] = useState(false);

  function handleFilterChange() {
    setIsFilterActive(!isFilterActive);
  }

  return (
    <div className="filter-search">
      <img className="filter-search__icon" 
        src={isFilterActive ? filterIconActive : filterIconDisabled} 
        onClick={handleFilterChange} 
        alt="Значок фильтра по короткометражкам" />
      <p className="filter-search__text">Короткометражки</p>
    </div>
  )
}

export default FilterSearch;