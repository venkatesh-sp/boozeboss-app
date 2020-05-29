import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  CHECK_OUT_REQUEST
} from './constants';

import {
  checkOutSuccess, checkOutError
} from './actions';

function* checkOutSaga(params) {
  const {token} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/events/check-out/${token}`;
  const options = {
    method: 'POST',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(checkOutSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(checkOutError(jsonError));
  }
}

function* checkOutRequest() {
  yield takeLatest(CHECK_OUT_REQUEST, checkOutSaga);
}

export default function* rootSaga() {
  yield all([
    fork(checkOutRequest),
  ]);
}
