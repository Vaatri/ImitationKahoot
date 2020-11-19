import React from 'react';
import PropTypes from 'prop-types';
// import NavBar from '../UIComponents/NavBar';
import { StoreContext } from '../utils/store';
import StartStage from '../UIComponents/StartStage';
import QuestionResults from './QuestionResults';
import QuestionPage from './QuestionPage';
import API from '../utils/api';
import QuestionPreview from '../UIComponents/QuestionPreview';

const api = new API('http://localhost:5005');

const stages = {
  START: 'start',
  PREVIEW: 'preview',
  QUESTION: 'question',
  RESULT: 'results',
};
// this component will be essentially a controller between questionPage and QuestionResults.
// handle session id
// from play join
const PlayPage = (props) => {
  const [stage, setStage] = React.useState(stages.START);
  const context = React.useContext(StoreContext);
  const { player: [player] } = context;
  const { session: [session] } = context;
  console.log(session);
  const [currQuestion, setCurrQuestion] = React.useState(session.questions[session.position]);
  console.log(currQuestion);
  const { match: { params } } = props;

  // This function will handle what stage the quiz should be at
  // either not started, in-progress, question, results, etc.

  React.useEffect(() => {
    (async () => {
      const started = await api.get(`play/${player}/status`);
      console.log(started);
      // if the game has started
      console.log(Date.now());
      if (started.started) {
        // set the stage depending if they're still answering the question
        // or if they're looking at the results from the questions
        if (session.answerAvailable) {
          setStage(stages.RESULT);
        } else {
          setStage(stages.QUESTION);
        }
      }
    })();
  }, [player, session.answerAvailable]);

  const loadPage = () => {
    console.log(stage);
    switch (stage) {
      case stages.PREVIEW:
        return (
          <QuestionPreview
            question={currQuestion}
            setStage={setStage}
          />
        );
      case stages.QUESTION:
        return (
          <QuestionPage
            setStage={setStage}
            question={currQuestion}
          />
        );
      case stages.RESULT:
        return (
          <QuestionResults
            setNextQuestion={setCurrQuestion}
            setStage={setStage}
            question={currQuestion}
            gId={Number(params.gid)}
            sId={params.sid}
          />
        );
      default:
        return (
          <StartStage
            setStage={setStage}
            quizId={Number(params.gid)}
            sessionId={Number(params.sid)}
          />
        );
    }
  };

  return (
    <main>
      {/* <NavBar /> */}
      <br />
      {loadPage()}
    </main>
  );
};

PlayPage.propTypes = {
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};
export default PlayPage;