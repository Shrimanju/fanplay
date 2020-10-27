import AgoraRTC from 'agora-rtc-sdk';

// rtc object
var rtc = {
  client: null,
  joined: false,
  published: false,
  localStream: null,
  remoteStreams: [],
  params: {},
};

// Options for joining a channel
var option = {
  appID: null,
  channel: '',
  uid: null,
  token: '',
};

// Create a client
export const rtcClientCreate = (appId) => {
  rtc.client = AgoraRTC.createClient({ mode: 'live', codec: 'h264' });
  rtcClientInit(appId);
};

// Initialize the client
export const rtcClientInit = (appId) => {
  option.appID = appId;
  rtc.client.init(
    option.appID,
    function () {
      console.log('init success');
      rtc.client.setClientRole('host');
      rtcClientHostJoinChannel(localStorage.getItem('agoraRTC'), null);
    },
    (err) => {
      console.error(err);
    }
  );
};

// Join a channel
export const rtcClientHostJoinChannel = (token, uid) => {
  option.token = token;
  option.uid = uid;
  option.channel = localStorage.getItem('currentEventId');
  rtc.client.join(
    option.token ? option.token : null,
    option.channel,
    option.uid ? +option.uid : null,
    function (uid) {
      console.log('join channel: ' + option.channel + ' success, uid: ' + uid);
      rtc.params.uid = uid;
      rtcClientCreateLocalStream();
    },
    function (err) {
      console.error('client join failed', err);
    }
  );
};

// Create and initialize local stream
export const rtcClientCreateLocalStream = () => {
  // Create local stream
  rtc.localStream = AgoraRTC.createStream({
    streamID: rtc.params.uid,
    audio: true,
    video: true,
    screen: false,
  });

  // Initialize the local stream
  rtc.localStream.init(
    function () {
      console.log('init local stream success');
      rtc.localStream.play('playerDiv', { fit: 'cover' }, (errState) => {
        if (errState && errState.status !== 'aborted') {
          console.log('stream-player play failed ', 'playerDiv');
          // changeAutoplay(true);
        }
        //   lockPlay.current = false;
      });
      console.log('CONSOLE LOGGING:', rtc);
      rtcClientLocalStreamPublish();
    },
    function (err) {
      console.error('init local stream failed ', err);
    }
  );
};

// Publish local Stream
export const rtcClientLocalStreamPublish = () => {
  rtc.client.publish(rtc.localStream, function (err) {
    console.log('publish failed');
    console.error(err);
  });
  console.log('After publish', rtc.localStream);
  // setrtcLocalStreamCopy(rtc.localStream);
};

// Client leave channel
export const rtcClientLeaveChannel = () => {
  rtc.client.leave(
    function () {
      // Stop playing the local stream
      rtc.localStream.stop();
      // Close the local stream
      rtc.localStream.close();
      console.log('client leaves channel success');
    },
    function (err) {
      console.log('channel leave failed');
      console.error(err);
    }
  );
};
