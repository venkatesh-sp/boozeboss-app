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
  ORDER_ITEMS_REQUEST,
  GET_ITEMS_MODALRENDER,
} from './constants';

export const initialState = fromJS({
  error: null,
  success: null,
  isLoading: null,
  items: null,
  shouldRenderModal: false,
  orderDetails: {},
});

function waiterReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS_REQUEST:
      return state.set('isLoading', true);
    case GET_ITEMS_SUCCESS:
      return state.set('items', action.items);
    case GET_ITEMS_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    case ORDER_ITEMS_REQUEST:
      return state.set('orderDetails', action.details);
    default:
      return state;
  }
}

export default waiterReducer;
