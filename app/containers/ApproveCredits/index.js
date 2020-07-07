/**
 *
 * ApproveCredits
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
import { makeSelectError, makeSelectSuccess, makeSelectWalletPurchase, makeSelectEvents,} from './selectors';
import { getWalletPurchase, getEvents, approveCode } from './actions'
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { Message, Panel, Icon, Divider, SelectPicker, Button } from 'rsuite';
import styled from 'styled-components';


const StyledPanel = styled(Panel)`
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


/* eslint-disable react/prefer-stateless-function */
export class ApproveCredits extends React.Component {

  state = {
    lock_event: false,
    event_id: null
  }

  componentDidMount = () => {
    const {history, getWalletPurchase, getEvents} = this.props;
    const {state} = history.location;

    if (state && state.code) {
      getWalletPurchase(state.code);
      getEvents(); 
    } else {
      history.push('/');
    }
    
    if (state && state.event_id) {
      this.setState({lock_event: true, event_id: state.event_id});
    }
  }

  getPickerData = () => {
    const {events} = this.props;
    if (!events) return [];
    
    return events.map(event => {
      return {
        label: `${event.name}`, 
        value: event.event.id
      }
    })
  }

  handleEventChange = (event_id) => {
    this.setState({event_id});
  }

  handleApproveCode = () => {
    const {history, approveCode} = this.props;
    const {event_id} = this.state;
    const {state} = history.location;

    if (!event_id) return alert('Missing fields'); 
    const payment = confirm('Did you already received the correct amount for this payment');

    if (payment) {
      approveCode(state.code, event_id, history);
    }
  }


  render() {
    const {wallet_purchase, user} = this.props;
    const {event_id, lock_event} = this.state;
    return (
      <div>
        <Helmet>
          <title>ApproveCredits</title>
          <meta name="description" content="Description of ApproveCredits" />
        </Helmet>
        <Message type="warning" description="Please don't confirm this credit purchase until the cash payment has been done" />
        <StyledPanel shaded>
          <StyledRow>
            <StyledColumn>
              <b>Credits</b>
            </StyledColumn>
            <StyledColumn align="flex-end">
              <StyledRow>
                <b>{wallet_purchase && wallet_purchase.amount}</b>
                <Icon icon="circle"style={{color: '#c2b90a', margin: '0 0.5em 0 0.5em'}}/>
              </StyledRow>
            </StyledColumn>
          </StyledRow>
          <Divider />
          <StyledRow>
            <StyledColumn>
              <b>To pay</b>
            </StyledColumn>
            <StyledColumn align="flex-end">
              <StyledRow>
                <b>${user && wallet_purchase && wallet_purchase.amount && Math.round(wallet_purchase.amount / user.location.currency_conversion * 100) / 100} {user.location.currency}</b>
              </StyledRow>
            </StyledColumn>
          </StyledRow>
          <Divider />
          <StyledRow>
            <StyledColumn>
              <b>Event</b>
            </StyledColumn>
            <StyledColumn align="flex-end">
              <SelectPicker 
                disabled={lock_event}
                value={event_id}
                style={{width: '200px'}}
                placement="bottomEnd"
                searchable={false}
                data={this.getPickerData()}
                onChange={this.handleEventChange}
              />
            </StyledColumn>
          </StyledRow>
          <Divider />
          <Button block color="green" onClick={this.handleApproveCode} disabled={!event_id} >
            Confirm
          </Button>
        </StyledPanel>
      </div>
    );
  }
}

ApproveCredits.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  wallet_purchase: makeSelectWalletPurchase(),
  events: makeSelectEvents(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getWalletPurchase: (code) => dispatch(getWalletPurchase(code)),
    getEvents: () => dispatch(getEvents()), 
    approveCode: (code, event_id, history) => dispatch(approveCode(code, event_id, history))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'approveCredits', reducer });
const withSaga = injectSaga({ key: 'approveCredits', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ApproveCredits);
