import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  GET_ORDER_REQUEST, CANCEL_ORDER_REQUEST, SCAN_ORDER_REQUEST
} from './constants';

import {
  getOrderSuccess, getOrderError, 
  cancelOrderSuccess, cancelOrderError, scanOrderSuccess, scanOrderError
} from './actions';

import {
  getUser
} from '../App/actions';

function* getOrderSaga(params) {
  const {order_identifier} = params;

  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/wallets/orders/${order_identifier}`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getOrderSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getOrderError(jsonError));
  }
}

function* cancelOrderSaga(params) {
  const {order_id} = params;

  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/wallets/orders/${order_id}/cancel`;
  const options = {
    method: 'PUT',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(cancelOrderSuccess(response));
    yield put(getUser());
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(cancelOrderError(jsonError));
  }
}

function* scanOrderSaga(params) {
  const {order_identifier} = params;
  console.log(order_identifier)

  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/wallets/orders/${order_identifier}/scan`;
  const options = {
    method: 'PUT',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(scanOrderSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(scanOrderError(jsonError));
  }
}


function* getOrderRequest() {
  yield takeLatest(GET_ORDER_REQUEST, getOrderSaga);
}

function* cancelOrderRequest() {
  yield takeLatest(CANCEL_ORDER_REQUEST, cancelOrderSaga);
}

function* scanOrderRequest() {
  yield takeLatest(SCAN_ORDER_REQUEST, scanOrderSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getOrderRequest),
    fork(cancelOrderRequest),
    fork(scanOrderRequest),
  ]);
}
