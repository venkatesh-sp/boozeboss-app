import React, { Component } from 'react'
import styled from 'styled-components';
import { Panel, Divider, Input, Button, Message } from 'rsuite';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  margin: 2em 1.5em 0 1.5em;
`;

const StyledPanel = styled(Panel)`
    display: flex;
    flex-direction: column;
`

const StyledRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const StyledMessage = styled(Message)`
  width: 300px;
  margin: 0.75em;
`

export default class PhoneVerification extends Component {

    state = {
        isSMSsent: false,
        code: null, 
    }

    handleGetCode = () => {
        const {phone_number, getSMSVerification} = this.props; 
        getSMSVerification(phone_number);
        this.setState({isSMSsent: true});
    }

    handleCheckCode = () => {
        const {phone_number, checkSMSVerification} = this.props; 
        const { code } = this.state;
        checkSMSVerification(phone_number, code);
    }

    handleChange = (code) => {
        if (code.length < 7) {
            this.setState({code});
        }
    }

    handleSkip = async () => {
        const {authenticate, getUser, token} = this.props;
        await authenticate(token);
        await getUser();
    } 

    render() {
        const {isSMSsent, code} = this.state;
        const {phone_number, error} = this.props;
        return (
            <StyledContainer>
                {error && <StyledMessage type="error" description={error} />}
                <StyledPanel bordered>
                    <b>Phone Verification</b>
                    <Divider />
                    <p>We will send an SMS code to <b>{phone_number}</b>. Please type the code to verify your account.</p>
                    <br />
                    {isSMSsent && <Input isSMSsent value={code} onChange={this.handleChange}/>}
                    {isSMSsent ? (
                        <Button block onClick={this.handleCheckCode}>Verify</Button>
                    ) : (
                        <Button onClick={this.handleGetCode} block color="green">Send Code</Button>
                    )}
                    <Divider />
                    <StyledRow>
                        {isSMSsent ? (
                            <a onClick={this.handleGetCode}>Resend SMS</a>
                        ) : (
                            <a onClick={this.handleGetCode}>Send SMS</a>
                        )}
                        <a onClick={this.handleSkip}>Skip</a>
                    </StyledRow>
                </StyledPanel>
            </StyledContainer>
        )
    }
}
