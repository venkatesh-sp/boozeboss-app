import React, { Component } from 'react';
import styled from 'styled-components';
import { Panel, Button, Divider, Input, InputGroup, Icon } from 'rsuite';
import moment from 'moment';
import Countdown from 'react-countdown';

const styles = {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
  };
  

const EventTitle = styled.b`
    margin: 0 0 1em 0;
`

const EventListContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em;
    flex: 1;
`

const EventRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex: 1;
    align-items: center;
    margin: ${props => props.margin ? props.margin: ''};
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`
const StyledEvent = styled(Panel)`
    margin: 1em 0 1em 0;
`

/* const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <p>Ready</p>;
    } else {
      // Render a countdown
        return <span>{days}D : {hours}H : {minutes}M : {seconds} S</span>;
    }
  }; */

class EventCard extends Component {

    renderer = ({ days, hours, minutes, seconds, completed }) => {
        if (completed) {
          // Render a completed state
          return <Button color="green" block onClick={this.handleShowInvite}>Check-In</Button>;
        } else {
          // Render a countdown
            return <span>{days}D : {hours}H : {minutes}M : {seconds}S</span>;
        }
      };

    handleShowCheckIn = () => {
        const {history, event_guest} = this.props;
        history.push({
            pathname: 'qr-invite',
            state: {
                event_guest: event_guest,
                is_checkin: true
            }
        })
    }

    handleShowCheckOut = () => {
        const {history, event_guest} = this.props;
        history.push({
            pathname: 'qr-invite',
            state: {
                event_guest: event_guest,
                is_checkout: true
            }
        })
    }

    handleGoToEvent = () => {
        const {event_guest, history} = this.props;
        history.push({
            pathname: `event/${event_guest.event.id}`, 
        })
    }

    calculate_age = (dob) => { 
        var diff_ms = Date.now() - new Date(dob).getTime();
        var age_dt = new Date(diff_ms); 
      
        return Math.abs(age_dt.getUTCFullYear() - 1970);
    }

    validateCondition = () => {
        const {user, event_guest} = this.props;
        const {condition} = event_guest.event;

        if (!user || !event_guest || !condition) return false; 

        // Validate that the event hasn't ended
        if (new Date(event_guest.event.started_at).getTime() > new Date().getTime()) return false;
        
        // Validate that the event hasn't ended
        if (new Date(event_guest.event.ended_at).getTime() <= new Date().getTime()) return false;

        // Validate free drinks redeemed vs limit
        if (condition.limit && condition.limit <= event_guest.event.free_redemeed_drinks) return false;

        // Validate min age
        if (condition.min_age && condition.min_age > this.calculate_age(user.date_of_birth)) return false;

        // Validate max age
        if (condition.max_age && condition.max_age < this.calculate_age(user.date_of_birth)) return false;

        // Validate gender
        if (condition.gender && condition.gender !== user.gender) return false;
        
        // Validate role
        if (condition.role_id && condition.role_id !== event_guest.role_id) return false;

        // Validate start time
        if (condition.start_time && new Date(event_guest.event.started_at).getTime() >= new Date(condition.start_time).getTime()) return false;

        // Validate end time
        if (condition.end_time && new Date(event_guest.event.ended_at).getTime() <= new Date(condition.getTime).getTime()) return false;

        return true;
    
    }

    goToFreeDrink = () => {
        const {history, event_guest} = this.props;
        history.push({
            pathname: '/free-drink',
            state: {
                event_guest,
            }
        })
    }

