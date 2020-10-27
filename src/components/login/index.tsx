import React, { useState } from 'react';
import './index.scss';
import FangameLiveLogoLight from '../../assets/FangameLiveLogoLight.png';
// components import
import LoginModal from '../loginModal';

const Login: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div className='loginContainer'>
      <div className='loginContainer__top'>
        <div className='loginContainer__top__intro'>
          <div className='loginContainer__top__intro__welcome'>Welcome</div>
          <div className='loginContainer__top__intro__to'>to</div>
        </div>
        <div className='loginContainer__top__heading'>
          <div className='loginContainer__top__heading__logo'>
            <img
              className='loginContainer__top__heading__logo__light'
              src={FangameLiveLogoLight}
              alt='Fan Game Live Logo'
            />
          </div>
          {/* <div className='loginContainer__top__heading__fanGame'>FANGAME</div>
          <div className='loginContainer__top__heading__live'>LIVE</div> */}
        </div>
        <div className='loginContainer__top__divider'></div>
        <div className='loginContainer__top__slogan'>Live Quiz. Easy Money</div>
      </div>
      <LoginModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
      <div className='loginContainer__bottom'>
        {/* <div className='loginContainer__bottom__fbBtn'>
          <button type='button'>Login Via</button>
        </div>
        <div className='loginContainer__bottom__googleBtn'>
          <button type='button'>Login Via</button>
        </div> */}
        {/* <div className='loginContainer__bottom__divider'></div> */}
        <div className='loginContainer__bottom__phoneBtn'>
          <button type='button' onClick={() => setModalIsOpen(true)}>
            Login Using phone
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
