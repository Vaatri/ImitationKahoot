import React from 'react';
import PropTypes from 'prop-types';

export const StoreContext = React.createContext(null);

// eslint-disable-next-line react/prop-types
export default ({ children }) => {
  const [questions, setQuestions] = React.useState([{}]);
  const [editQuestion, setEditQuestion] = React.useState({
    id: 0,
    question: '',
    qType: 'single',
    points: 10,
    answers: [{ id: 1, text: '', correct: false }, { id: 2, text: '', correct: false }],
    media: '',
  });
  const [quiz, setQuiz] = React.useState({});
  const [answers, setAnswers] = React.useState([{ id: 1, text: '', correct: false }, { id: 2, text: '', correct: false }]);
  const store = {
    questions: [questions, setQuestions],
    editQuestion: [editQuestion, setEditQuestion],
    quiz: [quiz, setQuiz],
    answers: [answers, setAnswers],
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
StoreContext.propTypes = {
  children: PropTypes.node.isRequired,
};
