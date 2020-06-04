import React, { Component } from 'react';
import styled from 'styled-components';
import { Panel } from 'rsuite';

const CheckoutSection = styled.div`
    position: fixed;
    bottom: 1em;
    width: 95%;
`

const StyledCheckoutPanel = styled(Panel)` 
    display: flex;
    flex-direction: row;
    margin: 0 1em 0 0;
    background-color: #5ea83e;
    color: white;

    .rs-panel-body {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
`

export default class EventCartCheckout extends Component {

    handleProccedToOrder = () => {
        const {history, cart, event} = this.props;
        history.push({
            pathname: `/new-order`,
            state: {
                cart,
                event_id: event.id,
            }
        })
    }

    render() {
        const {cart} = this.props;
        return (
            <CheckoutSection>
                <StyledCheckoutPanel 
                    shaded 
                    onClick={this.handleProccedToOrder}
                >
                    <b>Go to Checkout ({cart.length} item{cart.length > 1 && 's'})</b>
                </StyledCheckoutPanel>
            </CheckoutSection>
        )
    }
}
