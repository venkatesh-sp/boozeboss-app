import { decode } from 'utils/tokenUtils';
import {
    GET_USER_REQUEST, GET_USER_SUCCESS, GET_USER_ERROR,
    AUTHENTICATE,
    LOGOUT,
} from './constants';
  
// Get user
export function getUser() {
  return {
    type: GET_USER_REQUEST,
  };
}

export function getUserSuccess(user) {
  return {
    type: GET_USER_SUCCESS,
    user,
  };
}

export function getUserError(error) {
  return {
    type: GET_USER_ERROR,
    error
  };
}

export function authenticate(token) {
    localStorage.setItem('jwt', token);
    const decoded = decode(token);
    const {scope, role, is_age_verified} = decoded;
    return {
      type: AUTHENTICATE,
      token,
      scope, 
      role,
      is_age_verified
    };
}


export function logout() {
    localStorage.clear();
    return {
      type: LOGOUT,
    };
  }