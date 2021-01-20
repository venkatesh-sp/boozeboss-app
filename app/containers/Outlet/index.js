/**
 *
 * OutletInfo
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import QrReader from 'react-qr-reader';
import styled from 'styled-components';
import {
  Container,
  Message,
  Button,
  InputGroup,
  InputNumber,
  Row,
  Col,
  Alert,
  Dropdown,
} from 'rsuite';
import { Image } from '@styled-icons/feather';
import _ from 'lodash';
import {
  makeSelectOutletInfo,
  makeSelectCartItems,
  makeSelectCurrentOutlet,
} from './selectors';
import { makeSelectScope } from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import {
  getOutletEvent,
  getOutletVenue,
  addCartItem,
  removeCartItem,
  clearCartItem,
} from './actions';

const StyledRestuarantContainer = styled.div`
  padding: 16px;
  position: relative;
  height: 100%;
`;
const StyledHeading = styled.p`
  font-weight: bold;
  font-size: 20px;
  color: white;
  letter-spacing: -0.02em;
`;

const PrimaryPara = styled.p`
  color: white;
`;

const StyledMenuDiv = styled.div`
  background: #1a1b1c;
  border-radius: 8px;
  overflow-y: scroll;
  padding: 15px;
  margin-top: 20px;
`;

const StyledText = styled.p`
  font-size: ${props => props.size};
  font-weight: ${props => props.weight};
  color: ${props => props.color};
`;

const StyledFlexContainer = styled.div``;

const StyledTabsDiv = styled.div`
  width: 100%;
`;

const StyledTagGroup = styled.div`
  overflow: hidden;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  margin-top: 10px;

  ::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
`;

const StyledBlurContainer = styled.div`
  background: rgba(0, 0, 0, 0.33);
  backdrop-filter: blur(3px);
  height: 200px;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const ButtonStyles = {
  position: 'fixed',
  bottom: '0',
  left: '0',
  width: '100%',
  borderRadius: '0px',
  zIndex: '9',
};
const TabButtonStyles = {
  borderRadius: '42px',
  marginRight: '10px',
  fontWeight: 'bold',
};
const RestauratTitleStyle = {
  position: 'absolute',
  color: 'white',
  bottom: '20px',
  left: '30px',
  fontSize: '20px',
};
const BackButtonStyles = {
  position: 'absolute',
  color: 'white',
  top: '20px',
  left: '30px',
  zIndex: '9999',
};

const NoImage = styled(Image)`
  width: 200px;
`;

/* eslint-disable react/prefer-stateless-function */
export class OutletInfo extends React.Component {
  state = {
    showMenu: false,
    menu_category: null,
    product_category: null,
    outlet_category: null,
    currentLevel: 'level1',
  };

  componentDidMount = () => {
    this.props.clearCartItem();
    const value = queryString.parse(this.props.location.search);
    if ('outlet_event' in value) {
      this.props.getOutletEvent(value.outlet_event);
    } else if ('outlet_venue' in value) {
      this.props.getOutletVenue(value.outlet_venue);
    }
  };

  handleFilter = props => {
    this.setState(props);
  };

