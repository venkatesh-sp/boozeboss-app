/*
 *
 * VerificationContainer actions
 *
 */

import { UPLOAD_VERIFICATION_REQUEST, UPLOAD_VERIFICATION_SUCCESS, UPLOAD_VERIFICATION_ERROR } from './constants';

export function uploadVerification(verification_type, file) {
  return {
    type: UPLOAD_VERIFICATION_REQUEST,
    verification_type,
    file
  };
}

export function uploadVerificationSuccess(success) {
  return {
    type: UPLOAD_VERIFICATION_SUCCESS,
    success,
  };
}

export function uploadVerificationError(error) {
  return {
    type: UPLOAD_VERIFICATION_ERROR,
    error
  };
}
