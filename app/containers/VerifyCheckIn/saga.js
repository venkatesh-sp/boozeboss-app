import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  CHECK_IN_REQUEST
} from './constants';

import {
  checkInSuccess, checkInError
} from './actions';

function* checkinSaga(params) {
  const {token} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/events/check-in/${token}`;
  const options = {
    method: 'POST',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(checkInSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(checkInError(jsonError));
  }
}

function* checkInRequest() {
  yield takeLatest(CHECK_IN_REQUEST, checkinSaga);
}

export default function* rootSaga() {
  yield all([
    fork(checkInRequest),
  ]);
}
