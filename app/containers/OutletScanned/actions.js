/*
 *
 * OutletPage actions
 *
 */

import {
  GET_OUTLET_EVENT_REQUEST,
  GET_OUTLET_EVENT_SUCCESS,
  GET_OUTLET_EVENT_ERROR,
  GET_OUTLET_VENUE_REQUEST,
  GET_OUTLET_VENUE_SUCCESS,
  GET_OUTLET_VENUE_ERROR,
  ADD_CART_ITEM,
  REMOVE_CART_ITEM,
  CLEAR_CART_ITEM,
} from './constants';

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

export function addCartItem(item) {
  return {
    type: ADD_CART_ITEM,
    item,
  };
}

export function removeCartItem(item) {
  return {
    type: REMOVE_CART_ITEM,
    item,
  };
}

export function clearCartItem() {
  return {
    type: CLEAR_CART_ITEM,
  };
}
