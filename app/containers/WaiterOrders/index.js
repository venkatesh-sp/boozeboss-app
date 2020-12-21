import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Button,
  Modal,
  Paragraph,
  InputGroup,
  InputNumber,
} from 'rsuite';
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
    id: '',
    menCount: '',
    menAgeGroup: '',
    womenCount: '',
    womenAgeGroup: '',
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
  // handleChange = name => event => {
  //   this.setState({ [name]: event.target.value });
  // };

  render() {
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
          {items.items.map((item, index) => {
            // const [showModal, setShowModal] = React.useState(false);

            // const [itemInfo, setItemInfo] = React.useState({});

            const handleChange = (value, name) => {
              setItemInfo({ [name]: value });
            };

            const { venueproduct, eventproduct } = item;
            console.log(item);
            const product =
              venueproduct && venueproduct.length > 0
                ? venueproduct[0]
                : eventproduct && eventproduct.length > 0
                ? eventproduct[0]
                : null;

            return (
              <div
                style={{ backgroundColor: '#030303', paddingBottom: '30px' }}
                key={index}
              >
                <StyledMenuDiv>
                  <StyledFlexContainer>
                    <StyledText size="16px" color="#ffffff" weight="bold">
                      {product.name}
                    </StyledText>
                    <StyledText size="13px" color="#ffffff" weight="normal">
                      Rs:{product.price}
                    </StyledText>
                  </StyledFlexContainer>
                  <StyledFlexContainer>
                    <StyledText size="16px" color="#ffffff" weight="bold">
                      Portfolio: {product.portfolio}
                    </StyledText>
                    <Button
                      appearance="primary"
                      onClick={() => {
                        this.setState({ id: product.id, show: true });
                      }}
                    >
                      Book
                    </Button>
                  </StyledFlexContainer>
                </StyledMenuDiv>
              </div>
            );
          })}
          <Modal
            show={this.state.show}
            size="xs"
            onHide={() => {
              this.setState({ id: '', show: false });
            }}
          >
            <Modal.Header>
              <Modal.Title>Modal Title</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <label>Men Count:</label>
                <InputNumber defaultValue={1} max={100} min={1} />
                <label>Men Age Group:</label>
                <InputNumber defaultValue={20} max={100} min={20} step={10} />
                <label>Women Count:</label>
                <InputNumber defaultValue={1} max={100} min={1} />
                <label>Women Age Group:</label>
                <InputNumber defaultValue={20} max={100} min={20} step={10} />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  this.setState({ show: false });
                }}
                appearance="primary"
              >
                Order
              </Button>
              <Button
                onClick={() => {
                  this.setState({ id: '' });
                  this.setState({ menCount: '' });
                  this.setState({ womenCount: '' });
                  this.setState({ menAgeGroup: '' });
                  this.setState({ womenAgeGroup: '' });
                  this.setState({ show: false });
                }}
                appearance="subtle"
              >
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </>
    );
  }
}

WaiterOrders.propTypes = {
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
)(WaiterOrders);
