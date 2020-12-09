/**
 *
 * VerifyCheckIn
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
// import makeSelectVerifyCheckIn from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styled from 'styled-components';
import { Panel, Message, Divider } from 'rsuite';
import { makeSelectError, makeSelectSuccess, makeSelectGuest } from './selectors';
import { checkOut } from './actions';

import moment from 'moment';

const VerificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em;
`

const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5em 0 0 0;
`

/* eslint-disable react/prefer-stateless-function */
export class VerifyCheckOut extends React.PureComponent {

  componentDidMount = () => {
    const {checkOut, history} = this.props;
    const {state} = history.location;

    if (state && state.code) { 
      checkOut(state.code);
    } else {
      this.props.history.push('/');
    }
  }

  render() {
    const {guest, success} = this.props;
    return (
      <div>
        <Helmet>
          <title>Verify Check-Out</title>
          <meta name="description" content="Description of VerifyCheckIn" />
        </Helmet>
        <VerificationContainer>
          {success && <Message type="success" description={<b>Successful Check-Out</b>}/>}
          <Divider />
          {guest && (
            <Panel bordered>
              <FieldContainer>
                <b>Name</b>
                <p>{`${guest.account.first_name} ${guest.account.last_name}`}</p>
              </FieldContainer>
              <FieldContainer>
                <b>Guest Type</b>
                <p>{guest.role.name}</p>
              </FieldContainer>
              <FieldContainer>
                <b>Check out time</b>
                <p>{moment().format('DD/MM/YYYY LT')}</p>
              </FieldContainer>
            </Panel>
          )}
        </VerificationContainer>
      </div>
    );
  }
}

VerifyCheckOut.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  success: makeSelectSuccess(),
  guest: makeSelectGuest(),
});

function mapDispatchToProps(dispatch) {
  return {
    checkOut: (token) => dispatch(checkOut(token)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'verifyCheckOut', reducer });
const withSaga = injectSaga({ key: 'verifyCheckOut', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(VerifyCheckOut);
