import React, { useState } from 'react';
import './index.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { verifyHostOtp } from '../../actions/auth';
import { Redirect } from 'react-router-dom';
// components import
import OtpInput from 'react-otp-input';
import Modal from 'react-modal';
Modal.setAppElement('#root');

const OtpModal = (props) => {
  const [otp, setOtp] = useState('');

  //Redirect if logged in
  if (props.isAuthenticated) {
    return <Redirect to='/influencerProfile' />;
  }

  const customStyles = {
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
  };
  return (
    <div>
      <Modal
        style={customStyles}
        isOpen={props.isOtpModalOpen}
        onRequestClose={() => props.setIsOtpModalOpen(false)}
      >
        <div className='otpModal'>
          <div className='otpModal__otp'>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              separator={<span>-</span>}
              isInputNum={true}
            />
          </div>
          <div className='otpModal__confirm'>
            <button
              type='button'
              onClick={() => {
                props.verifyHostOtp(props.otp_details.mobile, otp);
              }}
            >
              confirm
            </button>{' '}
          </div>
          <div className='otpModal__resendOtp'>
            <button className='otpModal__resendOtp__btn' type='button'>
              {/*implement resend OTP API mechanism*/}
              resend OTP
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

OtpModal.propTypes = {
  otp_details: PropTypes.object,
  verifyHostOtp: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  otp_details: state.auth.otp_details,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { verifyHostOtp })(OtpModal);
