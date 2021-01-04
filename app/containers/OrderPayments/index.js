import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import QRCode from 'react-qr-code';
import _ from 'lodash';
import { Button, ButtonGroup, Loader, Alert } from 'rsuite';

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

class OrderPayments extends React.Component {
  render() {
    const { state } = this.props.location;
    if (!state || !state.items) {
      return <Loader />;
    }

    const { items: products, user } = state;

    const { outlet } = user;
    let current_outlet;
    if (outlet && 'outetevent_id' in outlet) {
      current_outlet = outlet.outletevent_id;
    } else if (outlet && 'outletvenue_id' in outlet) {
      current_outlet = outlet.outletvenue_id;
    }

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
              this.props.history.goBack();
            }}
          >
            Go Back
          </Button>
        </>
      );
    }

    const order_summary = _.map(products, function(item) {
      const { quantity, price, name } = item;

      const price_ft = parseFloat(price.replace(',', ''));
      return {
        name: name,
        price: price,
        quantity,
        cost: price_ft * quantity,
      };
    });
    const venues = [14, 21, 24, 29];

    const buttons = (
      <>
        {current_outlet && venues.includes(current_outlet) && (
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
            Paid Online
          </Button>
        )}
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
          Paid Offline
        </Button>
      </>
    );

    let qrcodedata;
    if (current_outlet && venues.includes(current_outlet)) {
      // Beirut id
      if (current_outlet === 29) {
        qrcodedata = (
          <QRCode value="https://flutterwave.com/pay/s1lluk6gzes2" />
        );
      } else if (current_outlet === 24) {
        // A bar called Paper
        qrcodedata = (
          <QRCode value="https://flutterwave.com/pay/kwka4qqq4hrt" />
        );
      } else if (current_outlet === 21) {
        // Bleu Abuja
        qrcodedata = (
          <QRCode value="https://flutterwave.com/pay/dd08mnedqcfg" />
        );
      } else if (current_outlet === 14) {
        // The Cabin
        qrcodedata = (
          <QRCode value="https://flutterwave.com/pay/z1ede3hm5z4l" />
        );
      }
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
          {qrcodedata}
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
          style={{ height: '75%', background: 'black', overflowY: 'scroll' }}
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

export default OrderPayments;
