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
  Input,
  InputNumber,
  SelectPicker,
  Alert,
} from 'rsuite';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeSelectUser, makeSelectOutlet } from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  getOutletVenue,
  getOutletEvent,
  addCartItems,
  addInfoRequest,
} from './actions';

import { getUser } from '../App/actions';

import _ from 'lodash';

const StyledMenuDiv = styled.div`
  width: 100%;
  background: #1a1b1c;
  border-radius: 8px;
  padding: 12px;
  margin-top: 12px;
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
class AcceptOrders extends React.Component {
  state = {
    show: false,
    items: [],
    custumerName: '',
    menCount: 0, // CHANGED FROM menCount:'',
    menAgeGroup: '',
    womenCount: 0, // CHANGED FROM womenCount:'',
    womenAgeGroup: '',
    currentOutlet: null,
    product_id: null,
    quantity: null,
  };

  componentDidMount() {
    this.props.getUser();
    const { outlet } = this.props.user;
    if (outlet) {
      const { outletvenue_id, outletevent_id } = outlet;

      outletvenue_id
        ? this.setState({ currentOutlet: 'outletvenue' }, () =>
            this.props.getOutletVenue(outletvenue_id),
          )
        : this.setState({ currentOutlet: 'outletevent' }, () =>
            this.props.getOutletEvent(outletevent_id),
          );
    }
  }

  open = () => {
    this.setState({ show: true });
  };

  close = () => {
    this.setState({ show: false });
  };

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  render() {
    const { cartItems, user: customer } = this.props.history.location.state;

    const { outlet } = this.props;

    if (!outlet) {
      return <>Loading...</>;
    }

    let items = _.map(_.toPairs(cartItems), data => {
      const product = _.find(outlet.menu, ['id', parseInt(data[0])]);
      if (product) {
        product.quantity = parseInt(data[1]);
        if (
          !_.find(this.state.items, {
            [`${this.state.currentOutlet}menu_id`]: product.id,
          }) &&
          this.state.currentOutlet
        ) {
          this.setState({
            items: [
              ...this.state.items,
              {
                data: {},
                [`${this.state.currentOutlet}menu_id`]: product.id,
                quantity: product.quantity,
              },
            ],
          });
        }
      }

      return product;
    });
    items = _.remove(items, undefined);
    if (items.length === 0) {
      Alert.error("Outlet Doesn't Match", 2500);
      this.props.history.push({
        pathname: '/scanner',
      });
    }

    return (
      <>
        <div
          style={{
            backgroundColor: '#030303',
            height: '90vh',
            overflowY: 'scroll',
          }}
        >
          <Helmet>
            <title>Waiter Orders</title>
            <meta name="description" content="Description of Waiter Orders" />
          </Helmet>
          <Input
            placeholder="Costumer Name"
            style={{ width: '100%', marginTop: '10px' }}
            // ADD to store value in state
            onChange={value => this.handleChange(value, 'custumerName')}
            value={this.state.custumerName}
          />
          {items.map((item, index) => (
            <div style={{ backgroundColor: '#030303' }} key={index}>
              <StyledMenuDiv>
                <StyledFlexContainer>
                  <StyledText size="16px" color="#ffffff" weight="bold">
                    {item.name}
                  </StyledText>
                  <StyledText size="13px" color="#ffffff" weight="normal">
                    Rs:{item.price}
                  </StyledText>
                </StyledFlexContainer>
                <StyledFlexContainer>
                  <StyledText size="16px" color="#ffffff">
                    Quantity: {item.quantity}
                  </StyledText>
                  <Button
                    appearance="primary"
                    onClick={() => {
                      const { items, currentOutlet, custumerName } = this.state;
                      const is_exist = _.find(items, [
                        `${currentOutlet}menu_id`,
                        item.id,
                      ]);
                      if (custumerName !== '') {
                        //NEW
                        if (!is_exist) {
                          this.setState({
                            show: true,
                            product_id: item.id,
                            quantity: item.quantity,
                          });
                        } else {
                          const {
                            menCount,
                            menAgeGroup,
                            womenCount,
                            womenAgeGroup,
                          } = is_exist.data;
                          this.setState({
                            show: true,
                            product_id: item.id,
                            quantity: item.quantity,
                            menCount,
                            menAgeGroup,
                            womenCount,
                            womenAgeGroup,
                          });
                        }
                      } else {
                        Alert.warning('Add Costumer Name', 2500);
                      }
                    }}
                  >
                    Add Info
                  </Button>
                </StyledFlexContainer>
              </StyledMenuDiv>
            </div>
          ))}

          <Modal
            show={this.state.show}
            size="xs"
            onHide={() => {
              this.setState({ show: false });
            }}
          >
            <Modal.Header>
              <Modal.Title>More Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div style={{ marginTop: '5px', marginBottom: '5px' }}>
                <label>Men Count:</label>
                <InputNumber
                  defaultValue={0} // CHANGED FROM  defaultValue={1}
                  max={100}
                  min={0} // CHANGED FROM  min={1}
                  style={{ width: '25%' }}
                  // ADD to store value in state
                  onChange={value => this.handleChange(value, 'menCount')}
                  value={this.state.menCount}
                />
              </div>
              <div style={{ marginTop: '5px', marginBottom: '5px' }}>
                <label>Men Age Group:</label>
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
                  value={this.state.menAgeGroup}
                  // ADD to store value in state

                  onChange={value => this.handleChange(value, 'menAgeGroup')}
                />
              </div>
              <div style={{ marginTop: '5px', marginBottom: '5px' }}>
                <label>Women Count:</label>
                <InputNumber
                  defaultValue={0} // CHANGED FROM  defaultValue={1}
                  max={100}
                  min={0} // CHANGED FROM  min={1}
                  style={{ width: '25%' }}
                  value={this.state.womenCount}
                  // ADD to store value in state
                  onChange={value => this.handleChange(value, 'womenCount')}
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
                  value={this.state.womenAgeGroup}
                  // ADD to store value in state
                  onChange={value => this.handleChange(value, 'womenAgeGroup')}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
                onClick={() => {
                  const {
                    product_id,
                    menCount,
                    menAgeGroup,
                    womenCount,
                    womenAgeGroup,
                    items,
                    quantity,
                  } = this.state;

                  const is_exist = _.find(items, [
                    `${this.state.currentOutlet}menu_id`,
                    product_id,
                  ]);
                  if (is_exist) {
                    _.remove(items, {
                      [`${this.state.currentOutlet}menu_id`]: product_id,
                    });
                  }
                  this.setState({
                    items: [
                      ...this.state.items,
                      {
                        customer_name: this.state.custumerName,
                        ordered: true,
                        data: {
                          menCount,
                          menAgeGroup,
                          womenCount,
                          womenAgeGroup,
                        },
                        [`${this.state.currentOutlet}menu_id`]: product_id,
                        quantity,
                        payment_type: null,
                      },
                    ],
                    menCount: 0,
                    menAgeGroup: '',
                    womenCount: 0,
                    womenAgeGroup: '',
                    product_id: null,
                    quantity: null,
                    show: false,
                  });
                }}
                appearance="primary"
              >
                Update
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
              if (customer) {
                this.props.addCartItems({
                  items: this.state.items,
                  account_id: customer,
                  history: this.props.history,
                });
              } else {
                this.props.addInfoRequest({
                  data: this.state.items,
                  custumerName: this.state.custumerName,
                });
                this.props.history.push({
                  pathname: '/order-payment',
                  state: {
                    items: items,
                    user: this.props.user,
                  },
                });
              }
            }}
          >
            Confirm Order
          </Button>
        </div>
      </>
    );
  }
}

AcceptOrders.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  outlet: makeSelectOutlet(),
});

function mapDispatchToProps(dispatch) {
  return {
    getOutletVenue: venueId => dispatch(getOutletVenue(venueId)),
    getOutletEvent: eventId => dispatch(getOutletEvent(eventId)),
    addCartItems: items => dispatch(addCartItems(items)),
    addInfoRequest: info => dispatch(addInfoRequest(info)),
    getUser: () => dispatch(getUser()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'acceptorders', reducer });
const withSaga = injectSaga({ key: 'acceptorders', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AcceptOrders);
