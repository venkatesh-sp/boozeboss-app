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
import { makeSelectUser } from '../App/selectors';
import {makeSelectError, makeSelectSuccess, makeSelectCode} from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styled from 'styled-components';
import { Panel, IconButton, Icon, Divider, Button, Loader, Message } from 'rsuite';
import { PayPalButton } from "react-paypal-button-v2";
import { addCreditsWithPaypal, addCreditsWithQR, dismissCode } from './actions';
import QRCode from "react-qr-code";

const CreditsContainer = styled.div`
    display: flex; 
    flex-direction: column;
    margin: 1em;
`

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${props => props.justify || 'flex-start'};
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

const PaymentMethods = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em 0 0 0; 
  ${props => props.isLoading && 'filter: blur(5px);'};
  ${props => props.isLoading && 'pointer-events: none;'};
`

const LoaderSection = styled.div`
  display: flex; 
  flex-direction: row; 
  flex: 1; 
  align-items: center;
  justify-content: center;
  margin: 1em 0 1em 0;
  z-index:
`

const StyledPanel = styled(Panel)`
  margin: 1em;
`

const QRSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1em;  
`

/* eslint-disable react/prefer-stateless-function */
export class AddCredits extends React.Component {

  state = {
    credits: 20, 
    isLoading: false,
  }

  handleChangeCredits = (action) => {
    if (action === 'add') {
      this.setState({
        credits: this.state.credits + 5,
      })
    }
    if (action === 'remove') {
      if ((this.state.credits - 5) < 1) return;
      this.setState({
        credits: this.state.credits - 5,
      })
    }
  }

  handleAddCreditsWithPaypal = (paypal_data, paypal_details) => {
    const { addCreditsWithPaypal, history } = this.props;
    const paypal_order_id = paypal_data.orderID;
    const amount = Number(paypal_details.purchase_units[0].amount.value);
    const payment_type = 'PAYPAL';
    
    addCreditsWithPaypal({paypal_order_id, amount, payment_type}, history);
  } 

  handlAddCreditsWithCode = () => {
    const {addCreditsWithQR} = this.props;
    const {credits} = this.state;
    const payment_type = 'QR';
    
    this.setState({isLoading: true});

    addCreditsWithQR({
      amount: credits,
      payment_type,
    })
  }

  handleDismissCode = () => {
    const {dismissCode} = this.props;
    this.setState({isLoading: false});
    dismissCode();
  }
  
  render() {
    const {code, success, user} = this.props;
    const {credits, isLoading} = this.state;
    return (
      <div>
        <Helmet>
          <title>AddCredits</title>
          <meta name="description" content="Description of AddCredits" />
        </Helmet>
        { code ? (
          <StyledPanel shaded>
              <StyledRow justify="space-between" >
                <StyledColumn>
                  <a onClick={this.handleDismissCode}>{`< Return`}</a>
                </StyledColumn>
                <StyledColumn align="flex-end">
                  <StyledRow justify="flex-end">
                    <b>{credits}</b>
                    <Icon icon="circle"style={{color: '#c2b90a', margin: '0 0.5em 0 0.5em'}}/>
                    <b>(~ {user.location.currency} {Math.round(credits / user.location.currency_conversion)})</b>
                  </StyledRow>
                </StyledColumn>
              </StyledRow>
              <Divider />
              <QRSection>
                  <QRCode 
                    value={JSON.stringify({
                      code,
                      type: 'add-credits'
                    })}
                  />
                <Divider />
              </QRSection>
          </StyledPanel>
        ) : (
          <CreditsContainer>
            <Panel shaded style={{margin: '1em 0 0 0'}}>
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
                  {!isLoading && <IconButton circle color="red" icon={<Icon icon="minus"/>} onClick={() => this.handleChangeCredits('remove')}/>}
                </StyledColumn>
                <StyledColumn flex="3" align='center'> 
                    <CreditsSection>
                      <h1 style={{margin: '0 0 0 0.5em'}}>{credits}</h1>
                      <Icon icon="circle" size="2x" style={{color: '#c2b90a', margin: '0 0 0 0.5em'}}/>
                    </CreditsSection>
                </StyledColumn>
                <StyledColumn align="flex-end"> 
                  {!isLoading && <IconButton circle color="green" icon={<Icon icon="plus"/>} onClick={() => this.handleChangeCredits('add')}/>} 
                </StyledColumn>
              </StyledRow>
              <Divider />
              <Summary>
                <SummaryColumn flex="0.50">
                  <b>Total</b>
                </SummaryColumn>
                <SummaryColumn flex="1.5">
                  <p>({credits} BoozeBoss credits)</p>
                </SummaryColumn>
                <SummaryColumn justify='flex-end' flex="1">
                  <b>(~ {user.location.currency} {Math.round(credits / user.location.currency_conversion)})</b>
                </SummaryColumn>
              </Summary>
            </Panel>
            {isLoading && (
                <LoaderSection>
                  <Loader content="Processing payment. Plase wait a few seconds." vertical />
                </LoaderSection>
            )}
            <PaymentMethods isLoading={isLoading}>
              <CreditsPayment> 
                <Button color="green" block onClick={this.handlAddCreditsWithCode}><b>Pay with cash</b><Icon icon="qrcode" style={{marginLeft: '10px'}}/></Button>
              </CreditsPayment>
              <CreditsPayment>
              {user && 
              <PayPalButton
                options={{
                  clientId: process.env.PAYPAL_CLIENT_ID
                }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        currency_code: 'USD',
                        value: credits
                      }
                    }],
                  });
                }}
                onApprove={async (data, actions) => {
                  // Capture the funds from the transaction
                  this.setState({isLoading: true});
                  const details = await actions.order.capture();
                  this.handleAddCreditsWithPaypal(data, details);     
                }}
              />
              }
              </CreditsPayment>
            </PaymentMethods>
          </CreditsContainer>
        )}
        
      </div>
    );
  }
}

AddCredits.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  success: makeSelectSuccess(),
  error: makeSelectError(),
  code: makeSelectCode(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    addCreditsWithPaypal: (purchase, history) => dispatch(addCreditsWithPaypal(purchase, history)),
    addCreditsWithQR: (purchase, history) => dispatch(addCreditsWithQR(purchase, history)),
    dismissCode: () => dispatch(dismissCode()),
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
