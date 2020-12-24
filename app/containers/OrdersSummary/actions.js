/*
 *
 * SignupPage actions
 *
 */

import status from 'utils/status';
import {
  GET_ORDERS_SUMMARY_REQUEST,
  GET_ORDERS_SUMMARY_SUCCESS,
  GET_ORDERS_SUMMARY_ERROR,
} from './constants';

export function getOrdersSummary(account_id) {
  return {
    type: GET_ORDERS_SUMMARY_REQUEST,
    account_id,
  };
}

export function getOrdersSummarySuccess(items) {
  return {
    type: GET_ORDERS_SUMMARY_SUCCESS,
    items,
  };
}

export function getOrdersSummaryError(error) {
  status(error, 'error');
  return {
    type: GET_ORDERS_SUMMARY_ERROR,
    error,
  };
}
