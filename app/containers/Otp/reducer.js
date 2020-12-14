/*
 *
 * otp reducer
 *
 */

import { fromJS } from 'immutable';
import { CHECK_SMS_VERIFICATION_ERROR } from './constants';

export const initialState = fromJS({
  error: null,
  success: null,
  isLoading: null,
});

function otpReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_SMS_VERIFICATION_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    default:
      return state;
  }
}

export default otpReducer;
