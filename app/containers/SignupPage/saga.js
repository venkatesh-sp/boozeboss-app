import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import {
  SIGNUP_GUEST_REQUEST,
  FACEBOOK_LOGIN_REQUEST,
  GET_SMS_VERIFICATION_REQUEST,
  CHECK_SMS_VERIFICATION_REQUEST,
} from './constants';

import {
  signupSuccess,
  signupError,
  facebookAuthSuccess,
  facebookAuthError,
  getSMSVerificationSuccess,
  getSMSVerificationError,
  checkSMSVerificationSuccess,
  checkSMSVerificationError,
} from './actions';

import { authenticate, getUser } from '../App/actions';
import { makeSelectToken } from './selectors';

function* signupSaga(params) {
  const { guest } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/auth/guest-signup`;
  const options = {
    method: 'POST',
    body: JSON.stringify(guest),
  };

  try {
    const response = yield call(request, requestURL, options);
    if (response.login) {
      yield put(signupSuccess(response.jwt_token, 'Succesfull signup'));
      yield put(getUser());
      yield put(authenticate(response.jwt_token));
    } else {
      yield put(signupSuccess(null, response.message));
    }
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(signupError(jsonError));
  }
}

function* facebookLoginSaga(params) {
  const { auth } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/auth/facebook-oauth`;
  const options = {
    method: 'POST',
    body: JSON.stringify(auth),
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

function* getSMSVerificationSaga(params) {
  const { phone_number } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/verifications/sms/get-code`;
  const options = {
    method: 'POST',
    body: JSON.stringify({ phone_number }),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getSMSVerificationSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getSMSVerificationError(jsonError));
  }
}

function* checkSMSVerificationSaga(params) {
  const { phone_number, code } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/verifications/sms/check-code`;
  const options = {
    method: 'POST',
    body: JSON.stringify({ phone_number, code }),
  };

  const token = yield select(makeSelectToken());

  try {
    const response = yield call(request, requestURL, options);
    yield put(checkSMSVerificationSuccess(response));
    yield put(authenticate(token));
    yield put(getUser());
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(checkSMSVerificationError(jsonError));
  }
}

function* signupRequest() {
  yield takeLatest(SIGNUP_GUEST_REQUEST, signupSaga);
}

function* facebookLoginRequest() {
  yield takeLatest(FACEBOOK_LOGIN_REQUEST, facebookLoginSaga);
}

function* getVerificationSMSRequest() {
  yield takeLatest(GET_SMS_VERIFICATION_REQUEST, getSMSVerificationSaga);
}

function* checkVerificationSMSRequest() {
  yield takeLatest(CHECK_SMS_VERIFICATION_REQUEST, checkSMSVerificationSaga);
}

export default function* rootSaga() {
  yield all([
    fork(signupRequest),
    fork(facebookLoginRequest),
    fork(getVerificationSMSRequest),
    fork(checkVerificationSMSRequest),
  ]);
}
