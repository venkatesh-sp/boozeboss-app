/*
 *
 * otp reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHECK_SMS_VERIFICATION_ERROR,
  CHECK_EMAIL_VERIFICATION_ERROR,
  CHECK_EMAIL_VERIFICATION_SUCCESS,
  CHECK_SMS_VERIFICATION_SUCCESS,
  CHECK_SMS_VERIFICATION_REQUEST,
  CHECK_EMAIL_VERIFICATION_REQUEST,
  SEND_MOBILE_OTP_REQUEST,
  SEND_MOBILE_OTP_SUCCESS,
  SEND_MOBILE_OTP_ERROR,
} from './constants';

export const initialState = fromJS({
  error: null,
  success: null,
  isLoading: null,
});

function otpReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_EMAIL_VERIFICATION_REQUEST:
      return state;
    case CHECK_SMS_VERIFICATION_REQUEST:
      return state;
    case CHECK_SMS_VERIFICATION_SUCCESS:
      return state.set('isLoading', false).set('success', true);
    case CHECK_EMAIL_VERIFICATION_SUCCESS:
      return state.set('isLoading', false).set('success', true);
    case CHECK_SMS_VERIFICATION_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    case CHECK_EMAIL_VERIFICATION_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    case SEND_MOBILE_OTP_REQUEST:
      return state;
    case SEND_MOBILE_OTP_SUCCESS:
      return state;
    case SEND_MOBILE_OTP_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default otpReducer;
