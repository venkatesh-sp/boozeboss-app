/*
 *
 * ApproveFreeDrink actions
 *
 */

import { 
  APPROVE_FREE_DRINK_REQUEST, APPROVE_FREE_DRINK_SUCCESS, APPROVE_FREE_DRINK_ERROR
 } from './constants';

export function approveFreeDrink(code) {
  return {
    type: APPROVE_FREE_DRINK_REQUEST,
    code
  };
}

export function approveFreeDrinkSuccess(product) {
  return {
    type: APPROVE_FREE_DRINK_SUCCESS,
    product
  };
}

export function approveFreeDrinkError(error) {
  return {
    type: APPROVE_FREE_DRINK_ERROR,
    error,
  };
}
