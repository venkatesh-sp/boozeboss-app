/*
 *
 * WalletOrder actions
 *
 */

import { CREATE_PRODUCT_ORDER_REQUEST, CREATE_PRODUCT_ORDER_SUCCESS, CREATE_PRODUCT_ORDER_ERROR } from './constants';

export function createOrder(transactions, history) {
  return {
    type: CREATE_PRODUCT_ORDER_REQUEST,
    transactions,
    history
  };
}

export function createOrderSuccess(order_identifier) {
  return {
    type: CREATE_PRODUCT_ORDER_SUCCESS,
    order_identifier
  };
}

export function createOrderError(error) {
  return {
    type: CREATE_PRODUCT_ORDER_ERROR,
    error,
  };
}
