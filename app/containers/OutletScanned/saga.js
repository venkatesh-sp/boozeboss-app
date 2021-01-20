import { call, put, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import {
  GET_OUTLET_EVENT_REQUEST,
  GET_OUTLET_VENUE_REQUEST,
} from './constants';

import {
  getOutletEventError,
  getOutletEventSuccess,
  getOutletVenueError,
  getOutletVenueSuccess,
} from './actions';

function* getOutletEventSaga(params) {
  const { eventId } = params;

  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/outletevents/${eventId}`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getOutletEventSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getOutletEventError(jsonError));
  }
}

function* getOutletVenueSaga(params) {
  const { venueId } = params;

  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/outletvenues/scanned/${venueId}`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getOutletVenueSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getOutletVenueError(jsonError));
  }
}
function* getOutletEventRequest() {
  yield takeLatest(GET_OUTLET_EVENT_REQUEST, getOutletEventSaga);
}

function* getOutletVenueRequest() {
  yield takeLatest(GET_OUTLET_VENUE_REQUEST, getOutletVenueSaga);
}

export default function* rootSaga() {
  yield all([fork(getOutletEventRequest), fork(getOutletVenueRequest)]);
}
