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

import { checkSMSVerification, checkEmailVerification } from './actions';

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
    if (
      !this.state.otp ||
      this.state.otp.length < 6 ||
      this.state.otp.length > 6
    )
      return Alert.error('Incorrect OTP', 2000);
    if (this.state.phone_number)
      this.props.checkSMSVerification(
        this.state.phone_number,
        this.state.otp,
        this.props,
      );
    else if (this.state.email)
      this.props.checkEmailVerification(
        this.state.email,
        this.state.otp,
        this.props,
      );
  };

  render() {
    console.log(this.props);
    return (
      <StyledOtpDiv>
        <StyledText size="15px" color="#A4A8B7">
          Plaese Enter OTP
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
  outlet: makeSelectOutletInfo(),
  cartItems: makeSelectCartItems(),
  currentoutlet: makeSelectCurrentOutlet(),
});

function mapDispatchToProps(dispatch) {
  return {
    checkSMSVerification: (phone_number, code, props) =>
      dispatch(checkSMSVerification(phone_number, code, props)),
    checkEmailVerification: (email, code, props) =>
      dispatch(checkEmailVerification(email, code, props)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'outlet', reducer });
const withSaga = injectSaga({ key: 'outlet', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Otp);
