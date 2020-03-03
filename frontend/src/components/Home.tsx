import { createStyles, makeStyles } from '@material-ui/styles';
import { Theme, CircularProgress } from '@material-ui/core';
import React from 'react';
import { GameSelection } from 'components/GameSelection';
import { GameResult } from 'components/GameResult';
import { GameQuestion } from 'components/GameQuestion';
import { apiBaseUrl, apiRoutes } from 'helpers/apiRoutes';
import { useFetch } from 'helpers/useFetch';

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    home: {
      display: 'flex',
    },
    centerAlign: {
      textAlign: 'center',
    },
  });
});

export interface HomeProps {}

export const Home: React.FC<HomeProps> = (props) => {
  const classes = useStyles();
  const categories = useFetch(apiBaseUrl + apiRoutes.getCategories)['trivia_categories'] || [];
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [questions, setQuestions] = React.useState<any[]>([]);
  const [gameStarted, setGameStarted] = React.useState<boolean>(false);
  const [gameFinished, setGameFinished] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>('');
  const [questionCounter, setQuestionCounter] = React.useState<number>(1);
  const [score, setScore] = React.useState<number>(0);

  const [selectedNumberOfQuestion, setSelectedNumberOfQuestion] = React.useState<number>(0);
  const handleQuestionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const target = event.target as HTMLTextAreaElement;
    setSelectedNumberOfQuestion(parseInt(target.value, 10));
  };

  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string>('');
  const handleDiffChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const target = event.target as HTMLTextAreaElement;
    setSelectedDifficulty(target.value);
  };

  const [selectedCategory, setSelectedCategory] = React.useState<string>('');
  const handleCategoryChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const target = event.target as HTMLTextAreaElement;
    setSelectedCategory(target.value);
  };

  const handleStartGameClick = (event: MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const numQuestions: number = selectedNumberOfQuestion;
    const category: string = selectedCategory;
    let difficulty = '';
    setIsLoaded(false);
    if (selectedDifficulty != 'any') {
      difficulty = '&difficulty=' + selectedDifficulty.toLowerCase();
    }

    fetchGameQuestions(numQuestions, category, difficulty);
  };

  const handleNextQuestion = (correct: boolean) => {
    const questionCounterTemp = questionCounter + 1;
    if (correct == true) setScore(score + 1);
    if (questionCounterTemp > selectedNumberOfQuestion) {
      console.log('question counter and # quest: ', questionCounter, selectedNumberOfQuestion);
      setGameFinished(true);
    } else {
      setQuestionCounter(questionCounterTemp);
      console.log('else: ', questionCounter, selectedNumberOfQuestion);
    }
  };

  const fetchGameQuestions = (numQuestions: number, category: string, difficulty: string) => {
    const url =
      apiBaseUrl + apiRoutes.getQuestions + numQuestions + '&category=' + category + difficulty;

    fetch(url)
      .then((response) => response.json())
      .then(
        (data) => {
          const questions = prepareQuestionData(data.results);
          setQuestions(questions);
          setGameStarted(true);
          setIsLoaded(true);
        },
        (error: string) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  };

  const prepareQuestionData = (questions: any[]) => {
    const preparedQuestions: any[] = [];
    questions.map((question) => {
      const incorrectAnswers = question.incorrect_answers;
      const correctAnswer = question.correct_answer;
      const answerOptions: any[] = [];
      let preparedQuestion = {};
      incorrectAnswers.forEach((answer: string) => answerOptions.push(htmlDecode(answer)));
      answerOptions.join();
      answerOptions.splice(Math.floor(Math.random() * 4), 0, htmlDecode(correctAnswer));
      answerOptions.join();
      preparedQuestion = {
        question: htmlDecode(question.question),
        answerOptions: answerOptions,
        correctAnswerIndex: answerOptions.indexOf(correctAnswer),
      };
      preparedQuestions.push(preparedQuestion);
    });
    return preparedQuestions;
  };

  const htmlDecode = (input: any) => {
    const e = document.createElement('textarea');
    e.innerHTML = input;
    return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
  };

  if (error) {
    return <div className="gameWrapper">Apologies: There has been an error.</div>;
  } else if (!isLoaded && gameStarted) {
    return (
      <div className="gameWrapper">
        <div className="row no-gutters h-100">
          <div className="my-auto mx-auto">
            <CircularProgress />
          </div>
        </div>
      </div>
    );
  } else if (gameStarted && !gameFinished) {
    return (
      <div>
        <div className="gameWrapper">
          <GameQuestion
            question={questions[questionCounter - 1]}
            questionCounter={questionCounter}
            gameLength={selectedNumberOfQuestion}
            handleNextQuestion={handleNextQuestion}
          />
        </div>
      </div>
    );
  } else if (gameFinished) {
    return (
      <div className="gameWrapper">
        <GameResult score={score} gameLength={selectedNumberOfQuestion} questions={questions} />
      </div>
    );
  }
  return (
    <div className={classes.home}>
      <h1 className={classes.centerAlign}>Welcome to the Trivia app!</h1>
      <>
        <GameSelection
          categories={categories}
          handleStartGameClick={handleStartGameClick}
          handleQuestionChange={handleQuestionChange}
          selectedNumberOfQuestion={selectedNumberOfQuestion}
          selectedDifficulty={selectedDifficulty}
          handleDiffChange={handleDiffChange}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
        />
      </>
    </div>
  );
};
