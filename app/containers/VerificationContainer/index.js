/**
 *
 * VerificationContainer
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectVerificationContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {uploadVerification} from './actions'

import {Verification} from './components'


class VerificationContainer extends React.Component {
  render() {
    return (
      <div>
        <Helmet>
          <title>VerificationContainer</title>
          <meta
            name="description"
            content="Description of VerificationContainer"
          />
        </Helmet>
        <Verification 
          {...this.props}
        />
      </div>
    );
  }
}

VerificationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  verificationContainer: makeSelectVerificationContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    uploadVerification: (verification_type, file) => dispatch(uploadVerification(verification_type, file)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'verification', reducer });
const withSaga = injectSaga({ key: 'verification', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(VerificationContainer);
