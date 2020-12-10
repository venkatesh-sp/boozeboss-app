import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Input } from 'rsuite';

const ButtonStyles = {
  position: 'absolute',
  bottom: '0',
  left: '0px',
  right: '0px',
  width: '100%',
};
const inputStyles = {
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  borderBottom: '0.7px solid #dbdbdb',
  width: '100%',
  marginTop: '20px',
  fontSize: '15px',
  backgroundColor: '#fafafa',
  color: '#a4a8b7',
  borderRadius: '0px',
};

const StyledSignupContainer = styled.div`
  padding: 20px;
  position: relative;
  height: 75vh;
`;
const StyledHeading = styled.p`
  font-weight: bold;
  font-size: 36px;
  color: #363645;
`;

export default class Signup extends Component {
  render() {
    return (
      <StyledSignupContainer>
        <StyledHeading>Signup</StyledHeading>
        <Input style={inputStyles} type="text" placeholder="First Name" />
        <Input style={inputStyles} type="text" placeholder="Last Name" />
        <Input style={inputStyles} type="text" placeholder="Email" />
        <Input style={inputStyles} type="text" placeholder="Phone" />
        <Input style={inputStyles} type="text" placeholder="Gender" />
        <Button style={ButtonStyles} appearance="primary">
          Sign Up
        </Button>
      </StyledSignupContainer>
    );
  }
}
