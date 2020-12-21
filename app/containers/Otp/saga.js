import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import _ from 'lodash';

import {
  CHECK_SMS_VERIFICATION_REQUEST,
  CHECK_EMAIL_VERIFICATION_REQUEST,
} from './constants';

import {
  checkSMSVerificationSuccess,
  checkSMSVerificationError,
  checkEmailVerificationSuccess,
  checkEmailVerificationError,
} from './actions';
import { ADD_CART_ITEM } from '../Cart/constants';

function* checkSMSVerificationSaga(params) {
  const { phone_number, code, props } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/verifications/sms/check-code`;
  const options = {
    method: 'POST',
    body: JSON.stringify({ phone_number, code }),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(checkSMSVerificationSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(checkSMSVerificationError(jsonError));
  }
}

function* checkEmailVerificationSaga(params) {
  const { email, code, props } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/verifications/email/check-code`;
  const options = {
    method: 'POST',
    body: JSON.stringify({ email, code }),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(checkEmailVerificationSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(checkEmailVerificationError(jsonError));
  }
}

function* checkVerificationSMSRequest() {
  yield takeLatest(CHECK_SMS_VERIFICATION_REQUEST, checkSMSVerificationSaga);
}

function* checkVerificationEmailRequest() {
  yield takeLatest(
    CHECK_EMAIL_VERIFICATION_REQUEST,
    checkEmailVerificationSaga,
  );
}

export default function* rootSaga() {
  yield all([
    fork(checkVerificationSMSRequest),
    fork(checkVerificationEmailRequest),
  ]);
}
