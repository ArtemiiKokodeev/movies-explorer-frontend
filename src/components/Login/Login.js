import { React } from 'react';
import { useForm } from 'react-hook-form';
import './Login.css'
import UserFormComponent from '../UserFormComponent/UserFormComponent';
import * as Validation from '../UserFormValidation/UserFormValidation';
import UserFormValidation from '../UserFormValidation/UserFormValidation';

function Login( { onLogin, isApiError, apiErrorText } ) {

  const { 
    register,
    formState: {
      errors,
      isValid
    },
    handleSubmit,
    reset
  } = useForm({
    mode: "onChange"
  });
  
  const onSubmit = (data) => {
    onLogin(data.email, data.password);
    reset();
  }

  return (
    <div className="register">
      <UserFormComponent 
        title="Рады видеть!"
        name="userLoginForm"
        submitButtonText="Войти"
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        isSubmitButtonActive={isValid}
        redirectQuestionText="Еще не зарегистрированы?"
        redirectRoute="/signup"
        redirectActionText="Регистрация"
        isApiError={isApiError}
        apiErrorText={apiErrorText}
        children={(
          <div>
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

export default Login;