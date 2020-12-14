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
} from './constants';

// Check code
export function checkSMSVerification(phone_number, code) {
  return {
    type: CHECK_SMS_VERIFICATION_REQUEST,
    phone_number,
    code,
  };
}

export function checkSMSVerificationSuccess(success) {
  status(success, 'success');
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
