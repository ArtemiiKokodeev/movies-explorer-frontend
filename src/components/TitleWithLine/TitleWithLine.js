import { React } from 'react';
import './TitleWithLine.css';

function TitleWithLine( { title } ) {

  return (
    <>
      <h2 className="title-with-line__title">{title}</h2>
      <div class="title-with-line__line"></div>
    </>
  )
}

export default TitleWithLine;