import { React } from 'react';
import './Promo.css';
import Navtab from '../Navtab/Navtab';

function Promo() {

  return (
    <section className="promo">
      <div className="promo__container">
        <h1 className="promo__title">
        Учебный проект студента факультета Веб-разработки.
        </h1>
        <Navtab />
      </div>
    </section>
  )
}

export default Promo;