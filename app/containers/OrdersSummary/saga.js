import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import _ from 'lodash';

import { GET_ORDERS_SUMMARY_REQUEST } from './constants';

import { getOrdersSummarySuccess, getOrdersSummaryError } from './actions';

function* getOrdersSummarySaga(params) {
  const { account_id } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/cart/${account_id}/orders-summary`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getOrdersSummarySuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getOrdersSummaryError(jsonError));
  }
}

function* getOrdersSummaryRequest() {
  yield takeLatest(GET_ORDERS_SUMMARY_REQUEST, getOrdersSummarySaga);
}

export default function* rootSaga() {
  yield all([fork(getOrdersSummaryRequest)]);
}
