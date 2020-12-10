import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, ButtonGroup, Input } from 'rsuite';
import Signup from '../Signup';

const StyledLoginDiv = styled.div`
  width: 100%;
  padding: 30px 20px;
  height: 90vh;
  text-align: center;
`;

const StyledText = styled.p`
  font-size: ${props => props.size};
  font-weight: ${props => props.weight};
  color: ${props => props.color};
  margin-top: 20px;
`;

const InputStyles = {
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  borderRadius: '0px',
  marginTop: '40px',
  backgroundColor: '#fafafa',
  fontSize: '15px',
};

const ButtonStyles = {
  width: '100%',
  marginTop: '40px',
};

const CustomButtonGroup = ({ active, toggle }) => (
  <ButtonGroup justified>
    <Button
      onClick={() => toggle('signin')}
      appearance={active === 'signin' ? 'primary' : 'ghost'}
    >
      Sign In
    </Button>
    <Button
      onClick={() => toggle('signup')}
      appearance={active === 'signup' ? 'primary' : 'ghost'}
    >
      Sign Up
    </Button>
  </ButtonGroup>
);

const SignIn = () => (
  <>
    <StyledText size="17px" color="#363645" weight="bold">
      Already registered with us
    </StyledText>
    <StyledText>
      Please provide your registred email/phone, we will sent an OTP on it.
    </StyledText>
    <Input style={InputStyles} placeholder="Email/Phone" />
    <Button style={ButtonStyles} appearance="primary">
      Send OTP
    </Button>
  </>
);

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      active: 'signin',
    };
  }

  toggle = value => {
    this.setState({ active: value });
  };

  render() {
    let AccountsComponent;
    if (this.state.active === 'signin') {
      AccountsComponent = <SignIn />;
    } else {
      AccountsComponent = <Signup />;
    }
    return (
      <StyledLoginDiv>
        <CustomButtonGroup toggle={this.toggle} active={this.state.active} />
        {AccountsComponent}
      </StyledLoginDiv>
    );
  }
}
