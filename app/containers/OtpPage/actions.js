/*
 *
 * SignupPage actions
 *
 */

import status from 'utils/status';
import {
  CHECK_SMS_VERIFICATION_REQUEST,
  CHECK_SMS_VERIFICATION_SUCCESS,
  CHECK_SMS_VERIFICATION_ERROR,
  CHECK_EMAIL_VERIFICATION_REQUEST,
  CHECK_EMAIL_VERIFICATION_SUCCESS,
  CHECK_EMAIL_VERIFICATION_ERROR,
  SEND_MOBILE_OTP_REQUEST,
  SEND_MOBILE_OTP_SUCCESS,
  SEND_MOBILE_OTP_ERROR,
  VERIFY_EMAIL_PHONE_REQUEST,
  VERIFY_EMAIL_PHONE_SUCESS,
  VERIFY_EMAIL_PHONE_ERROR,
} from './constants';

// Check code
export function checkSMSVerification(phone, code) {
  return {
    type: CHECK_SMS_VERIFICATION_REQUEST,
    phone,
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
  status(error, 'error');
  return {
    type: CHECK_SMS_VERIFICATION_ERROR,
    error,
  };
}

export function checkEmailVerification(email, code) {
  return {
    type: CHECK_EMAIL_VERIFICATION_REQUEST,
    email,
    code,
  };
}

export function checkEmailVerificationSuccess(success) {
  return {
    type: CHECK_EMAIL_VERIFICATION_SUCCESS,
    success,
  };
}

export function checkEmailVerificationError(error) {
  status(error, 'error');
  return {
    type: CHECK_EMAIL_VERIFICATION_ERROR,
    error,
  };
}

export function sendMobileOtp(phone_number) {
  return {
    type: SEND_MOBILE_OTP_REQUEST,
    phone_number,
  };
}

export function sendMobileOtpSuccess(success) {
  // status(success, 'success');
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
