import React from 'react';
import './index.scss';

interface IProfileButtonProps {
  btnTitle: string; //Decide on how the text will be passed
  width: any;
  onClick?: any;
}

const ProfileButton: React.FC<IProfileButtonProps> = ({
  btnTitle,
  width,
  onClick,
}) => {
  return (
    <div className='btnContainer' style={{ width: width }}>
      <button type='button' className='btnContainer__btn'>
        {btnTitle}
      </button>
    </div>
  );
};

export default ProfileButton;
