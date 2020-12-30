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
import { Button, ButtonGroup, Loader, Alert } from 'rsuite';
// import { makeSelectUser } from './selectors';
import reducer from './reducer';
import saga from './saga';

import { getOrdersSummary } from './actions';
import { makeSelectOrdersSummary } from './selectors';

import { getUser } from '../App/actions';

import {
  makeSelectRole,
  makeSelectScope,
  makeSelectUser,
  makeSelectUserId,
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

class OrdersSummary extends React.Component {
  componentDidMount() {
    const { user, role, scope, getOrdersSummary, getUser, userId } = this.props;

    if (role === 'WAITER' && scope === 'OUTLET') {
      const { user } = this.props.history.location.state;
      getOrdersSummary(user);
    } else if (role === 'REGULAR' && scope === 'GUEST') {
      getOrdersSummary(userId);
    }
  }

  render() {
    console.log(this.props);
    if (!this.props.user || !this.props.items) {
      return <Loader />;
    }
    const { role, scope } = this.props;

    const { items: products } = this.props.items;

    if (products.length === 0) {
      return (
        <>
          <p
            style={{
              textAlign: 'center',
              marginTop: '1rem',
              marginBottom: '1rem',
            }}
          >
            No items scanned by waiter
          </p>
          <Button
            appearance="ghost"
            onClick={() => {
              this.props.history.push({
                pathname: '/orders',
              });
            }}
          >
            Go Back
          </Button>
        </>
      );
    }
    let current_outlet;
    const order_summary = _.map(products, function(item) {
      const { quantity, eventproduct, venueproduct } = item;
      let product;
      if (eventproduct.length !== 0) {
        product = eventproduct[0];
        current_outlet = product.outlet_event_id;
      } else if (venueproduct.length !== 0) {
        product = venueproduct[0];
        current_outlet = product.outlet_venue_id;
      }

      if (!product) {
        return <>No Items</>;
      }

      const price = parseFloat(product.price.replace(',', ''));
      return {
        name: product.name,
        price: product.price,
        quantity,
        cost: price * quantity,
      };
    });

    const venues = [14, 21, 24, 29];
    let subaccounts = [];

    if (current_outlet && venues.includes(current_outlet)) {
      // Beirut id
      if (current_outlet === 29) {
        subaccounts = [{ id: 'RS_ED0212976C94424980A0F74AB6E701F3' }];
      } else if (current_outlet === 24) {
        // A bar called Paper
        subaccounts = [{ id: 'RS_88ABF9E7A03533DF1A9A8AB7EBCBF9AE' }];
      } else if (current_outlet === 21) {
        // Bleu Abuja
        subaccounts = [{ id: 'RS_4ADB4D50A1F574AB9B55FF8CEF2F29F1' }];
      } else if (current_outlet === 14) {
        // The Cabin
        subaccounts = [{ id: 'RS_1BA48F796E080012F51A6B46FDBC205F' }];
      }
    }

    console.log(subaccounts, JSON.stringify(subaccounts));

    const buttons =
      role === 'WAITER' && scope === 'OUTLET' ? (
        <>
          <Button
            style={{
              width: '50%',
              fontWeight: 'bold',
              margin: '2px',
            }}
            appearance="ghost"
            onClick={() => {
              this.props.history.push('/');
            }}
          >
            Paid Online
          </Button>

          <Button
            style={{
              width: '50%',
              fontWeight: 'bold',
              margin: '2px',
            }}
            appearance="ghost"
            onClick={() => {
              this.props.history.push('/');
            }}
          >
            Paid Offline
          </Button>
        </>
      ) : (
        <>
          <Button
            style={{
              width: '50%',
              fontWeight: 'bold',
              margin: '2px',
            }}
            appearance="ghost"
            onClick={() => {
              let APP_URL =
                process.env.APP_SCHEMA + '://' + process.env.APP_HOST;
              if (process.env.APP_PORT) {
                APP_URL += `:${process.env.APP_PORT}`;
              }
              FlutterwaveCheckout({
                // public_key: 'FLWPUBK_TEST-SANDBOXDEMOKEY-X',
                public_key: 'FLWPUBK-395b562451a96e07201e4d03e42e2bf6-X',
                tx_ref: 'hooli-tx-1920bbtyt',
                amount: _.sumBy(order_summary, 'cost'),
                currency: 'NGN',
                country: 'NG',
                payment_options: 'card, mobilemoneyghana, ussd',
                redirect_url: APP_URL + '/orders-summary',
                subaccounts: JSON.stringify(subaccounts),
                customer: {
                  email: this.props.user.email,
                  phone_number: this.props.user.phone_number,
                  name: this.props.user.first_name + this.props.user.last_name,
                },
              });
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
              type: 'orders-summary',
            })}
          />
        </div>
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
          style={{ height: '350px', background: 'black', overflowY: 'scroll' }}
        >
          {order_summary.map((item, index) => {
            return (
              <StyledMenuDiv key={index}>
                <div>
                  <StyledText size="16px" color="#ffffff" weight="bold">
                    {item.name}
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
                      Price: {item.price}
                    </StyledText>

                    <StyledText size="13px" color="#ffffff" weight="500">
                      Qty: {item.quantity}
                    </StyledText>
                    <StyledText size="13px" color="#ffffff" weight="500">
                      Cost: {item.cost}
                    </StyledText>
                  </div>
                </div>
              </StyledMenuDiv>
            );
          })}
        </div>
        <Button
          appearance="default"
          style={{
            position: 'fixed',
            bottom: '30px',
            left: '0',
            width: '100%',
            borderRadius: '0px',
            zIndex: '9999',
          }}
          onClick={() => {
            this.props.history.goBack();
          }}
        >
          Go Back
        </Button>
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
          Total Cost: {_.sumBy(order_summary, 'cost')}
        </Button>
      </>
    );
  }
}

OrdersSummary.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  userId: makeSelectUserId(),
  role: makeSelectRole(),
  scope: makeSelectScope(),
  items: makeSelectOrdersSummary(),
});

function mapDispatchToProps(dispatch) {
  return {
    getOrdersSummary: account_id => dispatch(getOrdersSummary(account_id)),
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
)(OrdersSummary);
