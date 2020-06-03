/*
 *
 * VerifyCheckIn reducer
 *
 */

import { fromJS } from 'immutable';
import { CHECK_IN_REQUEST,CHECK_IN_SUCCESS, CHECK_IN_ERROR } from './constants';

export const initialState = fromJS({
  success: false,
  error: null,
  guest: null,
});

function verifyCheckInReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_IN_REQUEST:
      return state;
    case CHECK_IN_SUCCESS:
      return state
        .set('success', true)
        .set('guest', action.guest);
    case CHECK_IN_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default verifyCheckInReducer;
