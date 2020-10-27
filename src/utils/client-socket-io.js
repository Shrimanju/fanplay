import * as io from 'socket.io-client';

// const ENDPOINT = '15.207.100.112';
const { REACT_APP_API_ENDPOINT } = process.env;
export let socket;

// Initate client-socket
export const initiateSocket = () => {
  socket = io(REACT_APP_API_ENDPOINT, {
    transports: ['polling', 'websocket'],
    query: {
      token: localStorage.getItem('token'),
    },
  });
  subscribeToEvent(localStorage.getItem('currentEventId'));
};

// susbscribe to event and emit StartEvent
export const subscribeToEvent = (eventId) => {
  if (!socket) return;
  socket.on('connect', (data) => {
    console.log('socket connected');
    socket.emit('startEvent', eventId);
  });
  subscribeToAgora();
};

// subscribe to agora Token emitter
export const subscribeToAgora = () => {
  socket.on('agoraChannelToken', (data) => {
    console.log('Agora token received:', data);
    localStorage.setItem('agoraRTC', data.agoraToken);
    localStorage.setItem('agoraRTM', data.agoraRTMToken);
    localStorage.setItem('agoraRtmUID', data.id);
  });
};
