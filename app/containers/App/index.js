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
import VerifyCheckOut from 'containers/VerifyCheckOut/Loadable';
import WalletOrder from 'containers/WalletOrder/Loadable';
import OrderPage from 'containers/OrderPage/Loadable';
import QrScanner from 'containers/QrScanner/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import EventPage from 'containers/EventPage/Loadable';
import SignupPage from 'containers/SignupPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import AddCredits from 'containers/AddCredits/Loadable';
import ApproveCredits from 'containers/ApproveCredits/Loadable';
import ActionsContainer from 'containers/ActionsContainer/Loadable';
import TransferCredits from 'containers/TransferCredits/Loadable';
import FreeDrink from 'containers/FreeDrinkCode/Loadable';
import ApproveFreeDrink from 'containers/ApproveFreeDrink/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Help from 'containers/Help';
import Terms from 'containers/Terms';
import Privacy from 'containers/Privacy';
import Header from 'components/Header';
import Footer from 'components/Footer';
import PrivateRoute from 'components/PrivateRoute';
import GuardedRoute from 'components/GuardedRoute';

import PWAPrompt from 'react-ios-pwa-prompt';

import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import Signup from 'containers/Signup';
import saga from './saga';
import GlobalStyle from '../../global-styles';

import 'rsuite/dist/styles/rsuite-default.css';
import Restaurant from '../Restaurant';
import Basket from '../Basket';
import Cart from '../Cart';
import Login from '../Login';
import Otp from '../Otp';

const AppWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0;
  flex-direction: column;
