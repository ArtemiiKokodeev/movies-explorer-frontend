import { BASE_URL } from "./constants";

function getResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
  }
  return res.json();
} 

// регистрация пользователя
export const register = (name, email, password) => {
  return fetch(`${BASE_URL}signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  })
    .then(getResponse)
    .then((res) => {
      return res;
    })
};

// авторизация пользователя
export const authorize = (email, password) => {
  return fetch(`${BASE_URL}signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(getResponse)
    .then((data) => {
      return data;
    })
};

// проверка токена авторизованного пользователя при обновлении страницы
export const checkToken = (token) => {
  return fetch(`${BASE_URL}users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
  .then(getResponse)
  .then(data => data)
}

// получение данных текущего авторизованного пользователя
export const getCurrentUser = () => {
  const token = localStorage.getItem('jwt');
  return fetch(`${BASE_URL}users/me`, {
    headers: {
      'Content-type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })
  .then(getResponse)
}

// Заменить данные пользователя (PATCH)
export const updateUserInfo = (userInfo) => {
  const token = localStorage.getItem('jwt');
  return fetch(`${BASE_URL}users/me`, {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(userInfo)
  })
  .then(getResponse)
}
