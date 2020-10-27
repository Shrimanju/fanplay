import React from 'react';
import './index.scss';

const PreviousQuizCard: React.FC = () => {
  return (
    <div className='previousQuizCardContainer'>
      <div className='quizNameFont'>Quiz Name</div>
      <div className='previousQuizCardContainer__quizInfo'>
        <div className='inlineBlock dateFont'>6th July '20</div>
        <div className='inlineBlock countFont'>100</div>
      </div>
    </div>
  );
};

export default PreviousQuizCard;
