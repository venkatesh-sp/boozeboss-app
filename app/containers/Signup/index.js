import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Input, SelectPicker } from 'rsuite';

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
  constructor(props) {
    super(props);

    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      gender: '',
    };
  }

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };
  render() {
    return (
      <StyledSignupContainer>
        <StyledHeading>Signup</StyledHeading>
        <Input
          onChange={value => this.handleChange(value, 'first_name')}
          style={inputStyles}
          type="text"
          placeholder="First Name"
        />
        <Input
          onChange={value => this.handleChange(value, 'last_name')}
          style={inputStyles}
          type="text"
          placeholder="Last Name"
        />
        <Input
          onChange={value => this.handleChange(value, 'email')}
          style={inputStyles}
          type="text"
          placeholder="Email"
        />
        <Input
          onChange={value => this.handleChange(value, 'phone')}
          style={inputStyles}
          type="text"
          placeholder="Phone"
        />
        <SelectPicker
          onChange={value => this.handleChange(value, 'gender')}
          style={inputStyles}
          type="text"
          placeholder="Gender"
        />
        <Button style={ButtonStyles} appearance="primary">
          Sign Up
        </Button>
      </StyledSignupContainer>
    );
  }
}
