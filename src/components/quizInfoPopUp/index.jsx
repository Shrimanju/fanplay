import React from 'react';
import './index.scss';
import group_icon from '../../assets/group.svg';
import money_icon from '../../assets/money (1).svg';

const QuizInfoPopUp = ({quizName}) => {
  return (
    <div className='quizInfoPopUp'>
      <div className='quizInfoPopUp__header'>
        <div className='quizInfoPopUp__header__name'>{quizName}</div>
      </div>
      <div className='quizInfoPopUp__count'>
        <div className='quizInfoPopUp__count__no'>69</div>
        <div className='quizInfoPopUp__count__icon'>
          <img src={group_icon} alt='Group Icon'></img>
        </div>
      </div>
      <div className='quizInfoPopUp__prize'>
        <div className='quizInfoPopUp__prize__total'>20k</div>;
        <div className='quizInfoPopUp__prize__icon'>
          <img src={money_icon} alt='Money Icon'></img>
        </div>
      </div>
    </div>
  );
};

export default QuizInfoPopUp;
