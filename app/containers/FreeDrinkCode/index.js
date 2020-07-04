/**
 *
 * FreeDrinkCode
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
import makeSelectFreeDrinkCode from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

/* eslint-disable react/prefer-stateless-function */
export class FreeDrinkCode extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>FreeDrinkCode</title>
          <meta name="description" content="Description of FreeDrinkCode" />
        </Helmet>
        <FormattedMessage {...messages.header} />
      </div>
    );
  }
}

FreeDrinkCode.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  freeDrinkCode: makeSelectFreeDrinkCode(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'freeDrinkCode', reducer });
const withSaga = injectSaga({ key: 'freeDrinkCode', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FreeDrinkCode);
