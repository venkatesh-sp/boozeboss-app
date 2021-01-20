/*
 *
 * OutletPage actions
 *
 */

import status from 'utils/status';
import {
  SEND_MOBILE_OTP_REQUEST,
  SEND_MOBILE_OTP_SUCCESS,
  SEND_MOBILE_OTP_ERROR,
  SEND_EMAIL_OTP_REQUEST,
  SEND_EMAIL_OTP_SUCCESS,
  SEND_EMAIL_OTP_ERROR,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  VERIFY_EMAIL_PHONE_REQUEST,
  VERIFY_EMAIL_PHONE_SUCESS,
  VERIFY_EMAIL_PHONE_ERROR,
} from './constants';

export function sendMobileOtp(phone_number) {
  return {
    type: SEND_MOBILE_OTP_REQUEST,
    phone_number,
  };
}

export function sendMobileOtpSuccess(success) {
  status(success, 'success');
  return {
    type: SEND_MOBILE_OTP_SUCCESS,
    success,
  };
}

export function sendMobileOtpError(error) {
  return {
    type: SEND_MOBILE_OTP_ERROR,
    error,
  };
}

export function sendEmailOtp(email) {
  return {
    type: SEND_EMAIL_OTP_REQUEST,
    email,
  };
}

export function sendEmailOtpSuccess(success) {
  return {
    type: SEND_EMAIL_OTP_SUCCESS,
    success,
  };
}

export function sendEmailOtpError(error) {
  return {
    type: SEND_EMAIL_OTP_ERROR,
    error,
  };
}

export function authSignup(user) {
  return {
    type: ADD_USER_REQUEST,
    user,
  };
}

export function authSignupSuccess(token, success) {
  localStorage.setItem('jwt', token);
  status(success, 'success');
  return {
    type: ADD_USER_SUCCESS,
    token,
    success,
  };
}

export function authSignupError(error) {
  status(error, 'error');
  return {
    type: ADD_USER_ERROR,
    error,
  };
}

export function verifyEmailPhone(email_phone) {
  return {
    type: VERIFY_EMAIL_PHONE_REQUEST,
    email_phone,
  };
}

export function verifyEmailPhoneSuccess(token, success) {
  localStorage.setItem('jwt', token);
  return {
    type: VERIFY_EMAIL_PHONE_SUCESS,
    token,
    success,
  };
}

export function verifyEmailPhoneError(error) {
  status(error, 'error');
  return {
    type: VERIFY_EMAIL_PHONE_ERROR,
    error,
  };
}
