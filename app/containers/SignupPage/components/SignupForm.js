import React, { Component } from 'react';
import { Button, Input, Message,  InputGroup, Icon, Dropdown } from 'rsuite';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import FacebookButton from 'components/FacebookButton';

import PropTypes from 'prop-types';
import PhoneVerification from './PhoneVerification';

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
`

const styles = {
  width: '300px',
  margin: '0.75em'
}

export default class SignupForm extends Component {

    state = {
        disable_email: null,
        email: null,   
        first_name: null,
        last_name: null,
        phone_number: null,
        password: null,
        confirm: null,
        code: null,
      }

      componentDidMount = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const code  = urlParams.get('code');
        const email  = urlParams.get('email');
        const first_name  = urlParams.get('first_name');
        const last_name  = urlParams.get('last_name');
        this.setState({
            code, email, first_name, last_name,
            disable_email: !!email,
        });
      }
  
      handleChange = (value, name) => {
        this.setState({[name]: value})
      }
  
      handleSubmit = () => {
        const {signup} = this.props;
        const {email, first_name, last_name, phone_number, password, confirm, code} = this.state;

        if (!email || !first_name || !last_name || !phone_number || !password || !confirm || !code) return alert('Missing fields');

        if (password !== confirm) return alert("Passwords aren't matching");

        signup({email, first_name, phone_number, last_name, password, code});
      }
  
      render() {
          const {error, success, step} = this.props;
          const {disable_email, email, first_name, last_name, phone_number, password, confirm, code} = this.state;
          return (
            <React.Fragment>
              {step === 1 && (
                <StyledContainer>
                  {error && <StyledMessage type="error" description={error} />}
                  {success && <StyledMessage type="success" description={success} />}
                  <InputGroup style={styles}>
                    <InputGroup.Addon>
                      <Icon icon="envelope" />
                    </InputGroup.Addon>
                    <Input 
                      placeholder="Email"
                      disabled={disable_email}
                      value={email}
                      onChange={(value) => this.handleChange(value, 'email')}
                    />
                  </InputGroup>
                  <InputGroup style={styles}>
                    <InputGroup.Addon>
                      <Icon icon="avatar" />
                    </InputGroup.Addon>
                    <Input 
                      placeholder="First Name"
                      value={first_name}
                      onChange={(value) => this.handleChange(value, 'first_name')}
                    />
                  </InputGroup>
                  <InputGroup style={styles}>
                    <InputGroup.Addon>
                      <Icon icon="avatar" />
                    </InputGroup.Addon>
                    <Input 
                      placeholder="Last Name"
                      value={last_name}
                      onChange={(value) => this.handleChange(value, 'last_name')}
                    />
                  </InputGroup>
                  <PhoneInput
                      style={{...styles, zIndex: 99}}
                      country={'us'}
                      disableSearchIcon
                      inputProps={{
                        name: 'phone',
                        required: true,
                        autoFocus: true
                      }}
                      onChange={(value) => this.handleChange(value, 'phone_number')}
                    />
                  <InputGroup style={styles}>
                    <InputGroup.Addon>
                      <Icon icon="key" />
                    </InputGroup.Addon>
                    <Input 
                      placeholder="Invite Code"
                      value={code}
                      onChange={(value) => this.handleChange(value, 'code')}
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
                      onChange={(value) => this.handleChange(value, 'password')}
                    />
                  </InputGroup>
                  <InputGroup style={styles}>
                    <InputGroup.Addon>
                      <Icon icon="lock" />
                    </InputGroup.Addon>
                    <Input 
                      placeholder="Confirm Password"
                      type="password"
                      value={confirm}
                      onChange={(value) => this.handleChange(value, 'confirm')}
                    />
                  </InputGroup>
                  <StyledButton 
                    disabled={success}
                    color="green"
                    onClick={this.handleSubmit}
                  >
                    Signup
                  </StyledButton>
                  <FacebookButton {...this.props}/>
                </StyledContainer>
              )}
              {step === 2 && (
                <PhoneVerification 
                  {...this.props}
                  {...this.state}
                />
              )}
            </React.Fragment>
          );
      }
}

SignupForm.propTypes = {

}