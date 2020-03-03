import React from 'react';

export interface QuestionOptionProps {
  id: number;
  answer: string;
  handleClick: (event: MouseEvent<React.MouseEvent<HTMLInputElement>>) => void;
}

export const QuestionOption: React.FC<QuestionOptionProps> = (props) => {
  return (
    <li key={props.id} id={props.id.toString()} onClick={props.handleClick}>
      {props.answer}
    </li>
  );
};
