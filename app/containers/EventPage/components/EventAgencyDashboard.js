import React, { Component } from 'react';
import styled from 'styled-components';
import { Divider, Panel, Icon } from 'rsuite';

const StyledStatsContainer = styled.div`
    display: flex;
    flex-direction: column;
` 

const StyledRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
` 

const StyledPanel = styled(Panel)`
    margin: 0.5em 0 0.5em 0;
`

const StatContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: ${props => props.align || 'flex-start'};
    margin: ${props => props.margin || '0'};
    flex: 1; 
`

const Summary = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10 0 10 0;
  margin 5px 0 5px 0;
  justify-content: space-between;
`

const SummaryColumn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${props => props.justify || 'flex-start'};
  flex: ${props => props.flex || 1};
`

const ProductSummary = props => (
  <Summary>
    <SummaryColumn flex="3">
      {props.name} ({props.amount})
    </SummaryColumn>
    <SummaryColumn justify='flex-end'>
        <p>{props.total_sold}</p>
        <Icon icon="circle" style={{color: '#c2b90a', margin: '0 1em 0 0.5em'}}/>
    </SummaryColumn>
  </Summary>
)

const ProductQuantitySummary = props => (
  <Summary>
    <SummaryColumn flex="3">
      {props.name}
    </SummaryColumn>
    <SummaryColumn justify='flex-end'>
        <p>{props.amount}</p>
    </SummaryColumn>
  </Summary>
)

const RoleSummary = props => (
  <Summary>
    <SummaryColumn flex="3">
        {props.role}
    </SummaryColumn>
    <SummaryColumn justify='flex-end'>
        <p>{props.amount}</p>
    </SummaryColumn>
  </Summary>
)



export default class EventAgencyDashboard extends Component {

    getTotalBalanceSold = () => {
        const {stats_data} = this.props;
        if (!stats_data) return '-';

        // Filter cancelled and created orders 
        let total_sold = 0;
        stats_data.event_products.map(event_product => {
            const event_products_sold = 
                event_product.transactions
                    .filter(tx => tx.wallet_order.status === 'RECEIVED')
            
            total_sold = total_sold + (event_products_sold.length * event_product.price);        
        })

        return total_sold;
    }

    getTotalLiquidSold = () => {
        const {stats_data} = this.props;
        if (!stats_data) return '-';

        // Filter cancelled and created orders 
        let total_sold = 0;
        stats_data.event_products.map(event_product => {
            const event_products_sold = 
                event_product.transactions
                    .filter(tx => tx.wallet_order.status === 'RECEIVED')
            
            let milliliters;

            if (event_product.product.metric === 'ml') milliliters = event_product.product.metric_amount;
            if (event_product.product.metric === 'l') milliliters = event_product.product.metric_amount * 1000;
            
            total_sold = total_sold + (event_products_sold.length * milliliters);        
        })

        // Return the amount in liters
        return (total_sold / 1000);
    }

    getTotalGuests = () => {
        const {stats_data} = this.props;
        if (!stats_data) return '-'
        const total_guests =
                stats_data.event.guests
                    .filter(guest => guest.checked_in);

        return total_guests.length;
    }

    getSalesSummary = () => {
        const {stats_data} = this.props;

        if (!stats_data) return;

        const products = [];

        stats_data.event_products.map(event_product => {
            let total_sold = 0;
            const event_products_sold = 
                event_product.transactions
                    .filter(tx => tx.wallet_order.status === 'RECEIVED')
            
            total_sold = total_sold + (event_products_sold.length * event_product.price);        
            products.push(
                <ProductSummary 
                    name={event_product.product.name}
                    amount={event_products_sold.length}
                    total_sold={total_sold}

                />
            )

        })

        return products;
    }