  render() {
    const { outlet, cartItems, scope } = this.props;

    if (!outlet) {
      return <>Loading...</>;
    }

    const {
      name,
      description,
      menu,
      cover_image,
      location,
      phone_number,
    } = outlet;

    const {
      showMenu,
      menu_category,
      product_category,
      outlet_category,
      currentLevel,
    } = this.state;

    //Outlet Menu Category
    const outlet_menu = _.without(
      _.map(_.uniqBy(menu, 'outlet_category'), 'outlet_category'),
      '',
      null,
    );

    if (!outlet_menu.length > 0 && currentLevel === 'level1') {
      this.setState({ currentLevel: 'level2' });
    }

    //Product Menu Category
    let product_menu = _.without(
      _.map(_.uniqBy(menu, 'product_category'), 'product_category'),
      '',
      null,
    );

    if (outlet_menu) {
      const items = _.filter(menu, { outlet_category });

      product_menu = _.without(
        _.map(_.uniqBy(items, 'product_category'), 'product_category'),
        '',
        null,
      );
    }

    let filtered_menu = menu;

    //Filtering Categories
    if (product_category && outlet_category) {
      filtered_menu = _.filter(menu, { product_category, outlet_category });
    } else if (product_category && !outlet_category) {
      filtered_menu = _.filter(menu, { product_category });
    } else if (!product_category && outlet_category) {
      filtered_menu = _.filter(menu, { outlet_category });
    }

    let items_list = filtered_menu;

    if (menu_category) {
      items_list = _.filter(filtered_menu, { product_category, menu_category });
    }

    return (
      <div style={{ backgroundColor: '#030303', height: '100vh' }}>
        <Helmet>
          <title>OutletInfo</title>
          <meta name="description" content="Description of OutletInfo" />
        </Helmet>

        <div style={{ height: '200px', backgroundColor: '#030303' }}>
          {cover_image ? (
            <img
              alt={name}
              style={{ maxWidth: '100%', minHeight: '250px', width: '100%' }}
              src={cover_image}
            />
          ) : (
            <NoImage style={{ width: '75%' }} />
          )}
          <div style={{ padding: '10px', backgroundColor: '#030303' }}>
            <StyledHeading>{name}</StyledHeading>

            {!showMenu && _.size(cartItems || {}) == 0 ? (
              <>
                <PrimaryPara>{location.name}</PrimaryPara>

                <hr />
                <p
                  style={{
                    marginBottom: '30px',
                    color: '#fff',
                    fontWeight: '500',
                  }}
                >
                  {description}
                </p>

                <Button
                  onClick={() => this.setState({ showMenu: true })}
                  style={ButtonStyles}
                  appearance="primary"
                  block
                >
                  View Menu
                </Button>
              </>
            ) : (
              <>
                <div style={{ width: '100%', display: 'block' }}>
                  {
                    {
                      level1: (
                        <p>
                          {outlet_menu.map((item, index) => (
                            <Button
                              key={index}
                              style={
                                item === outlet_category
                                  ? {
                                      backgroundColor: '#3498ff',
                                      color: '#fff',
                                      width: '100%',
                                      fontWeight: 'bold',
                                      margin: '2px',
                                      marginTop: '10px',
                                    }
                                  : {
                                      width: '100%',
                                      fontWeight: 'bold',
                                      margin: '2px',
                                      marginTop: '10px',
                                    }
                              }
                              appearance="default"
                              onClick={() =>
                                this.handleFilter({
                                  outlet_category: item,
                                  currentLevel: 'level2',
                                })
                              }
                            >
                              {item}
                            </Button>
                          ))}
                        </p>
                      ),
                      level2: (
                        <p>
                          {product_menu.map((item, index) => {
                            return (
                              <Button
                                key={index}
                                style={
                                  item === product_category
                                    ? {
                                        backgroundColor: '#3498ff',
                                        color: '#fff',
                                        width: '100%',
                                        fontWeight: 'bold',
                                        margin: '2px',
                                        marginTop: '10px',
                                      }
                                    : {
                                        width: '100%',
                                        fontWeight: 'bold',
                                        margin: '2px',
                                        marginTop: '10px',
                                      }
                                }
                                appearance="default"
                                onClick={() =>
                                  this.handleFilter({
                                    product_category: item,
                                    currentLevel: 'level3',
                                  })
                                }
                              >
                                {item}
                              </Button>
                            );
                          })}
                          <Button
                            appearance="primary"
                            style={{
                              width: '100%',
                              marginTop: '10px',
                            }}
                            onClick={() =>
                              this.handleFilter({
                                menu_category: null,
                                product_category: null,
                                outlet_category: null,
                                currentLevel: 'level1',
                              })
                            }
                          >
                            Back
                          </Button>
                        </p>
                      ),
                      level3: (
                        <div>
                          <StyledTabsDiv>
                            <StyledTagGroup>
                              {_.without(
                                _.map(
                                  _.uniqBy(filtered_menu, 'menu_category'),
                                  'menu_category',
                                ),
                                '',
                                null,
                              ).map((item, index) => (
                                <>
                                  <Button
                                    key={index}
                                    style={
                                      item === menu_category
                                        ? {
                                            backgroundColor: '#3498ff',
                                            color: '#fff',
                                            borderRadius: '42px',
                                            marginRight: '10px',
                                            fontWeight: 'bold',
                                          }
                                        : TabButtonStyles
                                    }
                                    appearance="default"
                                    onClick={() =>
                                      item !== menu_category
                                        ? this.handleFilter({
                                            menu_category: item,
                                          })
                                        : this.handleFilter({
                                            menu_category: null,
                                          })
                                    }
                                  >
                                    {item}
                                  </Button>
                                </>
                              ))}
                            </StyledTagGroup>
                          </StyledTabsDiv>
                          <Button
                            appearance="primary"
                            style={{
                              width: '100%',
                              borderRadius: '0px',
                              zIndex: '0',
                            }}
                            onClick={() =>
                              this.handleFilter({
                                menu_category: null,
                                product_category: null,
                                currentLevel: 'level2',
                              })
                            }
                          >
                            Back
                          </Button>
                          <div
                            style={{
                              backgroundColor: '#030303',
                              paddingBottom: '30px',
                            }}
                          >
                            {items_list.map((item, index) => {
                              const inputRef = React.createRef();

                              const handleMinus = () => {
                                inputRef.current.handleMinus();
                              };
                              const handlePlus = () => {
                                inputRef.current.handlePlus();
                              };
                              return (
                                <StyledMenuDiv key={index}>
                                  <StyledFlexContainer>
                                    <StyledText
                                      size="16px"
                                      color="#ffffff"
                                      weight="bold"
                                    >
                                      {item.name}
                                    </StyledText>

                                    <StyledText
                                      size="13px"
                                      color="#ffffff"
                                      weight="normal"
                                    >
                                      {item.description}
                                    </StyledText>
                                  </StyledFlexContainer>

                                  <Row
                                    className="show-grid"
                                    // style={{ marginTop: '20px' }}
                                  >
                                    <Col
                                      xs={12}
                                      xsPush={12}
                                      style={{
                                        color: 'white',
                                        textAlign: 'right',
                                      }}
                                    >
                                      {cartItems && item.id in cartItems ? (
                                        <>
                                          <InputGroup style={{ width: '100%' }}>
                                            <InputGroup.Button
                                              onClick={handleMinus}
                                            >
                                              -
                                            </InputGroup.Button>
                                            <InputNumber
                                              className="custom-input-number"
                                              ref={inputRef}
                                              value={cartItems[item.id]}
                                              onChange={value => {
                                                if (parseInt(value) > 0) {
                                                  //Dispatch Action to Add Cart Items in Reducer State cartitems
                                                  this.props.addCartItem({
                                                    product: item.id,
                                                    quantity: value,
                                                  });
                                                } else {
                                                  //Dispatch Action to Remove Cart Items in Reducer State cartitems
                                                  this.props.removeCartItem({
                                                    product: item.id,
                                                  });
                                                }
                                              }}
                                            />
                                            <InputGroup.Button
                                              onClick={handlePlus}
                                            >
                                              +
                                            </InputGroup.Button>
                                          </InputGroup>
                                        </>
                                      ) : (
                                        <Button
                                          appearance="primary"
                                          onClick={() => {
                                            //Dispatch Action to Add Cart Items in Reducer State cartitems
                                            this.props.addCartItem({
                                              product: item.id,
                                              quantity: 1,
                                            });
                                          }}
                                          // style={{
                                          //   display: 'none',
                                          // }}
                                        >
                                          + Add
                                        </Button>
                                      )}
                                    </Col>
                                    <Col
                                      xs={12}
                                      xsPull={12}
                                      style={{
                                        marginTop: '10px',
                                        color: 'white',
                                      }}
                                    >
                                      <img
                                        src={require('images/ngn_currency.svg')}
                                        style={{
                                          width: '12px',
                                          filter: 'invert(1)',
                                          marginTop: '-3px',
                                        }}
                                      />
                                      <span
                                        style={{
                                          fontSize: '14px',
                                          fontWeight: '600',
                                          marginLeft: '3px',
                                          marginTop: '3px',
                                        }}
                                      >
                                        {' '}
                                        {item.price}
                                      </span>
                                    </Col>
                                  </Row>

                                  <Button
                                    appearance="primary"
                                    style={{
                                      position: 'fixed',
                                      bottom: '0',
                                      left: '0',
                                      width: '100%',
                                      borderRadius: '0px',
                                      zIndex: '0',
                                      // display: 'none',
                                    }}
                                    onClick={() => {
                                      //Redirect to cart page if cart is not empty
                                      const {
                                        outlet,
                                        cartItems,
                                        currentoutlet,
                                      } = this.props;
                                      if (!_.isEmpty(cartItems))
                                        this.props.history.push('/cart');
                                      else
                                        Alert.warning(
                                          'Add Items to cart',
                                          2500,
                                        );
                                    }}
                                  >
                                    {_.size(cartItems || {}) > 0
                                      ? `Place Order-${_.size(
                                          cartItems || {},
                                        )} Item${
                                          _.size(cartItems || {}) > 1 ? 's' : ''
                                        }`
                                      : 'Add Items'}
                                  </Button>
                                </StyledMenuDiv>
                              );
                            })}
                          </div>
                        </div>
                      ),
                    }[currentLevel]
                  }
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

OutletInfo.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  outlet: makeSelectOutletInfo(),
  cartItems: makeSelectCartItems(),
  currentoutlet: makeSelectCurrentOutlet(),
  scope: makeSelectScope(),
});

function mapDispatchToProps(dispatch) {
  return {
    getOutletEvent: eventId => dispatch(getOutletEvent(eventId)),
    getOutletVenue: venueId => dispatch(getOutletVenue(venueId)),

    addCartItem: item => dispatch(addCartItem(item)),
    removeCartItem: item => dispatch(removeCartItem(item)),
    clearCartItem: () => dispatch(clearCartItem()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'outlet', reducer });
const withSaga = injectSaga({ key: 'outlet', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(OutletInfo);
