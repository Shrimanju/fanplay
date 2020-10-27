import { Redirect } from 'react-router';
import {
  CREATE_EVENT_FAIL,
  CREATE_EVENT_SUCCESS,
  EVENT_BEGIN,
  EVENT_ENDED,
  EVENT_NOT_STARTED,
  GET_CURRENT_EVENT_DETAILS,
  GET_EVENTQUESTIONS,
  GET_HOSTEVENTS,
} from '../actions/types';
const initialState = {
  hostEvents: null,
  eventQuestions: null,
  currentEventDetails: null,
  remainingTime: null,
  currentEventTime: null,
};

export default function (state = initialState, action: any) {
  const { type, payload } = action;
  switch (type) {
    case GET_HOSTEVENTS:
      return {
        ...state,
        hostEvents: payload,
      };
    case CREATE_EVENT_SUCCESS:
      alert('Event Creation Successs!!');
      return state;
    case CREATE_EVENT_FAIL:
      alert('Event Creation FAILED');
      return state;
    case GET_EVENTQUESTIONS:
      return {
        ...state,
        eventQuestions: payload,
      };

    case EVENT_ENDED:
      alert(payload);
      return state;
    case EVENT_NOT_STARTED:
      return { ...state, remainingTime: payload, currentEventTime: payload };
    case EVENT_BEGIN:
      return {
        ...state,
        remainingTime: null,
        currentEventTime: payload,
      };
    case GET_CURRENT_EVENT_DETAILS:
      return {
        ...state,
        currentEventDetails: payload,
      };

    default:
      return state;
  }
}
