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
import {
  makeSelectUser,
  makeSelectIsAgeVerified,
  makeSelectIsAuthenticated,
  makeSelectRole,
  makeSelectScope,
} from '../App/selectors';

import {
  makeSelectError,
  makeSelectSuccess,
  makeSelectEvents,
  makeSelectAgencyEvents,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { HomePageContainer } from './components';

import { getEvents, getAgencyEvents, submitEventCode } from './actions';
import { getUser } from '../App/actions';

/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="Signup for clients" />
        </Helmet>
        <HomePageContainer {...this.props} />
      </div>
    );
  }
}

HomePage.propTypes = {
  // clientSignup: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  isAgeVerified: makeSelectIsAgeVerified(),
  isAuthenticated: makeSelectIsAuthenticated(),
  role: makeSelectRole(),
  scope: makeSelectScope(),
  events: makeSelectEvents(),
  agencyEvents: makeSelectAgencyEvents(),
});

function mapDispatchToProps(dispatch) {
  return {
    getEvents: () => dispatch(getEvents()),
    getAgencyEvents: () => dispatch(getAgencyEvents()),
    submitEventCode: code => dispatch(submitEventCode(code)),
    getUser: () => dispatch(getUser()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'homepage', reducer });
const withSaga = injectSaga({ key: 'homepage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HomePage);
