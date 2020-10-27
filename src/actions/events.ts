//get host events
import axios from 'axios';
import {
  CREATE_EVENT_FAIL,
  CREATE_EVENT_SUCCESS,
  EVENT_BEGIN,
  EVENT_ENDED,
  EVENT_NOT_STARTED,
  GET_CURRENT_EVENT_DETAILS,
  GET_EVENTQUESTIONS,
  GET_HOSTEVENTS,
} from './types';
import setAuthToken from '../utils/setAuthToken';
// API endpoint
const { REACT_APP_API_ENDPOINT } = process.env;

export const getHostEvents = () => async (dispatch: any) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(
      `${REACT_APP_API_ENDPOINT}/event/getHostEvents`
    );

    dispatch({
      type: GET_HOSTEVENTS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// createEvent

export const createEvent = (
  formData: object,
  history: any,
  setIsLoadingSpinnerOpen: any
) => async (dispatch: any) => {
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
      `${REACT_APP_API_ENDPOINT}/event/createEvent`,
      formData,
      config
    );
    if (res.data.code === 200) {
      getHostEvents(); //to update the current state of hoseEvents
      dispatch({
        // what to send if the create Event fails)
        type: CREATE_EVENT_SUCCESS,
      });
      setIsLoadingSpinnerOpen(false);
      history.goBack();
    } else {
      dispatch({
        // what to send if the create Event fails)
        type: CREATE_EVENT_FAIL,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

// GET current event details
export const getCurrentEventDetails = (eventId: any) => async (
  dispatch: any
) => {
  try {
    const res = await axios.get(
      `${REACT_APP_API_ENDPOINT}/event/getEventDetails`,
      {
        params: { eventId: eventId },
      }
    );

    dispatch({
      type: GET_CURRENT_EVENT_DETAILS,
      payload: res.data.eventDetails,
    });
  } catch (err) {
    console.log(err);
  }
};

// GET event questions based on event ID
export const getEventQuestions = (eventId: any) => async (dispatch: any) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get(
      `${REACT_APP_API_ENDPOINT}/event/getEventQuestions`,
      { params: { eventId: eventId } }
    );

    dispatch({
      type: GET_EVENTQUESTIONS,
      payload: res.data,
    });
    // getCurrentEventDetails(eventId);
  } catch (err) {
    console.log(err);
  }
};

// POSt to check if event is  accessible
export const accessEvent = (
  eventId: any,
  eventTime: any,
  history: any
) => async (dispatch: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ eventId });

  try {
    const res = await axios.post(
      `${REACT_APP_API_ENDPOINT}/event/accessEvent`,
      body,
      config
    );
    console.log(res.data);
    dispatch({
      type: EVENT_BEGIN,
      payload: eventTime,
    });
    // getEventQuestions(eventId);
    // history.push(`/selectQuestions/${eventId}`);
    history.push(`/countdownTimer/${eventId}`);
  } catch (err) {
    console.log(err);
    if (err.response.data.msg === 'EVENT_ENDED') {
      dispatch({
        type: EVENT_ENDED,
        payload: err.response.data.msg,
      });
    } else {
      dispatch({
        type: EVENT_NOT_STARTED,
        payload: eventTime,
      });
      history.push(`/countdownTimer/${eventId}`);
    }
  }
};
