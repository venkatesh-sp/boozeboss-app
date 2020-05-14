import React, { Component } from 'react'
import styled from 'styled-components';
import { Message, Button } from 'rsuite';

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

    goToRoute = () => {
        const { history } = this.props;
        history.push({
            pathname: '/verification'
        })
    }

    render() {
        const { isAgeVerified } = this.props;
        return (
            <Container>
                {!isAgeVerified && (
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
            </Container>
        )
    }
}
