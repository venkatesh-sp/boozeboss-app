import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { CHECK_SMS_VERIFICATION_REQUEST } from './constants';

import {
  checkSMSVerificationSuccess,
  checkSMSVerificationError,
} from './actions';

function* checkSMSVerificationSaga(params) {
  const { phone_number, code } = params;
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
    console.log(error);
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(checkSMSVerificationError(jsonError));
  }
}

function* checkVerificationSMSRequest() {
  yield takeLatest(CHECK_SMS_VERIFICATION_REQUEST, checkSMSVerificationSaga);
}

export default function* rootSaga() {
  yield all([fork(checkVerificationSMSRequest)]);
}
