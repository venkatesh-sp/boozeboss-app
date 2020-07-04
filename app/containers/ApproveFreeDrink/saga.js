import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  APPROVE_FREE_DRINK_REQUEST
} from './constants';

import {
  approveFreeDrinkSuccess, approveFreeDrinkError
} from './actions';


function* approveFreeDrinkSaga(params) {
  const {code} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/events/approve-free-drink`;
  const options = {
    method: 'POST',
    body: JSON.stringify({
      code
    })
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(approveFreeDrinkSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(approveFreeDrinkError(jsonError));
  }
}


function* approveFreeDrinkRequest() {
  yield takeLatest(APPROVE_FREE_DRINK_REQUEST, approveFreeDrinkSaga);
}

export default function* rootSaga() {
  yield all([
    fork(approveFreeDrinkRequest),
  ]);
}
