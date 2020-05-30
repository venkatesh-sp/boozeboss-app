/*
 *
 * EventPage reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_EVENT_REQUEST, GET_EVENT_SUCCESS, GET_EVENT_ERROR, ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART} from './constants';


const getNewCart = (cart, item) => {
  let cart_copy = cart.slice();
  const product_ids = cart.map(product_event => product_event.id);
  const remove_index = product_ids.indexOf(item.id);
  cart_copy.splice(remove_index, 1);
  return cart_copy;
}

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
    case REMOVE_ITEM_FROM_CART:
      const new_cart = getNewCart(state.get('cart'), action.item);
      return state.set('cart', new_cart);
    default:
      return state;
  }
}

export default eventPageReducer;
