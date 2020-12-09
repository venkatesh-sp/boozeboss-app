/*
 *
 * ActionsContainer reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  GET_WALLET_ACTIONS_REQUEST, GET_WALLET_ACTIONS_SUCCESS, GET_WALLET_ACTIONS_ERROR
} from './constants';

export const initialState = fromJS({
  error: null,
  success: null,
  actions: null,
});

function actionsContainerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WALLET_ACTIONS_REQUEST:
      return state;
    case GET_WALLET_ACTIONS_SUCCESS:
      return state.set('actions', action.actions);
    case GET_WALLET_ACTIONS_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default actionsContainerReducer;
