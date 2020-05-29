/*
 *
 * EventPage reducer
 *
 */

import { fromJS } from 'immutable';
import { DEFAULT_ACTION, GET_EVENT_REQUEST, GET_EVENT_SUCCESS, GET_EVENT_ERROR } from './constants';

export const initialState = fromJS({
  event: null
});

function eventPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EVENT_REQUEST:
      return state;
    case GET_EVENT_SUCCESS:
      return state.set('event', action.event);
    case GET_EVENT_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default eventPageReducer;
