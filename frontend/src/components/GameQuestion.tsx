import React from 'react';
import { QuestionOptionList } from './QuestionOptionList';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Questions } from 'helpers/types';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    mt5: {
      marginBottom: theme.spacing(5),
    },
  });
});

export interface GameQuestionProps {
  question: Array<Questions>;
  gameLength: number;
  questionCounter: number;
  handleNextQuestion: Function;
}

export const GameQuestion: React.FC<GameQuestionProps> = (props) => {
  const classes = useStyles();

  const handleAnswerQuestionClick = (event: any) => {
    const userChoiceIndex = event.target.getAttribute('id');
    let correct = false;

    if (userChoiceIndex == props.question.correctAnswerIndex) correct = true;

    props.handleNextQuestion(correct);
  };

  const question = (
    <div key={props.questionCounter}>
      <h6>
        Question {props.questionCounter} of {props.gameLength}
      </h6>
      <div className="questionTitle">
        <h4 className="font-weight-bold">{props.question.question}</h4>
      </div>
      <div className={classes.mt5}>
        <QuestionOptionList
          answerOptions={props.question.answerOptions}
          handleAnswerQuestionClick={handleAnswerQuestionClick}
        />
      </div>
    </div>
  );
  return (
    <div className="row no-gutters full-height p-2 p-md-5">
      <div className="col-12 text-center my-auto p-md-2">{question}</div>
    </div>
  );
};
