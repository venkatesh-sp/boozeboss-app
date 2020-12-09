/*
 *
 * ActionsContainer actions
 *
 */

import { GET_WALLET_ACTIONS_REQUEST, GET_WALLET_ACTIONS_SUCCESS, GET_WALLET_ACTIONS_ERROR } from './constants';

export function getWalletActions() {
  return {
    type: GET_WALLET_ACTIONS_REQUEST,
  };
}

export function getWalletActionsSuccess(actions) {
  return {
    type: GET_WALLET_ACTIONS_SUCCESS,
    actions
  };
}

export function getWalletActionsError(error) {
  return {
    type: GET_WALLET_ACTIONS_ERROR,
    error
  };
}
