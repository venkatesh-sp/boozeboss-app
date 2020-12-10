/**
 * PrivateRoute
 */

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import {
  makeSelectIsAuthenticated,
  makeSelectScope,
  makeSelectRole,
} from '../../containers/App/selectors';

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  scopesRequired,
  rolesRequired,
  scope,
  role,
  ...rest
}) => (
  <Route
    {...rest}
    render={
      props => (
        <React.Fragment>
          <Component {...props} />
        </React.Fragment>
      )
      // isAuthenticated ? (
      //   <React.Fragment>
      //     {scopesRequired &&
      //     rolesRequired &&
      //     scopesRequired.indexOf(scope) > -1 &&
      //     rolesRequired.indexOf(role) > -1 ? (
      //       <Component {...props} />
      //     ) : (
      //       <Redirect
      //         to={{ pathname: '/login', state: { from: props.location } }}
      //       />
      //     )}
      //   </React.Fragment>
      // ) : (
      //   <Redirect
      //     to={{ pathname: '/login', state: { from: props.location } }}
      //   />
      // )
    }
  />
);

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.any]),
  isAuthenticated: PropTypes.bool,
  scope: PropTypes.string,
  role: PropTypes.string,
  location: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: makeSelectIsAuthenticated(),
  scope: makeSelectScope(),
  role: makeSelectRole(),
});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(PrivateRoute);
