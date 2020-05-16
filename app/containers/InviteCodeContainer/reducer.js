/*
 *
 * InviteCodeContainer reducer
 *
 */

import { fromJS } from 'immutable';
import { GET_INVITE_TOKEN_REQUEST, GET_INVITE_TOKEN_SUCCESS, GET_INVITE_TOKEN_ERROR } from './constants';

export const initialState = fromJS({
  code: null,
});

function inviteCodeContainerReducer(state = initialState, action) {
  switch (action.type) {
    case GET_INVITE_TOKEN_REQUEST:
      return state;
    case GET_INVITE_TOKEN_SUCCESS:
      return state.set('code', action.code);
    case GET_INVITE_TOKEN_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default inviteCodeContainerReducer;