    render() {
        const {event_guest, is_on_event} = this.props;
        return (
            <StyledEvent bordered>
                {event_guest.checked_in && !event_guest.free_drink_redemeed && this.validateCondition() && (
                    <EventRow margin="-1.5em -1.60em 1.5em -1.5em" >
                        <Panel shaded style={{width: '100%', backgroundColor: '#5c6ec4'}} onClick={this.goToFreeDrink}>
                            <EventRow>
                                <Icon icon="gift" style={{ color: 'white' }}/>
                                <b style={{color: 'white'}}>You have a free drink available</b>
                                <b style={{color: 'white'}}>{'>'}</b>                                
                            </EventRow>
                        </Panel>
                    </EventRow>
                )}
                <EventRow>
                    <p>{moment(event_guest.event.started_at).format('DD/MM/YYYY')}</p>
                    {/* If its an upcoming event */}
                    {new Date(event_guest.event.started_at).getTime() >= new Date().getTime() && (
                        <p style={{margin: 0}}>Starting {moment(event_guest.event.started_at).fromNow()}</p>
                    )}
                    {/* If its an ongoing event */}
                    {(new Date(event_guest.event.started_at).getTime() < new Date().getTime()) && 
                        (new Date(event_guest.event.ended_at).getTime() >= new Date().getTime()) && (
                            <b style={{margin: 0}}>ONGOING</b>
                    )}
                    {/* If its a finished event */}
                    {(new Date(event_guest.event.ended_at).getTime() <= new Date().getTime()) && (
                            <b style={{margin: 0}}>Finished</b>
                     )}
                </EventRow>
                <EventRow style={{margin: '1em 0 0 0'}}>
                    <b>{event_guest.event.brief_event.name}<p>@ {event_guest.event.brief_event.venue.name} ({event_guest.event.brief_event.venue.address})</p></b>
                </EventRow>
                <Divider />
                {/* If the event haven't started it yet */}
                {new Date(event_guest.event.started_at).getTime() >= new Date().getTime() && (
                    <Button block color="green">
                            <Countdown 
                                date={event_guest.event.started_at} 
                                renderer={this.renderer}
                            />
                    </Button>
                )}
                {/* If its an ongoing event */}
                { new Date(event_guest.event.started_at).getTime() <= new Date().getTime() &&
                    new Date(event_guest.event.ended_at).getTime() >= new Date().getTime() &&  (
                        <EventRow>
                            {event_guest.checked_in ? (
                                <React.Fragment>
                                    {event_guest.check_out_time ? (
                                        <Button disabled={is_on_event} color="green" block onClick={this.handleShowCheckIn}>Check-In</Button>
                                    ) : (
                                        <ButtonContainer>
                                            <Button color="green" block onClick={this.handleGoToEvent}>Menu</Button> 
                                            <Button block onClick={this.handleShowCheckOut}>Check-Out</Button>
                                        </ButtonContainer>
                                    )}
                                </React.Fragment>
                            ) : (
                                <Button color="green" disabled={is_on_event} block onClick={this.handleShowCheckIn}>Check-In</Button>
                            )}
                        </EventRow>
                )}
                {event_guest.check_in_time && 
                    (new Date(event_guest.event.ended_at).getTime() <= new Date().getTime()) && (
                    <b style={{margin: 0}}>Thanks for coming</b>
                )}
            </StyledEvent>
        )
    }
}

export default class EventList extends Component {

    state = {
        code: null
    }
    
    handleEventCodeChange = (code) => {
        if (code.length < 7) {
            this.setState({code})
        }
    }

    handleSubmitCode = () => {
        const {submitEventCode} = this.props;
        const {code} = this.state;
        
        submitEventCode(code);
    }

    isCheckedIn = () => {
        const {events} = this.props;
        
        if (!events) return false;

        const checked_in = 
            events
                .filter(event_guest => {
                    // Filter inactive events 
                    return new Date(event_guest.event.started_at).getTime() <= new Date().getTime() && new Date(event_guest.event.ended_at).getTime() >= new Date().getTime();
                })
                .find(event_guest => event_guest.checked_in && event_guest.check_in_time && !event_guest.check_out_time)

        if (checked_in) return true;
        return false;
    }

    render() {
        const { events } = this.props;
        const {code} = this.state;
        const is_on_event = this.isCheckedIn();
        return (
            <EventListContainer>
                <EventTitle>My Events</EventTitle>
                {events &&
                    events.length > 0 && 
                    events.filter(event_guest => new Date(event_guest.event.ended_at).getTime() >= new Date().getTime()) &&
                    events.map(event_guest => <EventCard {...this.props} event_guest={event_guest} is_on_event={is_on_event}/>) 
                } 
                {(!events ||
                    events.length < 1) && (
                        <Panel bordered>
                            <p>No upcoming events.</p>
                            <p>Do you have an event invite code?</p> 
                            <InputGroup style={styles}>
                                <InputGroup.Addon>
                                    <Icon icon="key" />
                                </InputGroup.Addon>
                                <Input onChange={this.handleEventCodeChange} value={code}/>
                            </InputGroup>
                            <Button block color="green" disabled={!code || code.length < 5} onClick={this.handleSubmitCode}>
                                Submit
                            </Button>
                        </Panel>
                )}
            </EventListContainer>
        )
    }
}
