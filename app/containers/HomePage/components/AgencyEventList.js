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
                    <p style={{margin: 0}}>Starting {moment(brief_event.event.started_at).fromNow()}</p>
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
            </EventListContainer>
        )
    }
}
