/*
 *
 * SignupPage actions
 *
 */

import status from 'utils/status';
import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_ERROR,
  ORDER_ITEMS_REQUEST,
  GET_OUTLET_VENUE_REQUEST,
  GET_OUTLET_VENUE_SUCCESS,
  GET_OUTLET_VENUE_ERROR,
  ADD_CART_ITEMS_REQUEST,
  ADD_CART_ITEMS_SUCCESS,
  ADD_CART_ITEMS_ERROR,
  ADD_INFO_REQUEST,
  ADD_INFO_SUCCESS,
  ADD_INFO_ERROR,
} from './constants';

export function getCartItems(ID) {
  return {
    type: GET_ITEMS_REQUEST,
    ID,
  };
}

export function getCartItemsSuccess(items) {
  return {
    type: GET_ITEMS_SUCCESS,
    items,
  };
}

export function getCartItemsError(error) {
  status(error, 'error');
  return {
    type: GET_ITEMS_ERROR,
    error,
  };
}

export function postOrder(details) {
  return {
    type: ORDER_ITEMS_REQUEST,
    details,
  };
}

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

export function addCartItems(items) {
  return {
    type: ADD_CART_ITEMS_REQUEST,
    items,
  };
}

export function addCartItemsSuccess(success) {
  status(success, 'success');
  return {
    type: ADD_CART_ITEMS_SUCCESS,
    success,
  };
}

export function addCartItemsError(error) {
  status(error, 'error');
  return {
    type: ADD_CART_ITEMS_ERROR,
    error,
  };
}
// ADD info actions
export function addInfoRequest(info) {
  return {
    type: ADD_INFO_REQUEST,
    info,
  };
}

export function addInfoSuccess(success) {
  status(success.Status, 'success');
  return {
    type: ADD_INFO_SUCCESS,
    success,
  };
}

export function addInfoError(error) {
  status(error, 'error');
  return {
    type: ADD_INFO_ERROR,
    error,
  };
}
