import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound () {

  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h3 className="not-found__code">404</h3>
      <h3 className="not-found__title">Страница не найдена</h3>
      <p onClick={() => navigate(-1)} className="not-found__to-main">Назад</p>
    </div>
  )
}

export default PageNotFound; 