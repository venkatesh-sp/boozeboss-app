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
  ADD_CART_ITEMS_REQUEST,
  ADD_CART_ITEMS_SUCCESS,
  ADD_CART_ITEMS_ERROR,
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

export function addCartItems(items) {
  return {
    type: ADD_CART_ITEMS_REQUEST,
    items,
  };
}

export function addCartItemsSuccess(success) {
  return {
    type: ADD_CART_ITEMS_SUCCESS,
    success,
  };
}

export function addCartItemsError(error) {
  status(error, 'error');
  return {
    type: ADD_CART_ITEMS_ERROR,
    error,
  };
}
