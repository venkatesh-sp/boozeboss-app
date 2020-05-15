/*
 *
 * ClientSignup reducer
 *
 */

import { fromJS } from 'immutable';
import { 
  UPLOAD_VERIFICATION_REQUEST, UPLOAD_VERIFICATION_SUCCESS, UPLOAD_VERIFICATION_ERROR, 
  SUBMIT_VERIFICATION_SUCCESS, SUBMIT_VERIFICATION_REQUEST, SUBMIT_VERIFICATION_ERROR, 
  CHECK_VERIFICATION_REQUEST, CHECK_VERIFICATION_SUCCESS, CHECK_VERIFICATION_ERROR
} from './constants';

export const initialState = fromJS({
  error: null,
  success: null,
  isLoading: null,
});

function verificationReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_VERIFICATION_REQUEST:
      return state;
    case CHECK_VERIFICATION_SUCCESS:
      return state.set('success', action.success);
    case CHECK_VERIFICATION_ERROR:
      return state.set('error', action.error);
    case UPLOAD_VERIFICATION_REQUEST:
      return state;
    case UPLOAD_VERIFICATION_SUCCESS:
      return state;
    case UPLOAD_VERIFICATION_ERROR:
      return state;
    case SUBMIT_VERIFICATION_REQUEST:
      return state;
    case SUBMIT_VERIFICATION_SUCCESS:
      return state.set('success', action.success);
    case SUBMIT_VERIFICATION_ERROR:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default verificationReducer;
