import 'whatwg-fetch';
import omit from 'lodash/object/omit';
import isFunction from 'lodash/lang/isFunction';
import { normalize } from 'normalizr';

import schemas from '../store/schemas';

export const CALL_API = Symbol('Call API');

function callApi(endpoint, schema, data, method, suc, err) {
  // console.log(omit(data, isFunction));
  $.ajax({
    type: method,
    url: `/${endpoint}`,
    data: omit(data, isFunction),
    success: (result) => {
      if (schema === schemas.NORMAL_RESP) {
        suc(Object.assign({}, result));
      } else {
        suc(Object.assign({}, normalize(result || {}, schema)));
      }
    },
    error: (e) => {
      err(e.responseText);
    }
  });
}

export default store => {
  return next => {
    return action => {
      const callAPI = action[CALL_API];
      if (typeof callAPI === 'undefined') {
        return next(action);
      }

      let {schema, types, endpoint, data, method, sucMsg, errorMsg, sucCallback, errCallback} = callAPI;

      if (typeof endpoint === 'function') {
        endpoint = endpoint(store.getState());
      }

      if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.');
      }
      if (!schema) {
        throw new Error('Specify one of the exported Schemas.');
      }
      if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.');
      }
      if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.');
      }

      function actionWith(data) {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[CALL_API]
        return finalAction;
      }

      const [requestType, successType, failureType] = types;
      next(actionWith({
        type: requestType
      }));

      return callApi(endpoint, schema, data, method, response => {
        next(actionWith({
          response,
          type: successType,
          sucMsg: sucMsg || 'Operation success.'
        }));
        if (sucCallback) {
          sucCallback();
        }
      }, error => {
        next(actionWith({
          type: failureType,
          errMsg: errorMsg || 'Operation failed. Please retry.'
        }));
        if (errCallback) {
          errCallback(error);
        }
      }
      );
    }
  }
}
