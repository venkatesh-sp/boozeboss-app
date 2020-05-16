/*
 *
 * SignupPage actions
 *
 */

import { 
  GET_GUEST_EVENTS_REQUEST, GET_GUEST_EVENTS_SUCCESS, GET_GUEST_EVENTS_ERROR, GET_AGENCY_EVENTS_REQUEST, GET_AGENCY_EVENTS_SUCCESS, GET_AGENCY_EVENTS_ERROR
} from './constants';

export function getEvents() {
  return {
    type: GET_GUEST_EVENTS_REQUEST,
  };
}

export function getEventsSuccess(events) {
  return {
    type: GET_GUEST_EVENTS_SUCCESS,
    events
  };
}

export function getEventsError(error) {
  return {
    type: GET_GUEST_EVENTS_ERROR,
    error
  };
}

export function getAgencyEvents() {
  return {
    type: GET_AGENCY_EVENTS_REQUEST,
  };
}

export function getAgencyEventsSuccess(agencyEvents) {
  return {
    type: GET_AGENCY_EVENTS_SUCCESS,
    agencyEvents
  };
}

export function getAgencyEventsError(error) {
  return {
    type: GET_AGENCY_EVENTS_ERROR,
    error
  };
}