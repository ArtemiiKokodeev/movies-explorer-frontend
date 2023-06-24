import { React, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { CurrentUserContext } from '../../utils/CurrentUserContext';
import * as MainApi from '../../utils/MainApi';
import { apiBeatFilm } from '../../utils/MoviesApi'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import './App.css';
import Register from '../Register/Register';
import Login from '../Login/Login';
import PageNotFound from '../PageNotFound/PageNotFound';
import MainLayout from '../MainLayout/MainLayout';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

function App() {
  const [windowSize, setWindowSize] = useState([window.innerWidth, window.innerHeight]); // текущий размер окна
  const [loggedIn, setLoggedIn] = useState(false); // авторизован ли пользователь
  const [currentUser, setCurrentUser] = useState({}); // текущий авторизованный пользователь

  const [isLoading, setIsLoading] = useState(false); // стейт для отображения/скрытия прелоадера
  const [isMoviesLoadingError, setIsMoviesLoadingError] = useState(false); // стейт ошибки при загрузки фильмов с сервиса api beatfilm-movies 
  const [isApiError, setIsApiError] = useState(false); // стейт ответа при обращении к API
  const [apiErrorText, setApiErrorText] = useState(""); // текст ответа при обращении к API

  const [allMovies, setAllMovies] = useState([]); // все фильмы с сервиса api beatfilm-movies
  const [searchedMovieName, setSearchedMovieName] = useState(getItemFromLocalStorage("movie-name") || ""); // стейт введенного в поиск название фильма
  const [isFilterActive, setIsFilterActive] = useState(getItemFromLocalStorage("filter-short-movies") || false); // стейт фильтра короткометражек при поиске
  const [searchedMovies, setSearchedMovies] = useState([]); // стейт массива найденных фильмов
  const [isMovieFound, setIsMovieFound] = useState(true); // найдено ли что-то в массиве фильмов
  const [isElseButtonShown, setIsElseButtonShown] = useState(false);
  
  // стейт с массивом показанных в данный момент пользователю фильмов после поиска
  const [shownMovies, setShownMovies] = useState(getItemFromLocalStorage("shown-searched-movies") || []);

  // константа - показывает, сколько фильмов отобразить в первый раз после поиска в зависимости от размера экрана
  const moviesNumbertoShowFirstTime = window.innerWidth > 1278 ? 12 : window.innerWidth < 767 ? 5 : 8;
  
  // константа - показывает, сколько фильмов отобразить в первый раз после поиска в зависимости от размера экрана
  const moviesNumbertoShowElse = window.innerWidth > 1278 ? 3 : 2;

  // стейт с количеством показанных на данный момент фильмов
  const [shownMoviesNumber, setShownMoviesNumber] = useState(moviesNumbertoShowFirstTime);

  const [savedMovies, setSavedMovies] = useState([]); // стейт массива сохраненных фильмов пользователя
  const [searchedSavedMovieName, setSearchedSavedMovieName] = useState(getItemFromLocalStorage("savedmovie-name") || ""); // введенное в поиск название сохраненного фильма
  const [isFilterSavedMoviesActive, setIsFilterSavedMoviesActive] = useState(getItemFromLocalStorage("filter-short-savedmovies") || false); // стейт фильтра короткометражек /saved-movies при поиске
  const [searchedSavedMovies, setSearchedSavedMovies] = useState(getItemFromLocalStorage("searched-savedmovies") || []); // стейт массива найденных сохраненных фильмов
  const [isSavedMovieFound, setIsSavedMovieFound] = useState(true); // найдено ли что-то в массиве сохраненных фильмов

  // переменная с массивом найденных фильмов по введенному слову searchedMovieName,
  // которая сохраняется в стейт searchedMovies и в LocalStorage
  const searchedMoviesArr = allMovies.filter(movie => movie.nameRU.toLowerCase().includes(searchedMovieName.toLowerCase()));
  
  // переменная с массивом найденных фильмов и c отбором по короткометражкам,
  const shortMovieFilterArr = searchedMovies.filter(movie => movie.duration <= 40);

  // переменная с массивом найденных сохраненных фильмов и c отбором по короткометражкам,
  const shortSavedMovieFilterArr = searchedSavedMovies.filter(movie => movie.duration <= 40);

  const navigate = useNavigate();

  useEffect(() => {
    searchedMovies.length > 0 && handleShowSearchedMoviesWithWindowSize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedMovies])

  // если результат поиска выдал фильмы, то не показывать "Не найдено"
  useEffect(() => {
    if (searchedMovies.length > 0) {
      setIsMovieFound(true) 
    }
  }, [searchedMovies])

  // если результат поиска выдал сохраненные фильмы, то не показывать "Не найдено"
  useEffect(() => {
    if (searchedSavedMovies.length > 0) {
      setIsSavedMovieFound(true) 
    }
  }, [searchedSavedMovies])

  // получение и сохранение в стейт массива сохраненных фильмов текущего пользователя
  useEffect(() => {
    loggedIn && handleGetSavedMovies();
  }, [loggedIn])

  // сохранение массива найденных фильмов в стейт searchedMovies при первом поиске с запросом к api beatfilm-movies
  useEffect(() => {
    if (allMovies.length > 0) {
      setSearchedMovies(searchedMoviesArr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMovies])

  // сохранение в LocalStorage стейта введеного в поиск названия фильма 
  useEffect(() => {
    loggedIn && localStorage.setItem('movie-name', JSON.stringify(searchedMovieName));
  }, [searchedMovieName, loggedIn]);

  // сохранение в LocalStorage стейта введеного в поиск названия сохраненнго фильма 
  useEffect(() => {
    loggedIn && localStorage.setItem('savedmovie-name', JSON.stringify(searchedSavedMovieName));
  }, [searchedSavedMovieName, loggedIn]);

  // сохранение в LocalStorage стейта массива найденных и показанных фильмов 
  useEffect(() => {
    loggedIn && localStorage.setItem('shown-searched-movies', JSON.stringify(shownMovies));
  }, [shownMovies, loggedIn]);

  // сохранение в LocalStorage стейта массива найденных сохраненных фильмов (всех, и неважно, включен ли фильтр по короткометражкам)
  useEffect(() => {
    loggedIn && localStorage.setItem('searched-savedmovies', JSON.stringify(searchedSavedMovies));
  }, [searchedSavedMovies, loggedIn]);

  // сохранение в LocalStorage стейта фильтра короткометражек при поиске
  useEffect(() => {
    loggedIn && localStorage.setItem('filter-short-movies', JSON.stringify(isFilterActive));
  }, [isFilterActive, loggedIn]);

  // сохранение в LocalStorage стейта фильтра сохраненных короткометражек при поиске
  useEffect(() => {
    loggedIn && localStorage.setItem('filter-short-savedmovies', JSON.stringify(isFilterSavedMoviesActive));
  }, [isFilterSavedMoviesActive, loggedIn]);

  // сохранение в стейт данных текущего авторизованного пользователя
  useEffect(() => {
    loggedIn && MainApi.getCurrentUser()
    .then((userInfo) => {
      setCurrentUser(userInfo)
    })
    .catch((error) => {
      console.log(`Ошибка при загрузке информации о пользователе: ${error}`)
    })
  }, [loggedIn])

  // проверка токена при обновлении страницы
  useEffect(() => {
    handleTokenCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // слушатель текущего размера окна с сохранением в стейт
  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

    ///// API FUNCTIONS START /////

  // регистрация пользователя (при успехе - автоматическая авторизация и редирект на /movies)
  function handleRegister(name, email, password) {
    MainApi.register(name, email, password)
      .then((res) => {
        // console.log(res);
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
          handleNavigateToMovies();
          setIsApiError(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsApiError(true);
        setApiErrorText(
          err === "Ошибка: 409 Conflict" ? "Пользователь с таким email уже существует." 
        : err === "Ошибка: 400 Bad Request" ? "При регистрации пользователя произошла ошибка." 
        : "500 На сервере произошла ошибка."
        );
   });
  }

  // авторизация пользователя
  function handleLogin(email, password) {
    MainApi.authorize(email, password)
      .then((data) => {
        // console.log(data.token);
        if (data.token){
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          setIsApiError(false);
          setSearchedMovies(savedMovies);
          handleNavigateToMovies();
        } 
      })
      .catch((err) => {
        console.log(err);
        setIsApiError(true);
        setApiErrorText(
          err === "Ошибка: 401 Unauthorized" ? "Вы ввели неправильный логин или пароль." 
        : err === "Ошибка: 400 Bad Request" ? " При авторизации произошла ошибка. Токен не передан или передан не в том формате." 
        : "500 На сервере произошла ошибка."
        );
      });
  }

  // проверка токена при обновлении страницы
  function handleTokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      MainApi.checkToken(jwt)
      .then((res) => {
        if (res) {
          // console.log(res)
          setLoggedIn(true);
          handleNavigateToMovies();
        }
      })
      .catch((err) => {
        console.log(`Ошибка при проверке токена: ${err}`)
     });
    }
  }

  function handleUpdateUserInfo(userInfo) {
    MainApi.updateUserInfo(userInfo)
    .then((res) => {
      console.log(res);
      setIsApiError(false);
      setCurrentUser(res.data);
    })
    .catch((err) => {
      console.log(err)
      setIsApiError(true);
      setApiErrorText(
        err === "Ошибка: 409 Conflict" ? "Пользователь с таким email уже существует." 
        : "При обновлении профиля произошла ошибка."
      );
    })
  }

  // получение всех фильмов с сервиса api beatfilm-movies при первом поиске по названию
  function handleGetAllMovies() {
    apiBeatFilm.getAllMovies()
    .then((movies) => {
      setAllMovies(movies);
      setIsLoading(false);
    })
    .catch(() => {
      console.log("Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз")
      setIsMoviesLoadingError(true);
    })
  };

  // получение всех сохраненных фильмов
  function handleGetSavedMovies() {
    MainApi.getSavedMovies()
    .then((movies) => {
      setSavedMovies(movies);
    })
    .catch((error) => {
      console.log(`Ошибка при загрузке сохраненных фильмов: ${error}`)
    })
  };

  // сохранение фильма (установка лайка и добавление на страницу saved-movies)
  function handleSaveMovies(movieInfo) {
    MainApi.saveMovie(movieInfo)
    .then((newSavedMovie) => {
      setSavedMovies([newSavedMovie, ...savedMovies]);
      handleGetSavedMovies();
    })
    .catch((err) => {
      console.log(`Ошибка при сохранении фильма: ${err}`)
    });
  };

  // удаление сохраненного фильма (снятие лайка и удаление со страницы saved-movies)
  function handleRemoveSavedMovie(movieInfo) {
    MainApi.removeSavedMovie(movieInfo._id)
    .then((res) => {
      setSavedMovies((state) => state.filter(function (m) {
        return m !== movieInfo;
      }))
    })
    .catch((err) => {
      console.log(`Ошибка при удалении фильма из списка сохраненных: ${err}`)
    });
  };
    ///// API FUNCTIONS END /////

  // редирект на страницу /movies после успешной регистрации и автоматической авторизации
  function handleNavigateToMovies() {
    navigate('/movies', {replace: true});
  }

  // функция выхода из профиля с очисткой localStorage и редиректом на страницу /
  function handleSignOut() {
    localStorage.setItem('searched-movies', JSON.stringify([]));
    localStorage.setItem('searched-savedmovies', JSON.stringify([]));
    localStorage.clear();
    setLoggedIn(false);
    navigate('/', {replace: true});
  }

  // функция получения из LocalStorage значений поиска, найденных фильмов и состояния фильтра короткометражек
  function getItemFromLocalStorage(itemName) {
    const savedItem = localStorage.getItem(itemName);
    const parsedItem = JSON.parse(savedItem);
    return parsedItem; 
  } 

  // сабмит формы поиска фильма по введенному названию
  // при первом поиске - показ прелоадера и запрос к api beatfilms для получения полного массива фильмов
  // сохранение введенного названия в стейт
  // формирование и сохранение в стейт searchedMovies массива найденных фильмов
  // если результат поиска не выдал фильмы, то показывать "Не найдено" и очистить массив 
  function handleSearchMovie(movieName) {
    if (allMovies.length === 0) {
      setIsMoviesLoadingError(false);
      handleShowPreloader();
      handleGetAllMovies();
    }
    setSearchedMovieName(movieName);
    const searchedMoviesArr = allMovies.filter(
      movie => movie.nameRU.toLowerCase().includes(movieName.toLowerCase())
    );
    setSearchedMovies(searchedMoviesArr);

    if (searchedMoviesArr.length === 0) {
      setIsMovieFound(false);
      setShownMovies([]);
    }
  }

  // сабмит формы поиска сохраненного фильма по введенному названию
  // сохранение введенного названия в стейт
  // формирование и сохранение в стейт searchedMovies массива найденных фильмов
  // если результат поиска не выдал фильмы, то показывать "Не найдено"  
  function handleSearchSavedMovie(movieName) {
    setSearchedSavedMovieName(movieName);
    const searchedSavedMoviesArr = savedMovies.filter(
      movie => movie.nameRU.toLowerCase().includes(movieName.toLowerCase())
    );
    setSearchedSavedMovies(searchedSavedMoviesArr);
    if (searchedSavedMoviesArr.length === 0) {
      setIsSavedMovieFound(false) 
    }
  }

  // включение прелоадера до полной загрузки карточек с api beatfilms
  function handleShowPreloader() {
    setIsLoading(true);
  }

  // сколько найденных фильмов отобразить сразу, в зависимости от размера экрана
  function handleShowSearchedMoviesWithWindowSize() {
    if (searchedMovies.length > moviesNumbertoShowFirstTime) {
      setIsElseButtonShown(true);
      setShownMoviesNumber(moviesNumbertoShowFirstTime);
      setShownMovies(searchedMovies.slice(0, moviesNumbertoShowFirstTime));
    } else {
      setIsElseButtonShown(false);
      setShownMovies(searchedMovies);
    }
  }

  function handleShowMoreMoviesButton() {
    if ((searchedMovies.length - shownMoviesNumber) > moviesNumbertoShowElse) {
      setShownMovies(searchedMovies.slice(0, shownMoviesNumber + moviesNumbertoShowElse));
      setShownMoviesNumber(shownMoviesNumber + moviesNumbertoShowElse);
    } else {
      setIsElseButtonShown(false);
      setShownMovies(searchedMovies);
    }
  }

  // слушатель onChange изменения переключателя фильтра по короткометражкам /movies
  function handleShortMovieFilterChange() {
    setIsFilterActive(!isFilterActive);
  }

  // слушатель onChange изменения переключателя фильтра по короткометражкам /saved-movies
  function handleShortSavedMovieFilterChange() {
    setIsFilterSavedMoviesActive(!isFilterSavedMoviesActive);
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route exact path="/signup" element={<Register 
            onRegister={handleRegister}
            isApiError={isApiError}
            apiErrorText={apiErrorText} 
          />} /> 
          <Route exact path="/signin" element={<Login 
            onLogin={handleLogin}
            isApiError={isApiError}
            apiErrorText={apiErrorText}
          />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/*" element={<MainLayout 
            windowSize={windowSize} 
            loggedIn={loggedIn}
          />} >
            <Route exact path="/*" element={<Main />} />
            <Route exact path="movies" element={
              <ProtectedRoute
                loggedIn={loggedIn}
                onGetAllMovies={handleGetAllMovies}
                allMovies={allMovies}
                isLoading={isLoading}
                isMoviesLoadingError={isMoviesLoadingError}
                onShowPreloader={handleShowPreloader}
                onSearchMovie={handleSearchMovie}
                searchedMovieName={searchedMovieName}
                onShortMovieFilter={handleShortMovieFilterChange}
                isFilterActive={isFilterActive}
                isFound={isMovieFound}
                isElseButtonShown={isElseButtonShown}
                onShowMoreMovies={handleShowMoreMoviesButton}
                onSaveMovie={handleSaveMovies}
                savedMovies={savedMovies}
                onRemoveSavedMovie={handleRemoveSavedMovie}
                movieArr={isFilterActive ? shortMovieFilterArr : shownMovies}
                component={Movies}
              />}
            />
            <Route exact path="saved-movies" element={
              <ProtectedRoute
                loggedIn={loggedIn}
                movieArr={isFilterSavedMoviesActive ? shortSavedMovieFilterArr : searchedSavedMovies}
                onSearchSavedMovie={handleSearchSavedMovie}
                searchedSavedMovieName={searchedSavedMovieName}
                onShortSavedMoviesFilter={handleShortSavedMovieFilterChange}
                isFilterSavedMoviesActive={isFilterSavedMoviesActive}
                isSavedMovieFound={isSavedMovieFound}
                onSaveMovie={handleSaveMovies}
                savedMovies={savedMovies}
                onRemoveSavedMovie={handleRemoveSavedMovie}
                component={SavedMovies}
              />}
            />
            <Route exact path="profile" element={
              <ProtectedRoute
                loggedIn={loggedIn}
                currentUser={currentUser}
                onUpdateUserInfo={handleUpdateUserInfo}
                isApiError={isApiError}
                apiErrorText={apiErrorText}
                onSignOut={handleSignOut}
                component={Profile}
              />}
            />
          </Route>
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
