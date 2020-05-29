/*
 *
 * VerifyCheckIn reducer
 *
 */

import { fromJS } from 'immutable';
import { CHECK_OUT_REQUEST, CHECK_OUT_SUCCESS, CHECK_OUT_ERROR } from './constants';

export const initialState = fromJS({
  success: false,
  error: null,
  guest: null,
});

function verifyCheckOutReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_OUT_REQUEST:
      return state;
    case CHECK_OUT_SUCCESS:
      return state
        .set('success', true)
        .set('guest', action.guest);
    case CHECK_OUT_ERROR:
      return state;
    default:
      return state;
  }
}

export default verifyCheckOutReducer;
