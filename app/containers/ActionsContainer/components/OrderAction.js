import React, { Component } from 'react';
import { IconButton, Icon, Drawer, Button, Panel } from 'rsuite';
import styled from 'styled-components';
import moment from 'moment';

const TransferCard = styled(Panel)`
  margin: 0.5em 1em 0.5em 1em;
  width: 90%;
`

const TransferRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0.5em 0 0.5em 0;
  font-size: 0.85em;
  ${props => props.bordered && `
    border-bottom-style: solid;
    border-bottom-width: 1px;
    border-bottom-color: #DCDCDC;
    padding: 0.5em 0 0.5em 0;
  `}
`

const TransferColumn = styled.div`
  display: flex;
  flex-direction: column;
`

export default class TransferAction extends React.Component {
    
    state = {
      show: false
    }

    close = () => {
      this.setState({
        show: false
      });
    }

    toggleDrawer(placement) {
        const {history, action} = this.props;

        if (action.status === 'CANCELLED') {
            return;
        } else {
            history.push({
                pathname: `orders/${action.order_identifier}`
            })
        }
    }

    render() {
      const {action, user} = this.props;
      const {show} = this.state;
      return (
        <div>
          <TransferCard 
            shaded
            title="action"
            onClick={() => this.toggleDrawer('right')}
          >
            <TransferRow >
                <TransferColumn>
                  <p>{moment(action.created_at).format('DD/MMM/YYYY LT')}</p>
                </TransferColumn>
                <TransferColumn>
                    <span style={{display: 'flex', flexDirection: 'row', color: '#1675e0' }}>
                        {action.status === 'RECEIVED' && <p>See Receipt</p>}
                        {action.status === 'CREATED' && <p>Show Code</p>}
                        {(action.status === 'RECEIVED' || action.status === 'CREATED' )&& (
                            <Icon icon="angle-right" style={{ color: '#1675e0', margin: '0 0 0 0.5em' }} />
                        )}
                    </span>
                </TransferColumn>
              
            </TransferRow>  
            <TransferRow> 
                {action.status === 'RECEIVED' && <span>You spent <b>{Math.round(action.total_amount * user.location.currency_conversion * 100) / 100}</b><Icon icon="circle" style={{color: '#c2b90a', margin: '0 0.25em 0 0.5em'}}/> at <b>{action.event.brief_event.name}</b> at order <b>{action.order_identifier}</b></span>}
                {action.status === 'CREATED' && <span>You created the order <b>{action.order_identifier}</b> at <b>{action.event.brief_event.name}</b> (<b>{Math.round(action.total_amount * user.location.currency_conversion * 100) / 100}</b><Icon icon="circle" style={{color: '#c2b90a', margin: '0 0.25em 0 0.5em'}}/>)</span>}
                {action.status === 'CANCELLED' && <span>Order <b>{action.order_identifier}</b> at <b>{action.event.brief_event.name}</b> cancelled and refunded (<b>{Math.round(action.total_amount * user.location.currency_conversion * 100) / 100}</b><Icon icon="circle" style={{color: '#c2b90a', margin: '0 0.25em 0 0.5em'}}/>)</span>}
            </TransferRow>
          </TransferCard>
  
          <Drawer
            placement="right"
            size="xs"
            show={show}
            onHide={this.close}
            full
          >
            <Drawer.Header>
              <Drawer.Title>Drawer Title</Drawer.Title>
            </Drawer.Header>
            <Drawer.Body>

            </Drawer.Body>
          </Drawer>
        </div>
      );
    }
  }
  