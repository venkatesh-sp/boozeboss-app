/*
 *
 * TransferCredits actions
 *
 */

import { 
  TRANSFER_CREDITS_REQUEST,
  TRANSFER_CREDITS_SUCCCESS,
  TRANSFER_CREDITS_ERROR
 } from './constants';

export function transfer(amount, target_email) {
  return {
    type: TRANSFER_CREDITS_REQUEST,
    amount,
    target_email
  };
}

export function transferSuccess(success) {
  alert(success);
  return {
    type: TRANSFER_CREDITS_SUCCCESS,
    success,
  };
}

export function transferError(error) {
  alert(error);
  return {
    type: TRANSFER_CREDITS_ERROR,
    error
  };
}
