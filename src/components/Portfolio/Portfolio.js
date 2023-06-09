import { React } from 'react';
import './Portfolio.css';

function Portfolio() {

  const websites = {
    staticWebsite: {
      name: "Статичный сайт",
      link: "https://github.com/ArtemiiKokodeev/how-to-learn/"
    },
    responsiveWebsite: {
      name: "Адаптивный сайт",
      link: "https://artemiikokodeev.github.io/russian-travel/"
    },
    spa: {
      name: "Одностраничное приложение",
      link: "https://instagram-killer.nomoredomains.monster/#/"
    }
  };

  return (
    <section class="portfolio">
      <div className="portfolio__container">
        <h3 className="portfolio__title">Портфолио</h3>
        <div className="portfolio__project-link-container">
          <a href={websites.staticWebsite.link} className="portfolio__project-link" 
            target="_blank" rel="noopener noreferrer">{websites.staticWebsite.name}</a>
          <a href={websites.staticWebsite.link} className="portfolio__project-link portfolio__project-link_icon" 
            target="_blank" rel="noopener noreferrer">↗</a>
        </div>
        <div class="portfolio__line"></div>
        <div className="portfolio__project-link-container">
          <a href={websites.responsiveWebsite.link} className="portfolio__project-link" 
            target="_blank" rel="noopener noreferrer">{websites.responsiveWebsite.name}</a>
          <a href={websites.responsiveWebsite.link} className="portfolio__project-link portfolio__project-link_icon" 
            target="_blank" rel="noopener noreferrer">↗</a>
        </div>
        <div class="portfolio__line"></div>
        <div className="portfolio__project-link-container">
          <a href={websites.spa.link} className="portfolio__project-link" 
            target="_blank" rel="noopener noreferrer">{websites.spa.name}</a>
          <a href={websites.spa.link} className="portfolio__project-link portfolio__project-link_icon" 
            target="_blank" rel="noopener noreferrer">↗</a>
        </div>
      </div>
    </section>
  )
}

export default Portfolio;