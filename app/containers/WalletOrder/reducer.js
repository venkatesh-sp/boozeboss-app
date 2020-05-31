/*
 *
 * WalletOrder reducer
 *
 */

import { fromJS } from 'immutable';
import { CREATE_PRODUCT_ORDER_REQUEST, CREATE_PRODUCT_ORDER_SUCCESS, CREATE_PRODUCT_ORDER_ERROR } from './constants';

export const initialState = fromJS({
  success: null,
  error: null, 
});

function walletOrderReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PRODUCT_ORDER_REQUEST:
      return state;
    case CREATE_PRODUCT_ORDER_SUCCESS:
      return state.set('success', action.success);
    case CREATE_PRODUCT_ORDER_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default walletOrderReducer;
