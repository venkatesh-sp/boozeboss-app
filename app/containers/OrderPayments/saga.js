import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import _ from 'lodash';

import {
  GET_OUTLET_VENUE_REQUEST,
  GET_OUTLET_EVENT_REQUEST,
  ADD_BILLED_REQUEST,
} from './constants';

import {
  getOutletVenueError,
  getOutletVenueSuccess,
  getOutletEventSuccess,
  getOutletEventError,
  addBilledSuccess,
  addBilledError,
} from './actions';

//ADD billed saga
function* addBilledSaga(params) {
  const { ids } = params.info;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/orderinfo/put-order-info`;
  const options = {
    method: 'PUT',
    body: JSON.stringify({ ids }),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(addBilledSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(addBilledError(jsonError));
  }
}

function* getOutletVenueSaga(params) {
  const { venueId } = params;

  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/outletvenues/${venueId}`;
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

function* getOutletVenueRequest() {
  yield takeLatest(GET_OUTLET_VENUE_REQUEST, getOutletVenueSaga);
}

function* getOutletEventRequest() {
  yield takeLatest(GET_OUTLET_EVENT_REQUEST, getOutletEventSaga);
}

function* addBilledRequest() {
  yield takeLatest(ADD_BILLED_REQUEST, addBilledSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getOutletVenueRequest),
    fork(getOutletEventRequest),
    fork(addBilledRequest),
  ]);
}
