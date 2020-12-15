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
} from 'rsuite';
import { Image } from '@styled-icons/feather';
import _ from 'lodash';
import { makeSelectOutletInfo } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { getOutletEvent, getOutletVenue } from './actions';

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
    cartItems: {},
    currentoutlet: '',
    filterby: '',
  };

  componentDidMount = () => {
    const value = queryString.parse(this.props.location.search);
    console.log(value);

    if ('outlet_event' in value) {
      this.props.getOutletEvent(value.outlet_event);
      this.setState({ currentoutlet: 'outletevent' });
    } else if ('outlet_venue' in value) {
      this.props.getOutletVenue(value.outlet_venue);
      this.setState({ currentoutlet: 'outletvenue' });
    }
  };

  handleFilter = filterby => {
    this.setState({ filterby });
  };

  render() {
    const { outlet } = this.props;
    if (!outlet) {
      return <>Loading...</>;
    }

    const { name, description, menu, cover_image, address } = outlet;

    let filtered_menu;
    if (this.state.filterby !== '') {
      filtered_menu = _.filter(menu, {
        menu_category: this.state.filterby,
      });
    } else {
      filtered_menu = menu;
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
              style={{ maxWidth: '100%', height: 'auto' }}
              src={cover_image}
              // src="https://s3.ap-south-1.amazonaws.com/libero-notes/public/cover_images/outletvenues/lagos.jpg"
            />
          ) : (
            <NoImage />
          )}
          <div style={{ padding: '10px', backgroundColor: '#030303' }}>
            <StyledHeading>{name}</StyledHeading>

            {this.state.showMenu === false ? (
              <>
                <PrimaryPara>{description}</PrimaryPara>

                <hr />
                <PrimaryPara>{address}</PrimaryPara>

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
                <StyledTabsDiv>
                  <StyledTagGroup>
                    {_.without(
                      _.map(_.uniqBy(menu, 'menu_category'), 'menu_category'),
                      '',
                    ).map((item, index) => (
                      <Button
                        key={index}
                        style={
                          item === this.state.filterby
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
                        onClick={() => this.handleFilter(item)}
                      >
                        {item}
                      </Button>
                    ))}
                  </StyledTagGroup>
                </StyledTabsDiv>

                <div
                  style={{ backgroundColor: '#030303', paddingBottom: '30px' }}
                >
                  {filtered_menu.map((item, index) => {
                    const inputRef = React.createRef();

                    const handleMinus = () => {
                      inputRef.current.handleMinus();
                    };
                    const handlePlus = () => {
                      inputRef.current.handlePlus();
                    };
                    return (
                      <>
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
                            style={{ marginTop: '20px' }}
                          >
                            <Col
                              xs={12}
                              xsPush={12}
                              style={{
                                color: 'white',
                                textAlign: 'right',
                              }}
                            >
                              {item.id in this.state.cartItems ? (
                                <>
                                  <InputGroup style={{ width: '100%' }}>
                                    <InputGroup.Button onClick={handleMinus}>
                                      -
                                    </InputGroup.Button>
                                    <InputNumber
                                      className="custom-input-number"
                                      ref={inputRef}
                                      max={99}
                                      min={1}
                                      value={this.state.cartItems[item.id]}
                                      onChange={value => {
                                        this.setState({
                                          cartItems: {
                                            ...this.state.cartItems,
                                            [item.id]: value,
                                          },
                                        });
                                      }}
                                    />
                                    <InputGroup.Button onClick={handlePlus}>
                                      +
                                    </InputGroup.Button>
                                  </InputGroup>
                                </>
                              ) : (
                                <Button
                                  appearance="primary"
                                  onClick={() => {
                                    this.setState({
                                      cartItems: {
                                        ...this.state.cartItems,
                                        [item.id]: 1,
                                      },
                                    });
                                  }}
                                >
                                  + Add
                                </Button>
                              )}
                            </Col>
                            <Col
                              xs={12}
                              xsPull={12}
                              style={{ marginTop: '10px', color: 'white' }}
                            >
                              {item.price}
                            </Col>
                          </Row>

                          <StyledText
                            size="16px"
                            color="#ffffff"
                            weight="normal"
                          />
                          <StyledFlexContainer />
                        </StyledMenuDiv>
                      </>
                    );
                  })}
                </div>

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
                    const { currentoutlet, cartItems } = this.state;
                    const { outlet } = this.props;
                    if (!_.isEmpty(cartItems))
                      this.props.history.push('/cart', {
                        currentoutlet,
                        cartItems,
                        outlet,
                      });
                    else Alert.warning('Add Items to cart', 2500);
                  }}
                >
                  Place Order
                </Button>
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
});

function mapDispatchToProps(dispatch) {
  return {
    getOutletEvent: eventId => dispatch(getOutletEvent(eventId)),
    getOutletVenue: venueId => dispatch(getOutletVenue(venueId)),
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
