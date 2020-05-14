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
import { makeSelectError, makeSelectSuccess } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { makeSelectIsAgeVerified } from '../App/selectors';

import { HomePageContainer } from './components'


/* eslint-disable react/prefer-stateless-function */
export class HomePage extends React.Component {

  render() {
    return (
      <div>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="Signup for clients" />
        </Helmet>
        <HomePageContainer 
          {...this.props}
        />
      </div>
    );
  }
}

HomePage.propTypes = {
  // clientSignup: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAgeVerified: makeSelectIsAgeVerified(),
});

function mapDispatchToProps(dispatch) {
  return {
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
