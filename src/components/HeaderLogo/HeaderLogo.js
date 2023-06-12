import { React } from 'react';
import { Link } from 'react-router-dom';
import './HeaderLogo.css';
import headerLogo from '../../images/header-logo.svg';

function HeaderLogo() {

  return (
    <Link to="/">
      <img className="header-logo" src={headerLogo} alt="Логотип cайта" />
    </Link>
  )
}

export default HeaderLogo;