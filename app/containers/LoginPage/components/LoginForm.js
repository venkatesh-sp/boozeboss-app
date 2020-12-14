import React, { Component } from 'react';
import { Button, Input, Message, InputGroup, Icon, Dropdown } from 'rsuite';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import FacebookButton from 'components/FacebookButton';

import PropTypes from 'prop-types';

const StyledFacebookContainer = styled.div`
  margin: 1em 0 0 0;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  margin: 2em 0 0 0;
`;

const StyledInput = styled(Input)`
  max-width: 300px;
  margin: 0.75em;
`;

const StyledButton = styled(Button)`
  width: 300px;
`;

const StyledLink = styled(Link)`
  color: gray;
  margin: 0.75em;

  &:hover {
    color: gray;
    opacity: 0.75;
  }
`;

const StyledMessage = styled(Message)`
  width: 300px;
  margin: 0.75em;
`;

const styles = {
  width: '300px',
  margin: '0.75em',
};

export default class LoginForm extends Component {
  state = {
    verified: false,
    email: null,
    password: null,
  };

  componentDidMount = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const verified = urlParams.get('verified');
    this.setState({
      verified,
    });
  };

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { login } = this.props;
    const { email, password } = this.state;

    if (!email || !password) return alert('Missing fields');

    login({ email, password });
  };

  render() {
    const { error, success } = this.props;
    const { email, password } = this.state;
    return (
      <StyledContainer>
        {error && <StyledMessage type="error" description={error} />}
        <InputGroup style={styles}>
          <InputGroup.Addon>
            <Icon icon="envelope" />
          </InputGroup.Addon>
          <Input
            placeholder="Email"
            value={email}
            onChange={value => this.handleChange(value, 'email')}
          />
        </InputGroup>
        <InputGroup style={styles}>
          <InputGroup.Addon>
            <Icon icon="lock" />
          </InputGroup.Addon>
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={value => this.handleChange(value, 'password')}
          />
        </InputGroup>
        <StyledButton color="green" onClick={this.handleSubmit}>
          Login
        </StyledButton>
        <StyledFacebookContainer>
          <FacebookButton {...this.props} />
        </StyledFacebookContainer>
      </StyledContainer>
    );
  }
}

LoginForm.propTypes = {};
