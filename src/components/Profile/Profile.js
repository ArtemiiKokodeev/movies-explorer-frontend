import { React, useEffect, useState } from 'react';
import './Profile.css';
import Error from '../Error/Error';

function Profile( { 
  currentUser, 
  onUpdateUserInfo, 
  isApiError,
  apiErrorText,
  onSignOut } ) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("")

  const [isDisabledInput, setIsDisabledInput] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isDisabledButton, setIsDisabledButton] = useState(false);

  useEffect(() => {
    if (!name && !email) {
      setIsDisabledButton(true);
    } else if (name === currentUser.name && email === currentUser.email) {
      setIsDisabledButton(true);
    } else {
      setIsDisabledButton(false);
    }
  }, [name, email, currentUser])

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateUserInfo({
      name: name,
      email: email,
    });
    // если ошибка:
    // не скрываем кнопку сохранить
    // дисейблим кнопку сохранить
    // не заменяем данные в инпутах
    // выводим текст ошибки
  }

  useEffect(() => {
    !isApiError &&
      setName(currentUser.name);
      setEmail(currentUser.email);
      setIsEditing(false);
      setIsDisabledInput(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  useEffect(() => {
    setIsDisabledButton(true);
  }, [isApiError])

  function handleEditButtonClick() {
    setIsDisabledInput(false);
    setIsEditing(true);
  }

    return (
      <div className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form name="profile" className="profile__container" onSubmit={handleSubmit}>
          <div className="profile__input-container">
            <div>
              <div className="profile__info-container">
              <p className="profile__input-name">Имя</p>
              <input 
                  id="name" 
                  name="name" 
                  type="text" 
                  placeholder=""
                  value={name || ""} 
                  onChange={handleNameChange}
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
                  value={email || ""}  
                  onChange={handleEmailChange}
                  className="profile__input profile__input_type_email" 
                  required
                  disabled={isDisabledInput}
                />
              </div>
            </div>
            <Error isApiError={isApiError} apiErrorText={apiErrorText} />
          </div>
          {!isEditing ?
            <>
              <p onClick={handleEditButtonClick} className="profile__button profile__button_edit">Редактировать</p>
              <p onClick={onSignOut} className="profile__button profile__button_signout">Выйти из аккаунта</p>
            </>
          :
            <button className={`profile__submit-button ${isDisabledButton && "profile__submit-button_disabled"}`}
              type="submit" name="submitButton" disabled={isDisabledButton}>
              Сохранить
            </button>
          }
        </form>
    </div>
    )
};

export default Profile;