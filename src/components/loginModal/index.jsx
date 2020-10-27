import './index.scss';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// components import
import Modal from 'react-modal';
import OtpModal from '../otpModal';
// import { Close } from '@material-ui/icons';
import { registerLoginHost } from '../../actions/auth';
Modal.setAppElement('#root');

const LoginModal = (props) => {
  const [FormData, setFormData] = useState({
    mobile: '',
  });
  const { mobile } = FormData;
  const onChange = (e) =>
    setFormData({ ...FormData, [e.target.name]: e.target.value });

  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);

  const sendOtp = () => {
    setIsOtpModalOpen(true);
    props.registerLoginHost(FormData.mobile);
  };

  const customStyles = {
    content: {
      position: 'absolute',
      top: 'calc(50vh - 165px)',
      left: 'calc(50vw - 165px)',
      right: '0px',
      bottom: '0px',
      border: 'none',
      //  background: 'rgb(255, 255, 255)',
      overflow: 'auto',
      outline: 'none',
      padding: '0',
      width: '330px',
      height: '330px',
      background:
        'transparent linear-gradient(270deg, #102f54 0%, #030911 100%)',
      borderRadius: '50%',
    },
    overlay: {
      position: 'fixed',
      top: '0px',
      left: '0px',
      right: '0px',
      bottom: '0px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#00000000 0% 0% no-repeat padding-box',
      backdropFilter: 'blur(6px)',
    },
  };
  return (
    <div className='loginModal'>
      <Modal
        style={customStyles}
        isOpen={props.modalIsOpen}
        onRequestClose={() => props.setModalIsOpen(false)}
      >
        <div className='loginModal'>
          <div className='loginModal__close'>
            <button
              className='loginModal__close__btn'
              type='button'
              onClick={() => props.setModalIsOpen(false)}
            >
              +
            </button>
          </div>
          <div className='loginModal__phoneNum'>
            <input
              className='loginModal__phoneNum__input'
              placeholder='Phone Number'
              type='text'
              value={mobile}
              onChange={(e) => onChange(e)}
              name='mobile'
              required
            />
          </div>
          {/* <div className='loginModal__password'>
            <input
              className='loginModal__password__input'
              placeholder='Password'
              type='text'
            />
          </div> */}
          {/* <div className='loginModal__login'>
            <button className='loginModal__login__btn' type='button'>
              LOGIN
            </button>
          </div> */}
          {/* <div className='loginModal__forgotpwd'>
            <a className='loginModal__forgotpwd__btn' href='#!'>
              forgot password
            </a>
          </div> */}
          {/* <div className='loginModal__divider'>
            <div className='loginModal__divider__bar'></div>
            <div className='loginModal__divider__or'>or</div>
            <div className='loginModal__divider__bar'></div>
          </div> */}
          {/* <div className='loginModal__signUp'>
            <button className='loginModal__signUp__btn' type='button'>
              sign up
            </button>
          </div> */}
          <div className='loginModal__enterOtp'>
            <button
              className='loginModal__enterOtp__btn'
              onClick={() => sendOtp()}
            >
              Receive Otp
            </button>
          </div>
          <OtpModal
            isOtpModalOpen={isOtpModalOpen}
            setIsOtpModalOpen={setIsOtpModalOpen}
          />
        </div>
      </Modal>
    </div>
  );
};

LoginModal.propTypes = {
  otp_details: PropTypes.object,
  registerLoginHost: PropTypes.func,
};

const mapStateToProps = (state) => ({
  otp_details: state.auth.otp_details,
});

export default connect(mapStateToProps, { registerLoginHost })(LoginModal);
