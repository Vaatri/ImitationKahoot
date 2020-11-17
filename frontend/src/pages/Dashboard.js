import React from 'react';
import { Typography } from '@material-ui/core';
import NavBar from '../UIComponents/NavBar';
// import isLogin from '../utils';
import API from '../utils/api';
import { getToken } from '../utils/helpers';
import GameCard from '../UIComponents/GameCard';
import logo from '../assets/BBLogo.jpg';

const api = new API('http://localhost:5005');

function Dashboard() {
  const [games, setGames] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const quizzes = await api.get('admin/quiz', {
        headers: { Authorization: getToken() },
      });
      // console.log(quizzes.quizzes);
      // using all of the id's we found from the previous api call
      // we can get all of the information we actually need
      // this should return a list of quiz meta data.
      console.log(getToken());
      // from the first fetch we get id, and the title,
      // the second we get the questions and thumbnail.
      const allQuizzes = await Promise.all(quizzes.quizzes.map(async (quiz) => {
        const res = await api.get(`admin/quiz/${quiz.id}`, { headers: { Authorization: getToken() } });
        let { thumbnail } = res;
        if (thumbnail === null) {
          console.log('ok');
          thumbnail = logo;
        }
        console.log(thumbnail);
        return {
          id: quiz.id, questions: res.questions, title: quiz.name, thumbnail,
        };
      }));
      console.log(allQuizzes);
      setGames(allQuizzes);
    })();
  }, []);

  return (
    <main id="dashboard">
      <header>
        <NavBar />
      </header>
      <section>
        <Typography variant="h3">Welcome to your dashboard!</Typography>
        {/* {Note lint doesn't fucking allow object types so we have to do this} */}
        {games.map((quiz) => (
          <GameCard
            qId={quiz.id}
            questions={quiz.questions}
            title={quiz.name}
            imgSrc={quiz.thumbnail}
          />
        ))}
      </section>
    </main>
  );
}

export default Dashboard;
