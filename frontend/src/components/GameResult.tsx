import React from 'react';
import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { Questions } from 'helpers/types';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    mb5: {
      marginBottom: theme.spacing(5),
    },
  });
});

export interface GameResultProps {
  score: number;
  gameLength: number;
  questions: Array<Questions>;
}

export const GameResult: React.FC<GameResultProps> = (props) => {
  const classes = useStyles();

  return (
    <div>
      <h2 key={props.score} className={classes.mb5}>
        You scored {props.score} out of {props.gameLength}!
      </h2>
    </div>
  );
};
