import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'rsuite';

const StyledBasketDiv = styled.div`
  height: 88vh;
  position: relative;
  padding: 0 20px;
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
const StyledImage = styled.img`
  width: 100%;
`;
const ButtonStyles = {
  width: '80%',
  position: 'absolute',
  bottom: '0',
  left: '70px',
};
const BasketIconStyles = { position: 'absolute', bottom: '5px' };
export default class Basket extends Component {
  render() {
    return (
      <StyledBasketDiv>
        <img
          alt="back"
          style={{ marginTop: '10px', marginBottom: '10px' }}
          src="https://raw.githubusercontent.com/viratsp/image-assets/master/back-arrow.svg"
        />
        <StyledImage src="https://raw.githubusercontent.com/soulpage/image-assets/master/restaurant.svg" />
        <StyledFlexContainer>
          <StyledText size="22px" weight="bold" color="#454651">
            Margherita Veg Pizza
          </StyledText>
          <StyledText size="22px" weight="bold" color="#454651">
            99Rs
          </StyledText>
        </StyledFlexContainer>
        <StyledText size="14px" color="#8C8C8C">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </StyledText>
        <hr />
        <StyledFlexContainer>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <StyledText size="12px" weight="normal" color="#414447">
              Select Quantity
            </StyledText>
            <Button
              style={{
                borderRight: 'none',
                borderRadius: '0',
                marginLeft: '20px',
              }}
              appearance="ghost"
            >
              +
            </Button>
            <Button
              style={{
                borderRight: 'none',
                borderLeft: 'none',
                borderRadius: '0',
              }}
              appearance="ghost"
            >
              67{' '}
            </Button>
            <Button
              style={{ borderLeft: 'none', borderRadius: '0' }}
              appearance="ghost"
            >
              +
            </Button>
          </div>
          <StyledText size="22px" weight="bold" color="#454651">
            199Rs
          </StyledText>
        </StyledFlexContainer>
        <StyledFlexContainer>
          <div>
            <img
              alt="basket"
              style={BasketIconStyles}
              src="https://raw.githubusercontent.com/soulpage/image-assets/master/basket-icon.svg"
            />
          </div>
          <div>
            <Button style={ButtonStyles} appearance="primary">
              Add to Basket
            </Button>
          </div>
        </StyledFlexContainer>
      </StyledBasketDiv>
    );
  }
}
