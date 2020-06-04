/**
 *
 * OrderPage
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
import { makeSelectSuccess, makeSelectError, makeSelectOrder } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styled from 'styled-components';
import { getOrder, cancelOrder } from './actions';
import { Message, Panel, Button, Divider, Icon } from 'rsuite';
import QRCode from "react-qr-code";

const StyledOrderContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const StyledPanel = styled(Panel)`
  margin: 1em;
`
const QRSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1em;  
`
const Summary = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10 0 10 0;
  margin 5px 0 5px 0;
  justify-content: space-between;
`

const SummaryColumn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${props => props.justify || 'flex-start'};
  flex: ${props => props.flex || 1};
`


const ProductSummary = props => (
  <Summary>
    <SummaryColumn>
      {props.item.product.name}
    </SummaryColumn>
    <SummaryColumn justify='flex-end'>
        <p>{props.item.price}</p>
        <Icon icon="circle" style={{color: '#c2b90a', margin: '0 1em 0 0.5em'}}/>
    </SummaryColumn>
  </Summary>
)

const TotalRow = props => (
  <Summary>
    <SummaryColumn>
       <b>Total</b>
    </SummaryColumn>
    <SummaryColumn justify='flex-end'>
      <b>{props.total}</b>
      <Icon icon="circle" style={{color: '#c2b90a', margin: '0 1em 0 0.5em'}}/>
    </SummaryColumn>
  </Summary>
)

/* eslint-disable react/prefer-stateless-function */
export class OrderPage extends React.Component {

  componentDidMount = () => {
    const {getOrder, history} = this.props;
    const path = window.location.pathname.split('/');
    const order_identifier = path[2];
    
    if (order_identifier) {
      getOrder(order_identifier);
    } else {
      history.push({pathname: '/'});
    }
  }

  calculateTotal = () => {
    const {order} = this.props;

    if (order && order.transactions) {
      const total = order.transactions.reduce((acc, curr) => acc + curr.event_product.price, 0);
      return total;
    } else {
      return 0;
    }
  }

  handleCancelOrder = () => {
    const {order, cancelOrder} = this.props;
    const cancel = confirm('Are you sure you want to cancel this order?');
    if (cancel) {
        cancelOrder(order.id);
    }
  }

  render() {
    const {error, success, order} = this.props;
    return (
      <div>
        <Helmet>
          <title>OrderPage</title>
          <meta name="description" content="Description of OrderPage" />
        </Helmet>
        <StyledOrderContainer>
          {order && order.status === 'CREATED' && <Message type="success" description="To redeem your order please scan it at the bar or with an agency staff."/>}
          {success && <Message type="success" description={success}/>}
          {order && (
            <StyledPanel shaded>
              {order && order.status === 'CREATED' && (
              <QRSection>
                  <QRCode 
                    value={JSON.stringify({
                        order_identifier: order.order_identifier, 
                        type: 'redeem-order'
                      })
                    }
                  />
                <Button 
                  block 
                  color="red"
                  style={{margin: '1em 0 0 0'}}
                  onClick={this.handleCancelOrder}
                >
                  Cancel
                </Button>
                <Divider />
              </QRSection>
              )}
              <b>Summary</b>
              {order && order.transactions && (
                <React.Fragment>
                  {order.transactions.map(tx => {
                    return <ProductSummary item={tx.event_product}/>
                  })}
                </React.Fragment>
              )}
              <Divider />
              {order && (
                <TotalRow total={this.calculateTotal()}/>
              )}
            </StyledPanel>
          )}
        </StyledOrderContainer>
      </div>
    );
  }
}

OrderPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  success: makeSelectSuccess(),
  error: makeSelectError(),
  order: makeSelectOrder(),
});

function mapDispatchToProps(dispatch) {
  return {
    getOrder: (order_identifier) => dispatch(getOrder(order_identifier)),
    cancelOrder: (order_id) => dispatch(cancelOrder(order_id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'orderPage', reducer });
const withSaga = injectSaga({ key: 'orderPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OrderPage);
