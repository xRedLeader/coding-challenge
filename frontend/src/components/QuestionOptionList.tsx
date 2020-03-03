import React from 'react';
import { QuestionOption } from './QuestionOption';

export interface QuestionOptionListProps {
  answerOptions: Array<string>;
  handleAnswerQuestionClick: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

export const QuestionOptionList: React.FC<QuestionOptionListProps> = (props) => {
  return (
    <ul className="questionOptionList">
      {props.answerOptions.map((option, index) => (
        <QuestionOption
          key={index}
          id={index}
          answer={option}
          handleClick={props.handleAnswerQuestionClick}
        />
      ))}
    </ul>
  );
};
