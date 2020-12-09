import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  TRANSFER_CREDITS_REQUEST
} from './constants';

import {
  transferSuccess, transferError
} from './actions';

import {  
  getUser
} from '../App/actions'


function* transferSaga(params) {
  const {amount, target_email} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/wallets/transfer`;
  const options = {
    method: 'POST',
    body: JSON.stringify({
      amount, 
      target_email,
    })
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(transferSuccess(response));
    yield put(getUser());
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(transferError(jsonError));
  }
}


function* transferRequest() {
  yield takeLatest(TRANSFER_CREDITS_REQUEST, transferSaga);
}

export default function* rootSaga() {
  yield all([
    fork(transferRequest),
  ]);
}
