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
    // console.log(this.state.show, 'SHOW VARIABLE AFTE CLOSING');
  }
  open() {
    this.setState({ show: true });
    // console.log(this.state.show, 'SHOW VARIABLE AFTE Opening');
  }
  render() {
    // console.log(this.state.show,"SHOW VARIABLE")
    // const { items } = this.props;
    // console.log(this.props, 'PROPS IN RENDER FUNCTION');
    // console.log(items, 'ITEMS IN RENDER FUNCTION');
    const { items } = this.props;

    if (!items) {
      return <>Loading...</>;
    }
    // console.log(items.items, 'ITEMS ARRAY FROM RESPONSE IN RENDER PREETHAM');
    return (
      <>
        <div style={{ backgroundColor: '#030303', height: '100vh' }}>
          <Helmet>
            <title>Waiter Orders</title>
            <meta name="description" content="Description of Waiter Orders" />
          </Helmet>
          {items.items.map((item, index) => (
            <div
              style={{ backgroundColor: '#030303', paddingBottom: '30px' }}
              key={index}
            >
              <StyledMenuDiv>
                <StyledFlexContainer>
                  <StyledText size="16px" color="#ffffff" weight="bold">
                    {item.venueproduct[0].name}
                  </StyledText>
                  <StyledText size="13px" color="#ffffff" weight="normal">
                    Rs:{item.venueproduct[0].price}
                  </StyledText>
                </StyledFlexContainer>
                <StyledFlexContainer>
                  <StyledText size="16px" color="#ffffff" weight="bold">
                    Portfolio: {item.venueproduct[0].portfolio}
                  </StyledText>
                  <Button
                    appearance="primary"
                    onClick={() => {
                      this.setState({ show: true });
                    }}
                  >
                    Book
                  </Button>
                </StyledFlexContainer>
              </StyledMenuDiv>
            </div>
          ))}
        </div>
        <Modal
          show={this.state.show}
          onHide={() => this.setState({ show: false })}
        >
          <Modal.Header>
            <Modal.Title>Modal Title</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <label
                htmlFor="mencount"
                style={{ width: '100px', display: 'inline-block' }}
              >
                Men-Count:
              </label>
              <input type="number" id="mencount" name="mencount" />
              <label htmlFor="menagegrp" style={{ marginLeft: '10px' }}>
                Men age group:
              </label>
              <select
                name="menagegrp"
                id="menagegrp"
                style={{ marginLeft: '33px' }}
              >
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="womencount"
                style={{ width: '100px', display: 'inline-block' }}
              >
                Women-Count:
              </label>
              <input type="number" id="womencount" name="womencount" />

              <label htmlFor="womenagegrp" style={{ marginLeft: '10px' }}>
                Women age group:
              </label>
              <select
                name="womenagegrp"
                id="womenagegrp"
                style={{ marginLeft: '10px' }}
              >
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              onClick={() => {
                this.setState({ show: false });
              }}
              appearance="primary"
            >
              Ok
            </Button>
            <Button
              onClick={() => {
                this.setState({ show: false });
              }}
              appearance="subtle"
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </>
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
