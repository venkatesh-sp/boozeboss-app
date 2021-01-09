import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import QRCode from 'react-qr-code';
import _ from 'lodash';
import { Button, ButtonGroup, Loader } from 'rsuite';
import {
  makeSelectCartItems,
  makeSelectCurrentOutlet,
  makeSelectOutletInfo,
  makeSelectUser,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getCartItems, addCartItems } from './actions';

import { makeSelectRole, makeSelectScope } from '../App/selectors';

class OrderInfo extends React.Component {
  componentDidMount() {
    const { user, cartItems, role, scope } = this.props;
    if (role === 'WAITER') {
      this.props.history.push({
        pathname: '/accept-orders',
        state: {
          cartItems,
        },
      });
    }
  }

  render() {
    if (!this.props.user) {
      return <Loader />;
    }
    const { outlet } = this.props;
    if (!this.props.cartItems) {
      return (
        <>
          <p style={{ textAlign: 'center', marginTop: '1rem' }}>
            No Items...Please add items to the cart
          </p>
        </>
      );
    }

    return (
      <>
        <h5 style={{ textAlign: 'center', marginTop: '1rem' }}>
          Let waiter scan this code
        </h5>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <QRCode
            value={JSON.stringify({
              user: this.props.user.id,
              cartItems: this.props.cartItems,
              type: 'orders',
            })}
          />
        </div>
        <p style={{ textAlign: 'center', marginTop: '10px', fontSize: '18px' }}>
          {_.size(this.props.cartItems)} Items Ordered
        </p>
        <ButtonGroup justified style={{ padding: '15px' }}>
          <Button
            appearance="ghost"
            onClick={() => {
              const { history, currentoutlet, outlet } = this.props;
              history.push({
                pathname: '/outlet',
                search:
                  currentoutlet === 'outletevent'
                    ? `outlet_event=${outlet.id}`
                    : `outlet_venue=${outlet.id}`,
                state: {
                  cartItems: null,
                },
              });
            }}
          >
            Back to Menu
          </Button>
          <Button
            appearance="ghost"
            onClick={() => {
              this.props.history.push('/orders-summary');
            }}
          >
            Close Bill
          </Button>
        </ButtonGroup>
      </>
    );
  }
}

OrderInfo.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  cartItems: makeSelectCartItems(),
  outlet: makeSelectOutletInfo(),
  currentoutlet: makeSelectCurrentOutlet(),
  user: makeSelectUser(),
  role: makeSelectRole(),
  scope: makeSelectScope(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCartItems: () => dispatch(getCartItems()),
    addCartItems: items => dispatch(addCartItems(items)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'outlet', reducer });
const withSaga = injectSaga({ key: 'outlet', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OrderInfo);
