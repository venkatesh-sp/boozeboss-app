/*
 *
 * OrderPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  SEND_MOBILE_OTP_REQUEST,
  SEND_MOBILE_OTP_SUCCESS,
  SEND_MOBILE_OTP_ERROR,
  SEND_EMAIL_OTP_REQUEST,
  SEND_EMAIL_OTP_SUCCESS,
  SEND_EMAIL_OTP_ERROR,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_ERROR,
  VERIFY_EMAIL_PHONE_REQUEST,
  VERIFY_EMAIL_PHONE_SUCESS,
  VERIFY_EMAIL_PHONE_ERROR,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  VERIFY_ERROR,
} from './constants';

export const initialState = fromJS({
  token: null,
  success: null,
  error: null,
});

function authReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER_REQUEST:
      return state.set('isLoading', true);
    case ADD_USER_SUCCESS:
      return state
        .set('token', action.token)
        .set('success', action.success)
        .set('isLoading', false);
    case ADD_USER_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    case SEND_MOBILE_OTP_REQUEST:
      return state;
    case SEND_MOBILE_OTP_SUCCESS:
      return state.set('success', action.success);
    case SEND_MOBILE_OTP_ERROR:
      return state.set('error', action.error).set('token', null);
    // case VERIFY_EMAIL_PHONE_REQUEST:
    //   return state;
    case VERIFY_EMAIL_PHONE_SUCESS:
      return state.set('token', action.token).set('isLoading', false);
    case VERIFY_EMAIL_PHONE_ERROR:
      return state.set('error', action.error);
    case VERIFY_REQUEST:
      return state;
    case VERIFY_SUCCESS:
      return state.set('success', action.success);
    case VERIFY_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default authReducer;
