import { React, useState } from 'react';
import { Outlet } from 'react-router-dom';
import './MainLayout.css';
import Header from '../Header/Header';
import NavigationPopup from '../NavigationPopup/NavigationPopup';

function MainLayout( { windowSize } ) {

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
      />

      <NavigationPopup
        isOpen={isNavigationPopupOpen}
        onClose={closeNavPopup}
      />

      <Outlet />
    </>
    
  );
}

export default MainLayout;
