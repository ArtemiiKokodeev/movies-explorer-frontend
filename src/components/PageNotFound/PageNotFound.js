import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound () {
  return (
    <div className="not-found">
      <h3 className="not-found__code">404</h3>
      <h3 className="not-found__title">Страница не найдена</h3>
      <Link to="/" className="not-found__to-main">Назад</Link>
    </div>
  )
}

export default PageNotFound; 