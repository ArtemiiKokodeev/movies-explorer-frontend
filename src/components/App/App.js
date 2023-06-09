import { React, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import NavigationPopup from '../NavigationPopup/NavigationPopup';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
// import Movies from '../Movies/Movies';
// import SavedMovies from '../SavedMovies/SavedMovies';
// import Profile from '../Profile/Profile';
// import Register from '../Register/Register';
// import Login from '../Login/Login';



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

  const [isNavigationPopupOpen, setIsNavigationPopupOpen] = useState(false);

  function handleGroupMenuIconClick() {
    setIsNavigationPopupOpen(true);
  }

  function closeAllPopups() {
    setIsNavigationPopupOpen(false);
  }

  return (
    <div className="App">
      <Header 
        windowSize={windowSize}
        onNavigationPopup={handleGroupMenuIconClick}
      />

      <NavigationPopup
        isOpen={isNavigationPopupOpen}
        onClose={closeAllPopups}
      />

      <Routes>
        <Route exact path="/"
          element={<Main
          />}
        />

        {/* <Route exact path="/movies"
            element={<Movies
            />}
        />

        <Route exact path="/saved-movies"
            element={<SavedMovies
            />}
        />

        <Route exact path="/profile"
            element={<Profile
            />}
        />

        <Route exact path="/signup"
            element={<Register
            />}
        />

        <Route exact path="/signin"
            element={<Login
            />}
        /> */}
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
