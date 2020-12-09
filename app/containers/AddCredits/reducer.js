/*
 *
 * AddCredits reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  ADD_CREDITS_PAYPAL_REQUEST, ADD_CREDITS_PAYPAL_SUCCESS, ADD_CREDITS_PAYPAL_ERROR,
  ADD_CREDITS_WITH_QR_REQUEST, ADD_CREDITS_WITH_QR_SUCCESS, ADD_CREDITS_WITH_QR_ERROR, DISMISS_CODE,
 } from './constants';

export const initialState = fromJS({
  success: null, 
  error: null,
  code: null
});

function addCreditsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CREDITS_PAYPAL_REQUEST:
      return state;
    case ADD_CREDITS_PAYPAL_SUCCESS:
      return state.set('success', action.success);
    case ADD_CREDITS_PAYPAL_ERROR:
      return state.set('error', action.error);
    case ADD_CREDITS_WITH_QR_REQUEST:
      return state;
    case ADD_CREDITS_WITH_QR_SUCCESS:
      return state
        .set('code', action.code)
        .set('success', action.success);
    case ADD_CREDITS_WITH_QR_ERROR:
      return state.set('error', action.error);
    case DISMISS_CODE:
      return state.set('success', null).set('code', null);
    default:
      return state;
  }
}

export default addCreditsReducer;
