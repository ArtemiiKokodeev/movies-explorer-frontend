import { React, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './MainLayout.css';
import Header from '../Header/Header';
import NavigationPopup from '../NavigationPopup/NavigationPopup';

function MainLayout( { windowSize, loggedIn } ) {

  const [isNavigationPopupOpen, setIsNavigationPopupOpen] = useState(false);

  function handleGroupMenuIconClick() {
    setIsNavigationPopupOpen(true);
  }

  function closeNavPopup() {
    setIsNavigationPopupOpen(false);
  }

  return (
    <>
      <Header 
        windowSize={windowSize}
        onNavigationPopup={handleGroupMenuIconClick}
        loggedIn={loggedIn}
      />

      <Outlet />

      <NavigationPopup
        isOpen={isNavigationPopupOpen}
        onClose={closeNavPopup}
      />
    </>
    
  );
}

export default MainLayout;
