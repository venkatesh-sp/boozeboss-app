/*
 *
 * LoginPage actions
 *
 */

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from './constants';

export function login(auth) {
  return {
    type: LOGIN_REQUEST,
    auth
  };
}

export function loginSuccess(success) {
  return {
    type: LOGIN_SUCCESS,
    success
  };
}

export function loginError(error) {
  return {
    type: LOGIN_ERROR,
    error
  };
}
