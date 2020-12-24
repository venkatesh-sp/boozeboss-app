import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import _ from 'lodash';

import {
  GET_CART_ITEMS_REQUEST,
  ADD_CART_ITEMS_REQUEST,
  ADD_CART_ITEMS_SUCCESS,
  CLOSE_BILL_REQUEST,
  CLOSE_BILL_SUCCESS,
  CLOSE_BILL_ERROR,
  GET_LOGGED_USER_DETAILS,
  GET_LOGGED_USER_DETAILS_SUCCESS,
  GET_LOGGED_USER_DETAILS_ERROR,
} from './constants';

import {
  getCartItemsSuccess,
  getCartItemsError,
  addCartItems,
  addCartItemsError,
  addCartItemsSuccess,
  closeBill,
  closeBillSuccess,
  closeBillError,
  getCustomerId,
  getCustomerIdSuccess,
  getCustomerIdError,
} from './actions';

function* getCartItemsSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/cart`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getCartItemsSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getCartItemsError(jsonError));
  }
}

function* addCartItemsSaga(params) {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/cart`;
  console.log(params.items, 'CHECKING PARAMS IN ADD CART ITEM SAGA');
  const options = {
    method: 'POST',
    body: JSON.stringify(params.items),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(addCartItemsSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(addCartItemsError(jsonError));
  }
}

function* closeBillSaga(params) {
  console.log(
    params.account_id,
    'ACCOUNT ID FROM CLOSEBILL SAGA PREETHAM VARANASI',
  );
  const { account_id } = params;
  console.log(account_id, 'INDIVIDUAL ACCOUNT ID');
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/cart/${account_id}/close-bill`;
  const options = {
    method: 'GET',
  };
  console.log(requestURL, 'REQUEST URL SAGA');

  try {
    const response = yield call(request, requestURL, options);
    console.log(response, 'RESPONSE OF CLOSE BILL');
    // yield put(closeBillSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    console.log(jsonError, 'JSON ERROR OF CLOSE BILL');
    // yield put(closeBillError(jsonError));
  }
}

function* getCartItemsRequest() {
  yield takeLatest(GET_CART_ITEMS_REQUEST, getCartItemsSaga);
}

function* addCartItemsRequest() {
  yield takeLatest(ADD_CART_ITEMS_REQUEST, addCartItemsSaga);
}

function* closeBillRequest() {
  yield takeLatest(CLOSE_BILL_REQUEST, closeBillSaga);
}

function* addCartItemsRequestSuccess() {
  yield takeLatest(ADD_CART_ITEMS_SUCCESS, getCartItemsSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getCartItemsRequest),
    fork(addCartItemsRequest),
    fork(addCartItemsRequestSuccess),
    fork(closeBillRequest),
  ]);
}
