import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'rsuite';

const StyledRestuarantContainer = styled.div`
  padding: 16px;
  position: relative;
  height: 100%;
`;
const StyledHeading = styled.p`
  font-weight: bold;
  font-size: 20px;
  color: #363645;
  letter-spacing: -0.02em;
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
  background: #ffffff;
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
  display: flex;
  overflow: scroll;
  width: 100%;
  justify-content: space-between;
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
const MenuCard = () => (
  <StyledMenuDiv>
    <StyledFlexContainer>
      <StyledText size="16px" color="#454651" weight="bold">
        Margherita Veg Pizza
      </StyledText>
      <img
        alt="veg"
        src="https://raw.githubusercontent.com/soulpage/image-assets/master/indian-veg-mark.svg"
      />
    </StyledFlexContainer>

    <StyledText size="13px" color="#8C8C8C" weight="normal">
      Single cheese topping with Ground paprika, onion, capsicum, tomato.
    </StyledText>

    <StyledFlexContainer>
      <StyledText size="16px" color="#454651" weight="normal">
        159 rs
      </StyledText>
      <Button appearance="ghost">+ Add</Button>
    </StyledFlexContainer>
  </StyledMenuDiv>
);

export default class Restaurant extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showMenu: false,
    };
  }

  render() {
    return (
      <>
        <StyledRestuarantContainer>
          {this.state.showMenu === false ? (
            <>
              <StyledImage src="https://raw.githubusercontent.com/soulpage/image-assets/master/restaurant.svg" />
              <StyledHeading>The Roastery Coffee House</StyledHeading>
              <StyledReviewBox>
                <StyledRatingBox>4.3</StyledRatingBox>
                152reviews
              </StyledReviewBox>
              <StyledRestuarantDetails margin="16px">
                Café - Cafe, American, Continental, Italian
              </StyledRestuarantDetails>
              <StyledRestuarantDetails margin="5px">
                ₹99 Minimum • ₹49 Delivery fee • 87% On-Time
              </StyledRestuarantDetails>
              <hr />
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco
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
              <div style={{ position: 'relative' }}>
                <StyledImage
                  style={{ height: '200px' }}
                  src="https://raw.githubusercontent.com/soulpage/image-assets/master/restaurant.svg"
                />
                <StyledBlurContainer />
                <StyledHeading style={RestauratTitleStyle}>
                  The Roastery Coffee House
                </StyledHeading>
                <StyledText
                  onClick={() => this.setState({ showMenu: false })}
                  style={BackButtonStyles}
                >
                  Back
                </StyledText>
              </div>
              <StyledTabsDiv>
                <div>
                  <Button style={TabButtonStyles} appearance="ghost">
                    Pizzas
                  </Button>
                </div>
                <div>
                  <Button style={TabButtonStyles} appearance="ghost">
                    Beverages
                  </Button>
                </div>
                <div>
                  <Button style={TabButtonStyles} appearance="ghost">
                    Quick Bites
                  </Button>
                </div>
                <div>
                  <Button style={TabButtonStyles} appearance="ghost">
                    Desserts
                  </Button>
                </div>
                <div>
                  <Button style={TabButtonStyles} appearance="ghost">
                    Chinese
                  </Button>
                </div>
              </StyledTabsDiv>

              <MenuCard />
              <MenuCard />
              <MenuCard />
              <MenuCard />
            </>
          )}
        </StyledRestuarantContainer>
      </>
    );
  }
}
