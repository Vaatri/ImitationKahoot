import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import {
  CardContent, Typography, Card, CardMedia, Button, CardActions, makeStyles,
} from '@material-ui/core';
// import { StoreContext } from '../utils/store';
// TODO handle deleting the quiz

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
  },
  image: {
    backgroundSize: 'cover',
  },
}));

// card needs just the id really
const GameCard = ({
  gId, questions, title, imgSrc,
}) => {
  const history = useHistory();
  const classes = useStyles();
  // const [image, setImage] = React.useState(logo);
  const linkEdit = () => {
    console.log('linkedit');
    history.push(`/edit/${gId}/`);
  };
  const linkStart = () => history.push('/placeholder');

  console.log(imgSrc);

  return (
    <Card key={gId}>
      <CardMedia className={classes.imageContainer}>
        <img src={imgSrc} className={classes.image} alt="card-thumbnail" />
      </CardMedia>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h6">{`Questions: ${questions.length}`}</Typography>
        <Typography variant="h6">{`Length: ${gId}`}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={linkEdit}>Edit Game</Button>
        <Button>Delete Game</Button>
        <Button onClick={linkStart}>Start Game</Button>
      </CardActions>
    </Card>
  );
};
GameCard.propTypes = {
  gId: PropTypes.number.isRequired,
  questions: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
};

export default GameCard;
