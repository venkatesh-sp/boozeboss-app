/*
 *
 * AddCredits reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  ADD_CREDITS_PAYPAL_REQUEST, ADD_CREDITS_PAYPAL_SUCCESS, ADD_CREDITS_PAYPAL_ERROR
 } from './constants';

export const initialState = fromJS({
  success: null, 
  error: null
});

function addCreditsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CREDITS_PAYPAL_REQUEST:
      return state;
    case ADD_CREDITS_PAYPAL_SUCCESS:
      return state.set('success', action.success);
    case ADD_CREDITS_PAYPAL_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default addCreditsReducer;
