/*
 *
 * EventPage actions
 *
 */

import { 
  GET_EVENT_REQUEST,  GET_EVENT_SUCCESS, GET_EVENT_ERROR,
  UPDATE_EVENT_REQUEST, UPDATE_EVENT_SUCCESS, UPDATE_EVENT_ERROR, 
  ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART, GET_EVENT_STATS_REQUEST, GET_EVENT_STATS_SUCCESS, GET_EVENT_STATS_ERROR
} from './constants';

export function getEvent(event_id) {
  return {
    type: GET_EVENT_REQUEST,
    event_id
  };
}

export function getEventSuccess(event) {
  return {
    type: GET_EVENT_SUCCESS,
    event
  };
}

export function getEventError(error) {
  return {
    type: GET_EVENT_ERROR,
    error
  };
}

export function updateEvent(event_id, field) {
  return {
    type: UPDATE_EVENT_REQUEST,
    event_id,
    field
  };
}

export function updateEventSuccess(success) {
  return {
    type: UPDATE_EVENT_SUCCESS,
    success
  };
}

export function updateEventError(error) {
  return {
    type: UPDATE_EVENT_ERROR,
    error
  };
}

export function getEventStats(event_id) {
  return {
    type: GET_EVENT_STATS_REQUEST,
    event_id,
  };
}

export function getEventStatsSuccess(stats_data) {
  return {
    type: GET_EVENT_STATS_SUCCESS,
    stats_data
  };
}

export function getEventStatsError(error) {
  return {
    type: GET_EVENT_STATS_ERROR,
    error
  };
}

// Add item to cart
export function addItemToCart(item) {
  return {
    type: ADD_ITEM_TO_CART,
    item
  };
}

// Remove item from cart 
export function removeItemFromCart(item) {
  return {
    type: REMOVE_ITEM_FROM_CART,
    item
  };
}