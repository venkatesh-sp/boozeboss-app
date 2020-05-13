import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  LOGIN_REQUEST
} from './constants';

import {
  loginSuccess, loginError
} from './actions';

import { authenticate } from '../App/actions'

function* loginSaga(params) {
  const {auth} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/auth/login`;
  const options = {
    method: 'POST',
    body: JSON.stringify(auth)
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(loginSuccess(response));
    yield put(authenticate(response));

  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(loginError(jsonError));
  }
}

function* loginRequest() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}

export default function* rootSaga() {
  yield all([
    fork(loginRequest),
  ]);
}
