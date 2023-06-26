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

// редактирование данных (имя, email) текущего пользователя
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

// получить все сохраненные фильмы
export const getSavedMovies = () => {
  const token = localStorage.getItem('jwt');
  return fetch(`${BASE_URL}movies`, {
    headers: {
      'Content-type': 'application/json',
      authorization: `Bearer ${token}`
    }
  })
  .then(getResponse)
}

// сохранить фильм (страница saved-movies)
export const saveMovie = (movieInfo) => {
  const token = localStorage.getItem('jwt');
  return fetch(`${BASE_URL}movies`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
        country: movieInfo.country,
        director: movieInfo.director,
        duration: movieInfo.duration,
        year: movieInfo.year,
        description: movieInfo.description,
        image: `https://api.nomoreparties.co${movieInfo.image.url}`,
        trailerLink: movieInfo.trailerLink,
        nameRU: movieInfo.nameRU,
        nameEN: movieInfo.nameEN,
        thumbnail: `https://api.nomoreparties.co${movieInfo.image.formats.thumbnail.url}`,
        movieId: movieInfo.id
    })
  })
  .then(getResponse)
}

// удалить фильм из сохраненных (страница saved-movies)
export const removeSavedMovie = (id) => {
  const token = localStorage.getItem('jwt');
  return fetch(`${BASE_URL}movies/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      authorization: `Bearer ${token}`
    },
  })
  .then(getResponse)
}