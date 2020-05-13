/*
 *
 * SignupPage actions
 *
 */

import { SIGNUP_GUEST_REQUEST, SIGNUP_GUEST_SUCCESS, SIGNUP_GUEST_ERROR } from './constants';

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
