import React, { useEffect } from 'react';
import './index.scss';
import Webcam from 'react-webcam';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import previewTitle from '../../assets/previewQuiz.svg';
import { initiateSocket } from '../../utils/client-socket-io';

function PreviewQuizContainer() {
  const history = useHistory();
  const videoConstraints = {
    facingMode: 'user',
    aspectRatio: 0.6666666667,
  };
  const goPrev = () => {
    history.goBack();
  };

  useEffect(() => {
    initiateSocket();
  });
  return (
    <div className='previewQuizContainer'>
      <div className='previewQuizContainer__header'>
        <div className='previewQuizContainer__header__title'>
          <img src={previewTitle} alt='Title of PreviewScreen' />
        </div>
        <div
          className='previewQuizContainer__header__close'
          onClick={() => {
            goPrev();
          }}
        >
          +
        </div>
      </div>
      <div className='previewQuizContainer__previewCam'>
        <Webcam mirrored={true} videoConstraints={videoConstraints} />
      </div>
      <div className='previewQuizContainer__footer'>
        <div className='previewQuizContainer__footer__startBtn'>
          <Link to='/runningQuiz'>
            <button className='previewQuizContainer__footer__startBtn__btn'>
              START
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PreviewQuizContainer;
