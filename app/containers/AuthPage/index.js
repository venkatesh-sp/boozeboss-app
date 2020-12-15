import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, ButtonGroup, Input, SelectPicker, Alert } from 'rsuite';
// import Signup from '../Signup';

import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
// import Signup from './Signup';
import { authenticate, getUser } from '../App/actions';
import {
  makeSelectError,
  makeSelectSuccess,
  makeSelectToken,
} from './selectors';

import {
  sendMobileOtp,
  sendEmailOtp,
  authSignup,
  verifyEmailPhone,
} from './actions';

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

const SignIn = ({ handleChange, handleSubmit }) => (
  <>
    <StyledText size="17px" color="#363645" weight="bold">
      Already registered with us
    </StyledText>
    <StyledText>
      Please provide your registred email/phone, we will sent an OTP on it.
    </StyledText>
    <Input
      style={InputStyles}
      placeholder="Email/Phone"
      onChange={value => {
        const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        const is_email = value.match(re);

        if (is_email) {
          handleChange(value, 'email');
          handleChange('', 'phone');
        } else {
          handleChange('', 'email');
          handleChange(value, 'phone');
        }
      }}
    />
    <Button style={ButtonStyles} appearance="primary" onClick={handleSubmit}>
      Send OTP
    </Button>
  </>
);

const SignUp = ({ handleChange, handleSignup }) => (
  <StyledSignupContainer>
    <StyledHeading>Signup</StyledHeading>
    <Input
      onChange={value => handleChange(value, 'first_name')}
      style={inputStyles}
      type="text"
      placeholder="First Name"
    />
    <Input
      onChange={value => handleChange(value, 'last_name')}
      style={inputStyles}
      type="text"
      placeholder="Last Name"
    />
    <Input
      onChange={value => handleChange(value, 'email')}
      style={inputStyles}
      type="text"
      placeholder="Email"
    />
    <Input
      onChange={value => handleChange(value, 'phone')}
      style={inputStyles}
      type="text"
      placeholder="Phone (prefix with country code)"
    />
    <Input
      onChange={value => handleChange(value, 'password')}
      style={inputStyles}
      type="text"
      placeholder="Password"
    />
    <Input
      onChange={value => handleChange(value, 'confirm_password')}
      style={inputStyles}
      type="text"
      placeholder="Confirm Password"
    />
    <SelectPicker
      onChange={value => handleChange(value, 'gender')}
      style={{
        width: '100%',
        marginTop: '20px',
        fontSize: '15px',
        backgroundColor: '#fafafa',
        color: '#a4a8b7',
        borderRadius: '0px',
        border: 'none',
      }}
      searchable={false}
      data={[
        { key: 'male', label: 'MALE' },
        { key: 'female', label: 'FEMALE' },
      ]}
      valueKey="key"
      type="text"
      placeholder="Gender"
    />
    <Button style={ButtonStyles} appearance="primary" onClick={handleSignup}>
      Sign Up
    </Button>
  </StyledSignupContainer>
);
class AuthPage extends Component {
  constructor() {
    super();
    this.state = {
      active: 'signin',
      email: '',
      phone: '',
      first_name: '',
      last_name: '',
      gender: '',
      password: '',
      confirm_password: '',
    };
  }

  toggle = value => {
    this.setState({ active: value });
  };

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { verifyEmailPhone } = this.props;
    if (this.state.email) {
      verifyEmailPhone({ email: this.state.email });
    } else if (this.state.phone) {
      verifyEmailPhone({ phone_number: this.state.phone });
    } else {
      Alert.error('Missing Fields', 2500);
    }
  };

  handleSignup = () => {
    const {
      first_name,
      last_name,
      email,
      phone,
      password,
      confirm_password,
      gender,
    } = this.state;
    if (password !== confirm_password)
      return Alert.error('Password not match', 2500);
    if (!phone && !email) return Alert.error('Missing Fields', 2500);

    this.props.authSignup({
      first_name,
      last_name,
      password,
      email,
      phone_number: phone,
      gender,
    });
  };

  render() {
    console.log(this.props);
    const { token, sendEmailOtp, sendMobileOtp } = this.props;
    if (token) {
      if (this.state.email) {
        console.log('entered');
        sendEmailOtp(this.state.email);
      } else if (this.state.phone) {
        sendMobileOtp(this.state.phone);
      }
      if (this.props.success) {
        this.props.history.push('/otp', {
          phone_number: this.state.phone,
          state: this.props.location.state,
        });
      }
    }

    let AccountsComponent;
    if (this.state.active === 'signin') {
      AccountsComponent = (
        <SignIn
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      );
    } else {
      AccountsComponent = (
        <SignUp
          handleChange={this.handleChange}
          handleSignup={this.handleSignup}
        />
      );
    }
    return (
      <StyledLoginDiv>
        <CustomButtonGroup toggle={this.toggle} active={this.state.active} />
        {AccountsComponent}
      </StyledLoginDiv>
    );
  }
}

AuthPage.propTypes = {
  dispatch: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  success: makeSelectSuccess(),
  token: makeSelectToken(),
});

function mapDispatchToProps(dispatch) {
  return {
    sendMobileOtp: phone_number => dispatch(sendMobileOtp(phone_number)),
    sendEmailOtp: email => dispatch(sendEmailOtp(email)),
    authSignup: user => dispatch(authSignup(user)),
    authenticate: token => dispatch(authenticate(token)),
    getUser: () => dispatch(getUser()),
    verifyEmailPhone: email_phone => dispatch(verifyEmailPhone(email_phone)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'auth', reducer });
const withSaga = injectSaga({ key: 'auth', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AuthPage);
