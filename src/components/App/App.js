import { React, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
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

  const [windowSize, setWindowSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div className="App">
      <Routes>
      <Route exact path="/signup" element={<Register />} /> 
      <Route exact path="/signin" element={<Login />} />
      <Route path="*" element={<PageNotFound />} />
      <Route exact path="/*" element={<MainLayout windowSize={windowSize}/>}>
        <Route path="/*" element={<Main />} />
        <Route exact path="movies" element={<Movies />} /> 
        <Route exact path="saved-movies" element={<SavedMovies />} /> 
        <Route exact path="profile" element={<Profile />} />
      </Route>

      </Routes>
    </div>
  );
}

export default App;
