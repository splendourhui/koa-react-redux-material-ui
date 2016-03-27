import { combineReducers } from 'redux';
import * as commonActions from '../actions/common';

function loading(state = false, action) {
  switch (action.type) {
    case commonActions.SHOW_LOADING:
      return true;
    case commonActions.HIDE_LOADING:
    case commonActions.SHOW_SUCCESS_MSG:
    case commonActions.SHOW_ERROR_MSG:
      return false;
    default:
      return state;
  }
}

function messages(state = {
    message: 'test'
  }, action) {
  switch (action.type) {
    case commonActions.SHOW_SUCCESS_MSG:
      return Object.assign({}, state, {
        show: true,
        message: action.sucMsg
      });
    case commonActions.SHOW_ERROR_MSG:
      return Object.assign({}, state, {
        show: true,
        message: action.errMsg
      });
    case commonActions.HIDE_SUCCESS_MESSAGE:
    case commonActions.HIDE_ERROR_MESSAGE:
    default:
      return Object.assign({}, state, {
        show: false
      });
  }
}

const commonReducer = combineReducers({
  loading,
  messages,
});

export default commonReducer;
