import { React, useState } from 'react';
import './Login.css'
import UserFormComponent from '../UserFormComponent/UserFormComponent';

function Login() {

  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {name, value} = e.target;

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // onLogin(formValue.email, formValue.password);
  }

  return (
    <div className="register">
      <UserFormComponent 
        title="Рады видеть!"
        name="userLoginForm"
        submitButtonText="Войти"
        onSubmit={handleSubmit}
        redirectQuestionText="Еще не зарегистрированы?"
        redirectRoute="/signup"
        redirectActionText="Регистрация"
        isApiError={false}
        apiErrorText={""}
        children={(
          <div>
            <p className="user-form__input-name">E-mail</p>
            <label className="user-form__input-field">
              <input 
                id="email" 
                name="email" 
                type="email" 
                placeholder=""
                value={formValue.email || ''} 
                onChange={handleChange}
                className="user-form__input user-form__input_type_email" 
                required  
              />
              <span className="user-form__text-error email-text-error"></span>
            </label>    
            <p className="user-form__input-name">Пароль</p>
            <label className="user-form__input-field">
              <input 
                id="password" 
                name="password" 
                type="password" 
                placeholder=""
                value={formValue.password || ''} 
                onChange={handleChange}
                className="user-form__input user-form__input_type_password" 
                required
              />
            </label>
            <span className="user-form__text-error password-text-error"></span>
          </div>
        )}
      />
    </div>
  );
}

export default Login;