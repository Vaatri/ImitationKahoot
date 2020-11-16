import React from 'react';
import {
  Grid,
} from '@material-ui/core';
// import PropTypes from 'prop-types';
import Answer from './Answer';

const Answers = () => (
  <Grid container direction="row" spacing={2}>
    <Answer id={1} />
    <Answer id={2} />
    <Answer id={3} />
    <Answer id={4} />
    <Answer id={5} />
    <Answer id={6} />
  </Grid>
);

// Answers.propTypes = {
//   setQuestion: PropTypes.func.isRequired,
// };
export default Answers;