    getProductQuantity = () => {
        const {stats_data} = this.props;
        if (!stats_data) return;
        
        // Get unique products
        const unique_products = [];
        const unique_products_id = [];
        stats_data.event_products.map(event_product => {
            if (event_product.product.is_cocktail) {
                event_product.product.ingredients.map(ing => {
                    if (unique_products_id.indexOf(ing.product.id) > -1) return;
                    
                    unique_products_id.push(ing.product.id);
                    unique_products.push(ing.product);
                })
            } else {
                if (unique_products_id.indexOf(event_product.product.id) > -1) return;
                    
                unique_products_id.push(event_product.product.id);
                unique_products.push(event_product.product);
            }
        })

        // Get the correct amoun of each parent product.
        const summary = [];
        unique_products.map(unique_product => {
            let quantity_sold = 0;
            stats_data.event_products.map(event_product => {

                if (event_product.product.is_cocktail) {

                    const ingredient = event_product.product.ingredients.find(ing => ing.product_id === unique_product.id);
                    if (!ingredient) return;

                    const event_products_sold = 
                        event_product.transactions
                            .filter(tx => tx.wallet_order.status === 'RECEIVED')

                    quantity_sold = quantity_sold + (event_products_sold.length * ingredient.quantity);
                } else {
                    /// No cocktails
                    if (unique_product.id !== event_product.product.id) return; 
                    const event_products_sold = 
                        event_product.transactions
                            .filter(tx => tx.wallet_order.status === 'RECEIVED')

                    const product_amount = event_product.product.metric === 'l' ? (event_product.product.metric_amount / 1000) : event_product.product.metric_amount;
                    quantity_sold = quantity_sold + (event_products_sold.length * product_amount);
                }
            })
            summary.push(
                <ProductQuantitySummary 
                    name={`${unique_product.name} (${unique_product.metric_amount}${unique_product.metric})`}
                    amount={`${quantity_sold / 1000} L`}
                />
            )
        })

        return summary;
    }

    getGuestSummary = () => {
        const {stats_data} = this.props;
        if (!stats_data) return;

        const roles = ['REGULAR', 'VIP', 'VVIP'];

        const summary = [];
        roles.map(role => {
            let total_guests = 0;
            stats_data.event.guests.map(guest => {
                if (guest.role.name !== role) return;
                total_guests++;
            })

            summary.push(<RoleSummary role={role} amount={total_guests}/>)
        })

        return summary;
    }

    render() {
        const {event} = this.props;
        return (
            <StyledStatsContainer>
                <StyledPanel 
                    shaded
                    collapsible
                    header={
                        <StyledRow> 
                            <StatContainer>
                                <p>Total Sales (QTY)</p>
                            </StatContainer>
                            <StatContainer align='flex-end' margin='0 1.5em 0 0'>
                                <b>{this.getTotalLiquidSold()} L</b>
                            </StatContainer>
                        </StyledRow>
                    }
                >
                    {this.getProductQuantity()}
                </StyledPanel>
                <StyledPanel
                    shaded
                    collapsible
                    header={
                        <StyledRow> 
                            <StatContainer>
                                <p>Total Sales ($)</p>
                            </StatContainer>
                            <StatContainer align='flex-end' margin='0 1.5em 0 0'>
                                <StyledRow>
                                    <b>{this.getTotalBalanceSold()}</b>
                                    <Icon icon="circle" style={{color: '#c2b90a', margin: '0 0 0 0.5em'}}/>
                                </StyledRow>
                            </StatContainer>
                        </StyledRow>
                    }
                >
                    {this.getSalesSummary()}
                </StyledPanel>
                <StyledPanel 
                    shaded
                    collapsible
                    header={
                        <StyledRow> 
                            <StatContainer>
                                <p>Checked-in guests</p>
                            </StatContainer>
                            <StatContainer align='flex-end' margin='0 1.5em 0 0'>
                                <b>{this.getTotalGuests( )}</b>
                            </StatContainer>
                        </StyledRow>
                    }
                >
                    {this.getGuestSummary()}
                </StyledPanel>
                <Divider />
            </StyledStatsContainer>
        )
    }
}
