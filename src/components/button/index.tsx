import React from 'react';
import './index.scss';

interface IButtonProps {
  btnTitle: string; //Decide on how the text will be passed
  width: any;
  background: any;
}

const Button: React.FC<IButtonProps> = ({ btnTitle, width, background }) => {
  return (
    <div className='btnContainer' style={{ width: width }}>
      <button
        type='button'
        className='btnContainer__btn'
        style={{ background: background }}
      >
        {btnTitle}
      </button>
    </div>
  );
};

export default Button;
