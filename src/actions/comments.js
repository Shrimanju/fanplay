import { RECEIVED_CHANNEL_MESSAGE } from './types';
import { store } from '../store';

// Receive Channel Message
export const OnReceiveChannelMessage = (message) => {
  store.dispatch({
    type: RECEIVED_CHANNEL_MESSAGE,
    payload: message,
  });
};
