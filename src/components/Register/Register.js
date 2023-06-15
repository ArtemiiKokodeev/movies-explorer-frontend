import { React, useState } from 'react';
import './Register.css'
import UserFormComponent from '../UserFormComponent/UserFormComponent';

function Register() {

  const [formValue, setFormValue] = useState({
    name: '',
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
    // onRegister(formValue.name, formValue.email, formValue.password);
  }

  return (
    <div className="register">
      <UserFormComponent 
        title="Добро пожаловать!"
        name="userRegisterForm"
        submitButtonText="Зарегистрироваться"
        onSubmit={handleSubmit}
        redirectQuestionText="Уже зарегистрированы?"
        redirectRoute="/signin"
        redirectActionText="Войти"
        isApiError={false}
        apiErrorText={""}
        children={(
          <div>
            <p className="user-form__input-name">Имя</p>
            <label className="user-form__input-field">
              <input 
                id="name" 
                name="name" 
                type="text" 
                placeholder=""
                value={formValue.name || ''} 
                onChange={handleChange}
                className="user-form__input user-form__input_type_name" 
                required  
              />
              <span className="user-form__text-error name-text-error"></span>
            </label>
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
              <span className="user-form__text-error password-text-error"></span>
            </label>
          </div>
        )}
      />
    </div>
  );
}

export default Register;
