/*
 *
 * AddCredits actions
 *
 */

import { 
  ADD_CREDITS_PAYPAL_REQUEST, ADD_CREDITS_PAYPAL_SUCCESS, ADD_CREDITS_PAYPAL_ERROR
 } from './constants';

export function addCreditsWithPaypal(purchase, history) {
  return {
    type: ADD_CREDITS_PAYPAL_REQUEST,
    purchase, 
    history
  };
}

export function addCreditsWithPaypalSuccess(success) {
  return {
    type: ADD_CREDITS_PAYPAL_SUCCESS,
    success
  };
}

export function addCreditsWithPaypalError(error) {
  return {
    type: ADD_CREDITS_PAYPAL_ERROR,
    error
  };
}
