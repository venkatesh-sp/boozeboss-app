/*
 *
 * ClientSignup reducer
 *
 */

import { fromJS } from 'immutable';
import { SIGNUP_GUEST_REQUEST, SIGNUP_GUEST_SUCCESS, SIGNUP_GUEST_ERROR, FACEBOOK_LOGIN_REQUEST, FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_ERROR } from './constants';

export const initialState = fromJS({
  error: null,
  success: null,
  isLoading: null,
});

function clientSignupReducer(state = initialState, action) {
  switch (action.type) {
    case SIGNUP_GUEST_REQUEST:
      return state.set('isLoading', true);
    case SIGNUP_GUEST_SUCCESS:
      return state.set('success', action.success).set('isLoading', false);
    case SIGNUP_GUEST_ERROR:
      return state
        .set('error', action.error)
        .set('isLoading', false);;
    case FACEBOOK_LOGIN_REQUEST:
      return state.set('isLoading', true);
    case FACEBOOK_LOGIN_SUCCESS:
      return state.set('success', action.success).set('isLoading', false);
    case FACEBOOK_LOGIN_ERROR:
      return state
        .set('error', action.error)
        .set('isLoading', false);;
    default:
      return state;
  }
}

export default clientSignupReducer;
