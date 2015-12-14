"use strict";

import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Root from './containers/Root';
import configureStore from './store/configureStore';

let NoMatch;
injectTapEventPlugin();
const store = configureStore();

ReactDom.render(
  <Root store={store} />,
  document.getElementById('app')
);
