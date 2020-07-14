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
      this.setState({
        placement,
        show: true
      });
    }

    render() {
      const {action} = this.props;
      const {show} = this.state;
      return (
        <div>
          <TransferCard 
            shaded
            title="action"
            // onClick={() => this.toggleDrawer('right')}
          >
            <TransferRow >
                <TransferColumn>
                  <p>{moment(action.created_at).format('DD/MMM/YYYY LT')}</p>
                </TransferColumn>
                <TransferColumn>
                  {/* <Icon icon="angle-right" style={{ color: '#1675e0' }} /> */}
                </TransferColumn>
              
            </TransferRow>  
            <TransferRow> 
                {action.payment_type === 'QR' && <span>Purchase <b>{action.amount}</b><Icon icon="circle" style={{color: '#c2b90a', margin: '0 0.25em 0 0.5em'}}/> at <b>{action.event && action.event.brief_event && action.event.brief_event.name}</b> using <b>Cash</b></span>}
                {action.payment_type === 'PAYPAL' && <span>Purchase <b>{action.amount}</b><Icon icon="circle" style={{color: '#c2b90a', margin: '0 0.25em 0 0.5em'}}/>using <b>Paypal</b></span>}
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
  