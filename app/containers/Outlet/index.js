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
} from 'rsuite';
import { Image } from '@styled-icons/feather';
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
const StyledImage = styled.img`
  height: 23%;
  width: 100%;
`;

const StyledReviewBox = styled.div`
  background: #d1f9e6;
  height: 21px;
  width: 105px;
  text-align: center;
  font-weight: 500;
  font-size: 11px;
  line-height: 135%;
  color: #058346;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledRatingBox = styled.div`
  background: #acf5d2;
  width: 30%;
  height: 100%;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const StyledRestuarantDetails = styled.p`
  font-weight: bold;
  font-size: 14px;
  line-height: 135%;
  letter-spacing: -0.02em;
  margin-top: ${props => props.margin};
  color: #504f58;
`;

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
`;

const StyledFlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 5px;
`;

const StyledTabsDiv = styled.div`
  width: 100%;
`;

const StyledTagGroup = styled.div`
  overflow: hidden;
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  margin-top: 10px;
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

const ButtonStyles = { marginTop: '20px' };
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

  render() {
    const { outlet } = this.props;
    if (!outlet) {
      return <>Loading...</>;
    }

    const { name, description, menu, cover_image, address } = outlet;
    return (
      <div style={{ backgroundColor: '#030303' }}>
        <Helmet>
          <title>OutletInfo</title>
          <meta name="description" content="Description of OutletInfo" />
        </Helmet>

        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        />

        <Container style={{ padding: '10px' }}>
          <div>
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
                    {menu.map((item, index) => (
                      <Button
                        style={TabButtonStyles}
                        appearance="default"
                        key={index}
                      >
                        {item.menu_category}
                      </Button>
                    ))}
                  </StyledTagGroup>
                </StyledTabsDiv>
                {menu.map((item, index) => {
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
                        <StyledText size="16px" color="#ffffff" weight="bold">
                          {item.name}
                        </StyledText>
                      </StyledFlexContainer>

                      <StyledText size="13px" color="#ffffff" weight="normal">
                        {item.description}
                      </StyledText>

                      <Row className="show-grid" style={{ marginTop: '20px' }}>
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

                      <StyledText size="16px" color="#ffffff" weight="normal" />
                      <StyledFlexContainer />
                    </StyledMenuDiv>
                  );
                })}
                <Button
                  appearance="ghost"
                  style={{
                    position: 'sticky',
                    bottom: '0',
                    left: '0',
                    width: '100%',
                    background: 'aliceblue',
                  }}
                  onClick={() => {
                    const { currentoutlet, cartItems } = this.state;
                    const { outlet } = this.props;
                    this.props.history.push('/cart', {
                      currentoutlet,
                      cartItems,
                      outlet,
                    });
                  }}
                >
                  View Cart
                </Button>
              </>
            )}
          </div>
        </Container>
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
