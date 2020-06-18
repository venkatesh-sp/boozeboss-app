import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  LOGIN_REQUEST, FACEBOOK_LOGIN_REQUEST
} from './constants';

import {
  loginSuccess, loginError, facebookAuthSuccess, facebookAuthError
} from './actions';

import { authenticate, getUser } from '../App/actions'

function* loginSaga(params) {
  const {auth} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/auth/login`;
  const options = {
    method: 'POST',
    body: JSON.stringify(auth)
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(loginSuccess(response.token));
    yield put(authenticate(response.token));
    yield put(getUser());
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(loginError(jsonError));
  }
}

function* facebookLoginSaga(params) {
  const {auth} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/auth/facebook-oauth`;
  const options = {
    method: 'POST',
    body: JSON.stringify(auth)
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(facebookAuthSuccess(response));
    yield put(authenticate(response));
    yield put(getUser());
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(facebookAuthError(jsonError));
  }
}

function* loginRequest() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}

function* facebookLoginRequest() {
  yield takeLatest(FACEBOOK_LOGIN_REQUEST, facebookLoginSaga);
}

export default function* rootSaga() {
  yield all([
    fork(loginRequest),
    fork(facebookLoginRequest),
  ]);
}
