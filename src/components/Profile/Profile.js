import React from 'react'
import { Link } from 'react-router-dom';
import './Profile.css'

function Profile() {
    return (
      <div className="profile">
        <h1 className="profile__title">Привет, Артемий!</h1>
        <div className="profile__container">
          <div className="profile__info-container">
            <p className="profile__value profile__value_type">Имя</p>
            <p className="profile__value">Артемий</p>
          </div>
          <div className="profile__line"></div>
          <div className="profile__info-container">
            <p className="profile__value profile__value_type">E-mail</p>
            <p className="profile__value">artem.kokodeev@yandex.ru</p>
          </div>
        </div>
        <p className="profile__button profile__button_edit">Редактировать</p>
        <Link to="/sign-in" className="profile__button profile__button_signout">Выйти из аккаунта</Link>
    </div>
    )
};

export default Profile;