/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import VerificationContainer from 'containers/VerificationContainer/Loadable';
import InviteCodeContainer from 'containers/InviteCodeContainer/Loadable';
import VerifyCheckin from 'containers/VerifyCheckIn/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import SignupPage from 'containers/SignupPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import PrivateRoute from 'components/PrivateRoute';
import GuardedRoute from 'components/GuardedRoute';

import GlobalStyle from '../../global-styles';

import 'rsuite/dist/styles/rsuite-default.css';

const AppWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0;
  flex-direction: column;
`;

export default class App extends React.Component {

  componentWillMount = () => {
    // Login with Facebook status
    /* window.FB.getLoginStatus(function(response) {
       console.log(response);
    }); */
  }

  render () {
    return (
        <AppWrapper>
          <Helmet
            titleTemplate="%s - React.js Boilerplate"
            defaultTitle="React.js Boilerplate"
          >
            <meta name="description" content="A React.js Boilerplate application" />
          </Helmet>
          <Header />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <GuardedRoute path="/signup" component={SignupPage} />
            <GuardedRoute path="/login" component={LoginPage} />
            <PrivateRoute
              exact
              path="/verification"
              component={VerificationContainer}
              scopesRequired={['GUEST']}
              rolesRequired={['REGULAR', 'VIP', 'VIP']}
            />
            <PrivateRoute
              exact
              path="/qr-invite"
              component={InviteCodeContainer}
              scopesRequired={['GUEST']}
              rolesRequired={['REGULAR', 'VIP', 'VIP']}
            />
            <PrivateRoute
              path="/check-in"
              component={VerifyCheckin}
              scopesRequired={['AGENCY']}
              rolesRequired={['OWNER', 'MANAGER', 'STAFF']}
            />
            <Route path="" component={NotFoundPage} />
          </Switch>
          <GlobalStyle />
        </AppWrapper>
      );
  }
}
