import { stat } from 'fs';
import {
  GET_HOSTDETAILS,
  PROFILE_PICTURE_UPDATED,
  UPDATE_PROFILE,
} from '../actions/types';

const initialState = {
  hostDetails: null,
  profilePhotoURL: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_PROFILE:
      localStorage.setItem('token', payload.headers['x-auth-token']);
      alert('Profile Update Successful!');
      return state;
    case PROFILE_PICTURE_UPDATED:
      return { ...state, profilePhotoURL: payload.hostImage };
    case GET_HOSTDETAILS:
      return { ...state, hostDetails: payload };
    default:
      return state;
  }
}
