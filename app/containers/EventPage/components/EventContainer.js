import React, { Component } from 'react'
import styled from 'styled-components';
import RoleValidator from 'components/RoleValidator';
import Countdown from 'react-countdown';
import moment from 'moment';
import { Message, Button } from 'rsuite';
import { updateEventError } from '../actions';
import EventHeaderContainer from './EventHeaderContainer';
import EventMenu from './EventMenu';
import EventCartCheckout from './EventCartCheckout';
import EventAgencyDashboard from './EventAgencyDashboard';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em;
`
const StyledButtonLink = styled(Button)`
    margin: 5px 0 5px 0;
`

export default class EventContainer extends Component {

    startEvent = () => {
        const {event, updateEvent} = this.props;
        const start = confirm('Are you sure you want to start this event? Guests would be able to check-in and the menu will be unlocked.');
        if (start) {
            updateEvent(event.id, {field: 'started_at', value: new Date()});
        }
    }

    endEvent = () => {
        const {event, updateEvent} = this.props;
        const start = confirm("Are you sure you want to end this event? Guests won't be able to check-out and the menu will be closed.");
        if (start) {
            updateEvent(event.id, {field: 'ended_at', value: new Date()});
        }
    }

    goToScanner = (message) => {
        const {history} = this.props;
        history.push({
            pathname: '/scanner',
            state: {
                message
            }
        })
    }

    goToScannerWithEvent = (message) => {
        const {history, event} = this.props;
        history.push({
            pathname: '/scanner',
            state: {
                message,
                event_id: event.id
            }
        })
    }

    render() {
        const {event, cart} = this.props;
        return (
            <Container>
                {event && (
                    <RoleValidator
                        {...this.props}
                        scopes={['AGENCY']}
                        roles={['OWNER', 'MANAGER', 'STAFF']}
                    >   
                        <EventHeaderContainer 
                            {...this.props}
                        />
                        <EventAgencyDashboard {...this.props}/>
                         {new Date(event.started_at).getTime() >= new Date().getTime() && (
                             <Message type='info' description={`This event is scheduled to automatically start at ${moment(event.started_at).format('DD/MM/YYYY LT')}`} />
                         )}
                         {new Date(event.started_at).getTime() >= new Date().getTime() && (
                             <Button onClick={this.startEvent} style={{marginTop: '0.5em'}} block color='green'>Start now</Button>
                         )}
                         {(new Date(event.started_at).getTime() < new Date().getTime()) &&
                            (new Date(event.ended_at).getTime() >= new Date().getTime()) && (
                             <Message type='info' description={`This event is scheduled to automatically end at ${moment(event.ended_at).format('DD/MM/YYYY LT')}`} />
                         )}
                         {(new Date(event.started_at).getTime() < new Date().getTime()) && 
                            (new Date(event.ended_at).getTime() >= new Date().getTime()) && (
                             <Button onClick={this.endEvent} style={{marginTop: '0.5em'}} block color='green'>End of the day</Button>
                         )}
                         {(new Date(event.started_at).getTime() <= new Date().getTime()) && new Date(event.ended_at).getTime() >= new Date().getTime() && (
                             <React.Fragment>
                                 <StyledButtonLink color="green" onClick={() => this.goToScanner('Scan the code to check-in the guest')}>Check-In</StyledButtonLink>
                                <StyledButtonLink color="green" onClick={() => this.goToScanner('Scan the code to check-out the guest')}>Check-Out</StyledButtonLink>
                                <StyledButtonLink color="green" onClick={() => this.goToScanner('Scan the code to redeem the guest order')}>Take Order</StyledButtonLink>
                                <StyledButtonLink color="green" onClick={() => this.goToScanner('Scan the code to redeem the guest free drink')}>Scan free drink</StyledButtonLink>
                                <StyledButtonLink color="green" onClick={() => this.goToScannerWithEvent('Scan the code to complete the payment')}>Sell Credits</StyledButtonLink>
                             </React.Fragment>
                         )}
                    </RoleValidator>
                )}
                {event && (
                    <RoleValidator
                        {...this.props}
                        scopes={['GUEST', 'REGION']}
                        roles={['OWNER', 'MANAGER', 'REGULAR', 'VIP', 'VVIP']}
                    >
                        <EventHeaderContainer 
                            {...this.props}
                        />
                        <EventMenu 
                            {...this.props}
                        />
                    </RoleValidator>
                )}
                {cart && cart.length > 0 && (
                    <RoleValidator
                        {...this.props}
                        scopes={['GUEST', 'BRAND', 'REGION']}
                        roles={['OWNER', 'MANAGER', 'REGULAR', 'VIP', 'VVIP']}
                    >
                        <EventCartCheckout 
                            {...this.props}
                        />
                    </RoleValidator>
                    
                )}
            </Container>
        )
    }
}
