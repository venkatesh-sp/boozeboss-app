/*
 *
 * otp reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  GET_ITEMS_REQUEST,
} from './constants';

export const initialState = fromJS({
  error: null,
  success: null,
  isLoading: null,
  items: null,
});

function otpReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS_REQUEST:
      return state.set('isLoading', true);
    case GET_ITEMS_SUCCESS:
      return state.set('items', action.items);
    case GET_ITEMS_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    default:
      return state;
  }
}

export default otpReducer;
