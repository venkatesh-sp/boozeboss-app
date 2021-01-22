import React, { Component } from 'react';
import styled from 'styled-components';
import { Button, Input, Alert } from 'rsuite';
import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  makeSelectError,
  makeSelectSuccess,
  makeSelectCartItems,
  makeSelectOutletInfo,
  makeSelectCurrentOutlet,
} from './selectors';
import reducer from './reducer';
import saga from './saga';

import {
  checkSMSVerification,
  checkEmailVerification,
  addCartItems,
  sendMobileOtp,
} from './actions';

const StyledOtpDiv = styled.div`
  padding: 30px;
`;
const StyledText = styled.p`
  font-size: ${props => props.size};
  font-weight: ${props => props.weight};
  color: ${props => props.color};
  text-align: center;
  margin-top: 20px;
`;
const StyledFlexDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
`;
const InputStyles = {
  // height: '52px',
  // width: '52px',
  borderRadius: '7px',
  backgroundColor: '#EAEAEB',
};
const ButtonStyles = {
  width: '50%',
  display: 'block',
  margin: 'auto',
  marginTop: '20px',
};
class Otp extends Component {
  state = {
    otp: '',
    phone_number: '',
    email: '',
  };

  componentDidMount() {
    const { state } = this.props.location;

    if (state) {
      const { phone_number, email } = state;
      this.setState({ phone_number, email });
    }
  }

  handleChange = value => {
    this.setState({ otp: value });
  };

  handleSubmit = () => {
    console.log(this.state, 'click');
    if (
      !this.state.otp ||
      this.state.otp.length < 6 ||
      this.state.otp.length > 6
    )
      return Alert.error('Incorrect OTP', 2000);
    if (this.state.phone_number) {
      console.log(this.state);
      this.props.checkSMSVerification(this.state.phone_number, this.state.otp);
    } else if (this.state.email) {
      console.log(this.state, 'email');
      this.props.checkEmailVerification(this.state.email, this.state.otp);
    }
  };

  render() {
    if (this.props.success) {
      this.props.history.push('/orders');
    }
    return (
      <StyledOtpDiv>
        <StyledText size="15px" color="#A4A8B7">
          {this.state.phone_number}
          {this.state.email}
        </StyledText>
        <StyledText size="15px" color="#A4A8B7">
          Please Enter OTP
        </StyledText>
        <StyledFlexDiv>
          <Input
            style={InputStyles}
            onChange={this.handleChange}
            type="number"
          />
        </StyledFlexDiv>
        <Button
          style={ButtonStyles}
          appearance="primary"
          onClick={this.handleSubmit}
        >
          Submit OTP
        </Button>
        <StyledText
          size="15px"
          color="#3498ff"
          onClick={() => {
            const { phone_number } = this.state;
            const { history, sendMobileOtp } = this.props;
            sendMobileOtp({ phone_number, history });
          }}
        >
          Resend OTP
        </StyledText>
      </StyledOtpDiv>
    );
  }
}

Otp.propTypes = {
  // Otp: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  error: makeSelectError(),
  success: makeSelectSuccess(),
});

function mapDispatchToProps(dispatch) {
  return {
    checkSMSVerification: (phone_number, code) =>
      dispatch(checkSMSVerification(phone_number, code)),
    checkEmailVerification: (email, code) =>
      dispatch(checkEmailVerification(email, code)),
    sendMobileOtp: phone_number => dispatch(sendMobileOtp(phone_number)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'otp', reducer });
const withSaga = injectSaga({ key: 'otp', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Otp);
