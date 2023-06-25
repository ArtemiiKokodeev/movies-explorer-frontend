import React from 'react';
import './UserFormValidation.css'

export const isEmailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
export const isNameValid = /^(?! )[-A-Za-zА-Яа-я ]+$/;
export const formConfig = {
    name: {
      required: "Поле обязательно к заполнению",
      pattern: {
        value: isNameValid,
        message: "Неверный формат. Допускается латиница, кириллица, пробел или дефис "
      },
      minLength: {
        value: 2,
        message: "Минимум 2 символа"
      },
      maxLength: {
        value: 30,
        message: "Максимум 30 символов",
      }
    },
    email: {
      required: "Поле обязательно к заполнению",
      pattern: {
        value: isEmailRegex,
        message: "Неверный формат email"
      }
    },
    password: {
      required: "Поле обязательно к заполнению"
    }
  }

function UserFormValidation({ errorMessage }) {
  return (
    <span className="form-validation__text-error">
      {errorMessage}
    </span>
  )
}

export default UserFormValidation;
