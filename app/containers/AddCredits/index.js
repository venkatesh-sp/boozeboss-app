/**
 *
 * AddCredits
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {makeSelectError, makeSelectSuccess} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styled from 'styled-components';
import { Panel, IconButton, Icon, Divider, Button } from 'rsuite';
import { PayPalButton } from "react-paypal-button-v2";

const CreditsContainer = styled.div`
    display: flex; 
    flex-direction: column;
    margin: 1em;
`

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: ${props => props.flex || '1'}; 
  align-items: ${props => props.align || 'flex-start'}; 
`

const CreditsSection = styled.div`
  display: flex; 
  flex-direction: row;
  align-items: center;
`

const Summary = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10 0 10 0;
  margin 5px 0 5px 0;
  justify-content: space-between;
`

const SummaryColumn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${props => props.justify || 'flex-start'};
  flex: ${props => props.flex || 1};
`

const CreditsPayment = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em 0 0 0; 
`

/* eslint-disable react/prefer-stateless-function */
export class AddCredits extends React.Component {

  state = {
    credits: 20
  }

  handleChangeCredits = (action) => {
    if (action === 'add') {
      this.setState({
        credits: this.state.credits + 10,
      })
    }
    if (action === 'remove') {
      if ((this.state.credits - 10) < 1) return;
      this.setState({
        credits: this.state.credits - 10,
      })
    }
  }
  
  
  render() {
    const {credits} = this.state;
    return (
      <div>
        <Helmet>
          <title>AddCredits</title>
          <meta name="description" content="Description of AddCredits" />
        </Helmet>
        <CreditsContainer>
          <Panel shaded>
            <StyledRow>
              <StyledColumn></StyledColumn>
              <StyledColumn align="center" flex="2">
                <h4>Add Credits</h4>
              </StyledColumn>
              <StyledColumn></StyledColumn>
            </StyledRow>
            <Divider />
            <StyledRow>
              <StyledColumn align='flex-start'> 
                <IconButton circle color="red" icon={<Icon icon="minus"/>} onClick={() => this.handleChangeCredits('remove')}/>
              </StyledColumn>
              <StyledColumn flex="3" align='center'> 
                  <CreditsSection>
                    <h1 style={{margin: '0 0 0 0.5em'}}>{credits}</h1>
                    <Icon icon="circle" size="2x" style={{color: '#c2b90a', margin: '0 0 0 0.5em'}}/>
                  </CreditsSection>
              </StyledColumn>
              <StyledColumn align="flex-end"> 
                <IconButton circle color="green" icon={<Icon icon="plus"/>} onClick={() => this.handleChangeCredits('add')}/>
              </StyledColumn>
            </StyledRow>
            <Divider />
            <Summary>
              <SummaryColumn flex="0.5">
                <b>Total</b>
              </SummaryColumn>
              <SummaryColumn flex="2">
                <p>({credits} BoozeBoss credits)</p>
              </SummaryColumn>
              <SummaryColumn justify='flex-end' flex="1">
                <b>${credits} USD</b>
              </SummaryColumn>
            </Summary>
          </Panel>
          <CreditsPayment> 
            <Button color="green" block><b>Pay with cash</b><Icon icon="qrcode" style={{marginLeft: '10px'}}/></Button>
          </CreditsPayment>
          <CreditsPayment> 
          <PayPalButton
            options={{
              clientId: process.env.PAYPAL_CLIENT_ID
            }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [{
                  amount: {
                    currency_code: "USD",
                    value: credits
                  }
                }],
              });
            }}
            onApprove={(data, actions) => {
              // Capture the funds from the transaction
              return actions.order.capture().then(function(details) {
                // Show a success message to your buyer
                alert("Transaction completed by " + details.payer.name.given_name);
    
                // OPTIONAL: Call your server to save the transaction
                return fetch("/paypal-transaction-complete", {
                  method: "post",
                  body: JSON.stringify({
                    orderID: data.orderID
                  })
                });
              });
            }}
          />
          </CreditsPayment>
        </CreditsContainer>
      </div>
    );
  }
}

AddCredits.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'addCredits', reducer });
const withSaga = injectSaga({ key: 'addCredits', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AddCredits);
