import React, { Component } from 'react';
import styled from 'styled-components';
import { Panel, Button, Divider } from 'rsuite';
import moment from 'moment';

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
`

const StyledEvent = styled(Panel)`
    margin: 1em 0 1em 0;
`

class EventCard extends Component {

    handleGoToEvent = () => {
        const {history, brief_event} = this.props;
        history.push({
            pathname: `event/${brief_event.event.id}`,
            state: {
                event: brief_event,
            }
        })
    }

    render() {
        const {brief_event} = this.props;
        return (
            <StyledEvent bordered>
                <EventRow>
                    <p>{moment(brief_event.event.started_at).format('DD/MM/YYYY')}</p>
                    {/* If its an upcoming event */}
                    {new Date(brief_event.event.started_at).getTime() >= new Date().getTime() && (
                        <p style={{margin: 0}}>Starting {moment(brief_event.event.started_at).fromNow()}</p>
                    )}
                    {/* If its an ongoing event */}
                    {(new Date(brief_event.event.started_at).getTime() < new Date().getTime()) && 
                        (new Date(brief_event.event.ended_at).getTime() >= new Date().getTime()) && (
                            <b style={{margin: 0}}>ONGOING</b>
                    )}
                    {/* If its a finished event */}
                    {(new Date(brief_event.event.ended_at).getTime() <= new Date().getTime()) && (
                            <b style={{margin: 0}}>Finished</b>
                    )}

                </EventRow>
                <EventRow style={{margin: '1em 0 0 0'}}>
                    <b>{brief_event.name}</b>
                </EventRow>
                <Divider />
                <EventRow>
                    <Button color="green" block onClick={this.handleGoToEvent}>Go to Event</Button>
                </EventRow>
            </StyledEvent>
        )
    }
}

export default class EventList extends Component {
    render() {
        const { agencyEvents } = this.props;
        return (
            <EventListContainer>
                <EventTitle>My Events</EventTitle>
                {agencyEvents &&
                    agencyEvents.length > 0 && 
                    agencyEvents.map(brief_event => <EventCard {...this.props} brief_event={brief_event}/>) 
                } 
                {agencyEvents &&
                    agencyEvents.length < 1 && (
                        <div>
                            <Divider />
                            <b>No upcoming events</b>
                            <br />
                            <br />
                            <p>They will appear here after the agency had set it up on the desktop app.</p>
                            <Divider />
                        </div>
                )}
            </EventListContainer>
        )
    }
}
