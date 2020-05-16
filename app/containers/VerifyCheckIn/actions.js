/*
 *
 * VerifyCheckIn actions
 *
 */

import { CHECK_IN_REQUEST, CHECK_IN_SUCCESS, CHECK_IN_ERROR } from './constants';

export function checkIn(token) {
  return {
    type: CHECK_IN_REQUEST,
    token
  };
}

export function checkInSuccess(guest) {
  return {
    type: CHECK_IN_SUCCESS,
    guest
  };
}

export function checkInError(error) {
  return {
    type: CHECK_IN_ERROR,
    error
  };
}
