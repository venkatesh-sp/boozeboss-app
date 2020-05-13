/*
 *
 * ClientSignup reducer
 *
 */

import { fromJS } from 'immutable';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, FACEBOOK_LOGIN_REQUEST, FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_ERROR } from './constants';

export const initialState = fromJS({
  error: null,
  success: null,
  isLoading: null,
});

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return state.set('isLoading', true);
    case LOGIN_SUCCESS:
      return state.set('success', action.success).set('isLoading', false);
    case LOGIN_ERROR:
      return state
        .set('error', action.error)
        .set('isLoading', false);
    case FACEBOOK_LOGIN_REQUEST:
      return state.set('isLoading', true);
    case FACEBOOK_LOGIN_SUCCESS:
      return state.set('success', action.success).set('isLoading', false);
    case FACEBOOK_LOGIN_ERROR:
      return state
        .set('error', action.error)
        .set('isLoading', false);
    default:
      return state;
  }
}

export default loginReducer;
