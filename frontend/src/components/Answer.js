import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid, InputBase,
  Checkbox, FormControlLabel, Paper,
} from '@material-ui/core';
import { StoreContext } from '../utils/store';

/*
Answer will have structure of { id: 0, text: "True", correct: "false"}
*/

const Answer = ({ id }) => {
  // const [answer, setAnswer] = React.useState({});
  const { answers } = React.useContext(StoreContext);
  const [currAnswers, setCurrAnswers] = answers;

  const isAnswer = () => currAnswers.filter((answer) => answer.id === id);

  const handleAnswerText = (text) => {
    // console.log(currAnswers);
    let updatedAnswers = { id, text, correct: false };
    if (isAnswer().length === 1) {
      updatedAnswers = currAnswers.map((ans) => {
        if (ans.id === id) {
          return { id, text, correct: ans.correct };
        }
        return ans;
      });
      setCurrAnswers(updatedAnswers);
    } else {
      const changedAnswers = currAnswers;
      changedAnswers.push(updatedAnswers);
      setCurrAnswers(changedAnswers);
    }
  };

  const handleAnswerChoice = (correct) => {
    let updatedAnswers = { id, text: '', correct };
    if (isAnswer().length === 1) {
      updatedAnswers = currAnswers.map((ans) => {
        if (ans.id === id) {
          return { id, text: ans.text, correct };
        }
        return ans;
      });
      setCurrAnswers(updatedAnswers);
    } else {
      const changedAnswers = currAnswers;
      changedAnswers.push(updatedAnswers);
      setCurrAnswers(changedAnswers);
    }
  };

  return (
    <Grid item xs={6}>
      <Paper>
        <InputBase onChange={(event) => handleAnswerText(event.target.value)} variant="filled" required placeholder={`Answer ${id}`} />
        <FormControlLabel
          onChange={(event) => handleAnswerChoice(event.target.checked)}
          control={<Checkbox />}
        />
      </Paper>
    </Grid>
  );
};

Answer.propTypes = {
  id: PropTypes.number.isRequired,
};

export default Answer;
