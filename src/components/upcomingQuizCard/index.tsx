import React from 'react';
import './index.scss';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
//actions
import { getEventQuestions } from '../../actions/events';
import { accessEvent, getCurrentEventDetails } from '../../actions/events';

const UpcomingQuizCard = (props: any) => {
  const history = useHistory();

  // format Date Time
  var eventDateTime = new Date(parseInt(props.eventTime));
  eventDateTime.setHours(eventDateTime.getHours());
  eventDateTime.setMinutes(eventDateTime.getMinutes());

  const onClickHandler = (eventId: any, eventTime: any) => {
    props.getCurrentEventDetails(eventId);
    props.accessEvent(eventId, eventTime, history);
    localStorage.setItem('currentEventId', eventId);
  };

  const dateFormatter = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];

    const dayOfTheWeek = days[eventDateTime.getDay()];
    const day = eventDateTime.getDate();
    const month = months[eventDateTime.getMonth()];
    const year = eventDateTime.getFullYear();
    let hours =
      eventDateTime.getHours() < 10
        ? '0' + eventDateTime.getHours().toString()
        : eventDateTime.getHours();
    const minutes =
      eventDateTime.getMinutes() < 10
        ? '0' + eventDateTime.getMinutes().toString()
        : eventDateTime.getMinutes();
    const formattedDate =
      dayOfTheWeek +
      ',' +
      ' ' +
      day +
      ' ' +
      month +
      ' ' +
      year +
      ' ' +
      hours +
      ':' +
      minutes;

    return formattedDate;
  };

  return (
    <div className='upComingQuizCardContainer'>
      <div className='upComingQuizCardContainer__quizName'>
        <div className='inlineBlock quizFont'>{props.eventName}</div>
        <div className='startbtnContainer'>
          <button
            className='startbtnContainer__btn'
            onClick={() => {
              onClickHandler(props.eventId, props.eventTime);
            }}
          >
            start
          </button>
        </div>
      </div>
      <div className='upComingQuizCardContainer__date'>
        <div className='upComingQuizCardContainer__date__text'>
          <div className='inlineBlock startFont'>start at: </div>
          <div className='inlineBlock startDateFont'>{dateFormatter()}</div>
          <div className='inlineBlock startTimeFont'></div>
        </div>
        <div className='editCopybtnContainer'>
          <button className='editCopybtnContainer__btn'>edit</button>
        </div>
      </div>
      <div className='upComingQuizCardContainer__link'>
        <div className='upComingQuizCardContainer__link__text'>
          <div className='inlineBlock quizLinkFont'>Quiz Link: </div>
          <div className='inlineBlock linkFont'>
            fangame.live/quizzes/abcdef
          </div>
        </div>
        <div className='editCopybtnContainer'>
          <button className='editCopybtnContainer__btn'>copy</button>
        </div>{' '}
      </div>
    </div>
  );
};

UpcomingQuizCard.propTypes = {};

// const mapStateToProps = (state: any) => ({
//   otp_details: state.auth.otp_details,
//   isAuthenticated: state.auth.isAuthenticated,
// });

export default connect(null, {
  getEventQuestions,
  accessEvent,
  getCurrentEventDetails,
})(UpcomingQuizCard);
