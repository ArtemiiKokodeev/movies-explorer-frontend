import { React } from 'react';
import './Techs.css';
import TitleWithLine from '../TitleWithLine/TitleWithLine';

function Techs() {

  return (
    <section className="techs" id="techs">
      <TitleWithLine title={"Технологии"}/>
      <div className="techs__container">
        <h3 className="techs__title">7 технологий</h3>
        <p className="techs__info">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <ul className="techs__techs-container">
          <li className="techs__techs-name">HTML</li>
          <li className="techs__techs-name">CSS</li>
          <li className="techs__techs-name">JS</li>
          <li className="techs__techs-name">React</li>
          <li className="techs__techs-name">Git</li>
          <li className="techs__techs-name">Express.js</li>
          <li className="techs__techs-name">mongoDB</li>
        </ul>
      </div>
    </section>
  )
}

export default Techs;