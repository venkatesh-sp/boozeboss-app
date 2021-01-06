/**
 *
 * ActionsContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { makeSelectSuccess, makeSelectActions, makeSelectError} from './selectors';
import { makeSelectUser } from '../App/selectors';
import { getWalletActions } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { TransferAction, PurchaseAction, OrderAction } from './components';
import {Divider, Message, Button} from 'rsuite';
import styled from 'styled-components';
import { Whatsapp } from '@styled-icons/simple-icons';
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em;
  flex: 1;
`

const TitleContainer = styled.div`
  width: 100;
  padding: 1em 0 1em 0;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: #DCDCDC;
`

const ActionsSection = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 1em 0 0 0;
`

/* eslint-disable react/prefer-stateless-function */
export class ActionsContainer extends React.Component {

  componentDidMount = () => {
    const {getWalletActions, user} = this.props;
    if (user) {
      getWalletActions();
    } else {
      setTimeout(() => {
        getWalletActions();
      }, 500)
    }
    
  }

  render() {
    const {actions} = this.props;
    return (
      <div>
        <Helmet>
          <title>ActionsContainer</title>
          <meta name="description" content="Description of ActionsContainer" />
        </Helmet>
        <StyledDiv>
          <TitleContainer>
            <b>Latest Transactions</b>
          </TitleContainer>
          {actions && actions.length > 0 ? (
            <ActionsSection>
              {actions.map(action => {
                if (action.action === 'RECEIVED_TRANSFER' || action.action === 'SENT_TRANSFER') {
                  return <TransferAction {...this.props} action={action} />
                }
                if (action.action === 'PURCHASE' && action.status === 'APPROVED') {
                  return <PurchaseAction {...this.props} action={action} />
                }
                if (action.action === 'ORDER') {
                  return <OrderAction {...this.props} action={action} />
                }
              })}
            </ActionsSection>
          ) : (
            <Message type="info" description="All your purchases, orders and transfers will appear here." />
          )}
        </StyledDiv>
        <Button
        href='https://api.whatsapp.com/send?phone=919493871441'
        style={{
          position: 'fixed',
          width: '30px',
          height: '30px',
          bottom: '50px',
          right: '10px',
          backgroundColor: '#25D366',
          color: '#fff',
          padding: '0px', 
          borderRadius: '50px',
          textAlign: 'center',
          fontSize: '0px',
          zIndex: '100',
        }}
        >
          <Whatsapp />
        </Button>
      </div>
    );
  }
}

ActionsContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  actions: makeSelectActions(),
  user: makeSelectUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    getWalletActions: () => dispatch(getWalletActions()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'actionsContainer', reducer });
const withSaga = injectSaga({ key: 'actionsContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ActionsContainer);
