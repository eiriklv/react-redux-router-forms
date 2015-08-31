import React from 'react';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';

import App from '../containers/App'
import FirstPage from '../containers/FirstPage';
import SecondPage from '../containers/SecondPage';
import NotFound from '../components/NotFound';

const routes = (() =>
  <Router history={createHistory()}>
    <Route path="/" component={App}>
      <Route path="firstform/:name" component={FirstPage} />
      <Route path="secondform/:name" component={SecondPage} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default routes;
