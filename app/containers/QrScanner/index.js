/**
 *
 * QrScanner
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
import makeSelectQrScanner from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import QrReader from 'react-qr-reader';
import styled from 'styled-components';
import { Message } from 'rsuite';

const StyledCameraContainer = styled.div``;

/* eslint-disable react/prefer-stateless-function */
export class QrScanner extends React.Component {
  state = {
    result: 'No result',
    error: false,
  };

  handleScan = data => {
    console.log(data);
    if (data) {
      const { history } = this.props;
      const json_data = JSON.parse(data);
      console.log(data);

      // Validate for check in
      if (json_data.type == 'check-in') {
        history.push({
          pathname: '/check-in',
          state: {
            code: json_data.code,
          },
        });
      }

      // Validate for check-out
      if (json_data.type === 'check-out') {
        history.push({
          pathname: '/check-out',
          state: {
            code: json_data.code,
          },
        });
      }

      // Validate for redeem-order
      if (json_data.type === 'redeem-order') {
        history.push({
          pathname: `/orders/${json_data.order_identifier}`,
          state: {
            redeem: true,
            order_identifier: json_data.order_identifier,
          },
        });
      }

      // Validate for redeem-order
      if (json_data.type === 'add-credits') {
        const { state } = this.props.history.location;
        history.push({
          pathname: `/approve-credits`,
          state: {
            code: json_data.code,
            event_id: state.event_id,
          },
        });
      }

      // Scan Free Drink
      if (json_data.type === 'free-drink') {
        console.log(json_data.code);
        history.push({
          pathname: `/approve-free-drink`,
          state: {
            code: json_data.code,
          },
        });
      }

      if (json_data.type === 'orders') {
        history.push({
          pathname: `/waiter-orders`,
          state: {
            user: json_data.user
          },
        });
      }
    }
  };
  handleError = err => {
    this.setState({ error: true });
  };

  render() {
    const { error } = this.state;
    const { state } = this.props.history.location;
    return (
      <div>
        <Helmet>
          <title>QrScanner</title>
          <meta name="description" content="Description of QrScanner" />
        </Helmet>
        <div>
          {state && state.message ? (
            <Message type="info" description={state.message} />
          ) : (
            <Message
              type="info"
              description={'Place the code near the camera'}
            />
          )}
          <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: '100%' }}
          />
          {error && (
            <Message
              type="warning"
              description="If you are experiencing issues please try to change to Safari on iOS or your Native Web browser"
            />
          )}
        </div>
      </div>
    );
  }
}

QrScanner.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'qrScanner', reducer });
const withSaga = injectSaga({ key: 'qrScanner', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(QrScanner);
