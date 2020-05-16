import React, { Component } from 'react'
import styled from 'styled-components';
import { Message, Button } from 'rsuite';
import EventList from './EventList';
import AgencyEventList from './AgencyEventList';
import RoleValidator from 'components/RoleValidator';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 1em;
`

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const StyledButton = styled(Button)`
    margin: 1em 0 0 0;
`

export default class HomePageContainer extends Component {

    componentWillMount = () => {
        const {getEvents, getAgencyEvents, scope} = this.props;
        if (scope === 'GUEST') {
            getEvents();
        }
        if (scope === 'AGENCY') {
            getAgencyEvents();
        }
        
    }

    goToRoute = () => {
        const { history } = this.props;
        history.push({
            pathname: '/verification'
        })
    }

    render() {
        const { isAgeVerified, isAuthenticated } = this.props;
        return (
            <Container>
                <RoleValidator
                    {...this.props}
                    scopes={['GUEST']}
                    roles={['REGULAR', 'VIP', 'VVIP']}
                >
                    {isAuthenticated && !isAgeVerified && (
                        <MessageContainer>
                            <Message 
                                type="warning" 
                                description={(
                                    <div>
                                        <p>Please verify your age to have complete access to BoozeBoss wallet.</p>
                                    </div>
                                )} 
                            />
                            <StyledButton onClick={this.goToRoute} color="green">
                                Verify my age
                            </StyledButton>
                        </MessageContainer>
                    )}
                </RoleValidator>
                <RoleValidator
                    {...this.props}
                    scopes={['GUEST']}
                    roles={['REGULAR', 'VIP', 'VVIP']}
                >
                    {isAuthenticated && (
                        <EventList 
                            {...this.props}
                        />
                    )}
                </RoleValidator>
                <RoleValidator
                    {...this.props}
                    scopes={['AGENCY']}
                    roles={['OWNER', 'MANAGER', 'STAFF']}
                >
                    {isAuthenticated && ( 
                        <AgencyEventList 
                            {...this.props}
                        />
                    )}
                    
                </RoleValidator>
                
            </Container>
        )
    }
}
