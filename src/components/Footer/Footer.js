import { React } from 'react';
import './Footer.css';

function Footer() {

  const year = new Date().getFullYear();

  return (
    <footer className="footer">
        <h3 className="footer__text footer__text_title">Учебный проект Яндекс.Практикум х BeatFilm.</h3>
        <div className="footer__line"></div>
        <div className="footer__container">
          <p className="footer__text footer__text_copyright-year">&copy; {`${year}. Артемий Кокодеев`}</p>
          <div className="footer__container footer__container_links">
            <a href="https://practicum.yandex.ru/" className="footer__text footer__text_link" 
              target="_blank" rel="noopener noreferrer">Яндекс.Практикум</a>
            <a href="https://github.com/" className="footer__text footer__text_link" 
              target="_blank" rel="noopener noreferrer">Github</a>
          </div>
        </div>
    </footer>
  )
}

export default Footer;