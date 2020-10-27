import React, { useState, useEffect } from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import liveImg from '../../assets/You are LIVE.svg';
import { socket } from '../../utils/client-socket-io';
//actions
import { getCurrentEventDetails } from '../../actions/events';
import AgoraLiveMessage from '../agoraLiveMessage';
import LeaderBoard from '../leaderBoard';
import ExitButton from '../exitButton';
import QuizInfoPopUp from '../quizInfoPopUp';
import ExitConfirmModal from '../exitConfirmModal';

const RunningQuizBar = (props: any) => {
  // quizboxes handling variables
  const [intro, setIntro] = useState(true);
  const [quesBox, setQuesBox] = useState(false);
  const [optionsBox, setOptionsBox] = useState(false);
  const [answerBox, setAnswerBox] = useState(false);
  const [winnersBox, setWinnersBox] = useState(false);

  //quiz variables
  const [currentQues, setCurrentQues] = useState('');
  const [currentQuesNo, setCurrentQuesNo] = useState(0);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [currentAnswerExplanation, setCurrentAnswerExplanation] = useState('');
  const [totalScores, setTotalScores] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);

  //Exit Confirm modal
  const [exitConfirmModalIsOpen, setExitConfirmModalIsOpen] = useState(false);

  useEffect(() => {
    props.getCurrentEventDetails(localStorage.getItem('currentEventId'));
  }, []);
  // countdown timer
  useEffect(() => {
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // Enable socket event listeners
  const enableSocketListeners = () => {
    socket.on('newQuestion', (data: any) => {
      console.log(data);
      setCurrentQues(data.question);
      setCurrentQuesNo(data.number);
    });
    socket.on('correctAnswer', (data: any) => {
      console.log(data);
      setCurrentAnswer(data.answer);
      handleOptionsBarAnswerBox();
    });
    socket.on('options', (data: any) => {
      console.log(data);
      setCurrentOptions(data);
    });
    socket.on('answerExplanation', (data: any) => {
      console.log(data);
      setCurrentAnswerExplanation(data.answerExplanation);
    });
    socket.on('totalScores', (data: any) => {
      console.log('totalScores received', data);
      setTotalScores(data);
    });
    socket.on('disconnect', () => {
      console.log('socket disconnected');
    });
  };

  // onClick handlers for different quiz boxes
  const handleIntroQuesBox = () => {
    enableSocketListeners();
    socket.emit('nextQuestion', '');
    setIntro(false);
    setQuesBox(true);
  };
  const handlequesBoxOptionsBar = () => {
    socket.emit('showOptions', '');
    setTimeLeft(10);
    setQuesBox(false);
    setOptionsBox(true);
  };
  const handleOptionsBarAnswerBox = () => {
    setOptionsBox(false);
    setAnswerBox(true);
  };
  const handleAnswerBoxQuesBox = () => {
    socket.emit('nextQuestion', '');
    setAnswerBox(false);
    setQuesBox(true);
  };
  const handleAnswerBoxWinnersBox = () => {
    socket.emit('endEvent', localStorage.getItem('currentEventId'));
    setAnswerBox(false);
    setWinnersBox(true);
  };

  return (
    <div className='runningQuizBar'>
      <div className='runningQuizBar__live'>
        <img src={liveImg} alt='You are Live!' />
      </div>
      <div className='runningQuizBar__messageBox'>
        <AgoraLiveMessage />
      </div>
      {intro && (
        <div className='runningQuizBar__intro'>
          <div className='runningQuizBar__intro__quizName'>
            Quiz Name: {props.currentEventDetails.eventName}
          </div>
          <div className='runningQuizBar__intro__firstQuesBtn'>
            <button
              className='runningQuizBar__intro__firstQuesBtn__btn'
              onClick={() => handleIntroQuesBox()}
            >
              First Question
            </button>
          </div>
          <div className='runningQuizBar__intro__endQuizBtn'>
            <Link to='/influencerProfile'>
              <button className='runningQuizBar__intro__endQuizBtn__btn'>
                End Quiz
              </button>
            </Link>
          </div>
        </div>
      )}
      {quesBox && (
        <div className='runningQuizBar__quesBox'>
          <div className='runningQuizBar__quesBox__quesBar'>
            <div className='runningQuizBar__quesBox__quesBar__ques'>
              {currentQues}
            </div>
          </div>
          <div className='runningQuizBar__quesBox__optionsBar'>
            <div className='runningQuizBar__quesBox__optionsBar__quesNo'>
              <div className='runningQuizBar__quesBox__optionsBar__quesNo__no'>
                Q.{currentQuesNo}
              </div>
            </div>
            <div className='runningQuizBar__quesBox__optionsBar__optionsBtn'>
              <button
                className='runningQuizBar__quesBox__optionsBar__optionsBtn__btn'
                onClick={() => handlequesBoxOptionsBar()}
              >
                Get Options
              </button>
            </div>
            <div className='runningQuizBar__quesBox__optionsBar__quesCount'>
              <div className='runningQuizBar__quesBox__optionsBar__quesCount__count'>
                {currentQuesNo}/10
              </div>
            </div>
          </div>
        </div>
      )}
      {optionsBox && (
        <div className='runningQuizBar__optionsBox'>
          <div className='runningQuizBar__optionsBox__quesBar'>
            <div className='runningQuizBar__optionsBox__quesBar__quesNo'>
              <div className='runningQuizBar__optionsBox__quesBar__quesNo__no'>
                Q.{currentQuesNo}
              </div>
            </div>
            <div className='runningQuizBar__optionsBox__quesBar__ques'>
              {currentQues}
            </div>
          </div>
          <div className='runningQuizBar__optionsBox__optionsBar'>
            <div className='runningQuizBar__optionsBox__optionsBar__optionsList'>
              {currentOptions &&
                currentOptions.map((option) => {
                  return (
                    <div
                      className='runningQuizBar__optionsBox__optionsBar__optionsList__option'
                      key={currentOptions.indexOf(option) + 1}
                    >
                      <button className='runningQuizBar__optionsBox__optionsBar__optionsList__option__btn'>
                        {option}
                      </button>
                    </div>
                  );
                })}
            </div>
            <div className='runningQuizBar__optionsBox__optionsBar__timer'>
              <div
                className='runningQuizBar__optionsBox__optionsBar__timer__time'
                // onClick={() => handleOptionsBarAnswerBox()}
              >
                {timeLeft}
              </div>
            </div>
          </div>
        </div>
      )}
      {answerBox && (
        <div className='runningQuizBar__answerBox'>
          <div className='runningQuizBar__answerBox__fact'>
            <div className='runningQuizBar__answerBox__fact__text'>
              FACT: {currentAnswerExplanation}
            </div>
          </div>
          <div className='runningQuizBar__answerBox__answerBar'>
            <div className='runningQuizBar__answerBox__answerBar__left'>
              <div className='runningQuizBar__answerBox__answerBar__left__ques'>
                <div className='runningQuizBar__answerBox__answerBar__left__ques__text'>
                  {currentQues}
                </div>
              </div>
              <div className='runningQuizBar__answerBox__answerBar__left__answerList'>
                {currentOptions &&
                  currentOptions.map((option, index) => {
                    if (currentAnswer.toString() === (index + 1).toString()) {
                      return (
                        <div
                          key={index + 1}
                          className='runningQuizBar__answerBox__answerBar__left__answerList__option'
                        >
                          <button className='runningQuizBar__answerBox__answerBar__left__answerList__option__btn correctAnswer'>
                            {option}
                          </button>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={index + 1}
                          className='runningQuizBar__answerBox__answerBar__left__answerList__option'
                        >
                          <button className='runningQuizBar__answerBox__answerBar__left__answerList__option__btn'>
                            {option}
                          </button>
                        </div>
                      );
                    }
                  })}
              </div>
            </div>
            <div className='runningQuizBar__answerBox__answerBar__right'>
              <div className='runningQuizBar__answerBox__answerBar__right__quesCount'>
                <div className='runningQuizBar__answerBox__answerBar__right__quesCount__icon'>
                  Q
                </div>
                <div className='runningQuizBar__answerBox__answerBar__right__quesCount__count'>
                  {currentQuesNo}/10
                </div>
              </div>
              {currentQuesNo !== 10 ? (
                <div className='runningQuizBar__answerBox__answerBar__right__nextQuesBtn'>
                  <button
                    className='runningQuizBar__answerBox__answerBar__right__nextQuesBtn__btn'
                    onClick={() => handleAnswerBoxQuesBox()}
                  >
                    Next Ques
                  </button>
                </div>
              ) : null}
              {currentQuesNo === 10 ? (
                <div className='runningQuizBar__answerBox__answerBar__right__endQuesBtn'>
                  <button
                    className='runningQuizBar__answerBox__answerBar__right__endQuesBtn__btn'
                    onClick={() => handleAnswerBoxWinnersBox()}
                  >
                    End Quiz
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
      {winnersBox && (
        <div className='runningQuizBar__winnersBox'>
          <LeaderBoard totalScores={totalScores} />
          <ExitButton setExitConfirmModalIsOpen={setExitConfirmModalIsOpen} />
          <QuizInfoPopUp quizName={props.currentEventDetails.eventName} />
          <ExitConfirmModal
            exitConfirmModalIsOpen={exitConfirmModalIsOpen}
            setExitConfirmModalIsOpen={setExitConfirmModalIsOpen}
          />
        </div>
      )}
    </div>
  );
};

RunningQuizBar.propTypes = {
  currentEventDetails: PropTypes.object,
  getCurrentEventDetails: PropTypes.func,
};

const mapStateToProps = (state: any) => ({
  currentEventDetails: state.events.currentEventDetails,
});

export default connect(mapStateToProps, { getCurrentEventDetails })(
  RunningQuizBar
);
