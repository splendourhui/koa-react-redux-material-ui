import React from 'react';
import { Route, Redirect, DefaultRoute } from 'react-router';
import App from './containers/App';
import IndexPage from './containers/IndexPage';

export default (
  <Route path="/" component={App}>
    <Route path="page/index" component={IndexPage} />
  </Route>
)
