/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import { fromJS } from 'immutable';
import { decode } from 'utils/tokenUtils';
import {
  AUTHENTICATE,
  LOGOUT,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
} from './constants';

const tokenIsExpired = () => {
  const getToken = localStorage.getItem('jwt');
  const token = decode(getToken);
  const isExpired = new Date() > new Date(token.exp * 1000);
  return isExpired;
};

const getScope = () => {
  const hasToken = !!localStorage.getItem('jwt');

  if (!hasToken) return null;

  const token = decode(localStorage.getItem('jwt'));
  return token.scope || null;
};

const getRole = () => {
  const hasToken = !!localStorage.getItem('jwt');

  if (!hasToken) return null;
  const token = decode(localStorage.getItem('jwt'));
  return token.role || null;
};

const getAgeVerify = () => {
  const token = decode(localStorage.getItem('jwt'));
  return token.is_age_verified;
};

const getUserId = () => {
  const hasToken = !!localStorage.getItem('jwt');

  if (!hasToken) return null;
  const token = decode(localStorage.getItem('jwt'));
  return token.id || null;
};

// The initial state of the App
export const initialState = fromJS({
  loading: false,
  error: false,
  isAuthenticated: !!localStorage.getItem('jwt') && !tokenIsExpired(),
  isAgeVerified: !!localStorage.getItem('jwt') && getAgeVerify(),
  scope: getScope(),
  role: getRole(),
  userId: getUserId(),
});

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_REQUEST:
      return state;
    case GET_USER_SUCCESS:
      return state.set('user', action.user);
    case GET_USER_ERROR:
      return state;
    case AUTHENTICATE:
      return state
        .set('isAuthenticated', true)
        .set('isAgeVerified', action.is_age_verified)
        .set('scope', action.scope)
        .set('role', action.role);
    case LOGOUT:
      return state.set('user', null).set('isAuthenticated', false);
    default:
      return state;
  }
};

export default appReducer;
