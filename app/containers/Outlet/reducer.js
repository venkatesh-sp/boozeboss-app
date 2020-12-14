/*
 *
 * OrderPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_OUTLET_EVENT_REQUEST,
  GET_OUTLET_EVENT_SUCCESS,
  GET_OUTLET_EVENT_ERROR,
  GET_OUTLET_VENUE_REQUEST,
  GET_OUTLET_VENUE_SUCCESS,
  GET_OUTLET_VENUE_ERROR,
} from './constants';

export const initialState = fromJS({
  outlet: null,
  success: null,
  error: null,
});

function outletReducer(state = initialState, action) {
  switch (action.type) {
    case GET_OUTLET_EVENT_REQUEST:
      return state;
    case GET_OUTLET_EVENT_SUCCESS:
      return state.set('outlet', action.event);
    case GET_OUTLET_EVENT_ERROR:
      return state.set('error', action.error);
    case GET_OUTLET_VENUE_REQUEST:
      return state;
    case GET_OUTLET_VENUE_SUCCESS:
      return state.set('outlet', action.venue);
    case GET_OUTLET_VENUE_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default outletReducer;