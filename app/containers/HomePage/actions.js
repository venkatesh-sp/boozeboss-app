/*
 *
 * SignupPage actions
 *
 */

import { 
  GET_GUEST_EVENTS_REQUEST, GET_GUEST_EVENTS_SUCCESS, GET_GUEST_EVENTS_ERROR, 
  GET_AGENCY_EVENTS_REQUEST, GET_AGENCY_EVENTS_SUCCESS, GET_AGENCY_EVENTS_ERROR, 
  SUBMIT_EVENT_CODE_REQUEST, SUBMIT_EVENT_CODE_SUCCESS, SUBMIT_EVENT_CODE_ERROR
} from './constants';

import { Alert } from 'rsuite';

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

export function submitEventCode(code) {
  return {
    type: SUBMIT_EVENT_CODE_REQUEST,
    code,
  };
}

export function submitEventCodeSuccess(success) {
  Alert.success(success);
  return {
    type: SUBMIT_EVENT_CODE_SUCCESS,
    success
  };
}

export function submitEventCodeError(error) {
  Alert.error(error, 3000);
  return {
    type: SUBMIT_EVENT_CODE_ERROR,
    error
  };
}