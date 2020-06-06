/*
 *
 * ApproveCredits actions
 *
 */

import { 
  GET_WALLET_PURCHASE_REQUEST, GET_WALLET_PURCHASE_SUCCESS, GET_WALLET_PURCHASE_ERROR,
  GET_EVENTS_REQUEST, GET_EVENTS_SUCCESS, GET_EVENTS_ERROR, 
  APPROVE_CODE_REQUEST, APPROVE_CODE_ERROR, APPROVE_CODE_SUCCESS
} from './constants';

export function getWalletPurchase(code) {
  return {
    type: GET_WALLET_PURCHASE_REQUEST,
    code
  };
}

export function getWalletPurchaseSuccess(wallet_purchase) {
  return {
    type: GET_WALLET_PURCHASE_SUCCESS,
    wallet_purchase
  };
}

export function getWalletPurchaseError(error) {
  return {
    type: GET_WALLET_PURCHASE_ERROR,
    code
  };
}

export function getEvents() {
  return {
    type: GET_EVENTS_REQUEST,
  };
}

export function getEventsSuccess(events) {
  return {
    type: GET_EVENTS_SUCCESS,
    events
  };
}

export function getEventsError(error) {
  return {
    type: GET_EVENTS_ERROR,
    error
  };
}

// Approve code
export function approveCode(code, event_id, history) {
  return {
    type: APPROVE_CODE_REQUEST,
    code,
    event_id,
    history
  };
}

export function approveCodeSuccess(success) {
  return {
    type: APPROVE_CODE_SUCCESS,
    success
  };
}

export function approveCodeError(error) {
  return {
    type: APPROVE_CODE_ERROR,
    error
  };
}
