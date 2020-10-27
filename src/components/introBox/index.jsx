import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

function IntroBox() {
  return (
    <div className='introBox'>
      <div className='introBox__quizName'>
        Quiz Name: {props.currentEventDetails.eventName}
      </div>
      <div className='introBox__firstQuesBtn'>
        <button
          className='introBox__firstQuesBtn__btn'
          onClick={() => handleIntroQuesBox()}
        >
          First Question
        </button>
      </div>
      <div className='introBox__endQuizBtn'>
        <Link to='/influencerProfile'>
          <button className='introBox__endQuizBtn__btn'>End Quiz</button>
        </Link>
      </div>
    </div>
  );
}

export default IntroBox;
