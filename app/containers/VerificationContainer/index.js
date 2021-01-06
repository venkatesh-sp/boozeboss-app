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
import { Whatsapp } from '@styled-icons/simple-icons';
import { Button} from 'rsuite';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectError, makeSelectSuccess } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import {uploadVerification, submitVerification, checkVerification} from './actions'

import {Verification} from './components'


class VerificationContainer extends React.Component {

  componentDidMount = () => { 
    const {checkVerification} = this.props;
    checkVerification();
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Verifcation</title>
          <meta
            name="description"
            content="Description of VerificationContainer"
          />
        </Helmet>
        <Verification 
          {...this.props}
        />
        <Button
        href='https://api.whatsapp.com/send?phone=919493871441'
        style={{
          position: 'fixed',
          width: '30px',
          height: '30px',
          bottom: '50px',
          right: '10px',
          backgroundColor: '#25D366',
          color: '#fff',
          padding: '0px', 
          borderRadius: '50px',
          textAlign: 'center',
          fontSize: '0px',
          zIndex: '100',
        }}
        >
          <Whatsapp />
        </Button>
      </div>
    );
  }
}

VerificationContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  success: makeSelectSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    checkVerification: () => dispatch(checkVerification()),
    uploadVerification: (verification_type, file) => dispatch(uploadVerification(verification_type, file)),
    submitVerification: (status) => dispatch(submitVerification(status)),
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
