import React from 'react';
import { Link } from 'react-router-dom';
import './UserFormComponent.css'
import HeaderLogo from '../HeaderLogo/HeaderLogo';
import Error from '../Error/Error';

function UserFormComponent( { 
  title,
  name,
  children,
  submitButtonText,
  onSubmit,
  handleSubmit,
  isSubmitButtonActive,
  redirectQuestionText,
  redirectRoute,
  redirectActionText,
  isApiError,
  apiErrorText,
  isSuccessApiRequest,
}) {

  return (
    <div className="user-form">
      <HeaderLogo />
      <h1 className="user-form__title">{title}</h1>
      <form name={name} className="user-form__form" onSubmit={handleSubmit(onSubmit)}>
        {children}
        <div className="user-form__submit-container">
          <Error isApiError={isApiError} apiErrorText={apiErrorText} />
          <p className={`user-form__success-regist ${isSuccessApiRequest && "user-form__success-regist_active"}`}>
            Успешная регистрация!
          </p>
          <button className={`user-form__submit-button 
            ${!isSubmitButtonActive && "user-form__submit-button_disabled"}`}
            type="submit" 
            name="submitButton"
            disabled={!isSubmitButtonActive}>
            {submitButtonText}
          </button>
        </div>  
      </form>
      <div className="user-form__redirect">
        <p className="user-form__redirect-text">{redirectQuestionText}</p>
        <Link to={redirectRoute} className="user-form__redirect-text">{redirectActionText}</Link>
      </div>
    </div>
  )
}

export default UserFormComponent;