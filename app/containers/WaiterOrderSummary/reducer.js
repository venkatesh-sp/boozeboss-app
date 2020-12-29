/*
 *
 * otp reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_WAITER_ORDER_SUMMARY_ERROR,
  GET_WAITER_ORDER_SUMMARY_REQUEST,
  GET_WAITER_ORDER_SUMMARY_SUCCESS,
} from './constants';

export const initialState = fromJS({
  error: null,
  success: null,
  isLoading: null,
  items: null,
});

function WaiterOrdersSummaryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WAITER_ORDER_SUMMARY_REQUEST:
      return state.set('isLoading', true);
    case GET_WAITER_ORDER_SUMMARY_SUCCESS:
      return state.set('items', action.items);
    case GET_WAITER_ORDER_SUMMARY_ERROR:
      return state.set('error', action.error).set('isLoading', false);
    default:
      return state;
  }
}

export default WaiterOrdersSummaryReducer;
