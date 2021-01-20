import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import _ from 'lodash';

import {
  CHECK_SMS_VERIFICATION_REQUEST,
  CHECK_EMAIL_VERIFICATION_REQUEST,
  SEND_MOBILE_OTP_REQUEST,
} from './constants';

import {
  checkSMSVerificationSuccess,
  checkSMSVerificationError,
  checkEmailVerificationSuccess,
  checkEmailVerificationError,
  sendMobileOtpSuccess,
  sendMobileOtpError,
} from './actions';
import { ADD_CART_ITEM } from '../Cart/constants';

function* checkSMSVerificationSaga(params) {
  console.log(params, 'params');
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
    console.log(response, 'response');
    yield put(checkSMSVerificationSuccess(response));
  } catch (error) {
    console.log(error, 'error');
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

function* getSMSVerificationSaga(params) {
  const { phone_number, history } = params.phone_number;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/verifications/sms/get-code`;
  const options = {
    method: 'POST',
    body: JSON.stringify({ phone_number }),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(sendMobileOtpSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(sendMobileOtpError(jsonError));
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

function* getVerificationSMSRequest() {
  yield takeLatest(SEND_MOBILE_OTP_REQUEST, getSMSVerificationSaga);
}

export default function* rootSaga() {
  yield all([
    fork(checkVerificationSMSRequest),
    fork(checkVerificationEmailRequest),
    fork(getVerificationSMSRequest),
  ]);
}
