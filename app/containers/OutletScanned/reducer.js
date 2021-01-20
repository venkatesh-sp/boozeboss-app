/*
 *
 * OrderPage reducer
 *
 */

import { fromJS } from 'immutable';

import _ from 'lodash';
import {
  GET_OUTLET_EVENT_REQUEST,
  GET_OUTLET_EVENT_SUCCESS,
  GET_OUTLET_EVENT_ERROR,
  GET_OUTLET_VENUE_REQUEST,
  GET_OUTLET_VENUE_SUCCESS,
  GET_OUTLET_VENUE_ERROR,
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  CLEAR_CART_ITEM,
} from './constants';

export const initialState = fromJS({
  outlet: null,
  success: null,
  error: null,
  cartitems: null,
  currentOutlet: null,
});

function outletReducer(state = initialState, action) {
  switch (action.type) {
    case GET_OUTLET_EVENT_REQUEST:
      return state;
    case GET_OUTLET_EVENT_SUCCESS:
      return state
        .set('outlet', action.event)
        .set('currentOutlet', 'outletevent');
    case GET_OUTLET_EVENT_ERROR:
      return state.set('error', action.error);
    case GET_OUTLET_VENUE_REQUEST:
      return state;
    case GET_OUTLET_VENUE_SUCCESS:
      return state
        .set('outlet', action.venue)
        .set('currentOutlet', 'outletvenue');
    case GET_OUTLET_VENUE_ERROR:
      return state.set('error', action.error);
    case ADD_CART_ITEM:
      return state.set('cartitems', {
        ...state.get('cartitems'),
        [action.item.product]: action.item.quantity,
      });
    case REMOVE_CART_ITEM:
      return state.set(
        'cartitems',
        _.omit(state.get('cartitems'), [action.item.product]),
      );
    case CLEAR_CART_ITEM:
      return state.set('cartitems', null);
    default:
      return state;
  }
}

export default outletReducer;
