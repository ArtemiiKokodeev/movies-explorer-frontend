import { React } from 'react';
import './NavigationPopup.css';
import Navigation from '../Navigation/Navigation';

function NavigationPopup( { isOpen, onClose } ) {
  
  return (
    <>
      <div className={`navigation-popup ${isOpen && 'navigation-popup_opened'}`}>
        <div className="navigation-popup__container">
          <button onClick={onClose} className="navigation-popup__close" type="button"></button>
          <Navigation onClose={onClose}/>
        </div>
      </div>
    </>
  )
}

export default NavigationPopup;