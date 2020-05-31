import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  CREATE_PRODUCT_ORDER_REQUEST
} from './constants';

import {
  createOrderSuccess, createOrderError
} from './actions';
import { getUser } from '../App/actions'
import { makeSelectUser } from '../App/selectors';


function* createOrderSaga(params) {
  const {transactions} = params;

  const user = yield select(makeSelectUser());

  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/wallets/${user.wallet.id}/add-order`;
  const options = {
    method: 'POST',
    body: JSON.stringify({transactions}),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(createOrderSuccess(response));
    yield put(getUser())
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(createOrderError(jsonError));
  }
}


function* createOrderRequest() {
  yield takeLatest(CREATE_PRODUCT_ORDER_REQUEST, createOrderSaga);
}

export default function* rootSaga() {
  yield all([
    fork(createOrderRequest),
  ]);
}
