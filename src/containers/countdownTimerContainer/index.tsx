import React, { Fragment, useEffect, useState } from 'react';
import './index.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
//components
import TopHeader from '../../components/topHeader';
// actions
import { getCurrentEventDetails } from '../../actions/events';
import {
  calcDays,
  calcHours,
  calcMins,
  calcSecs,
} from '../../utils/dateTimeConversion';
import Loading from '../../components/Loading';

const CountdownTimerContainer = (props: any) => {
  var currentDate = new Date();
  var currentTime = currentDate.getTime();
  var timeDiff =
    props.eventTime - currentTime < 0 ? 0 : props.eventTime - currentTime;

  const history = useHistory();
  const [timeRemaining, settimeRemaining] = useState(timeDiff);
  const [days, setdays] = useState(calcDays(timeRemaining));
  const [hours, sethours] = useState(calcHours(timeRemaining));
  const [mins, setmins] = useState(calcMins(timeRemaining));
  const [secs, setsecs] = useState(calcSecs(timeRemaining));
  const [showTimerBig, setShowTimerBig] = useState(true);

  // countdown timer
  useEffect(() => {
    if (timeRemaining < 0) {
      history.push(
        `/selectQuestions/${localStorage.getItem('currentEventId')}`
      );
    }
    const intervalId = setInterval(() => {
      settimeRemaining(timeRemaining - 1000);
      setdays(calcDays(timeRemaining));
      sethours(calcHours(timeRemaining));
      setmins(calcMins(timeRemaining));
      setsecs(calcSecs(timeRemaining));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeRemaining]);

  useEffect(() => {
    if (timeDiff > 20 * 60 * 1000) {
      settimeRemaining(timeDiff);
    } else if (timeDiff <= 0) {
      history.push(
        `/selectQuestions/${localStorage.getItem('currentEventId')}`
      );
    } else if (timeDiff) {
      settimeRemaining(timeDiff);
      setShowTimerBig(false);
    }
  }, []);

  return (
    <Fragment>
      {props.loading ? (
        <Loading name='Loading' />
      ) : (
        <div className='countdownTimerContainer'>
          <div className='countdownTimerContainer__top'>
            {showTimerBig && (
              <TopHeader
                headerText='Quiz will begin in...'
                background='none'
                link='/influencerProfile'
              />
            )}
            {!showTimerBig && (
              <TopHeader
                headerText='Quiz is about to begin...'
                background='none'
                link='/influencerProfile'
              />
            )}
          </div>
          <div className='countdownTimerContainer__bottom'>
            <div className='countdownTimerContainer__bottom__timerDiv'>
              {showTimerBig && (
                <div className='countdownTimerContainer__bottom__timerDiv__timerBig'>
                  <div className='countdownTimerContainer__bottom__timerDiv__timerBig__day'>
                    <div className='countdownTimerContainer__bottom__timerDiv__timerBig__day__text'>
                      day
                    </div>
                    <div className='countdownTimerContainer__bottom__timerDiv__timerBig__day__no'>
                      {days}
                    </div>
                  </div>
                  <div className='countdownTimerContainer__bottom__timerDiv__timerBig__hour'>
                    <div className='countdownTimerContainer__bottom__timerDiv__timerBig__hour__text'>
                      hour
                    </div>
                    <div className='countdownTimerContainer__bottom__timerDiv__timerBig__hour__no'>
                      {hours}
                    </div>
                  </div>
                  <div className='countdownTimerContainer__bottom__timerDiv__timerBig__min'>
                    <div className='countdownTimerContainer__bottom__timerDiv__timerBig__min__text'>
                      min
                    </div>
                    <div className='countdownTimerContainer__bottom__timerDiv__timerBig__min__no'>
                      {mins}
                    </div>
                  </div>
                  <div className='countdownTimerContainer__bottom__timerDiv__timerBig__sec'>
                    <div className='countdownTimerContainer__bottom__timerDiv__timerBig__sec__text'>
                      sec
                    </div>
                    <div className='countdownTimerContainer__bottom__timerDiv__timerBig__sec__no'>
                      {secs}
                    </div>
                  </div>
                </div>
              )}
              {!showTimerBig && (
                <div className='countdownTimerContainer__bottom__timerDiv__timerSmall'>
                  <div className='countdownTimerContainer__bottom__timerDiv__timerSmall__mins'>
                    {mins}
                  </div>
                  <div className='countdownTimerContainer__bottom__timerDiv__timerSmall__colon'>
                    :
                  </div>
                  <div className='countdownTimerContainer__bottom__timerDiv__timerSmall__secs'>
                    {secs}
                  </div>
                </div>
              )}
            </div>
            {showTimerBig && (
              <div className='countdownTimerContainer__bottom__reminder'>
                <button className='countdownTimerContainer__bottom__reminder__btn'>
                  Set Reminder
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};

CountdownTimerContainer.propTypes = {
  timeRemaining: PropTypes.number,
  getCurrentEventDetails: PropTypes.func,
  eventTime: PropTypes.number,
  loading: PropTypes.bool,
};

const mapStateToProps = (state: any) => ({
  timeRemaining: state.events.remainingTime,
  eventTime: state.events.currentEventTime,
  //   eventId: state.events.currentEventDetails._id,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, { getCurrentEventDetails })(
  CountdownTimerContainer
);
