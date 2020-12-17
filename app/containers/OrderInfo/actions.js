/*
 *
 * SignupPage actions
 *
 */

import status from 'utils/status';
import {
  GET_CART_ITEMS_REQUEST,
  GET_CART_ITEMS_SUCCESS,
  GET_CART_ITEMS_ERROR,
} from './constants';

export function getCartItems() {
  return {
    type: GET_CART_ITEMS_REQUEST,
  };
}

export function getCartItemsSuccess(items) {
  return {
    type: GET_CART_ITEMS_SUCCESS,
    items,
  };
}

export function getCartItemsError(error) {
  status(error, 'error');
  return {
    type: GET_CART_ITEMS_ERROR,
    error,
  };
}
