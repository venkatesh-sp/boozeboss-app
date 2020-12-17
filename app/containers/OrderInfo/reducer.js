/*
 *
 * otp reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_CART_ITEMS_SUCCESS,
  GET_CART_ITEMS_ERROR,
  GET_CART_ITEMS_REQUEST,
} from './constants';

export const initialState = fromJS({
  error: null,
  success: null,
  isLoading: null,
  cartitems: null,
});

function otpReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART_ITEMS_REQUEST:
      return state.set('isLoading', true);
    case GET_CART_ITEMS_SUCCESS:
      return state.set('cartitems', action.items);
    case GET_CART_ITEMS_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    default:
      return state;
  }
}

export default otpReducer;
