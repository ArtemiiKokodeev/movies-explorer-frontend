import { React, useState } from 'react';
import { Link } from 'react-router-dom';
import './Profile.css'

function Profile() {

  const [formValue, setFormValue] = useState({
    name: '',
    email: ''
  })

  const [isDisabledInput, setIsDisabledInput] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    setIsDisabledInput(!isDisabledInput);
    // onEditProfile(formValue.name, formValue.email);
  }

  function handleEditButtonClick() {
    setIsDisabledInput(!isDisabledInput);
    setIsEditing(true);
  }

    return (
      <div className="profile">
        <h1 className="profile__title">Привет, Артемий!</h1>
        <form name="profile" className="profile__container" onSubmit={handleSubmit}>
          <div className="profile__input-container">
            <div className="profile__info-container">
              <p className="profile__input-name">Имя</p>
              <input 
                  id="name" 
                  name="name" 
                  type="text" 
                  placeholder=""
                  value={formValue.name || "Артемий"} 
                  onChange={handleChange}
                  className="profile__input profile__input_type_name" 
                  required
                  disabled={isDisabledInput}
                />
            </div>
            <div className="profile__line"></div>
            <div className="profile__info-container">
              <p className="profile__input-name">E-mail</p>
              <input 
                  id="email" 
                  name="email" 
                  type="email"
                  placeholder=""
                  value={formValue.email || "artem.kokodeev@yandex.ru"} 
                  onChange={handleChange}
                  className="profile__input profile__input_type_email" 
                  required
                  disabled={isDisabledInput}
                />
            </div>
          </div>
          {!isEditing ?
            <>
              <p onClick={handleEditButtonClick} className="profile__button profile__button_edit">Редактировать</p>
              <Link to="/signin" className="profile__button profile__button_signout">Выйти из аккаунта</Link>
            </>
          :
            <button className="profile__submit-button" type="submit" name="submitButton">Сохранить</button>
          }
        </form>
    </div>
    )
};

export default Profile;