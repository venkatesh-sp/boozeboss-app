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
  ADD_CART_ITEMS_REQUEST,
  ADD_CART_ITEMS_SUCCESS,
  ADD_CART_ITEMS_ERROR,
} from './constants';

// Check code
export function checkSMSVerification(phone_number, code, props) {
  return {
    type: CHECK_SMS_VERIFICATION_REQUEST,
    phone_number,
    code,
    props,
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

export function checkEmailVerification(email, code, props) {
  return {
    type: CHECK_EMAIL_VERIFICATION_REQUEST,
    email,
    code,
    props,
  };
}

export function checkEmailVerificationSuccess(success) {
  status(success, 'success');
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

export function addCartItems(items) {
  return {
    type: ADD_CART_ITEMS_REQUEST,
    items,
  };
}

export function addCartItemsSuccess(success) {
  status(success, 'success');
  return {
    type: ADD_CART_ITEMS_SUCCESS,
    success,
  };
}

export function addCartItemsError(error) {
  status(error, 'error');
  return {
    type: ADD_CART_ITEMS_ERROR,
    error,
  };
}
