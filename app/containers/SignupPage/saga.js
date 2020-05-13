import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  SIGNUP_GUEST_REQUEST,
  FACEBOOK_LOGIN_REQUEST
} from './constants';

import {
  signupSuccess, signupError,
  facebookAuthSuccess, facebookAuthError
} from './actions';

import { authenticate } from '../App/actions'

function* signupSaga(params) {
  const {guest} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/auth/guest-signup`;
  const options = {
    method: 'POST',
    body: JSON.stringify(guest)
  };

  try {
    const response = yield call(request, requestURL, options);
    if (response.login) {
      yield put(authenticate(response.jwt_token));
    } else {
      yield put(signupSuccess(response.message));
    }

  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(signupError(jsonError));
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
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(facebookAuthError(jsonError));
  }
}

function* signupRequest() {
  yield takeLatest(SIGNUP_GUEST_REQUEST, signupSaga);
}

function* facebookLoginRequest() {
  yield takeLatest(FACEBOOK_LOGIN_REQUEST, facebookLoginSaga);
}

export default function* rootSaga() {
  yield all([
    fork(signupRequest),
    fork(facebookLoginRequest)
  ]);
}
