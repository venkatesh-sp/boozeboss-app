import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';
import fileRequest from 'utils/filerequest';

import { 
  UPLOAD_VERIFICATION_REQUEST, SUBMIT_VERIFICATION_REQUEST, CHECK_VERIFICATION_REQUEST,
} from './constants';

import {
  uploadVerificationSuccess, uploadVerificationError, 
  submitVerificationSuccess, submitVerificationError, 
  checkVerificationSuccess, checkVerificationError
} from './actions';

import { getUser } from '../App/actions';

function* checkVerificationSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/verifications/check-status`;

  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(fileRequest, requestURL, options);
    yield put(checkVerificationSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(checkVerificationError(jsonError));
  }
}

function* uploadVerificationSaga(params) {
  const {verification_type, file} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/verifications/upload-verification/${verification_type}`;
  const formData = new FormData();
  formData.append('file', file);

  const options = {
    method: 'POST',
    body: formData
  };

  try {
    const response = yield call(fileRequest, requestURL, options);
    yield put(uploadVerificationSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(uploadVerificationError(jsonError));
  }
}

function* submitVerificationSaga(params) {
  const {age_verification_status} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/verifications/submit`;

  const options = {
    method: 'POST',
    body: JSON.stringify({age_verification_status})
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(submitVerificationSuccess(response));
    yield put(getUser());
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(submitVerificationError(jsonError));
  }
}

function* checkVerificationRequest() {
  yield takeLatest(CHECK_VERIFICATION_REQUEST, checkVerificationSaga);
}

function* uploadVerificationRequest() {
  yield takeLatest(UPLOAD_VERIFICATION_REQUEST, uploadVerificationSaga);
}

function* submitVerificationRequest() {
  yield takeLatest(SUBMIT_VERIFICATION_REQUEST, submitVerificationSaga);
}

export default function* rootSaga() {
  yield all([
    fork(checkVerificationRequest),
    fork(uploadVerificationRequest),
    fork(submitVerificationRequest),
  ]);
}
