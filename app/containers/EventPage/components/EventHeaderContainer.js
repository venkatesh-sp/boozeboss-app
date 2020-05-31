import React, { Component } from 'react'
import styled from 'styled-components'; 
import moment from 'moment';
import {Divider} from 'rsuite'; 

const Header = styled.div`
    display: flex; 
    flex-direction: column;
    justify-content: flex-start;
`

export default class EventHeaderContainer extends Component {
    render() {
        const {event} = this.props;
        return (
            <Header>
                <p>{moment(event.started_at).format('DD/MM/YYYY LT')}</p>   
                <h4>{event.brief_event.name}</h4>   
                <Divider />        
            </Header>
        )
    }
}
