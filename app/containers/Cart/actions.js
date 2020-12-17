/*
 *
 * OutletPage actions
 *
 */

import { ADD_CART_ITEM, REMOVE_CART_ITEM } from './constants';

export function addCartItem(item) {
  return {
    type: ADD_CART_ITEM,
    item,
  };
}

export function removeCartItem(item) {
  return {
    type: REMOVE_CART_ITEM,
    item,
  };
}
