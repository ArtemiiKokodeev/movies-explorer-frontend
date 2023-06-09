import { React } from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

function Navigation( { onClose } ) {
  
  return (
    <>
      <nav className="navigation">
        <NavLink to="/" onClick={onClose}
          className="navigation__link navigation__link_main ">
            Главная</NavLink>
        <div className="navigation__container">
          <NavLink to="/movies" onClick={onClose}
            className={({isActive}) => `navigation__link navigation__link_movies ${isActive ? "navigation__link_active" : ""}`}>
              Фильмы</NavLink>
          <NavLink to="/saved-movies" onClick={onClose}
            className={({isActive}) => `navigation__link navigation__link_saved-movies ${isActive ? "navigation__link_active" : ""}`}>
              Сохраненные фильмы</NavLink>
        </div>
        <NavLink to="/profile" onClick={onClose}
          className={({isActive}) => `navigation__link navigation__link_profile ${isActive ? "navigation__link_active" : ""}`}>
            Аккаунт</NavLink>
      </nav>
    </>
  )
}

export default Navigation;