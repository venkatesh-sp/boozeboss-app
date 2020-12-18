import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  makeSelectSuccess,
  makeSelectError,
  makeSelectItems,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  getCartItems,
  getCartItemsSuccess,
  getCartItemsError,
} from './actions';

class WalletOrders extends React.Component {
  componentDidMount() {
    const { user } = this.props.history.location.state;
    this.props.getCartItems(user);
  }
  render() {
    console.log(this.props);
    return (
      <>
        <p>Hi</p>
      </>
    );
  }
}

WalletOrders.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  items: makeSelectItems(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCartItems: userId => dispatch(getCartItems(userId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'waiterOrders', reducer });
const withSaga = injectSaga({ key: 'waiterOrders', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WalletOrders);
