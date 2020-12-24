import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import _ from 'lodash';

import {
  GET_OUTLET_VENUE_REQUEST,
  GET_OUTLET_EVENT_REQUEST,
} from './constants';

import {
  getOutletVenueError,
  getOutletVenueSuccess,
  getOutletEventSuccess,
  getOutletEventError,
} from './actions';

// function* getCartItemsSaga(params) {
//   const { ID } = params;
//   const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
//     process.env.API_PORT
//   }/api/cart/${ID}`;
//   const options = {
//     method: 'GET',
//   };

//   try {
//     const response = yield call(request, requestURL, options);
//     yield put(getCartItemsSuccess(response));
//   } catch (error) {
//     const jsonError = yield error.response ? error.response.json() : error;
//     yield put(getCartItemsError(jsonError));
//   }
// }

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

export default function* rootSaga() {
  yield all([fork(getOutletVenueRequest), fork(getOutletEventRequest)]);
}
