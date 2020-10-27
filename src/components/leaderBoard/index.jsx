import React, { Fragment } from 'react';
import './index.scss';
import Winner from '../winner';

function LeaderBoard({ totalScores }) {
  console.log('from WInner', totalScores);
  // console.log(totalScores.length);

  return (
    <div className='leaderBoard'>
      <div className='leaderBoard__header'>Winners</div>
      <div className='leaderBoard__winners'>
        {/* write a map function to map the contents of the totalScores and pass to winners*/}
        {totalScores.map((winner, index) => (
          <Winner winnerDetails={winner} pos={index + 1} />
        ))}{' '}
      </div>
    </div>
  );
}

export default LeaderBoard;
