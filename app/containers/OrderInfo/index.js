import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import QRCode from 'react-qr-code';
import _ from 'lodash';
import { Button, ButtonGroup } from 'rsuite';
import {
  makeSelectCartItems,
  makeSelectCurrentOutlet,
  makeSelectOutletInfo,
  makeSelectUser,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getCartItems, addCartItems, closeBill } from './actions';

class OrderInfo extends React.Component {
  componentDidMount() {
    console.log(
      this.props,
      'CHECK IF CART ITEMS ARE RENDERED PREETHAM VARANASI',
    );
    const items = _.map(_.toPairs(this.props.cartItems), data => {
      const key = `${this.props.currentoutlet}menu_id`;
      return {
        [key]: parseInt(data[0]),
        quantity: parseInt(data[1]),
        data: { menCount: 2, menAgeGroup: '21-22' },
      };
    });

    console.log(items);
    // this.props.getCustomerId();
    this.props.addCartItems(items);
    // console.log(this.props.userDetails, 'USER DETAILS FROM STORE');
  }

  render() {
    // console.log(this.props.user.wallet.id, 'BY PREETHAM VARANASI 23-12-2020');
    if (!this.props.cartItems) {
      return <>Loading..</>;
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
              // user: this.props.user.id,
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

const withReducer = injectReducer({ key: 'cart', reducer });
const withSaga = injectSaga({ key: 'cart', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OrderInfo);
