/*
 *
 * SignupPage actions
 *
 */

import status from 'utils/status';
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
} from './constants';

export function getCartItems(ID) {
  // console.log(ID,"USERID FROM GET CART ITEMS")
  return {
    type: GET_ITEMS_REQUEST,
    ID,
  };
}

export function getCartItemsSuccess(items) {
  return {
    type: GET_ITEMS_SUCCESS,
    items,
  };
}

export function getCartItemsError(error) {
  status(error, 'error');
  return {
    type: GET_ITEMS_ERROR,
    error,
  };
}
