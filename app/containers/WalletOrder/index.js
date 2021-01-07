/**
 *
 * WalletOrder
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
import {
  makeSelectError,
  makeSelectSuccess,
  makeSelectOrderIdentifier,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Panel, Divider, Icon, Message, Button } from 'rsuite';
import styled from 'styled-components';

import { makeSelectUser } from '../App/selectors';
import { Link } from 'react-router-dom';
import { createOrder } from './actions';

const StyledPanel = styled(Panel)`
  margin: 1em;
`;

const Summary = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10 0 10 0;
  margin: 5px 0 5px 0;
  justify-content: space-between;
`;

const SummaryColumn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${props => props.justify || 'flex-start'};
  flex: ${props => props.flex || 1};
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductSummary = props => (
  <Summary>
    <SummaryColumn>{props.item.product.name}</SummaryColumn>
    <SummaryColumn justify="flex-end">
      <p>
        {Math.round(
          props.item.price * props.user.location.currency_conversion * 100,
        ) / 100}
      </p>
      <Icon
        icon="circle"
        style={{ color: '#c2b90a', margin: '0 1em 0 0.5em' }}
      />
    </SummaryColumn>
  </Summary>
);

const TotalRow = props => (
  <Summary>
    <SummaryColumn>
      <b>Total</b>
    </SummaryColumn>
    <SummaryColumn justify="flex-end">
      <b>{props.total}</b>
      <Icon
        icon="circle"
        style={{ color: '#c2b90a', margin: '0 1em 0 0.5em' }}
      />
    </SummaryColumn>
  </Summary>
);

/* eslint-disable react/prefer-stateless-function */
export class WalletOrder extends React.Component {
  state = {
    cart: null,
  };

  componentDidMount = () => {
    const { history } = this.props;
    const { state } = history.location;

    if (!state || !state.cart) {
      history.push({ pathname: '/' });
    } else {
      this.setState({ cart: state.cart });
    }
  };

  calculateTotal = () => {
    const { history, user } = this.props;
    const { state } = history.location;

    if (state && state.cart) {
      const total = state.cart.reduce((acc, curr) => acc + curr.price, 0);
      return Math.round(total * user.location.currency_conversion * 100) / 100;
    } else {
      return 0;
    }
  };

  handleReturn = () => {
    const { history } = this.props;
    history.push({
      pathname: `/event/${history.location.state.event_id}`,
    });
  };

  handleCreateOrder = () => {
    const { createOrder, history } = this.props;
    const { cart } = this.state;
    const transactions = cart.map(item => item.id);
    createOrder(transactions, history);
  };

  goToAddCredits = () => {
    const { history } = this.props;
    history.push({ pathname: 'add-credits' });
  };

  render() {
    const { user, error, success } = this.props;
    const { cart } = this.state;
    return (
      <div>
        <Helmet>
          <title>WalletOrder</title>
          <meta name="description" content="Description of WalletOrder" />
        </Helmet>
        {error && <Message type="error" description={error} />}
        {success && <Message type="success" description={success} />}
        {user && user.wallet && user.wallet.balance < this.calculateTotal() && (
          <Message
            type="warning"
            description={
              <p>
                You have insufficient balance.{' '}
                <a onClick={this.goToAddCredits}>
                  Add more credits to complete this order.
                </a>
              </p>
            }
          />
        )}
        <StyledPanel shaded>
          <Header>
            <a onClick={this.handleReturn}>Go to Menu</a>
            <b>Please confirm your order</b>
          </Header>
          <Divider />
          {cart && (
            <React.Fragment>
              {cart.map(item => {
                return <ProductSummary item={item} {...this.props} />;
              })}
            </React.Fragment>
          )}
          <Divider />
          {cart && <TotalRow total={this.calculateTotal()} {...this.props} />}
          <br />
          {!success &&
            user &&
            user.wallet &&
            user.wallet.balance < this.calculateTotal() && (
              <Button block color="green" disabled>
                Confirm Order
              </Button>
            )}
          {!success &&
            user &&
            user.wallet &&
            user.wallet.balance >= this.calculateTotal() && (
              <Button block color="green" onClick={this.handleCreateOrder}>
                Confirm Order
              </Button>
            )}
        </StyledPanel>
      </div>
    );
  }
}

WalletOrder.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  error: makeSelectError(),
  success: makeSelectSuccess(),
  order_identifier: makeSelectOrderIdentifier(),
});

function mapDispatchToProps(dispatch) {
  return {
    createOrder: (transactions, history) =>
      dispatch(createOrder(transactions, history)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'walletOrder', reducer });
const withSaga = injectSaga({ key: 'walletOrder', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WalletOrder);
