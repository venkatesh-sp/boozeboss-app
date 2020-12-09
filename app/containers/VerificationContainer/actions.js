/*
 *
 * VerificationContainer actions
 *
 */

import { 
  UPLOAD_VERIFICATION_REQUEST, UPLOAD_VERIFICATION_SUCCESS, UPLOAD_VERIFICATION_ERROR,
  SUBMIT_VERIFICATION_REQUEST, SUBMIT_VERIFICATION_SUCCESS, SUBMIT_VERIFICATION_ERROR, CHECK_VERIFICATION_REQUEST, CHECK_VERIFICATION_SUCCESS, CHECK_VERIFICATION_ERROR
} from './constants';

export function checkVerification() {
  return {
    type: CHECK_VERIFICATION_REQUEST,
  };
}

export function checkVerificationSuccess(success) {
  return {
    type: CHECK_VERIFICATION_SUCCESS,
    success,
  };
}

export function checkVerificationError(error) {
  return {
    type: CHECK_VERIFICATION_ERROR,
    error
  }
};

// Upload verification attachments
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
  }
};


export function submitVerification(age_verification_status) {
  return {
    type: SUBMIT_VERIFICATION_REQUEST,
    age_verification_status
  };
}

export function submitVerificationSuccess(success) {
  return {
    type: SUBMIT_VERIFICATION_SUCCESS,
    success,
  };
}

export function submitVerificationError(error) {
  return {
    type: SUBMIT_VERIFICATION_ERROR,
    error
  };
}
