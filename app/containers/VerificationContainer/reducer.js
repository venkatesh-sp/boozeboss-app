/*
 *
 * ClientSignup reducer
 *
 */

import { fromJS } from 'immutable';
import { UPLOAD_VERIFICATION_REQUEST, UPLOAD_VERIFICATION_SUCCESS, UPLOAD_VERIFICATION_ERROR } from './constants';

export const initialState = fromJS({
  error: null,
  success: null,
  isLoading: null,
});

function verificationReducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_VERIFICATION_REQUEST:
      return state;
    case UPLOAD_VERIFICATION_SUCCESS:
      return state;
    case UPLOAD_VERIFICATION_ERROR:
      return state;
    default:
      return state;
  }
}

export default verificationReducer;
