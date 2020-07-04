/**
 *
 * FreeDrinkCode
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Panel, Button, Divider } from 'rsuite';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {makeSelectSuccess, makeSelectError, makeSelectCode, makeSelectProduct} from './selectors';
import { generateCode } from './actions';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import styled from 'styled-components';
import QRCode from "react-qr-code";

const InviteContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em;
  justify-content: center;
  flex: 1;
`

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
`

const QRSection = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  margin: 1em;  
`

/* eslint-disable react/prefer-stateless-function */
export class FreeDrinkCode extends React.Component {

  componentDidMount = () => {
    const {history, generateCode} = this.props;
    const {state} = history.location;
    
    if (!state || !state.event_guest) {
      history.push({pathname: '/'})
    } else {
      generateCode(state.event_guest.event_id, state.event_guest.id);
    }
  }


  render() {
    const {code, product} = this.props;
    return (
      <div>
        <Helmet>
          <title>FreeDrinkCode</title>
          <meta name="description" content="Description of FreeDrinkCode" />
        </Helmet>
        <InviteContainer>
            <Panel bordered>
              <InfoSection>
                <h5>Free Drink</h5>
                {product && (
                    <p>{product.product.name} ({product.product.metric_amount} {product.product.metric})</p>
                )}
              </InfoSection>
              <Divider />
              {code && (
                <React.Fragment>
                  <p>Please scan this code in the venue entrance to check-in into the event.</p>
                  <QRSection>
                    {code ? (
                      <QRCode value={JSON.stringify({code, type: 'free-drink'})}/>
                    ) : (
                      <Loader />
                    )}
                  </QRSection>
                </React.Fragment>
              )}
              <Button block color="green" onClick={() => this.props.history.goBack()}>
                Go Back
              </Button>
            </Panel>
        </InviteContainer>
      </div>
    );
  }
}

FreeDrinkCode.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  code: makeSelectCode(),
  product: makeSelectProduct(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    generateCode: (event_id, event_guest_id) => dispatch(generateCode(event_id, event_guest_id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'freeDrinkCode', reducer });
const withSaga = injectSaga({ key: 'freeDrinkCode', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(FreeDrinkCode);
