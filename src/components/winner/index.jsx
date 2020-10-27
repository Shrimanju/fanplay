import React from 'react';
import './index.scss';
import account_dp from '../../assets/account_circle-24px.svg';

function Winner({ winnerDetails, pos }) {
  console.log(winnerDetails, winnerDetails.username, winnerDetails.score);
  return (
    <div className='winner'>
      <div className='winner__left'>
        <div className='winner__left__dp'>
          <img src={account_dp} alt='User Profile'></img>
        </div>
        <div className='winner__left__name'>{winnerDetails.username}</div>
      </div>
      <div className='winner__right'>
        <div className='winner__right__prize'>{winnerDetails.score}</div>
        <div className='winner__right__divider'></div>
        <div className='winner__right__rank'>{pos}</div>
      </div>
    </div>
  );
}

export default Winner;
