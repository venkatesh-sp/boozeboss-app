import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Input } from 'rsuite';

const StyledOtpDiv = styled.div`
  padding: 30px;
`;
const StyledText = styled.p`
  font-size: ${props => props.size};
  font-weight: ${props => props.weight};
  color: ${props => props.color};
  text-align: center;
`;
const StyledFlexDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 60px;
`;
const InputStyles = {
  height: '52px',
  width: '52px',
  borderRadius: '7px',
  backgroundColor: '#EAEAEB',
};
const ButtonStyles = {
  marginTop: '40px',
  width: '100%',
};
export default class Otp extends Component {
  render() {
    return (
      <StyledOtpDiv>
        <StyledText size="36px" weight="bold" color="#363645">
          Enter OTP
        </StyledText>
        <StyledText size="15px" color="#A4A8B7">
          Plaese Enter OTP, that we just sent to 96949092XX
        </StyledText>
        <StyledFlexDiv>
          <Input style={InputStyles} />
          <Input style={InputStyles} />
          <Input style={InputStyles} />
          <Input style={InputStyles} />
        </StyledFlexDiv>
        <Button style={ButtonStyles} appearance="primary">
          Submit OTP
        </Button>
      </StyledOtpDiv>
    );
  }
}
