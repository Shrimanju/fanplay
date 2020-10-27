import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import {
  GET_HOSTDETAILS,
  PROFILE_PICTURE_UPDATED,
  UPDATE_PROFILE,
} from './types';
// API endpoint
const { REACT_APP_API_ENDPOINT } = process.env;

// Update influencer profile
export const hostUpdateProfile = (formData, bankAccountDetails) => async (
  dispatch
) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  formData.interests = formData.interests
    .split(',')
    .map((interest) => interest.trim());
  formData.bankAccountDetails = bankAccountDetails;
  const body = JSON.stringify(formData);
  try {
    const res = await axios.put(
      `${REACT_APP_API_ENDPOINT}/host/updateHostProfile`,
      body,
      config
    );
    console.log('Complete Response: ', res);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res,
    });
    const updateProfileRes = await axios.get(
      `${REACT_APP_API_ENDPOINT}/host/hostDetails`
    );

    dispatch({
      type: GET_HOSTDETAILS,
      payload: updateProfileRes.data,
    });
  } catch (err) {
    console.log('Error Object: ', err);
    console.log('Exact eroor', err.response.data.msg);
    alert(`Profile Update FAILED: ${err.response.data.msg}`);
  }
};

//Update profile photo
export const hostUpdateProfilePicture = (formData) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const config = {
    headers: {
      'Content-Type': 'undefined',
    },
  };
  try {
    const res = await axios.post(
      `${REACT_APP_API_ENDPOINT}/host/uploadProfilePicture`,
      formData,
      config
    );
    if (res.data.code === 200) {
      // take the link and do something

      dispatch({
        type: PROFILE_PICTURE_UPDATED,
        payload: res.data,
      });
      const updateProfileRes = await axios.get(
        `${REACT_APP_API_ENDPOINT}/host/hostDetails`
      );

      dispatch({
        type: GET_HOSTDETAILS,
        payload: updateProfileRes.data,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// get host details
export const getHostDetails = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(`${REACT_APP_API_ENDPOINT}/host/hostDetails`);

    dispatch({
      type: GET_HOSTDETAILS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};
