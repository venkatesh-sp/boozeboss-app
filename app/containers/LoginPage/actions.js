/*
 *
 * LoginPage actions
 *
 */

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, FACEBOOK_LOGIN_REQUEST, FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_ERROR } from './constants';

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

export function facebookAuth(auth) {
  return {
    type: FACEBOOK_LOGIN_REQUEST,
    auth
  };
}

export function facebookAuthSuccess(success) {
  return {
    type: FACEBOOK_LOGIN_SUCCESS,
    success
  };
}

export function facebookAuthError(error) {
  return {
    type: FACEBOOK_LOGIN_ERROR,
    error
  };
}
