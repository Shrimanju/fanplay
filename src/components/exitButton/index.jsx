import React from 'react';
import './index.scss';

const ExitButton = ({ setExitConfirmModalIsOpen }) => {
  return (
    <div className='exitButton'>
      <button
        className='exitButton__btn'
        onClick={() => setExitConfirmModalIsOpen(true)}
      >
        Exit X
      </button>
    </div>
  );
};

export default ExitButton;
