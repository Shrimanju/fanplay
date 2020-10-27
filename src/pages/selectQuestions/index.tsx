import React from 'react';
import SelectQuestionsContainer from '../../containers/selectQuestionsContainer';
import './index.scss';

const SelectQuestions: React.FC = () => {
  return (
    <div className='pageContainer'>
      <SelectQuestionsContainer />
    </div>
  );
};

export default SelectQuestions;
