/*
 *
 * SignupPage actions
 *
 */

import status from 'utils/status';
import {
  GET_OUTLET_VENUE_REQUEST,
  GET_OUTLET_VENUE_SUCCESS,
  GET_OUTLET_VENUE_ERROR,
  ADD_CUSTOMER_BILLED_REQUEST,
  ADD_CUSTOMER_BILLED_SUCCESS,
  ADD_CUSTOMER_BILLED_ERROR,
  ADD_BILLED_REQUEST,
  ADD_BILLED_SUCCESS,
  ADD_BILLED_ERROR,
} from './constants';

export function getOutletVenue(venueId) {
  return {
    type: GET_OUTLET_VENUE_REQUEST,
    venueId,
  };
}

export function getOutletVenueSuccess(venue) {
  return {
    type: GET_OUTLET_VENUE_SUCCESS,
    venue,
  };
}

export function getOutletVenueError(error) {
  return {
    type: GET_OUTLET_VENUE_ERROR,
    error,
  };
}

export function getOutletEvent(eventId) {
  return {
    type: GET_OUTLET_EVENT_REQUEST,
    eventId,
  };
}

export function getOutletEventSuccess(event) {
  return {
    type: GET_OUTLET_EVENT_SUCCESS,
    event,
  };
}

export function getOutletEventError(error) {
  return {
    type: GET_OUTLET_EVENT_ERROR,
    error,
  };
}

// ADD customer billed actions
export function addCustomerBilledRequest(info) {
  return {
    type: ADD_CUSTOMER_BILLED_REQUEST,
    info,
  };
}

export function addCustomerBilledSuccess(success) {
  status(success, 'success');
  return {
    type: ADD_CUSTOMER_BILLED_SUCCESS,
    success,
  };
}

export function addCustomerBilledError(error) {
  status(error, 'error');
  return {
    type: ADD_CUSTOMER_BILLED_ERROR,
    error,
  };
}
// ADD waiter billed actions
export function addBilledRequest(info) {
  return {
    type: ADD_BILLED_REQUEST,
    info,
  };
}

export function addBilledSuccess(success) {
  status(success, 'success');
  return {
    type: ADD_BILLED_SUCCESS,
    success,
  };
}

export function addBilledError(error) {
  status(error, 'error');
  return {
    type: ADD_BILLED_ERROR,
    error,
  };
}
