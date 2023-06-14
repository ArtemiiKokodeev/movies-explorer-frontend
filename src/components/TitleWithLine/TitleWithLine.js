import { React } from 'react';
import './TitleWithLine.css';

function TitleWithLine( { title } ) {

  return (
    <div className="title-with-line">
      <h2 className="title-with-line__title">{title}</h2>
      <div className="title-with-line__line"></div>
    </div>
  )
}

export default TitleWithLine;