/*
 *
 * VerifyCheckIn actions
 *
 */

import { CHECK_OUT_REQUEST, CHECK_OUT_SUCCESS, CHECK_OUT_ERROR } from './constants';

export function checkOut(token) {
  return {
    type: CHECK_OUT_REQUEST,
    token
  };
}

export function checkOutSuccess(guest) {
  return {
    type: CHECK_OUT_SUCCESS,
    guest
  };
}

export function checkOutError(error) {
  return {
    type: CHECK_OUT_ERROR,
    error
  };
}
