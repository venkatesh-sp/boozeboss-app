/*
 *
 * FreeDrinkCode actions
 *
 */

import { 
  GENERATE_FREE_DRINK_CODE_REQUEST, GENERATE_FREE_DRINK_CODE_SUCCESS, GENERATE_FREE_DRINK_CODE_ERROR
} from './constants';

export function generateCode(event_id, event_guest_id) {
  return {
    type: GENERATE_FREE_DRINK_CODE_REQUEST,
    event_id, 
    event_guest_id,
  };
}

export function generateCodeSuccess(response) {
  return {
    type: GENERATE_FREE_DRINK_CODE_SUCCESS,
    response, 
  };
}

export function generateCodeError(error) {
  return {
    type: GENERATE_FREE_DRINK_CODE_ERROR,
    error
  };
}
