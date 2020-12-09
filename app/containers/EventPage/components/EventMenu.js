import React, { Component } from 'react';
import styled from 'styled-components';
import {Panel, Icon, IconButton} from 'rsuite';

const StyledMenu = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 0.5em 0 0.5em;
`

const StyledMenuContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const StyledPanel = styled(Panel)`
    height: 100%;
    margin: 0.5em 0 0.5em 0;
`

const PriceSection = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    flex: 1;
`

const ProductRow = styled.div`
    display: flex; 
    flex-direction: row;
`

const ProductColumn = styled.div`
    display: flex;
    flex-direction: column;
    flex: ${props => props.flex};
    justify-content: center;
    ${props => `align-items: ${props.align};` || ''}
`

const CheckoutPanel = styled(Panel)`

`

export default class EventMenu extends Component {

    handleAddItemToCart = (event_product) => {
        const {addItemToCart} = this.props;
        addItemToCart(event_product);
    }

    handleRemoveItemFromCart = (item) => {
        const {removeItemFromCart} = this.props;
        removeItemFromCart(item);
    }

    shouldShowMinusButton = (event_product) => {
        const {cart} = this.props;
        
        if (!cart || cart.length < 1) return false;

        const cart_products =
            cart.filter(item => item.id === event_product.id);

        return cart_products.length > 0;
    }
 
    render() {
        const {event, user} = this.props;
        return (
            <StyledMenu>
                <b>Menu</b>
                <StyledMenuContainer>
                    {event.products.map(event_product => {
                        return (
                            <StyledPanel bordered shaded>
                                <ProductRow>
                                    <ProductColumn flex={3} align="flex-start">
                                        <PriceSection>
                                            <p>{Math.round(event_product.price * user.location.currency_conversion * 100) / 100}</p>
                                            <Icon icon="circle" style={{color: '#c2b90a', margin: '0 0 0 0.5em'}}/>
                                        </PriceSection>
                                        <b>{event_product.product.name} ({event_product.product.metric_amount}{event_product.product.metric})</b>
                                    </ProductColumn>
                                    <ProductColumn flex={1} align="flex-end">
                                        <ProductRow>
                                            {this.shouldShowMinusButton(event_product) && (
                                                <IconButton 
                                                    style={{margin: '0 5px 0 0'}}
                                                    icon={<Icon icon="minus" />}
                                                    color="red" 
                                                    circle 
                                                    size="sm"
                                                    onClick={() => this.handleRemoveItemFromCart(event_product)}
                                                />
                                            )}
                                            <IconButton 
                                                icon={<Icon icon="plus" />}
                                                color="green" 
                                                circle 
                                                size="sm"
                                                onClick={() => this.handleAddItemToCart(event_product)}
                                            />                                          
                                        </ProductRow>
                                        
                                    </ProductColumn>
                                </ProductRow>
                            </StyledPanel>
                        )
                    })}
                </StyledMenuContainer>
            </StyledMenu>
        )
    }
}
