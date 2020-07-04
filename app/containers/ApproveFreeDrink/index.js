/**
 *
 * ApproveFreeDrink
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
import { makeSelectProduct, makeSelectError, makeSelectSuccess } from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { approveFreeDrink } from './actions';
import { Message, Panel, Icon, Divider, SelectPicker, Button } from 'rsuite';
import styled from 'styled-components';


const StyledPanel = styled(Panel)`
  margin: 1em;
`

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${props => props.justify || 'flex-start'};
`

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex: ${props => props.flex || '1'}; 
  align-items: ${props => props.align || 'flex-start'}; 
`


/* eslint-disable react/prefer-stateless-function */
export class ApproveFreeDrink extends React.Component {

  componentDidMount = () => {
    const {history, approveFreeDrink} = this.props;
    const {state} = history.location;

    if (state && state.code) {
      approveFreeDrink(state.code);
    } else {
      history.push('/');
    }
    
  }


  render() {
    const {product, error} = this.props;
    return (
      <div>
        <Helmet>
          <title>ApproveFreeDrink</title>
          <meta name="description" content="Description of ApproveFreeDrink" />
        </Helmet>
        <StyledPanel shaded>
          <StyledRow>
            {product && (
              <Message type="success" description="Successfully redemeed" style={{width: '100%'}}/>
            )}
            {error && (
              <Message type="error" description={error} style={{width: '100%'}}/>
            )}
          </StyledRow>
          {product && <Divider />}
          {product && (
            <StyledRow>
              <StyledColumn>
                  <StyledRow>
                    <b>Product</b>
                  </StyledRow>
                  <StyledRow>
                    <p>{product.product.name} ({product.product.metric_amount}{product.product.metric})</p>
                  </StyledRow>
                </StyledColumn>
            </StyledRow>
          )}
          <Divider />
        </StyledPanel>
      </div>
    );
  }
}

ApproveFreeDrink.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  product: makeSelectProduct(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    approveFreeDrink: (code) => dispatch(approveFreeDrink(code)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'approveFreeDrink', reducer });
const withSaga = injectSaga({ key: 'approveFreeDrink', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ApproveFreeDrink);
