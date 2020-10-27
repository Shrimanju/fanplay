import { getHostDetails } from '../actions/profile';
import {
  AUTH_ERROR,
  RECEIVEOTP_SUCCESS,
  USER_LOADED,
  VERIFYOTP_CORRECT,
  // VERIFYOTP_INCORRECT,
} from '../actions/types';

const initialState = {
  user: null,
  isAuthenticated: null,
  loading: true,
  token: localStorage.getItem('token'),
};

export default function (state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
      };
    case AUTH_ERROR:
      localStorage.removeItem('token');
      localStorage.removeItem('hostName');
      localStorage.removeItem('currentEventId');
      localStorage.removeItem('agoraRtmUID');
      localStorage.removeItem('agoraRTM');
      localStorage.removeItem('agoraRTC');
      // localStorage.removeItem('last_name');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case RECEIVEOTP_SUCCESS:
      return {
        ...state,
        otp_details: payload,
      };
    case VERIFYOTP_CORRECT:
      localStorage.setItem('token', payload.headers['x-auth-token']);
      localStorage.setItem('hostName', payload.data.hostName);
      // getHostDetails();
      // localStorage.setItem('last_name', payload.data.last_name);
      return {
        ...state,
        user: payload.data,
        isAuthenticated: true,
        // loading: false,
        token: payload.headers['x-auth-token'],
      };
    // case VERIFYOTP_INCORRECT: redirect to login page
    default:
      return state;
  }
}
