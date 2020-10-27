import React, { useState } from 'react';
import Modal from 'react-modal';
import { hostUpdateProfile } from '../../actions/profile';
import './index.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const button = {
  fontSize: '1em',
  textAlign: 'center',
  // color: 'black',
  backgroundColor: "white",
  margin: ".3rem ",
  padding: "9px 19px",
  // border: 'groove',
  cursor: 'pointer',
  minHeight: "auto",
  minWidth: "auto",
  position: "relative",
  fontWeight: "400",
  letterSpacing: "0",
  // willChange: "box-shadow, transform",
  opacity: 0.8,
  borderRadius: "20px",
  outline: 'none',
  boxShadow: 'none'

}

const UpdateProfileModal = ({
  isUpdateProfileModalOpen,
  setIsUpdateProfileModalOpen,
  hostUpdateProfile,
}) => {
  const [formData, setFormData] = useState({
    hostName: '',
    email: '',
    gender: '',
    instagramId: '',
    interests: '',
    photoIdProof: '',
    upiAddress: '',
    paytmNumber: '',
    bankAccountDetails: {},
    balance: '',
  });

  const [bankAccountDetails, setBankAccountDetails] = useState({
    accountNumber: '',
    ifsc: '',
    accountHolderName: '',
  });
  const {
    hostName,
    email,
    gender,
    instagramId,
    interests,
    photoIdProof,
    upiAddress,
    paytmNumber,
    balance,
  } = formData;

  const { accountNumber, accountHolderName, ifsc } = bankAccountDetails;

  const onChangeDetails = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChangeAccountDetails = (e) => {
    setBankAccountDetails({
      ...bankAccountDetails,
      [e.target.name]: e.target.value,
    });
  };

  const onClickUpdateProfile = () => {
    hostUpdateProfile(formData, bankAccountDetails);
    setFormData({
      hostName: '',
      email: '',
      gender: '',
      instagramId: '',
      interests: '',
      photoIdProof: '',
      upiAddress: '',
      paytmNumber: '',
      bankAccountDetails: {},
      balance: '',
    });
    setBankAccountDetails({
      accountNumber: '',
      ifsc: '',
      accountHolderName: '',
    });
    setIsUpdateProfileModalOpen(false);
  };

  return (
    <div className='updateProfile'>
      <Modal
        isOpen={isUpdateProfileModalOpen}
        onRequestClose={() => setIsUpdateProfileModalOpen(false)}
      >
        <div className='updateProfile__form'>
          <div className='updateProfile__form__heading'>Update Profile</div>
          <div className='updateProfile__form__hostName'>
            <input
              type='text'
              placeholder='Host Name'
              name='hostName'
              value={hostName}
              onChange={(e) => onChangeDetails(e)}
            />
          </div>
          <div className='updateProfile__form__gender'>
            <input
              type='text'
              placeholder='gender'
              name='gender'
              value={gender}
              onChange={(e) => onChangeDetails(e)}
            />
          </div>
          <div className='updateProfile__form__email'>
            <input
              type='text'
              placeholder='email'
              name='email'
              value={email}
              onChange={(e) => onChangeDetails(e)}
            />
          </div>
          <div className='updateProfile__form__instagramId'>
            <input
              type='text'
              placeholder='Instagram ID'
              name='instagramId'
              value={instagramId}
              onChange={(e) => onChangeDetails(e)}
            />
          </div>
          <div className='updateProfile__form__interests'>
            <input
              type='text'
              placeholder='Enter your interests'
              name='interests'
              value={interests}
              onChange={(e) => onChangeDetails(e)}
            />
          </div>
          <div className='updateProfile__form__photoIdProof'>
            <input
              type='text'
              placeholder='photo IdProof'
              name='photoIdProof'
              value={photoIdProof}
              onChange={(e) => onChangeDetails(e)}
            />
          </div>
          <div className='updateProfile__form__upiAddress'>
            <input
              type='text'
              placeholder='UPI ID'
              name='upiAddress'
              value={upiAddress}
              onChange={(e) => onChangeDetails(e)}
            />
          </div>
          <div className='updateProfile__form__paytmNumber'>
            <input
              type='text'
              placeholder='PayTM Number'
              name='paytmNumber'
              value={paytmNumber}
              onChange={(e) => onChangeDetails(e)}
            />
          </div>
          <div className='updateProfile__form__accountNumber'>
            <input
              type='text'
              placeholder='Account Number'
              name='accountNumber'
              value={accountNumber}
              onChange={(e) => onChangeAccountDetails(e)}
            />
          </div>
          <div className='updateProfile__form__accountHolderName'>
            <input
              type='text'
              placeholder='Account Holder Name'
              name='accountHolderName'
              value={accountHolderName}
              onChange={(e) => onChangeAccountDetails(e)}
            />
          </div>
          <div className='updateProfile__form__ifsc'>
            <input
              type='text'
              placeholder='IFSC'
              name='ifsc'
              value={ifsc}
              onChange={(e) => onChangeAccountDetails(e)}
            />
          </div>
          <div className='updateProfile__form__balance'>
            <input
              type='text'
              placeholder='Balance'
              name='balance'
              value={balance}
              onChange={(e) => onChangeDetails(e)}
            />
          </div>
          <div className='updateProfile__form__btn'>
            <button onClick={() => onClickUpdateProfile()} style={button}>
              Update Profile
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// export default UpdateProfileModal;
UpdateProfileModal.propTypes = {
  hostUpdateProfile: PropTypes.func,
};

// const mapStateToProps = (state) => ({
//   otp_details: state.auth.otp_details,
//   isAuthenticated: state.auth.isAuthenticated,
// });

export default connect(null, { hostUpdateProfile })(UpdateProfileModal);
