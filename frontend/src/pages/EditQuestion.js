import React from 'react';
import {
  TextField, Grid, Button, FormControl, Box, InputBase, Checkbox,
  InputLabel, Select, MenuItem, Snackbar, styled, FormControlLabel, Paper,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { DropzoneArea } from 'material-ui-dropzone';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { StoreContext } from '../utils/store';
import getToken, { getQuestion } from '../utils/helpers';
import NavBar from '../UIComponents/NavBar';
// import PropTypes from 'prop-types';
import AppBarSpacer from '../utils/styles';
// import Answers from '../components/Answers';
import API from '../utils/api';

const api = new API('http://localhost:5005');

const FormLayout = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
});

const SecondaryButton = styled(Button)({
  background: 'red',
  color: 'white',
});

const EditQuestion = (props) => {
  const history = useHistory();
  const { editQuestion } = React.useContext(StoreContext);
  const { questions } = React.useContext(StoreContext);
  const { quiz } = React.useContext(StoreContext);
  const [preset, setPreset] = editQuestion;
  const [allQuestions, setAllQuestions] = questions;
  console.log(allQuestions);
  const [currQuestion, setCurrQuestion] = React.useState(preset);
  const [open, setOpen] = React.useState(false);
  const [answers, setAnswers] = React.useState(preset.answers);
  const { match: { params } } = props;
  const isAnswer = (id) => answers.filter((answer) => answer.id === id);

  const handleAnswerText = (aId, text) => {
    let updatedAnswers = { aId, text, correct: false };
    if (isAnswer(aId).length === 1) {
      updatedAnswers = answers.map((ans) => {
        if (ans.id === aId) {
          return { aId, text, correct: ans.correct };
        }
        return ans;
      });
      setAnswers(updatedAnswers);
    } else {
      const changedAnswers = answers;
      changedAnswers.push(updatedAnswers);
      setAnswers(changedAnswers);
    }
  };

  const handleAnswerChoice = (aId, correct) => {
    let updatedAnswers = { aId, text: '', correct };
    if (isAnswer(aId).length === 1) {
      updatedAnswers = answers.map((ans) => {
        if (ans.id === aId) {
          return { aId, text: ans.text, correct };
        }
        return ans;
      });
      setAnswers(updatedAnswers);
    } else {
      const changedAnswers = answers;
      changedAnswers.push(updatedAnswers);
      setAnswers(changedAnswers);
    }
  };

  const handleChange = (attr, value) => {
    const updatedQuestion = currQuestion;
    updatedQuestion[attr] = value;
    setCurrQuestion(updatedQuestion);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    // if the question already exists
    let updatedQuestions;
    if (getQuestion(allQuestions, params.qid).length > 0) {
      updatedQuestions = allQuestions.map((q) => {
        if (q.id === params.qid) {
          return currQuestion;
        }
        return q;
      });
    } else {
      updatedQuestions = allQuestions.push(currQuestion);
    }
    setAllQuestions(updatedQuestions);
    setPreset(preset);
    const res = await api.put(`admin/quiz/${params.gid}`, {
      headers: { Authorization: getToken() },
      body: {
        questions: updatedQuestions,
        name: quiz[0].name,
        thumbnail: quiz[0].thumbnail,
      },
    });
    console.log(res);
    history.push(`edit/${params.gid}`);
  };

  return (
    <section>
      <NavBar />
      <AppBarSpacer />
      <FormLayout container direction="row">
        <Grid container item direction="column">
          <Grid item xs={8}>
            <TextField
              variant="filled"
              fullWidth
              label="Whats your Question?"
              onBlur={(event) => { handleChange('question', event.target.value); }}
            />
          </Grid>
          <Grid item xs={11}>
            <DropzoneArea
              acceptedFiles={['image/*', 'audio/*', 'video/*']}
              dropzoneText="Elevate your question! Click or drag and drop to upload a picture, audio clip, or video!"
              onChange={(file) => { handleChange('media', file); }}
              filesLimit={1}
            />
          </Grid>
        </Grid>
        <Grid container item direction="column" xs={4} justify="space-between">
          <FormControl>
            <InputLabel id="question-type-label">Question Type</InputLabel>
            <Select displayEmpty labelId="question-type-label" id="question-type-select" value={currQuestion.qType} onChange={(event) => handleChange('qType', event.target.value)}>
              <MenuItem value="single">Single Choice</MenuItem>
              <MenuItem value="multi">Multiple Choice</MenuItem>
            </Select>
          </FormControl>
          <TextField id="points" onChange={(event) => handleChange('points', event.target.value)} label="Points?" />
          <Grid item>
            <SecondaryButton variant="contained">Delete Question</SecondaryButton>
          </Grid>
          <Button variant="contained" onClick={handleConfirm}>Confirm Question</Button>
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
            <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="error">
              Please Confirm your question before Continuing
            </MuiAlert>
          </Snackbar>
        </Grid>
      </FormLayout>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={6}>
          <Paper>
            <InputBase onChange={(event) => handleAnswerText(1, event.target.value)} variant="filled" required placeholder="Answer 1" />
            <FormControlLabel
              onChange={(event) => handleAnswerChoice(1, event.target.checked)}
              control={<Checkbox />}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <InputBase onChange={(event) => handleAnswerText(2, event.target.value)} variant="filled" required placeholder="Answer 2" />
            <FormControlLabel
              onChange={(event) => handleAnswerChoice(2, event.target.checked)}
              control={<Checkbox />}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <InputBase onChange={(event) => handleAnswerText(3, event.target.value)} variant="filled" required placeholder="Answer 3 (Optional)" />
            <FormControlLabel
              onChange={(event) => handleAnswerChoice(3, event.target.checked)}
              control={<Checkbox />}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <InputBase onChange={(event) => handleAnswerText(4, event.target.value)} variant="filled" required placeholder="Answer 4 (Optional)" />
            <FormControlLabel
              onChange={(event) => handleAnswerChoice(4, event.target.checked)}
              control={<Checkbox />}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <InputBase onChange={(event) => handleAnswerText(5, event.target.value)} variant="filled" required placeholder="Answer 5" />
            <FormControlLabel
              onChange={(event) => handleAnswerChoice(5, event.target.checked)}
              control={<Checkbox />}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <InputBase onChange={(event) => handleAnswerText(6, event.target.value)} variant="filled" required placeholder="Answer 6 (Optional)" />
            <FormControlLabel
              onChange={(event) => handleAnswerChoice(6, event.target.checked)}
              control={<Checkbox />}
            />
          </Paper>
        </Grid>
      </Grid>
    </section>
  );
};

EditQuestion.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default EditQuestion;
