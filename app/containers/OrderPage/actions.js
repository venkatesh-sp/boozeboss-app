/*
 *
 * OrderPage actions
 *
 */

import { 
  GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_ERROR,
  CANCEL_ORDER_REQUEST, CANCEL_ORDER_SUCCESS, CANCEL_ORDER_ERROR, DISMISS, 
  SCAN_ORDER_REQUEST, SCAN_ORDER_ERROR, SCAN_ORDER_SUCCESS
} from './constants';

export function getOrder(order_identifier) {
  return {
    type: GET_ORDER_REQUEST,
    order_identifier
  };
}

export function getOrderSuccess(order) {
  return {
    type: GET_ORDER_SUCCESS,
    order
  };

}

export function getOrderError(error) {
  return {
    type: GET_ORDER_ERROR,
    error
  };
}

// Cancel order
export function cancelOrder(order_id) {
  return {
    type: CANCEL_ORDER_REQUEST,
    order_id
  };
}

export function cancelOrderSuccess(response) {
  console.log(response);
  const {success, order} = response;
  return {
    type: CANCEL_ORDER_SUCCESS,
    success, 
    order
  };

}

export function cancelOrderError(error) {
  return {
    type: CANCEL_ORDER_ERROR,
    error
  };
}

// Cancel order
export function scanOrder(order_identifier) {
  return {
    type: SCAN_ORDER_REQUEST,
    order_identifier
  };
}

export function scanOrderSuccess(response) {
  const {success, order} = response;
  return {
    type: SCAN_ORDER_SUCCESS,
    success, 
    order
  };

}

export function scanOrderError(error) {
  return {
    type: SCAN_ORDER_ERROR,
    error
  };
}

export function dismiss() {
  return {
    type: DISMISS,
  };
}
