/**
 *
 * TransferCredits
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
import { makeSelectSuccess, makeSelectError} from './selectors';
import { makeSelectUser } from '../App/selectors'
import reducer from './reducer';
import { transfer } from './actions';
import saga from './saga';
import messages from './messages';
import styled from 'styled-components';
import { Panel, Divider, InputNumber, Input, Button } from 'rsuite';

const StyledPanel = styled(Panel)`
  margin: 1em;
`

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${props => props.justify || 'flex-start'};
  margin: 10px 0 10px 0;
`

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: ${props => props.flex || '1'}; 
  align-items: ${props => props.align || 'flex-start'}; 
`


/* eslint-disable react/prefer-stateless-function */
export class TransferCredits extends React.Component {

  state = {
    amount: 0,
    target_email: null,
  }

  handleChange = (value, name) => {
    this.setState({[name]: value});
  }

  handleTransfer = () => {
    const {amount, target_email} = this.state;
    const {transfer} = this.props;
    if (amount < 1 || !target_email || target_email.length < 1) return alert('Invalid fields');
    transfer(amount, target_email);
  }
  
  render() {
    const {amount, target_email} = this.state;
    const {user} = this.props;
    return (
      <div>
        <Helmet>
          <title>TransferCredits</title>
          <meta name="description" content="Description of TransferCredits" />
        </Helmet>
        <StyledPanel shaded>
          <StyledRow>
            <StyledColumn>
              <b>Credit Amount:</b>
            </StyledColumn>
          </StyledRow>
          <StyledRow>
            <StyledColumn>
              <InputNumber 
                min={0}
                max={user && user.wallet.balance}
                value={amount}
                onChange={(value) => this.handleChange(value, 'amount')}
              />
            </StyledColumn>
          </StyledRow>
          <StyledRow>
            <StyledColumn>
              <b>Transfer to:</b>
            </StyledColumn>
          </StyledRow>
          <StyledRow>
            <StyledColumn>
              <Input 
                  placeholder="Account Email"
                  value={target_email}
                  onChange={(value) => this.handleChange(value, 'target_email')}
              />
            </StyledColumn>
          </StyledRow>
          <Divider />
          <Button 
            color="green" 
            block
            disabled={amount < 1 || !target_email || target_email.length < 1}
            onClick={this.handleTransfer}
          >
            Transfer
          </Button>
        </StyledPanel>
      </div>
    );
  }
}

TransferCredits.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser()
});

function mapDispatchToProps(dispatch) {
  return {
    transfer: (amount, target_email) => dispatch(transfer(amount, target_email))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'transferCredits', reducer });
const withSaga = injectSaga({ key: 'transferCredits', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TransferCredits);
