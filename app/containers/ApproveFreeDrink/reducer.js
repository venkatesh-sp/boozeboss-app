/*
 *
 * ApproveFreeDrink reducer
 *
 */

import { fromJS } from 'immutable';
import { APPROVE_FREE_DRINK_REQUEST, APPROVE_FREE_DRINK_SUCCESS, APPROVE_FREE_DRINK_ERROR } from './constants';

export const initialState = fromJS({
  product: null,
  error: null,
});

function approveFreeDrinkReducer(state = initialState, action) {
  switch (action.type) {
    case APPROVE_FREE_DRINK_REQUEST:
      return state;
    case APPROVE_FREE_DRINK_SUCCESS:
      return state
        .set('product', action.product)
        .set('error', null);
    case APPROVE_FREE_DRINK_ERROR:
      return state
        .set('product', null)
        .set('error', action.error);
    default:
      return state;
  }
}

export default approveFreeDrinkReducer;