`;

class App extends React.Component {
  componentWillMount = () => {
    // Login with Facebook status
    /* window.FB.getLoginStatus(function(response) {
       console.log(response);
    }); */
  };

  render() {
    return (
      <AppWrapper>
        <Helmet titleTemplate="%s - BoozeBoss" defaultTitle="BoozeBoss">
          <meta name="description" content="BoozeBoss" />
        </Helmet>
        <Header />
        <Switch>
          <PrivateRoute
            exact
            path="/otp"
            component={Otp}
            scopesRequired={['GUEST', 'AGENCY', 'BRAND', 'REGION']}
            rolesRequired={[
              'OWNER',
              'MANAGER',
              'STAFF',
              'REGULAR',
              'VIP',
              'VIP',
            ]}
          />
          <PrivateRoute
            exact
            path="/login"
            component={Login}
            scopesRequired={['GUEST', 'AGENCY', 'BRAND', 'REGION']}
            rolesRequired={[
              'OWNER',
              'MANAGER',
              'STAFF',
              'REGULAR',
              'VIP',
              'VIP',
            ]}
          />
          <PrivateRoute
            exact
            path="/cart"
            component={Cart}
            scopesRequired={['GUEST', 'AGENCY', 'BRAND', 'REGION']}
            rolesRequired={[
              'OWNER',
              'MANAGER',
              'STAFF',
              'REGULAR',
              'VIP',
              'VIP',
            ]}
          />
          <PrivateRoute
            exact
            path="/basket"
            component={Basket}
            scopesRequired={['GUEST', 'AGENCY', 'BRAND', 'REGION']}
            rolesRequired={[
              'OWNER',
              'MANAGER',
              'STAFF',
              'REGULAR',
              'VIP',
              'VIP',
            ]}
          />
          {/* Restaurant Route */}
          <PrivateRoute
            exact
            path="/restuarant"
            component={Restaurant}
            scopesRequired={['GUEST', 'AGENCY', 'BRAND', 'REGION']}
            rolesRequired={[
              'OWNER',
              'MANAGER',
              'STAFF',
              'REGULAR',
              'VIP',
              'VIP',
            ]}
          />
          {/* Signup Route */}
          <PrivateRoute
            exact
            path="/signup"
            component={Signup}
            scopesRequired={['GUEST', 'AGENCY', 'BRAND', 'REGION']}
            rolesRequired={[
              'OWNER',
              'MANAGER',
              'STAFF',
              'REGULAR',
              'VIP',
              'VIP',
            ]}
          />
          <PrivateRoute
            exact
            path="/"
            component={HomePage}
            scopesRequired={['GUEST', 'AGENCY', 'BRAND', 'REGION']}
            rolesRequired={[
              'OWNER',
              'MANAGER',
              'STAFF',
              'REGULAR',
              'VIP',
              'VIP',
            ]}
          />
          <GuardedRoute path="/signup" component={SignupPage} />
          <GuardedRoute path="/login" component={LoginPage} />
          <PrivateRoute
            path="/event"
            component={EventPage}
            scopesRequired={['GUEST', 'AGENCY', 'BRAND']}
            rolesRequired={[
              'OWNER',
              'MANAGER',
              'STAFF',
              'REGULAR',
              'VIP',
              'VIP',
            ]}
          />
          <PrivateRoute
            path="/scanner"
            component={QrScanner}
            scopesRequired={['AGENCY']}
            rolesRequired={['OWNER', 'MANAGER', 'STAFF']}
          />
          <PrivateRoute
            exact
            path="/verification"
            component={VerificationContainer}
            scopesRequired={['GUEST']}
            rolesRequired={['REGULAR', 'VIP', 'VIP']}
          />
          <PrivateRoute
            exact
            path="/wallet-history"
            component={ActionsContainer}
            scopesRequired={['GUEST']}
            rolesRequired={['REGULAR', 'VIP', 'VIP']}
          />
          <PrivateRoute
            exact
            path="/add-credits"
            component={AddCredits}
            scopesRequired={['GUEST', 'BRAND']}
            rolesRequired={['REGULAR', 'VIP', 'VIP', 'OWNER', 'MANAGER']}
          />
          <PrivateRoute
            exact
            path="/approve-credits"
            component={ApproveCredits}
            scopesRequired={['AGENCY']}
            rolesRequired={['OWNER', 'MANAGER', 'STAFF']}
          />
          <PrivateRoute
            exact
            path="/transfer-credits"
            component={TransferCredits}
            scopesRequired={['GUEST', 'BRAND']}
            rolesRequired={['REGULAR', 'VIP', 'VIP', 'OWNER', 'MANAGER']}
          />
          <PrivateRoute
            exact
            path="/qr-invite"
            component={InviteCodeContainer}
            scopesRequired={['GUEST', 'BRAND']}
            rolesRequired={['OWNER', 'MANAGER', 'REGULAR', 'VIP', 'VIP']}
          />
          <PrivateRoute
            path="/check-in"
            component={VerifyCheckin}
            scopesRequired={['AGENCY']}
            rolesRequired={['OWNER', 'MANAGER', 'STAFF']}
          />
          <PrivateRoute
            path="/check-out"
            component={VerifyCheckOut}
            scopesRequired={['AGENCY', 'BRAND']}
            rolesRequired={['OWNER', 'MANAGER', 'STAFF', 'OWNER', 'MANAGER']}
          />
          <PrivateRoute
            path="/approve-free-drink"
            component={ApproveFreeDrink}
            scopesRequired={['AGENCY']}
            rolesRequired={['OWNER', 'MANAGER', 'STAFF']}
          />
          <PrivateRoute
            path="/free-drink"
            component={FreeDrink}
            scopesRequired={['GUEST', 'BRAND']}
            rolesRequired={['REGULAR', 'VIP', 'VIP', 'ONWER', 'AGENCY']}
          />
          <PrivateRoute
            path="/new-order"
            component={WalletOrder}
            scopesRequired={['GUEST', 'BRAND']}
            rolesRequired={['REGULAR', 'VIP', 'VIP', 'ONWER', 'AGENCY']}
          />
          <PrivateRoute
            path="/orders/:order_identifier"
            component={OrderPage}
            scopesRequired={['GUEST', 'AGENCY', 'BRAND']}
            rolesRequired={[
              'REGULAR',
              'VIP',
              'VIP',
              'OWNER',
              'MANAGER',
              'STAFF',
            ]}
          />
          <Route path="/terms" component={Terms} />
          <Route path="/privacy" component={Privacy} />
          <Route path="/help" component={Help} />
          <Route path="" component={NotFoundPage} />
        </Switch>
        <GlobalStyle />
        <PWAPrompt promptOnVisit={5} timesToShow={999} />
      </AppWrapper>
    );
  }
}

const withSaga = injectSaga({ key: 'app', saga });

export default compose(withSaga)(App);
