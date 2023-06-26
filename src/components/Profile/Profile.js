import { React, useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { CurrentUserContext } from '../../utils/CurrentUserContext';
import './Profile.css';
import Error from '../Error/Error';
import * as Validation from '../UserFormValidation/UserFormValidation';
import UserFormValidation from '../UserFormValidation/UserFormValidation';

function Profile( { 
  isEditing,
  onChangeEditProfileMode, 
  onUpdateUserInfo, 
  isSuccessApiRequest,
  isApiError,
  apiErrorText,
  onSignOut } ) {

  const currentUser = useContext(CurrentUserContext);

  const { register, formState: { errors, isValid }, handleSubmit} = useForm({ mode: "onChange" });

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);

  const [isDisabledInput, setIsDisabledInput] = useState(true);
  const [isDisabledButton, setIsDisabledButton] = useState(false);

  const { required: requiredName, pattern: patternName, minLength: minLengthName, maxLength: maxLengthName 
  } = Validation.formConfig.name;
  const { required: requiredEmail, pattern: patternEmail} = Validation.formConfig.email;

  useEffect(() => {
    if (name === currentUser.name && email === currentUser.email) {
      setIsDisabledButton(true);
    } else {
      setIsDisabledButton(false);
    }
  }, [name, email, currentUser])

  useEffect(() => {
    !isApiError &&
      setName(currentUser.name);
      setEmail(currentUser.email);
      onChangeEditProfileMode(false);
      setIsDisabledInput(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  useEffect(() => {
    isApiError && setIsDisabledButton(true);
  }, [isApiError])

  function handleEditButtonClick() {
    setIsDisabledInput(false);
    onChangeEditProfileMode(true);
    setIsDisabledButton(true);
  }

  const onSubmit = (data) => {
    onUpdateUserInfo({
      name: data.name,
      email: data.email,
    });
  }

    return (
      <div className="profile">
        <h1 className="profile__title">Привет, {currentUser.name}!</h1>
        <form name="profile" className="profile__container" onSubmit={handleSubmit(onSubmit)}>
          <div className="profile__input-container">
            <div>
              <div className="profile__info-container">
                <div className="profile__info">
                  <p className="profile__input-name">Имя</p>
                  <input className="profile__input"
                    disabled={isDisabledInput}
                    {...register("name", {
                      required: requiredName, 
                      pattern: patternName, 
                      minLength: minLengthName, 
                      maxLength: maxLengthName,
                      value: name,
                      onChange: (e) => 
                        setName(e.target.value)
                    })} />
                </div>
                {errors?.name && <UserFormValidation 
                  errorMessage={errors?.name?.message || "Ошибка! Что-то пошло не так..."} />}
              </div>
              <div className="profile__line"></div>
              <div className="profile__info-container">
                <div className="profile__info">
                  <p className="profile__input-name">E-mail</p>
                  <input className="profile__input" 
                    disabled={isDisabledInput}
                    {...register("email", {
                      required: requiredEmail, 
                      pattern: patternEmail,
                      value: email,
                      onChange: (e) => 
                        setEmail(e.target.value)
                    })} />
                </div>
                {errors?.email && <UserFormValidation 
                  errorMessage={errors?.email?.message || "Ошибка! Что-то пошло не так..."} />}
              </div>
            </div>
            <Error isApiError={isApiError} apiErrorText={apiErrorText} />
            <p className={`profile__success-update ${isSuccessApiRequest && "profile__success-update_active"}`}>
              Профиль успешно обновлен!
            </p>
          </div>
          {!isEditing ?
            <>
              <p onClick={handleEditButtonClick} className="profile__button profile__button_edit">Редактировать</p>
              <p onClick={onSignOut} className="profile__button profile__button_signout">Выйти из аккаунта</p>
            </>
          :
            <button className={`profile__submit-button ${!isValid || isDisabledButton ? "profile__submit-button_disabled" : ''}`}
              type="submit" name="submitButton" disabled={!isValid || isDisabledButton}>
              Сохранить
            </button>
          }
        </form>
    </div>
    )
};

export default Profile;