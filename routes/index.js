import React from 'react';
import { Router, Route } from 'react-router';
import BrowserHistory from 'react-router/lib/BrowserHistory';

import App from '../containers/App'
import FirstPage from '../containers/FirstPage';
import SecondPage from '../containers/SecondPage';

const routes = (() =>
  <Router history={new BrowserHistory()}>
    <Route path="/" component={App}>
      <Route path="/firstform/:name" component={FirstPage} />
      <Route path="/secondform/:name" component={SecondPage} />
    </Route>
  </Router>
);

export default routes;
