import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Row, Col, Button, Modal, Paragraph } from 'rsuite';
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
const CartItems = styled.div`
  overflow: scroll;
  height: 94%;
`;

const StyledMenuDiv = styled.div`
  width: 100%;
  background: #1a1b1c;
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
`;

const StyledCartItemDiv = styled.div`
  width: 100%;
  background-color: #ffffff;
  padding: 6px 12px;
  border-radius: 8px;
  margin-top: 16px;
`;
const StyledText = styled.p`
  font-size: ${props => props.size};
  font-weight: ${props => props.weight};
  color: ${props => props.color};
  text-align: center;
  margin: 0px;
`;
const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;
const ButtonStyles = {
  width: '100%',
  position: 'absolute',
  bottom: '0px',
  left: '0',
  backgroundColor: '#3498ff',
  borderRadius: '8px',
  padding: '5px 10px',
  text: 'center',
};

class WaiterOrders extends React.Component {
  state = {
    show: false,
  };
  componentDidMount() {
    // console.log(this.props.history.location.state,"FROM COMPONENT DID MOUNT")
    const { user } = this.props.history.location.state;
    this.props.getCartItems(user);
  }

  close() {
    this.setState({ show: false });
    console.log(this.state.show, 'SHOW VARIABLE AFTE CLOSING');
  }
  open() {
    this.setState({ show: true });
    console.log(this.state.show, 'SHOW VARIABLE AFTE Opening');
  }
  render() {
    // console.log(this.state.show,"SHOW VARIABLE")
    // console.log(this.props,"PROPS IN RENDER FUNCTION");
    const { items } = this.props;
    // console.log(items,"ITEMS ARRAY FROM RESPONSE IN RENDER")
    if (!items) {
      return <>Loading...</>;
    }

    return (
      <div style={{ backgroundColor: '#030303', height: '100vh' }}>
        <Helmet>
          <title>Waiter Orders</title>
          <meta name="description" content="Description of Waiter Orders" />
        </Helmet>
        <div style={{ backgroundColor: '#030303', paddingBottom: '30px' }}>
          <StyledMenuDiv>
            <StyledFlexContainer>
              <StyledText size="16px" color="#ffffff" weight="bold">
                NAME
              </StyledText>
              <StyledText size="13px" color="#ffffff" weight="normal" />
            </StyledFlexContainer>
            <StyledFlexContainer>
              <StyledText size="16px" color="#ffffff" weight="bold">
                TEST NAME
              </StyledText>
              <Button
                appearance="primary"
                onClick={() => {
                  this.setState({ show: true });
                  console.log(
                    this.state.show,
                    'THIS IS FROM ONCLICK MODAL BUTTON',
                  );
                }}
              >
                Modal
              </Button>
            </StyledFlexContainer>
          </StyledMenuDiv>
                {console.log(this.props,"PROPS")}
                {console.log(this.state,"STATE")}
          <Modal show={this.state.show} onHide={this.close}>
            <Modal.Header>
              <Modal.Title>Modal Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Paragraph />
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.close} appearance="primary">
                Ok
              </Button>
              <Button onClick={this.close} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    );
  }
}

WaiterOrders.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  items: makeSelectItems(),
  // show:show()
});

function mapDispatchToProps(dispatch) {
  return {
    getCartItems: userId => {
      // console.log(userId,"USER ID FROM DISPATCH")
      dispatch(getCartItems(userId));
    },
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
)(WaiterOrders);
