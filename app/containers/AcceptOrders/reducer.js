/*
 *
 * otp reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_OUTLET_VENUE_REQUEST,
  GET_OUTLET_VENUE_SUCCESS,
  GET_OUTLET_VENUE_ERROR,
  GET_OUTLET_EVENT_REQUEST,
  GET_OUTLET_EVENT_SUCCESS,
  GET_OUTLET_EVENT_ERROR,
  ADD_CART_ITEMS_REQUEST,
  ADD_CART_ITEMS_SUCCESS,
  ADD_CART_ITEMS_ERROR,
  ADD_INFO_REQUEST,
  ADD_INFO_SUCCESS,
  ADD_INFO_ERROR,
} from './constants';

export const initialState = fromJS({
  error: null,
  success: null,
  isLoading: null,
  currentOutlet: null,
  outlet: null,
});

function waiterReducer(state = initialState, action) {
  switch (action.type) {
    case GET_OUTLET_VENUE_REQUEST:
      return state;
    case GET_OUTLET_VENUE_SUCCESS:
      return state.set('outlet', action.venue);
    case GET_OUTLET_VENUE_ERROR:
      return state.set('error', action.error);
    case GET_OUTLET_EVENT_REQUEST:
      return state;
    case GET_OUTLET_EVENT_SUCCESS:
      return state.set('outlet', action.event);
    case GET_OUTLET_EVENT_ERROR:
      return state.set('error', action.error);
    case ADD_CART_ITEMS_REQUEST:
      return state;
    case ADD_CART_ITEMS_SUCCESS:
      return state.set('success', action.success);
    case ADD_CART_ITEMS_ERROR:
      return state.set('error', action.error);
    case ADD_INFO_REQUEST:
      return state;
    case ADD_INFO_SUCCESS:
      return state.set('success', action.success);
    case ADD_INFO_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default waiterReducer;
