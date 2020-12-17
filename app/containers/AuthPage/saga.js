import { call, put, takeLatest, fork, all } from 'redux-saga/effects';

import request from 'utils/request';

import {
  SEND_EMAIL_OTP_REQUEST,
  SEND_MOBILE_OTP_REQUEST,
  ADD_USER_REQUEST,
  VERIFY_EMAIL_PHONE_REQUEST,
} from './constants';

import {
  sendEmailOtpSuccess,
  sendEmailOtpError,
  sendMobileOtpSuccess,
  sendMobileOtpError,
  authSignupSuccess,
  authSignupError,
  verifyEmailPhoneSuccess,
  verifyEmailPhoneError,
  sendEmailOtp,
  sendMobileOtp,
} from './actions';

import { authenticate, getUser } from '../App/actions';
import { makeSelectToken } from './selectors';

function* sendEmailOtpSaga(params) {
  const { email, history } = params.email;

  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/verifications/email/get-code`;
  const options = {
    method: 'POST',
    body: JSON.stringify({ email }),
  };

  try {
    const response = yield call(request, requestURL, options);
    yield put(sendEmailOtpSuccess(response));
    history.push('/otp', { email });
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(sendEmailOtpError(jsonError));
  }
}

function* signupSaga(params) {
  const { user } = params;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/auth/guest-signup`;
  const options = {
    method: 'POST',
    body: JSON.stringify(user),
  };

  try {
    const response = yield call(request, requestURL, options);
    if (response.login) {
      yield put(authSignupSuccess(response.jwt_token, 'Succesfull signup'));
      yield put(getUser());
      yield put(authenticate(response.jwt_token));
      const { email, phone_number, history } = user;
      if (email && phone_number) {
        // sendEmailOtp(email);
        yield put(sendMobileOtp({ phone_number, history }));
      } else if (email) {
        // yield put(sendEmailOtp(email));
      } else if (phone_number) {
        yield put(sendMobileOtp({ phone_number, history }));
      }
    } else {
      yield put(authSignupSuccess(null, response.message));
    }
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(authSignupError(jsonError));
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
    history.push('/otp', { phone_number });
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(sendMobileOtpError(jsonError));
  }
}

function* verifyEmailPhoneSaga(params) {
  const { email, phone_number, history } = params.email_phone;
  const requestURL = `${process.env.API_SCHEMA}://${process.env.API_HOST}:${
    process.env.API_PORT
  }/api/auth/verify`;
  const options = {
    method: 'POST',
    body: JSON.stringify(email ? { email } : { phone_number }),
  };

  try {
    const response = yield call(request, requestURL, options);

    yield put(verifyEmailPhoneSuccess(response.jwt_token, 'verified'));
    yield put(getUser());
    yield put(authenticate(response.jwt_token));

    if (email) {
      // yield put(sendEmailOtp({email, history}));
    } else if (phone_number) {
      yield put(sendMobileOtp({ phone_number, history }));
    }
  } catch (error) {
    const jsonError = yield error.response ? error.response.json() : error;
    yield put(verifyEmailPhoneError(jsonError));
  }
}

function* signupRequest() {
  yield takeLatest(ADD_USER_REQUEST, signupSaga);
}

function* getVerificationSMSRequest() {
  yield takeLatest(SEND_MOBILE_OTP_REQUEST, getSMSVerificationSaga);
}

function* getVerificationEmailRequest() {
  yield takeLatest(SEND_EMAIL_OTP_REQUEST, sendEmailOtpSaga);
}

function* verifyPhoneEmailRequest() {
  yield takeLatest(VERIFY_EMAIL_PHONE_REQUEST, verifyEmailPhoneSaga);
}
export default function* rootSaga() {
  yield all([
    fork(signupRequest),
    fork(getVerificationSMSRequest),
    fork(verifyPhoneEmailRequest),
    fork(getVerificationEmailRequest),
  ]);
}
