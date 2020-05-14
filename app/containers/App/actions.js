import { decode } from 'utils/tokenUtils';
import {
    AUTHENTICATE,
    LOGOUT,
} from './constants';
  

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