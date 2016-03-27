import { routerStateReducer as router } from 'redux-router';
import { combineReducers } from 'redux';

import common from './common';

const rootReducer = combineReducers({
  common,
  router
});

export default rootReducer;
