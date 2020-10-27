import React from 'react';
import './index.scss';

function PreviousShowCard({ pastEvent }) {
  var currentDate = new Date(pastEvent.eventTime);
  var date = currentDate.getDate();
  var month = currentDate.getMonth();
  var year = currentDate.getFullYear();

  function pad(n) {
    return n < 10 ? '0' + n : n;
  }
  var ddmmyyyy = pad(date) + '-' + pad(month + 1) + '-' + year;

  var monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  var ordinalDate = date + ' ' + monthNames[month] + ', ' + year;

  return (
    <div className='previousShowCard'>
      <div className='previousShowCard__title'>{pastEvent.eventName}</div>
      <div className='previousShowCard__info'>
        <div className='previousShowCard__info__date'>{ordinalDate}</div>
        <div className='previousShowCard__info__divider'></div>
        <div className='previousShowCard__info__views'>100</div>
      </div>
    </div>
  );
}

export default PreviousShowCard;
