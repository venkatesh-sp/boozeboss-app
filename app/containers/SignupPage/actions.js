/*
 *
 * SignupPage actions
 *
 */

import {
  SIGNUP_GUEST_REQUEST,
  SIGNUP_GUEST_SUCCESS,
  SIGNUP_GUEST_ERROR,
  FACEBOOK_LOGIN_REQUEST,
  FACEBOOK_LOGIN_SUCCESS,
  FACEBOOK_LOGIN_ERROR,
  GET_SMS_VERIFICATION_REQUEST,
  GET_SMS_VERIFICATION_SUCCESS,
  GET_SMS_VERIFICATION_ERROR,
  CHECK_SMS_VERIFICATION_REQUEST,
  CHECK_SMS_VERIFICATION_SUCCESS,
  CHECK_SMS_VERIFICATION_ERROR,
} from './constants';

export function signup(guest) {
  return {
    type: SIGNUP_GUEST_REQUEST,
    guest,
  };
}

export function signupSuccess(token, success) {
  localStorage.setItem('jwt', token);
  return {
    type: SIGNUP_GUEST_SUCCESS,
    token,
    success,
  };
}

export function signupError(error) {
  return {
    type: SIGNUP_GUEST_ERROR,
    error,
  };
}

export function facebookAuth(auth) {
  return {
    type: FACEBOOK_LOGIN_REQUEST,
    auth,
  };
}

export function facebookAuthSuccess(success) {
  return {
    type: FACEBOOK_LOGIN_SUCCESS,
    success,
  };
}

export function facebookAuthError(error) {
  return {
    type: FACEBOOK_LOGIN_ERROR,
    error,
  };
}

// SMS
export function getSMSVerification(phone_number) {
  return {
    type: GET_SMS_VERIFICATION_REQUEST,
    phone_number,
  };
}

export function getSMSVerificationSuccess(success) {
  return {
    type: GET_SMS_VERIFICATION_SUCCESS,
    success,
  };
}

export function getSMSVerificationError(error) {
  return {
    type: GET_SMS_VERIFICATION_ERROR,
    error,
  };
}

// Check code
export function checkSMSVerification(phone_number, code) {
  return {
    type: CHECK_SMS_VERIFICATION_REQUEST,
    phone_number,
    code,
  };
}

export function checkSMSVerificationSuccess(success) {
  return {
    type: CHECK_SMS_VERIFICATION_SUCCESS,
    success,
  };
}

export function checkSMSVerificationError(error) {
  return {
    type: CHECK_SMS_VERIFICATION_ERROR,
    error,
  };
}
