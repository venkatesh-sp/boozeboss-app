/*
 *
 * AddCredits actions
 *
 */

import { 
  ADD_CREDITS_PAYPAL_REQUEST, ADD_CREDITS_PAYPAL_SUCCESS, ADD_CREDITS_PAYPAL_ERROR,
  ADD_CREDITS_WITH_QR_REQUEST, ADD_CREDITS_WITH_QR_SUCCESS, ADD_CREDITS_WITH_QR_ERROR,
  DISMISS_CODE
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

// Add credits with qr
export function addCreditsWithQR(purchase) {
  return {
    type: ADD_CREDITS_WITH_QR_REQUEST,
    purchase, 
    history
  };
}

export function addCreditsWithQRSuccess(response) {
  const {success, code} = response;
  return {
    type: ADD_CREDITS_WITH_QR_SUCCESS,
    success,
    code
  };
}

export function addCreditsWithQRError(error) {
  return {
    type: ADD_CREDITS_WITH_QR_ERROR,
    error
  };
}

// DISMISS
export function dismissCode() {
  return {
    type: DISMISS_CODE
  }
}