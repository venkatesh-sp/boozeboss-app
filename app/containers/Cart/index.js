import React, { Component } from 'react';
import styled from 'styled-components';
import { Button } from 'rsuite';

const StyledCartDiv = styled.div`
  width: 100%;
  padding: 0px 20px;
  height: 90vh;
  position: relative;
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
  bottom: '20px',
  left: '0',
  backgroundColor: '#3498ff',
  borderRadius: '8px',
  padding: '5px 10px',
};
const CartItem = () => (
  <StyledCartItemDiv>
    <StyledFlexContainer>
      <StyledText size="18px" weight="bold">
        Margherita Veg Pizza{' '}
      </StyledText>
      <img
        alt="veg"
        src="https://raw.githubusercontent.com/soulpage/image-assets/master/indian-veg-mark.svg"
      />
    </StyledFlexContainer>
    <StyledFlexContainer>
      <StyledText size="18px" weight="bold">
        ₹99
      </StyledText>
      <div>
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
    </StyledFlexContainer>
  </StyledCartItemDiv>
);

export default class Cart extends Component {
  render() {
    return (
      <StyledCartDiv>
        <CartItem />
        <CartItem />
        <CartItem />
        <div style={ButtonStyles}>
          <StyledText size="12px" color="#ffffff">
            2 items
          </StyledText>
          <StyledText size="12px" color="#ffffff">
            Place Order
          </StyledText>
        </div>
      </StyledCartDiv>
    );
  }
}
