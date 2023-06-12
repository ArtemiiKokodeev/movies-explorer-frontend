import { React } from 'react';
import './Portfolio.css';
import LinkComponent from '../LinkComponent/LinkComponent';

function Portfolio() {

  const linkStyle = "portfolio__project-link";
  const linkIconStyle = `${linkStyle} "portfolio__project-link_icon"`;
  
  const websites = {
    staticWebsite: <LinkComponent url="https://github.com/ArtemiiKokodeev/how-to-learn/" text="Статичный сайт" className={linkStyle}/>,
    staticWebsiteIcon: <LinkComponent url="https://github.com/ArtemiiKokodeev/how-to-learn/" text="↗" className={linkIconStyle}/>,
    responsiveWebsite: <LinkComponent url="https://artemiikokodeev.github.io/russian-travel/" text="Адаптивный сайт" className={linkStyle}/>,
    responsiveWebsiteIcon: <LinkComponent url="https://artemiikokodeev.github.io/russian-travel/" text="↗" className={linkIconStyle}/>,
    spa: <LinkComponent url="https://instagram-killer.nomoredomains.monster/#/" text="Одностраничное приложение" className={linkStyle}/>,
    spaIcon: <LinkComponent url="https://instagram-killer.nomoredomains.monster/#/" text="↗" className={linkIconStyle}/>
  };

  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h3 className="portfolio__title">Портфолио</h3>
        <div className="portfolio__project-link-container">
          {websites.staticWebsite}
          {websites.staticWebsiteIcon}
        </div>
        <div className="portfolio__line"></div>
        <div className="portfolio__project-link-container">
          {websites.responsiveWebsite}
          {websites.responsiveWebsiteIcon}
        </div>
        <div className="portfolio__line"></div>
        <div className="portfolio__project-link-container">
          {websites.spa}
          {websites.spaIcon}
        </div>
      </div>
    </section>
  )
}

export default Portfolio;