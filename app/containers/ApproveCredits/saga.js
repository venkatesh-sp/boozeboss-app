import { call, put, select, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import { 
  GET_WALLET_PURCHASE_REQUEST,
  GET_EVENTS_REQUEST,
  APPROVE_CODE_REQUEST
} from './constants';

import {
  getWalletPurchaseSuccess, getWalletPurchaseError,
  getEventsSuccess, getEventsError, 
  approveCodeSuccess, approveCodeError
} from './actions';



function* getWalletPurchaseSaga(params) {
  const {code} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/wallets/wallet-purchase/${code}`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getWalletPurchaseSuccess(response));
  } catch (error) {
    console.log(error)
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getWalletPurchaseError(jsonError));
  }
}

function* getEventSaga() {
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/events`;
  const options = {
    method: 'GET',
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(getEventsSuccess(response));
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(getEventsError(jsonError));
  }
}

function* approveCodeSaga(params) {
  const {code, event_id, history} = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${process.env.API_PORT}/api/wallets/wallet-purchase/approve/${code}`;
  const options = {
    method: 'PUT',
    body: JSON.stringify({event_id}),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(approveCodeSuccess(response));
    alert('Credits approved!');
    history.push('/scanner')
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    alert(jsonError);
    yield put(approveCodeError(jsonError));
  }
}

function* getWalletPurchaseRequest() {
  yield takeLatest(GET_WALLET_PURCHASE_REQUEST, getWalletPurchaseSaga);
}

function* getEventRequest() {
  yield takeLatest(GET_EVENTS_REQUEST, getEventSaga);
}

function* approveCodeRequest() {
  yield takeLatest(APPROVE_CODE_REQUEST, approveCodeSaga);
}

export default function* rootSaga() {
  yield all([
    fork(getWalletPurchaseRequest),
    fork(getEventRequest),
    fork(approveCodeRequest),
  ]);
}
