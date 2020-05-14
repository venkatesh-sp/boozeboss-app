/*
 *
 * SignupPage actions
 *
 */

import { 
  SIGNUP_GUEST_REQUEST, SIGNUP_GUEST_SUCCESS, SIGNUP_GUEST_ERROR,
  FACEBOOK_LOGIN_REQUEST, FACEBOOK_LOGIN_SUCCESS, FACEBOOK_LOGIN_ERROR
} from './constants';

export function signup(guest) {
  return {
    type: SIGNUP_GUEST_REQUEST,
    guest
  };
}

export function signupSuccess(success) {
  return {
    type: SIGNUP_GUEST_SUCCESS,
    success
  };
}

export function signupError(error) {
  return {
    type: SIGNUP_GUEST_ERROR,
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
