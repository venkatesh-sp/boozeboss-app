import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import QRCode from 'react-qr-code';
import _ from 'lodash';
import { Button, ButtonGroup, Loader } from 'rsuite';
// import { makeSelectUser } from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getwaiterOrdersSummary } from './actions';
import { makeSelectOrdersSummary } from './selectors';

import { getUser } from '../App/actions';

import {
  makeSelectRole,
  makeSelectScope,
  makeSelectUser,
} from '../App/selectors';

const StyledMenuDiv = styled.div`
  background: #1a1b1c;
  border-radius: 8px;
  overflow-y: scroll;
  padding: 15px;
  margin-top: 5px;
`;

const StyledText = styled.p`
  font-size: ${props => props.size};
  font-weight: ${props => props.weight};
  color: ${props => props.color};
`;

class WaiterOrderSummary extends React.Component {
  state = {
    show: false,
  };
  componentDidMount() {
    const { user, getUser, getwaiterOrdersSummary } = this.props;

    getUser();
    getwaiterOrdersSummary(3);
    console.log(this.props, 'PROPS FROM COMPONENT DID MOUNT');
  }

  render() {
    console.log(
      this.props,
      'THIS IS FROM RENDER FUNCTION WAITER ORDERS COMPONENT',
    );
    const { items } = this.props;
    const { show } = this.state;
    const buttons = (
      // role === 'WAITER' && scope === 'OUTLET' ? (
      <>
        <Button
          style={{
            width: '50%',
            fontWeight: 'bold',
            margin: '2px',
          }}
          appearance="ghost"
          onClick={() => {
            this.setState({ show: !show });
          }}
        >
          Pay Online
        </Button>
        <Button
          style={{
            width: '50%',
            fontWeight: 'bold',
            margin: '2px',
          }}
          appearance="ghost"
          onClick={() => {
            //
          }}
        >
          Pay Offline
        </Button>
      </>
    );

    return (
      <>
        {show ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          >
            <QRCode value="https://www.youtube.com/" />
          </div>
        ) : (
          <div />
        )}

        <div
          style={{
            width: '100%',
            display: 'flex',
            marginTop: '10px',
            padding: '10px',
          }}
        >
          {buttons}
        </div>
        <div
          style={{ height: '385px', background: 'black', overflowY: 'scroll' }}
        >
          {this.props.items.orders.map((item, index) => {
            return (
              <StyledMenuDiv>
                <div>
                  <StyledText size="16px" color="#ffffff" weight="bold">
                    Sandwich
                  </StyledText>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <StyledText
                      size="13px"
                      color="#ffffff"
                      weight="500"
                      style={{ marginTop: '5px' }}
                    >
                      Price: 200
                    </StyledText>

                    <StyledText size="13px" color="#ffffff" weight="500">
                      Qty: {item.quantity}
                    </StyledText>
                    <StyledText size="13px" color="#ffffff" weight="500">
                      Cost: 200
                    </StyledText>
                  </div>
                </div>
              </StyledMenuDiv>
            );
          })}
        </div>
        <Button
          appearance="primary"
          style={{
            position: 'fixed',
            bottom: '0',
            left: '0',
            width: '100%',
            borderRadius: '0px',
            zIndex: '9999',
          }}
          onClick={() => {
            //
          }}
        >
          Total Cost: 200
        </Button>
      </>
    );
  }
}

WaiterOrderSummary.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  role: makeSelectRole(),
  scope: makeSelectScope(),
  items: makeSelectOrdersSummary(),
});

function mapDispatchToProps(dispatch) {
  return {
    getwaiterOrdersSummary: account_id =>
      dispatch(getwaiterOrdersSummary(account_id)),
    getUser: () => dispatch(getUser()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'summary', reducer });
const withSaga = injectSaga({ key: 'summary', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WaiterOrderSummary);
