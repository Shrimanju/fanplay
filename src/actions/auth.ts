import axios from 'axios';
// import React from 'react';
// import { useDispatch } from 'react-redux';
import setAuthToken from '../utils/setAuthToken';
import { getHostEvents } from './events';
import { getHostDetails } from './profile';
import {
  AUTH_ERROR,
  GET_HOSTEVENTS,
  RECEIVEOTP_SUCCESS,
  USER_LOADED,
  VERIFYOTP_CORRECT,
  VERIFYOTP_INCORRECT,
} from './types';
// API endpoint
const { REACT_APP_API_ENDPOINT } = process.env;

// load user Data
export const loadUser = () => async (dispatch: any) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  } else {
    dispatch({
      type: AUTH_ERROR,
    });
  }
  try {
    const res = await axios.get(
      `${REACT_APP_API_ENDPOINT}/event/getHostEvents`
    );
    dispatch({
      type: USER_LOADED,
    });
    dispatch({
      type: GET_HOSTEVENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// action to request for host OTP
export const registerLoginHost = (mobile: string) => async (dispatch: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ mobile });
  try {
    const res = await axios.post(
      `${REACT_APP_API_ENDPOINT}/host/v2/registerLoginHost`,
      body,
      config
    );
    dispatch({
      // what to send if the OTP is not received (add this)
      type: RECEIVEOTP_SUCCESS,
      payload: res.data.otp_details,
    });
  } catch (err) {
    console.log(err);
  }
};

// if (res.statusText === 'ok') {
//   dispatch({
//     type: RECEIVEOTP_SUCCESS,
//     payload: res.data,
//   });
// }

// action to verify HostOTP
export const verifyHostOtp = (mobile: string, otp: string) => async (
  dispatch: any
) => {
  // const dispatch = useDispatch();
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ host: { mobile: mobile, otp: otp } });
  try {
    const res = await axios.post(
      `${REACT_APP_API_ENDPOINT}/host/v2/verifyHostOtp`,
      body,
      config
    );
    console.log(res);
    dispatch({
      // what to send if the OTP is not received (add this)
      type: VERIFYOTP_CORRECT,
      payload: res,
    });
    // getHostDetails();
  } catch (err) {
    console.log(err);
    //   dispatch({
    //     type: VERIFYOTP_INCORRECT,
    //   });
  }
};
