import { RECEIVED_CHANNEL_MESSAGE } from '../actions/types';
const initialState = {
  comments: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case RECEIVED_CHANNEL_MESSAGE:
      return {
        ...state,
        comments: [...state.comments, payload],
      };

    default:
      return state;
  }
}
