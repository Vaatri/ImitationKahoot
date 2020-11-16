import React from 'react';
import API from '../utils/api';
import getToken from '../utils/helpers';
import { StoreContext } from '../utils/store';

const api = new API('http://localhost:5005');
const EditQuestion = (props) => {
  const history = useHistory();
  const { question } = React.useContext(StoreContext);
  const { questions } = React.useContext(StoreContext);
  const { quiz } = React.useContext(StoreContext);
  const [preset] = question[0];
  const [allQuestions, setAllQuestions] = questions;
  const [currQuestion, setCurrQuestion] = React.useState(preset);
  const [open, setOpen] = React.useState(false);
  const [answers, setAnswers] = React.useState(preset.answers);
  const { match: { params } } = props;
  const isAnswer = () => answers.filter((answer) => answer.id === id);

  const handleAnswerTextChange = (aId, text) => {
    let updatedAnswers = { aId, text, correct: false };
    if (isAnswer().length === 1) {
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
    if (isAnswer().length === 1) {
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
    const res = await api.put(`admin/quiz/${params.qid}`, {
      headers: { Authorization: getToken() },
      body: {
        questions: updatedQuestions,
        name: quiz[0].name,
        thumbnail: quiz[0].thumbnail,
      },
    });
    console.log(res);
    history.replace(`/edit/${params.gid}`);
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
            <InputBase onChange={(event) => handleAnswerText(event.target.value)} variant="filled" required placeholder="Answer 1" />
            <FormControlLabel
              onChange={(event) => handleAnswerChoice(event.target.checked)}
              control={<Checkbox />}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <InputBase onChange={(event) => handleAnswerText(event.target.value)} variant="filled" required placeholder="Answer 2" />
            <FormControlLabel
              onChange={(event) => handleAnswerChoice(event.target.checked)}
              control={<Checkbox />}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <InputBase onChange={(event) => handleAnswerText(event.target.value)} variant="filled" required placeholder="Answer 3 (Optional)" />
            <FormControlLabel
              onChange={(event) => handleAnswerChoice(event.target.checked)}
              control={<Checkbox />}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <InputBase onChange={(event) => handleAnswerText(event.target.value)} variant="filled" required placeholder="Answer 4 (Optional)" />
            <FormControlLabel
              onChange={(event) => handleAnswerChoice(event.target.checked)}
              control={<Checkbox />}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <InputBase onChange={(event) => handleAnswerText(event.target.value)} variant="filled" required placeholder="Answer 5" />
            <FormControlLabel
              onChange={(event) => handleAnswerChoice(event.target.checked)}
              control={<Checkbox />}
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <InputBase onChange={(event) => handleAnswerText(event.target.value)} variant="filled" required placeholder="Answer 6 (Optional)" />
            <FormControlLabel
              onChange={(event) => handleAnswerChoice(event.target.checked)}
              control={<Checkbox />}
            />
          </Paper>
        </Grid>
      </Grid>
    </section>
  );
};

export default EditQuestion;
