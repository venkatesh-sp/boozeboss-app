import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import _ from 'lodash';

import {
  GET_ITEMS_REQUEST,
  ORDER_ITEMS_REQUEST,
  GET_OUTLET_VENUE_REQUEST,
} from './constants';

import {
  getCartItemsSuccess,
  getCartItemsError,
  postOrder,
  getOutletVenueError,
  getOutletVenueSuccess,
} from './actions';

function* getCartItemsSaga(params) {
  // console.log(params,"PARAMS FROM SAGA")
  const { ID } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/cart/${ID}`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    // console.log(response,"RESPONSE FROM WAITER ORDER")
    yield put(getCartItemsSuccess(response));
  } catch (error) {
    // console.log(error,"ERROR FROM RESPONSE")
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getCartItemsError(jsonError));
  }
}

function* getOutletVenueSaga(params) {
  console.log('API WILL BE HITTED');
  const { venueId } = params;

  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/outletvenues/${venueId}`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    console.log(response, 'ITEMS OF THE VENUE FROM OUTLET SAGA');
    yield put(getOutletVenueSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getOutletVenueError(jsonError));
  }
}

function* postOrderRequest(details) {
  // console.log(params,"PARAMS FROM SAGA")
  // const { ID } = params;
  // const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
  //   process.env.API_PORT
  // }/api/cart/${ID}`;
  const requestURL = `testURL`;
  const options = {
    method: 'POST',
    body: JSON.stringify(details),
  };

  try {
    const response = yield call(request, requestURL, options);
    // console.log(response,"RESPONSE FROM WAITER ORDER")
    yield put(postOrder(response));
  } catch (error) {
    // console.log(error,"ERROR FROM RESPONSE")
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getCartItemsError(jsonError));
  }
}

function* getCartItemsRequest() {
  yield takeLatest(GET_ITEMS_REQUEST, getCartItemsSaga);
}

function* postOrdersRequest() {
  yield takeLatest(ORDER_ITEMS_REQUEST, postOrderRequest);
}

function* getOutletVenueRequest() {
  yield takeLatest(GET_OUTLET_VENUE_REQUEST, getOutletVenueSaga);
}

export default function* rootSaga() {
  yield all([
    ,
    fork(getCartItemsRequest),
    fork(postOrdersRequest),
    fork(getOutletVenueRequest),
  ]);
}
