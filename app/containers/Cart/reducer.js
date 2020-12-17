/*
 *
 * OrderPage reducer
 *
 */

import { fromJS } from 'immutable';

import _ from 'lodash';
import { ADD_CART_ITEM, REMOVE_CART_ITEM } from './constants';

export const initialState = fromJS({
  outlet: null,
  success: null,
  error: null,
  cartitems: null,
});

function outletReducer(state = initialState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}

export default outletReducer;
