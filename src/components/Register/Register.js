import { React } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './Register.css'
import UserFormComponent from '../UserFormComponent/UserFormComponent';
import * as Validation from '../UserFormValidation/UserFormValidation';
import UserFormValidation from '../UserFormValidation/UserFormValidation';

function Register( { onRegister, isApiError, apiErrorText, isSuccessApiRequest, loggedIn } ) {

  const { 
    register,
    formState: {
      errors,
      isValid
    },
    handleSubmit,
    // reset
  } = useForm({
    mode: "onChange"
  });

  const onSubmit = (data) => {
    onRegister(data.name, data.email, data.password);
    // reset();
  }


  return (
    loggedIn ? <Navigate to='/' /> :
      <div className="register">
        <UserFormComponent 
          title="Добро пожаловать!"
          name="userRegisterForm"
          submitButtonText="Зарегистрироваться"
          onSubmit={onSubmit}
          handleSubmit={handleSubmit}
          isSubmitButtonActive={isValid}
          redirectQuestionText="Уже зарегистрированы?"
          redirectRoute="/signin"
          redirectActionText="Войти"
          isApiError={isApiError}
          apiErrorText={apiErrorText}
          isSuccessApiRequest={isSuccessApiRequest}
          children={(
            <div>
              <p className="user-form__input-name">Имя</p>
              <label className="user-form__input-field">
                <input className="user-form__input"
                  {...register("name", Validation.formConfig.name)}
                />
                {errors?.name && <UserFormValidation 
                  errorMessage={errors?.name?.message || "Ошибка! Что-то пошло не так..."} />}
              </label>

              <p className="user-form__input-name">E-mail</p>
              <label className="user-form__input-field">
                <input className="user-form__input" type="email" 
                  {...register("email", Validation.formConfig.email)} 
                />
                {errors?.email && <UserFormValidation 
                  errorMessage={errors?.email?.message || "Ошибка! Что-то пошло не так..."} />}
              </label>    

              <p className="user-form__input-name">Пароль</p>
              <label className="user-form__input-field">
                <input className="user-form__input" type="password"
                  {...register("password", Validation.formConfig.password)} 
                />
                {errors?.password && <UserFormValidation 
                  errorMessage={errors?.password?.message || "Ошибка! Что-то пошло не так..."} />}
              </label>
            </div>
          )}
        />
      </div>
  );
}

export default Register;
