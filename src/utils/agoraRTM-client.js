import AgoraRTM from 'agora-rtm-sdk';
import { OnReceiveChannelMessage } from '../actions/comments';

let client;
export let channel;
// const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export const rtmClientCreate = (appId) => {
  client = AgoraRTM.createInstance(appId);
  console.log('Client Instance : ', client);
};

export const rtmClientConnectionStateChange = () => {
  client.on('ConnectionStateChanged', (newState, reason) => {
    console.log(
      'on connection state changed to ' + newState + ' reason: ' + reason
    );
    switch (reason) {
      case 'LOGIN_SUCCESS':
        rtmClientCreateChannel();
        break;
      default:
        return;
    }
  });
};

export const rtmClientLogin = (token, uid) => {
  client
    .login({ token: token, uid: uid })
    .then(() => {
      console.log('AgoraRTM client login success');
    })
    .catch((err) => {
      console.log('AgoraRTM client login failure', err);
    });
};

export const rtmClientCreateChannel = () => {
  channel = client.createChannel(localStorage.getItem('currentEventId'));
  console.log('Channel created: ', channel);
  if (channel) rtmClientJoinChannel();
};

export const rtmClientJoinChannel = () => {
  channel
    .join()
    .then(() => {
      console.log('Channel join success');
      ChannelReceiveMessage();
    })
    .catch((error) => {
      console.log('unable to join the channel', error);
    });
};

export const sendChannelMessage = (message) => {
  channel
    .sendMessage({ text: message })
    .then(() => {
      console.log('Message sent to channel success :', message);
    })
    .catch((error) => {
      console.log('message send to channel FAIL :', error);
    });
};

export const ChannelReceiveMessage = () => {
  channel.on('ChannelMessage', ({ text }, senderId) => {
    console.log('Message from userId senderId :' + text);
    OnReceiveChannelMessage(text);
  });
};

export const rtmClientLogout = () => {
  client.logout();
  console.log('rtmClient logged out');
};
