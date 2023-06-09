import { React } from 'react';
import './AboutProject.css';
import TitleWithLine from '../TitleWithLine/TitleWithLine';

function AboutProject() {

  return (
    <section class="about-project" id="about-project">
      <div className="about-project__container">
        <TitleWithLine title={"О проекте"}/>
        <div className="about-project__description-container">
          <div className="about-project__description-text">
            <p className="about-project__description-title">Дипломный проект включал 5 этапов</p>
            <p className="about-project__text">
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="about-project__description-text">
            <p className="about-project__description-title">На выполнение диплома ушло 5 недель</p>
            <p className="about-project__text">
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className="about-project__grid-container">
          <p className="about-project__weeks about-project__weeks_white">1 неделя</p>
          <p className="about-project__weeks about-project__weeks_black">4 недели</p>
          <p className="about-project__app-part">Back-end</p>
          <p className="about-project__app-part">Front-end</p>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;