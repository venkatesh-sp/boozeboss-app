  
/**
 * GuardedRoute
 */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectIsAuthenticated } from '../../containers/App/selectors';

const GuardedRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated ? (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      ) : (
        <div>
          <Component {...props} />
        </div>
      )
    }
  />
);

GuardedRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  isAuthenticated: PropTypes.bool,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated()
});

const withConnect = connect(
  mapStateToProps,
);

export default compose(withConnect)(GuardedRoute);