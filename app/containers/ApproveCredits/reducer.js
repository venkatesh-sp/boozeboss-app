/*
 *
 * ApproveCredits reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  GET_WALLET_PURCHASE_REQUEST, GET_WALLET_PURCHASE_SUCCESS, GET_WALLET_PURCHASE_ERROR, 
  GET_EVENTS_REQUEST, GET_EVENTS_SUCCESS, GET_EVENTS_ERROR
} from './constants';

export const initialState = fromJS({
  wallet_purchase: null,
  events: null,
  success: null,
  error: null
});

function approveCreditsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_WALLET_PURCHASE_REQUEST:
      return state;
    case GET_WALLET_PURCHASE_SUCCESS:
      return state.set('wallet_purchase', action.wallet_purchase);
    case GET_WALLET_PURCHASE_ERROR:
      return state.set('error', action.error);
    case GET_EVENTS_REQUEST:
      return state;
    case GET_EVENTS_SUCCESS:
      const new_events = action.events.filter(event => new Date(event.end_time).getTime() >= new Date().getTime());
      return state.set('events', new_events);
    case GET_EVENTS_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default approveCreditsReducer;
