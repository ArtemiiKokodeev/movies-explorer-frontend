import React from 'react';
import { Link } from 'react-router-dom';
import './UserFormComponent.css'
import HeaderLogo from '../HeaderLogo/HeaderLogo';

function UserFormComponent( { 
  title,
  name,
  children,
  submitButtonText,
  onSubmit,
  redirectQuestionText,
  redirectRoute,
  redirectActionText,
}) {

  return (
    <div className="user-form">
      <HeaderLogo />
      <h1 className="user-form__title">{title}</h1>
      <form name={name} className="user-form__form" onSubmit={onSubmit}>
        {children}
        <button className="user-form__submit-button" type="submit" name="submitButton">
          {submitButtonText}
        </button>  
      </form>
      <div className="user-form__redirect">
        <p className="user-form__redirect-text">{redirectQuestionText}</p>
        <Link to={redirectRoute} className="user-form__redirect-text">{redirectActionText}</Link>
      </div>
    </div>
  )
}

export default UserFormComponent;