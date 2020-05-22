/**
 *
 * ClientSignup
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectError, makeSelectSuccess, makeSelectStep, makeSelectToken } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';



import {SignupForm} from './components'
import { signup, facebookAuth, getSMSVerification, checkSMSVerification } from './actions';
import { authenticate, getUser } from '../App/actions';

/* eslint-disable react/prefer-stateless-function */
export class ClientSignup extends React.Component {

  render() {
    return (
      <div>
        <Helmet>
          <title>Client Signup</title>
          <meta name="description" content="Signup for clients" />
        </Helmet>
        <SignupForm 
          {...this.props}
        />
      </div>
    );
  }
}

ClientSignup.propTypes = {
  // clientSignup: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  success: makeSelectSuccess(),
  step: makeSelectStep(),
  token: makeSelectToken(),
});

function mapDispatchToProps(dispatch) {
  return {
    authenticate: (token) => dispatch(authenticate(token)),
    getUser: () => dispatch(getUser()),
    signup: (guest) => dispatch(signup(guest)),
    facebookAuth: (auth) => dispatch(facebookAuth(auth)),
    getSMSVerification: (phone_number) => dispatch(getSMSVerification(phone_number)),
    checkSMSVerification: (phone_number, code) => dispatch(checkSMSVerification(phone_number, code))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'signupPage', reducer });
const withSaga = injectSaga({ key: 'signupPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ClientSignup);
