/*
 *
 * InviteCodeContainer actions
 *
 */

import { GET_INVITE_TOKEN_REQUEST, GET_INVITE_TOKEN_SUCCESS, GET_INVITE_TOKEN_ERROR } from './constants';

export function getInviteCode(event_id) {
  return {
    type: GET_INVITE_TOKEN_REQUEST,
    event_id
  };
}

export function getInviteCodeSuccess(code) {
  return {
    type: GET_INVITE_TOKEN_SUCCESS,
    code
  };
}

export function getInviteCodeError(error) {
  return {
    type: GET_INVITE_TOKEN_ERROR,
    error
  };
}
