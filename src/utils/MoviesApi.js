import { apiBeatFilmUrl } from '../utils/constants';

export class Api {
    constructor(url) {
      this._url = url;
    }

    // Проверка ответа от сервера
    _checkServerResponse(res) {
      if (res.ok) {
        return res.json();
      }
      // если ошибка, отклоняем промис
      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    }

    // Получить список всех карточек в виде массива (GET)
    getAllMovies() {
      return fetch(`${this._url}`, {
        headers: {
          'Content-type': 'application/json'
        }
      })
      .then(this._checkServerResponse)
    }
  }

export const apiBeatFilm = new Api(apiBeatFilmUrl);
