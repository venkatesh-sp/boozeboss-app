import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  GET_GUEST_EVENTS_REQUEST,
  GET_AGENCY_EVENTS_REQUEST,
  GET_USER_REQUEST
} from './constants';

import {
  getUserSuccess, getUserError
} from './actions';

function* getUserSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/accounts/me`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getUserSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getUserError(jsonError));
  }
}

function* getUserRequest() {
  yield takeLatest(GET_USER_REQUEST, getUserSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getUserRequest)
  ]);
}
