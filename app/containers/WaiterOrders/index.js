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
  SelectPicker,
} from 'rsuite';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  makeSelectSuccess,
  makeSelectError,
  makeSelectItems,
  makeOutletVenues,
  makeSelectCurrentOutlet,
  makeSelectUser,
  makeSelectOultlet,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  getCartItems,
  getCartItemsSuccess,
  getCartItemsError,
  getAllItemsRequest,
  getOutletVenue,
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
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
  color: ${(props) => props.color};
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
    items: null,
    id: '',
    menCount: 0, //CHANGED FROM menCount:'',
    menAgeGroup: '',
    womenCount: 0, //CHANGED FROM womenCount:'',
    womenAgeGroup: '',
  };

  componentDidMount() {
    console.log(this.props, 'FROM COMPONENT DID MOUNT');
    const { cartItems } = this.props.history.location.state;
    console.log(cartItems, 'CART ITEMS FROM COMPONENTDIDMOUNT FUNCTION');
    const { outlet } = this.props.user;
    if (outlet) {
      const { outletvenue_id, outletevent_id } = outlet;

      outletvenue_id
        ? this.props.getOutletVenue(outletvenue_id)
        : this.props.getOutletVenue(outletevent_id);
    }
  }

  close() {
    this.setState({ show: false });
  }

  open() {
    this.setState({ show: true });
  }

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };


  render() {
    const { items } = this.props;
    const { currentoutlet } = this.props;
    console.log(currentoutlet, 'CURRENT OUTLETS IN RENDER FUNCTION');
    const { cartItems } = this.props.history.location.state;
    this.setState({ items: cartItems });
    if (!items) {
      return <>Loading...</>;
    }
    return (
      <>
        <div
          style={{
            backgroundColor: '#030303',
            height: '100vh',
            overflowY: 'scroll',
          }}
        >
          <Helmet>
            <title>Waiter Orders</title>
            <meta name="description" content="Description of Waiter Orders" />
          </Helmet>
          {items.items.map((item, index) => {
            const handleChange = (value, name) => {
              setItemInfo({ [name]: value });
            };

            const { venueproduct, eventproduct, quantity } = item;
            console.log(item);
            const product =
              venueproduct && venueproduct.length > 0
                ? venueproduct[0]
                : eventproduct && eventproduct.length > 0
                ? eventproduct[0]
                : null;

            return (
              <div style={{ backgroundColor: '#030303' }} key={index}>
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
                    <StyledText size="16px" color="#ffffff">
                      Quantity: {quantity}
                    </StyledText>
                    <Button
                      appearance="primary"
                      onClick={() => {
                        this.setState({ id: product.id, show: true });
                      }}
                    >
                      Add Info
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
              <Modal.Title>More Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{ marginTop: '5px', marginBottom: '5px' }}>
                <label>Men Count:</label>
                <InputNumber
                  defaultValue={0} //CHANGED FROM  defaultValue={1}
                  max={100}
                  min={0} //CHANGED FROM  min={1}
                  style={{ width: '25%' }}
                  //ADD to store value in state
                  onChange={(value) => this.handleChange(value, 'menCount')}
                />
              </div>
              <div style={{ marginTop: '5px', marginBottom: '5px' }}>
                <label>Men Age Group:</label>
                {/* <InputNumber defaultValue={20} max={100} min={20} step={10} /> */}
                <br />
                <SelectPicker
                  data={[
                    { label: '21 - 30', value: '21-30' },
                    { label: '31 - 40', value: '31-40' },
                    { label: '41 - 50', value: '41-50' },
                    { label: '51 - 60', value: '51-60' },
                    { label: '61 - 70', value: '61-70' },
                    { label: '71 - 80', value: '71-80' },
                  ]}
                  style={{ width: 224 }}
                  searchable={false}
                  //ADD to store value in state
                  onChange={(value) => this.handleChange(value, 'menAgeGroup')}
                />
              </div>
              <div style={{ marginTop: '5px', marginBottom: '5px' }}>
                <label>Women Count:</label>
                <InputNumber
                  defaultValue={0} //CHANGED FROM  defaultValue={1}
                  max={100}
                  min={0} //CHANGED FROM  min={1}
                  style={{ width: '25%' }}
                  //ADD to store value in state
                  onChange={(value) => this.handleChange(value, 'womenCount')}
                />
              </div>
              <div style={{ marginTop: '5px', marginBottom: '5px' }}>
                <label>Women Age Group:</label>
                <br />
                <SelectPicker
                  data={[
                    { label: '21 - 30', value: '21-30' },
                    { label: '31 - 40', value: '31-40' },
                    { label: '41 - 50', value: '41-50' },
                    { label: '51 - 60', value: '51-60' },
                    { label: '61 - 70', value: '61-70' },
                    { label: '71 - 80', value: '71-80' },
                  ]}
                  style={{ width: 224 }}
                  searchable={false}
                  //ADD to store value in state
                  onChange={(value) =>
                    this.handleChange(value, 'womenAgeGroup')
                  }
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  this.setState({ show: false });
                  //ADD On Submit to send to API
                  // const {login} = this.props;// Take props
                  const {
                    show,
                    id,
                    menCount,
                    menAgeGroup,
                    womenCount,
                    womenAgeGroup,
                  } = this.state;
                  // login({email, password});// SEND TO API
                }}
                appearance="primary"
              >
                Submit
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
          <Button
            appearance="primary"
            style={{
              position: 'fixed',
              bottom: '0px',
              width: '100%',
              left: '0px',
              backgroundColor: '#3498ff',
              color: '#fff',
              zIndex: '99999',
              border: '0px',
              borderRadius: '0px',
            }}
            onClick={() => {
              this.props.history.push('/scanner');
            }}
          >
            Confirm Order
          </Button>
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
  currentoutlet: makeSelectCurrentOutlet(),
  user: makeSelectUser(),
  outlet: makeSelectOultlet(),
});

function mapDispatchToProps(dispatch) {
  return {
    getCartItems: userId => dispatch(getCartItems(userId)),
    getOutletVenue: venueId => dispatch(getOutletVenue(venueId)),
    getUser: () => dispatch(getUser()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'waiterOrders', reducer });
const withSaga = injectSaga({ key: 'waiterOrders', saga });

export default compose(withReducer, withSaga, withConnect)(WaiterOrders);
