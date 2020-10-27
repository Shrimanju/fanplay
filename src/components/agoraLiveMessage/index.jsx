import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './index.scss';
import avataer_dp from '../../assets/account_circle-24px.svg';
import {
  rtmClientCreate,
  rtmClientLogin,
  sendChannelMessage,
  rtmClientLogout,
  rtmClientConnectionStateChange,
} from '../../utils/agoraRTM-client';
const { REACT_APP_AGORA_RTM_APPID } = process.env;

// let channel;

const AgoraLiveMessage = ({ comments }) => {
  const [textMessage, setTextMessage] = useState('');
  const onChange = (e) => {
    setTextMessage(e.target.value);
  };
  const onClickHandler = (message) => {
    sendChannelMessage(message);
  };

  useEffect(() => {
    // let channel;
    rtmClientCreate(REACT_APP_AGORA_RTM_APPID);
    rtmClientConnectionStateChange();
    rtmClientLogin(
      localStorage.getItem('agoraRTM'),
      localStorage.getItem('agoraRtmUID')
    );
    return () => {
      rtmClientLogout();
    };
  }, []);

  return (
    <div>
      <div className='messageContainer'>
        <div className='messageContainer__commentBox'>
          {comments &&
            comments.map((comment, index) => (
              <div
                key={index}
                className='messageContainer__commentBox__comment'
              >
                <img src={avataer_dp} alt='Avatar_dp'></img>
                {comment}
              </div>
            ))}
        </div>
        {/* <div className='messageContainer__sendBox'>
          <input
            type='text'
            value={textMessage}
            onChange={(e) => onChange(e)}
            placeholder='Enter Message...'
          />
          <button type='button' onClick={() => onClickHandler(textMessage)}>
            Send
          </button>
        </div> */}
      </div>
    </div>
  );
};

AgoraLiveMessage.propTypes = {
  comments: PropTypes.array,
};

const mapStateToProps = (state) => ({
  comments: state.comments.comments,
});

export default connect(mapStateToProps, null)(AgoraLiveMessage);
