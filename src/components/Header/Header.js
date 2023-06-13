import { React } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './Header.css';
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import Navigation from '../Navigation/Navigation';
import headerGroupMenu from '../../images/navigation-burger.svg';

function Header( { windowSize, onNavigationPopup } ) {

  return (
    <header className="header">
      <HeaderLogo />
      <Routes>
        <Route path="/" element={
          <div className="header__container">
            <Link to="/signup" className="header__link header__link_register">Регистрация</Link>
            <Link to="/signin" className="header__link header__link_login">Войти</Link>
          </div>
          }
        />

        {["/movies", "/saved-movies", "/profile"].map((path, i) => (
          <Route path={path} key={i} element={windowSize[0] > 990 ? <Navigation /> : 
          <img className="header__nav-menu-icon" src={headerGroupMenu} alt="Меню" onClick={onNavigationPopup} />}
          />
        ))}

      </Routes>
    </header>
  )
}

export default Header;