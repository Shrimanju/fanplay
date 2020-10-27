import React, { Fragment, useEffect } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// components import
import QuestionList from '../../components/questionList';
import Button from '../../components/button';
import TopHeader from '../../components/topHeader';

// actions
import {
  getEventQuestions,
  getCurrentEventDetails,
} from '../../actions/events';
import { useParams } from 'react-router';
import Loading from '../../components/Loading';

const SelectQuestionsContainer = (props: any) => {
  interface ParamTypes {
    eventId: any;
  }
  let { eventId } = useParams<ParamTypes>();
  useEffect(() => {
    props.getEventQuestions(eventId);
    props.getCurrentEventDetails(eventId);
  }, []);

  return (
    <Fragment>
      {props.loading === true && props.eventQuestions == null ? (
        <Loading name='Loading' />
      ) : (
          <div>
            <TopHeader
              headerText='Select Questions'
              background='#265083 0% 0% no-repeat padding-box'
              link='/influencerProfile'
            />
            <QuestionList questionList={props.eventQuestions} />
            <div className='selectQuestionsContainer__btn'>
              <Link to='/previewQuiz'>
                <Button
                  btnTitle='Start Quiz'
                  width='200px'
                  background='#265083'
                />
              </Link>
            </div>
          </div>
        )}
    </Fragment>
  );
};

SelectQuestionsContainer.propTypes = {
  eventQuestions: PropTypes.object,
  getEventQuestions: PropTypes.func,
  getCurrentEventDetails: PropTypes.func,
  loading: PropTypes.bool,
};

const mapStateToProps = (state: any) => ({
  eventQuestions: state.events.eventQuestions,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, {
  getEventQuestions,
  getCurrentEventDetails,
})(SelectQuestionsContainer);
