import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import _ from 'lodash';

import { GET_ITEMS_REQUEST } from './constants';

import { getCartItemsSuccess, getCartItemsError } from './actions';

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

function* getCartItemsRequest() {
  yield takeLatest(GET_ITEMS_REQUEST, getCartItemsSaga);
}

export default function* rootSaga() {
  yield all([, fork(getCartItemsRequest)]);
}
