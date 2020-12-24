import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import _ from 'lodash';

import {
  GET_OUTLET_VENUE_REQUEST,
  GET_OUTLET_EVENT_REQUEST,
  ADD_CART_ITEMS_REQUEST,
} from './constants';

import {
  getOutletVenueError,
  getOutletVenueSuccess,
  getOutletEventSuccess,
  getOutletEventError,
  addCartItemsSuccess,
  addCartItemsError,
} from './actions';

function* addCartItemsSaga(params) {
  const { items, account_id, history } = params.items;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/cart/${account_id}`;
  const options = {
    method: 'POST',
    body: JSON.stringify(items),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(addCartItemsSuccess(response));
    history.push('/');
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(addCartItemsError(jsonError));
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

function* addCartItemsRequest() {
  yield takeLatest(ADD_CART_ITEMS_REQUEST, addCartItemsSaga);
}
export default function* rootSaga() {
  yield all([
    fork(getOutletVenueRequest),
    fork(getOutletEventRequest),
    fork(addCartItemsRequest),
  ]);
}
