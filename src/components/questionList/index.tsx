import React, { Fragment } from 'react';
import './index.scss';

const QuestionList = (props: any) => {
  return (
    <div className='listContainer'>
      {props.questionList && props.questionList.questions ? (
        <Fragment>
          {props.questionList.questions.map((questionItem: any, index: any) => {
            return (
              <div className='listContainer__questionBox' key={index}>
                <p className='listContainer__questionBox__id'>{index + 1}.</p>
                <p>{questionItem}</p>
              </div>
            );
          })}
        </Fragment>
      ) : (
        <Fragment>
          <h4>Questions not available for this event</h4>
        </Fragment>
      )}
    </div>
  );
};

export default QuestionList;
