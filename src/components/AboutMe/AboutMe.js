import { React } from 'react';
import './AboutMe.css';
import TitleWithLine from '../TitleWithLine/TitleWithLine';
import myPhoto from '../../images/my-photo.jpg';

function AboutMe() {

  return (
    <section class="about-me" id="about-me">
      <TitleWithLine title={"Студент"}/>
      <div className="about-me__container">
        <div className="about-me__description-container">
          <h3 className="about-me__title">Артемий</h3>
          <p className="about-me__job">Frontend Developer, 28 лет</p>
          <p className="about-me__info">Я родился и живу в Саратове, закончил факультет экономики СГУ. 
          У меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. 
          С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, 
          начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
          <a href="https://github.com/ArtemiiKokodeev/" className="about-me__link" target="_blank" rel="noopener noreferrer">Github</a>
        </div>
        <img className="about-me__photo" src={myPhoto} alt="Мое фото" />
      </div>

    </section>
  )
}

export default AboutMe;