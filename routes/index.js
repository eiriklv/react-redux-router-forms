import React from 'react';
import { Router, Route } from 'react-router';
import { createHistory } from 'history';

import App from '../containers/App'
import InboxHandler from '../containers/InboxHandler';
import NoteHandler from '../containers/NoteHandler';
import NotFound from '../components/NotFound';

const routes = (() =>
  <Router history={createHistory()}>
    <Route path="/" component={App}>
      <Route path="/inbox" component={InboxHandler} />
      <Route path="/note/:id" component={NoteHandler} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);

export default routes;
