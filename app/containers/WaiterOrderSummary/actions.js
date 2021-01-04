/*
 *
 * SignupPage actions
 *
 */

import status from 'utils/status';
import {
  GET_WAITER_ORDER_SUMMARY_ERROR,
  GET_WAITER_ORDER_SUMMARY_REQUEST,
  GET_WAITER_ORDER_SUMMARY_SUCCESS,
} from './constants';

export function getwaiterOrdersSummary(account_id) {
  return {
    type: GET_WAITER_ORDER_SUMMARY_REQUEST,
    account_id,
  };
}

export function getwaiterOrdersSummarySuccess(items) {
  return {
    type: GET_WAITER_ORDER_SUMMARY_SUCCESS,
    items,
  };
}

export function getwaiterOrdersSummaryError(error) {
  status(error, 'error');
  return {
    type: GET_WAITER_ORDER_SUMMARY_ERROR,
    error,
  };
}
