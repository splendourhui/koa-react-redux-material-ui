import { pushState } from 'redux-router';

export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';
export const SHOW_SUCCESS_MSG = 'SHOW_SUCCESS_MSG';
export const SHOW_ERROR_MSG = 'SHOW_ERROR_MSG';
export const HIDE_SUCCESS_MESSAGE = 'HIDE_SUCCESS_MESSAGE';
export const HIDE_ERROR_MESSAGE = 'HIDE_ERROR_MESSAGE';

export function showLoading(msg) {
  return {
    type: SHOW_LOADING,
    msg: msg || 'loading'
  }
}

export function hideLoading() {
  return {
    type: HIDE_LOADING
  }
}

export function showSuccessMessage(msg) {
  return {
    type: SHOW_SUCCESS_MSG,
    sucMsg: msg
  }
}

export function showErrorMessage(msg) {
  return {
    type: SHOW_ERROR_MSG,
    errMsg: msg
  }
}

export function hideSuccessMessage() {
  return {
    type: HIDE_SUCCESS_MESSAGE
  }
}

export function hideErrorMessage() {
  return {
    type: HIDE_ERROR_MESSAGE
  }
}

export function jumpTo(path, name) {
  return (dispatch, getState) => {
    return dispatch(pushState(null, path));
  };
}
