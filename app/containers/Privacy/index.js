/**
 *
 * Changelog
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import styled from 'styled-components';
import {Panel} from 'rsuite';
 
const ChangelogContainer = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
`

const StyledChangelog = styled(Panel)`
  margin: 1em;
  width: 90%;
`

/* eslint-disable react/prefer-stateless-function */
export class Privacy extends React.Component {
  render() {
    return (
      <ChangelogContainer>
        <StyledChangelog shaded>
          <h4>Here should be the Privacy page.</h4>
        </StyledChangelog>
      </ChangelogContainer>
    )
  }
}

Privacy.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Privacy);
