import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import _ from 'lodash';

import { GET_WAITER_ORDER_SUMMARY_REQUEST } from './constants';

import {
  getwaiterOrdersSummarySuccess,
  getwaiterOrdersSummaryError,
} from './actions';

function* getWaiterOrdersSummarySaga(params) {
  const { account_id } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/orderinfo/getwaiterorderInfo/${account_id}`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getwaiterOrdersSummarySuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getwaiterOrdersSummaryError(jsonError));
  }
}

function* getOrdersSummaryRequest() {
  yield takeLatest(
    GET_WAITER_ORDER_SUMMARY_REQUEST,
    getWaiterOrdersSummarySaga,
  );
}

export default function* rootSaga() {
  yield all([fork(getOrdersSummaryRequest)]);
}
