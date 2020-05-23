import React, { Component } from 'react'
import styled from 'styled-components';
import { Message, Button } from 'rsuite';
import moment from 'moment';
import RoleValidator from 'components/RoleValidator';

const MessageContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const StyledButton = styled(Button)`
    margin: 1em 0 0 0;
`

export default class MessageContainerComponent extends Component {
    render() {
        const {isAuthenticated, user} = this.props; 
        return (
            <RoleValidator
                {...this.props}
                scopes={['GUEST']}
                roles={['REGULAR', 'VIP', 'VVIP']}
            >
                {isAuthenticated && (
                    <React.Fragment>
                        {user && user.age_verification_status === 'SUBMITTED' && (
                            <MessageContainer>
                                <Message 
                                    description={(
                                        <div>
                                            <p>Your profile is in process to be verified.</p>
                                        </div>
                                    )} 
                                />
                            </MessageContainer>
                        )}
                        {/* Verify if the user was logged in with facebook and has a 48 hour temporal limit */}
                        {user && !user.age_verification_status &&  user.facebook_user_id && (new Date(user.temporal_age_verification_limit).getTime() >= new Date().getTime()) && (
                            <MessageContainer>
                                <Message 
                                    description={(
                                        <div>
                                            <p><b>Facebook</b> login has a 48 hour temporal verification limit. Please verify your account by {moment(user.temporal_age_verification_limit).format('DD/MM/YYYY LT')} to keep full access.</p>
                                        </div>
                                    )} 
                                />
                                <StyledButton onClick={this.props.goToRoute} color="green">
                                    Verify my age
                                </StyledButton>
                            </MessageContainer>
                        )}
                        {/* If it isn't a facebook account just show the verification */}
                        {user && !user.age_verification_status && !user.facebook_user_id && (
                            <MessageContainer>
                                <Message 
                                    type="warning" 
                                    description={(
                                        <div>
                                            <p>Please verify your age to have complete access to BoozeBoss wallet.</p>
                                        </div>
                                    )} 
                                />
                                <StyledButton onClick={this.props.goToRoute} color="green">
                                    Verify my age
                                </StyledButton>
                            </MessageContainer>
                        )}
                    </React.Fragment>
                )}
            </RoleValidator>
        )
    }
}
