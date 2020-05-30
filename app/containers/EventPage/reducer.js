/*
 *
 * EventPage reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_EVENT_REQUEST, GET_EVENT_SUCCESS, GET_EVENT_ERROR, ADD_ITEM_TO_CART} from './constants';

export const initialState = fromJS({
  event: null,
  cart: []
});

function eventPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EVENT_REQUEST:
      return state;
    case GET_EVENT_SUCCESS:
      return state.set('event', action.event);
    case GET_EVENT_ERROR:
      return state.set('error', action.error);
    case ADD_ITEM_TO_CART: 
      return state.set('cart', [...state.get('cart'), action.item])
    default:
      return state;
  }
}

export default eventPageReducer;
