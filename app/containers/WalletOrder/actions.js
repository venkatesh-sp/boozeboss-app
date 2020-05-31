/*
 *
 * WalletOrder actions
 *
 */

import { CREATE_PRODUCT_ORDER_REQUEST, CREATE_PRODUCT_ORDER_SUCCESS, CREATE_PRODUCT_ORDER_ERROR } from './constants';

export function createOrder(transactions) {
  return {
    type: CREATE_PRODUCT_ORDER_REQUEST,
    transactions,
  };
}

export function createOrderSuccess(success) {
  return {
    type: CREATE_PRODUCT_ORDER_SUCCESS,
    success,
  };
}

export function createOrderError(error) {
  return {
    type: CREATE_PRODUCT_ORDER_ERROR,
    error,
  };
}
