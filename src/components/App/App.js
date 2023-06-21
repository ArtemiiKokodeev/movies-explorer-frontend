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
  const [isApiError, setIsApiError] = useState(false); // стейт ответа при обращении к API
  const [apiErrorText, setApiErrorText] = useState(""); // текст ответа при обращении к API
  const [isLoading, setIsLoading] = useState(false); // стейт для отображения/скрытия прелоадера
  const [allMovies, setAllMovies] = useState([]); // все фильмы с сервиса api beatfilm-movies
  const [searchedMovieName, setSearchedMovieName] = useState(""); // введенное в поиск название фильма
  const [isFilterActive, setIsFilterActive] = useState(() => { // стейт фильтра короткометражек при поиске, сохраняется в LocalStorage
    const savedItem = localStorage.getItem("filter");
    const parsedItem = JSON.parse(savedItem);
    return parsedItem || false;
  }); 
  const [searchedMovies, setSearchedMovies] = useState(() => { // стейт массива найденных фильмов, сохраняется в LocalStorage
    const savedItem = localStorage.getItem("searched-movies");
    const parsedItem = JSON.parse(savedItem);
    return parsedItem || [];
  }); 

  // переменная с массивом найденных фильмов по введенному слову searchedMovieName,
  // которая сохраняется в стейт searchedMovies и в LocalStorage
  const searchedMoviesArr = allMovies.filter(
    movie => movie.nameRU.toLowerCase().includes(searchedMovieName.toLowerCase())
  );
  
  // переменная с массивом найденных фильмов и отбором по короткометражкам,
  const shortMovieFilterArr = searchedMovies.filter(movie => movie.duration <= 40);

  // сохранение массива найденных фильмов в стейт searchedMovies при первом поиске с запросом к api beatfilm-movies
  useEffect(() => {
    if (allMovies.length > 0) {
      setSearchedMovies(searchedMoviesArr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allMovies])

  // сохранение в LocalStorage стейта фильтра короткометражек при поиске
  useEffect(() => {
    loggedIn && localStorage.setItem('filter', JSON.stringify(isFilterActive));
  }, [isFilterActive, loggedIn]);

  // сохранение в LocalStorage стейта массива найденных фильмов (всех, и неважно, включен ли фильтр по короткометражкам)
  useEffect(() => {
    loggedIn && localStorage.setItem('searched-movies', JSON.stringify(searchedMovies));
  }, [searchedMovies, loggedIn]);

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
  
  const navigate = useNavigate();

    // API FUNCTIONS START //

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
    .catch((error) => {
      console.log(`Ошибка при загрузке фильмов: ${error}`)
    })
  };
  
    // API FUNCTIONS END //

  // редирект на страницу /movies после успешной регистрации и автоматической авторизации
  function handleNavigateToMovies() {
    navigate('/movies', {replace: true});
  }

  function handleSignOut() {
    localStorage.clear();
    setLoggedIn(false);
    navigate('/', {replace: true});
  }

  // сабмит формы поиска фильма по введенному названию и его сохранение в стейт
  // а также сохранение в стейт searchedMovies массива найденных фильмов
  function handleSearchMoviebyName(movieName) {
    setSearchedMovieName(movieName);
    const searchedMoviesArr = allMovies.filter(
      movie => movie.nameRU.toLowerCase().includes(movieName.toLowerCase())
    );
    setSearchedMovies(searchedMoviesArr);
  }

  // включение прелоадера до полной загрузки карточек
  function handleShowPreloader() {
    setIsLoading(true);
  }

  // слушатель onChange изменения переключателя фильтра по короткометражкам
  function handleShortMovieFilterChange() {
    setIsFilterActive(!isFilterActive);
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
              searchedMovies={searchedMovies}
              isLoading={isLoading}
              onShowPreloader={handleShowPreloader}
              onSearchMovie={handleSearchMoviebyName}
              onShortMovieFilter={handleShortMovieFilterChange}
              isFilterActive={isFilterActive}
              movieArr={

                isFilterActive ? shortMovieFilterArr : searchedMovies
              }
              component={Movies}
            />}
          />
          <Route exact path="saved-movies" element={
            <ProtectedRoute
              // loggedIn={loggedIn}
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
