import { React } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './Header.css';
import headerLogo from '../../images/header-logo.svg';
import Navigation from '../Navigation/Navigation';
import headerGroupMenu from '../../images/navigation-burger.svg';

function Header( { windowSize, onNavigationPopup } ) {

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Логотип cайта" />
      <Routes>
        <Route path="/" element={
          <div className="header__container">
            <Link to="/sign-up" className="header__link header__link_register">Регистрация</Link>
            <Link to="/sign-in" className="header__link header__link_login">Войти</Link>
          </div>
          }
        />

        {["/movies", "/saved-movies", "/profile"].map(path => (
          <Route path={path} element={windowSize[0] > 990 ? <Navigation /> : 
          <img className="header__nav-menu-icon" src={headerGroupMenu} alt="Меню" onClick={onNavigationPopup} />}
          />
        ))}

          {/* {["/movies", "/saved-movies", "/profile"].map(path => (
          <Route path={path} element={
            <>
              <div className="header__nav-container">
                <Navigation />
              </div>
              <img className="header__nav-menu-icon" src={headerGroupMenu} alt="Меню" />
            </>
          }/>
        ))} */}

      </Routes>
    </header>
  )
}

export default Header;