import { React } from 'react';
import { HashLink } from 'react-router-hash-link'; 
import './Navtab.css';

function Navtab() {

  return (
      <nav className="navtab">
        <ul className="navtab__container">
          <li><HashLink smooth to="/#about-project" className="navtab__link">О проекте</HashLink></li>
          <li><HashLink smooth to="/#techs" className="navtab__link">Технологии</HashLink></li>
          <li><HashLink smooth to="/#about-me" className="navtab__link">Студент</HashLink></li>
        </ul>
      </nav>
  )
}

export default Navtab;