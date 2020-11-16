import React from 'react';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Homepage from '../pages/Homepage';
import Dashboard from '../pages/Dashboard';
import EditQuiz from '../pages/EditQuiz';
import PublicRoute from '../components/PublicRoute';
import PrivateRoute from '../components/PrivateRoute';
import JoinGame from '../pages/JoinGame';
import EditQuestion from '../pages/EditQuestion';

const routes = [
  <PublicRoute restricted component={Login} path="/login" exact />,
  <PublicRoute restricted component={Register} path="/register" exact />,
  <PublicRoute restricted={false} component={Homepage} path="/" exact />,
  <PrivateRoute component={Dashboard} path="/dashboard" exact />,
  // <PrivateRoute component={NewGame} path="/CreateQuiz" exact />,
  // incase you wanted to pass in some props you would do it this way
  <PrivateRoute component={EditQuestion} path="/edit/:gid/:qid" exact />,
  <PrivateRoute component={EditQuiz} path="/edit/:gid" exact />,
  <PrivateRoute component={JoinGame} path="/join" exact />,
];

export default routes;
