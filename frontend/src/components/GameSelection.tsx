import { createStyles, makeStyles, withStyles } from '@material-ui/styles';
import {
  Theme,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Button,
} from '@material-ui/core';
import React from 'react';
import InputBase from '@material-ui/core/InputBase';
import { Categories } from 'helpers/types';

const BootstrapInput = withStyles((theme: Theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    width: 160,
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    margin: {
      margin: theme.spacing(1),
    },
    button: { width: 160 },
    content: { display: 'block' },
  });
});

export interface GameSelectionProps {
  categories: Array<Categories>;
  handleStartGameClick: (event: MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  handleQuestionChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  selectedNumberOfQuestion: number;
  selectedDifficulty: string;
  handleDiffChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  selectedCategory: string;
  handleCategoryChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

export const GameSelection: React.FC<GameSelectionProps> = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <FormControl className={classes.margin}>
        <InputLabel id="select-label">Category</InputLabel>
        <Select
          labelId="select-label"
          id="select-category"
          value={props.selectedCategory}
          onChange={props.handleCategoryChange}
          input={<BootstrapInput />}
        >
          {props.categories.map((key, value) => {
            return (
              <MenuItem key={key['id']} value={key['id']}>
                {key['name']}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel id="select-label">Difficulty</InputLabel>
        <Select
          labelId="select-label"
          id="select-difficulty"
          value={props.selectedDifficulty}
          onChange={props.handleDiffChange}
          input={<BootstrapInput />}
        >
          <MenuItem value={'any'}>Any</MenuItem>
          <MenuItem value={'easy'}>Easy</MenuItem>
          <MenuItem value={'medium'}>Medium</MenuItem>
          <MenuItem value={'hard'}>Hard</MenuItem>
        </Select>
      </FormControl>
      <Typography gutterBottom>Number of Questions</Typography>
      <input
        type="range"
        min="1"
        max="50"
        step="1"
        value={props.selectedNumberOfQuestion}
        onChange={props.handleQuestionChange}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={props.handleStartGameClick}
      >
        Ready? Set? GO!
      </Button>
    </div>
  );
};
