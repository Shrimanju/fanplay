import React, { useEffect } from 'react';
import './index.scss';
import AgoraLiveMessage from '../../components/agoraLiveMessage';
import AgoraLiveStream from '../../components/agoraLiveStream';
import RunningQuizBar from '../../components/runningQuizBar';
import { initiateSocket } from '../../utils/client-socket-io';
import { Redirect } from 'react-router';

function RunningQuizContainer() {
  useEffect(() => {
    initiateSocket();
  }, []);

  useEffect(() => {
    // var reallys = false;
    // var allows = true;
    // window.onbeforeunload = function () {
    //   console.log('Link:', window.location.href);
    //   console.log('condition: ', window.location.href.contains('runningQuiz'));
    //   var reallys = false;
    //   var allows = true;
    //   if (allows) {
    //     if (!reallys && true) {
    //       reallys = true;
    //       var msg = 'Are you sure to closing this tab?, this free';
    //       return msg;
    //     } else {
    //       allows = true;
    //     }
    //   }
    // };
    window.addEventListener('beforeunload', function (e) {
      // Cancel the event
      e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
      // Chrome requires returnValue to be set
      e.returnValue = '';
    });
  }, []);
  return (
    <div className='runningQuizContainer'>
      <AgoraLiveStream />
      {/* <AgoraLiveMessage /> */}
      <RunningQuizBar />
    </div>
  );
}

export default RunningQuizContainer;
