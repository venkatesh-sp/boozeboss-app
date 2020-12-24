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

class OrderInfo extends React.Component {
  render() {
    if (!this.props.cartItems || !this.props.user) {
      return <Loader />;
    }

    return (
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <QRCode
            value={JSON.stringify({
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
              });
            }}
          >
            Back to Menu
          </Button>
          <Button
            appearance="ghost"
            onClick={() => {
              this.props.closeBill(this.props.user.id);
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
});

function mapDispatchToProps(dispatch) {
  return {
    getCartItems: () => dispatch(getCartItems()),
    addCartItems: items => dispatch(addCartItems(items)),
    closeBill: account_id => dispatch(closeBill(account_id)),
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
