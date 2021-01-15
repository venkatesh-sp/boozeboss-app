import React, { Component } from 'react';
import styled from 'styled-components';
import {
  Button,
  ButtonGroup,
  Input,
  SelectPicker,
  Alert,
  Checkbox,
} from 'rsuite';
// import Signup from '../Signup';

import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
// import Signup from './Signup';
import { authenticate, getUser } from '../App/actions';
import {
  makeSelectError,
  makeSelectSuccess,
  makeSelectToken,
  makeSelectUser,
} from './selectors';

import {
  sendMobileOtp,
  sendEmailOtp,
  authSignup,
  verifyEmailPhone,
} from './actions';

const StyledLoginDiv = styled.div`
  width: 100%;
  padding: 15px;
  height: 780px;
  text-align: center;
  overflow-y: 'scroll';
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
  marginTop: '10px',
};

const StyledSignupContainer = styled.div`
  // padding: 20px;
  // position: relative;
  // height: 75vh;
`;
const StyledHeading = styled.p`
  font-weight: bold;
  font-size: 32px;
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
  color: '#6c757d',
  borderRadius: '0px',
};

const styles = {
  width: '300px',
  margin: '0.75em',
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
      Already have an account?
    </StyledText>
    <StyledText>Log in with your registered phone number</StyledText>
    <PhoneInput
      style={inputStyles}
      country="us"
      enableSearch
      disableSearchIcon
      inputProps={{
        name: 'phone',
        required: true,
        autoFocus: true,
      }}
      onChange={value => handleChange(value, 'phone')}
    />
    {/* <Input
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
    /> */}
    <Button style={ButtonStyles} appearance="primary" onClick={handleSubmit}>
      Send OTP
    </Button>
  </>
);

const SignUp = ({ handleChange, handleSignup }) => (
  <StyledSignupContainer>
    <StyledHeading>Sign Up</StyledHeading>
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
    <PhoneInput
      style={{ ...inputStyles }}
      country="us"
      enableSearch
      disableSearchIcon
      inputProps={{
        name: 'phone',
        required: true,
        autoFocus: true,
      }}
      onChange={value => handleChange(value, 'phone')}
    />

    <Input
      onChange={value => handleChange(value, 'password')}
      style={inputStyles}
      type="password"
      placeholder="Password"
    />
    <Input
      onChange={value => handleChange(value, 'confirm_password')}
      style={inputStyles}
      type="password"
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

    <Checkbox onClick={value => handleChange(value, 'privacy')}>
      <p style={{ fontSize: '10px', textAlign: 'left' }}>
        We do not like spam and will keep your details safe. Please confirm that
        we can send you important notifications and deals relating to your
        account.
        <a href="https://www.liquidintel.io/privacy-policy">Privacy Policy</a>
      </p>
    </Checkbox>

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
      privacy: '',
    };
  }

  componentDidMount() {
    const { user, history, verifyEmailPhone, location } = this.props;
    if (user) {
      this.props.history.push('/orders');
    } else {
      const { state } = location;
      this.setState({ active: state.active });
    }
  }

  toggle = value => {
    this.setState({ active: value });
  };

  handleChange = (value, name) => {
    this.setState({ [name]: value });
  };

  handleSubmit = () => {
    const { verifyEmailPhone, history } = this.props;
    if (this.state.email) {
      Alert.error('Email Service Not Active, Please Use Phone Number', 2500);
      // verifyEmailPhone({ email: this.state.email, history });
    } else if (this.state.phone) {
      verifyEmailPhone({ phone_number: this.state.phone, history });
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
      privacy,
    } = this.state;
    if (!privacy) return Alert.error('please check privacy policy', 2500);
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
      history: this.props.history,
    });
  };

  render() {
    const { token, sendEmailOtp, sendMobileOtp } = this.props;

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
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    sendMobileOtp: phone_number => dispatch(sendMobileOtp(phone_number)),
    sendEmailOtp: email => dispatch(sendEmailOtp(email)),
    authSignup: user => dispatch(authSignup(user)),
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
