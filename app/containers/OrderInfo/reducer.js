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
  ADD_CART_ITEMS_SUCCESS,
  ADD_CART_ITEMS_ERROR,
  ADD_CART_ITEMS_REQUEST,
} from './constants';

export const initialState = fromJS({
  error: null,
  success: null,
  isLoading: null,
  cartitems: null,
});

function orderReducer(state = initialState, action) {
  switch (action.type) {
    case GET_CART_ITEMS_REQUEST:
      return state.set('isLoading', true);
    case GET_CART_ITEMS_SUCCESS:
      return state.set('cartitems', action.items);
    case GET_CART_ITEMS_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    case ADD_CART_ITEMS_REQUEST:
      return state.set('isLoading', true);
    case ADD_CART_ITEMS_SUCCESS:
      return state.set('success', true);
    case ADD_CART_ITEMS_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    default:
      return state;
  }
}

export default orderReducer;
