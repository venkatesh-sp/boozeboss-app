/*
 *
 * FreeDrinkCode reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  GENERATE_FREE_DRINK_CODE_REQUEST, GENERATE_FREE_DRINK_CODE_SUCCESS, GENERATE_FREE_DRINK_CODE_ERROR
 } from './constants';

export const initialState = fromJS({
  code: null,
  product: null,
  error: null,
});

function freeDrinkCodeReducer(state = initialState, action) {
  switch (action.type) {
    case GENERATE_FREE_DRINK_CODE_REQUEST:
      return state;
    case GENERATE_FREE_DRINK_CODE_SUCCESS:
      return state
        .set('code', action.response.free_drink_code)
        .set('product', action.response.free_drink);
    case GENERATE_FREE_DRINK_CODE_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default freeDrinkCodeReducer;
