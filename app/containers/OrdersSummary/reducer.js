/*
 *
 * otp reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_ORDERS_SUMMARY_SUCCESS,
  GET_ORDERS_SUMMARY_ERROR,
  GET_ORDERS_SUMMARY_REQUEST,
} from './constants';

export const initialState = fromJS({
  error: null,
  success: null,
  isLoading: null,
  items: null,
});

function OrdersSummaryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ORDERS_SUMMARY_REQUEST:
      return state.set('isLoading', true);
    case GET_ORDERS_SUMMARY_SUCCESS:
      return state.set('items', action.items);
    case GET_ORDERS_SUMMARY_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    default:
      return state;
  }
}

export default OrdersSummaryReducer;
