/*
 *
 * ClientSignup reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_GUEST_EVENTS_REQUEST, GET_GUEST_EVENTS_SUCCESS, GET_GUEST_EVENTS_ERROR } from './constants';

export const initialState = fromJS({
  events: null,
});

function homepageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_GUEST_EVENTS_REQUEST:
      return state;
    case GET_GUEST_EVENTS_SUCCESS:
      return state.set('events', action.events);
    case GET_GUEST_EVENTS_ERROR:
      return state;
    default:
      return state;
  }
}

export default homepageReducer;
