import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';
import fileRequest from 'utils/fileRequest';

import { 
  UPLOAD_VERIFICATION_REQUEST,
} from './constants';

import {
  uploadVerificationSuccess, uploadVerificationError
} from './actions';


function* uploadVerificationSaga(params) {
  const {verification_type, file} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/verifications/upload-verification/${verification_type}`;
  const formData = new FormData();
  formData.append('file', file);

  const options = {
    method: 'POST',
    body: formData
  };

  console.log('saga', formData)

  try {
    const response = yield call(fileRequest, requestURL, options);
    yield put(uploadVerificationSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(uploadVerificationError(jsonError));
  }
}

function* uploadVerificationRequest() {
  yield takeLatest(UPLOAD_VERIFICATION_REQUEST, uploadVerificationSaga);
}

export default function* rootSaga() {
  yield all([
    fork(uploadVerificationRequest)
  ]);
}
