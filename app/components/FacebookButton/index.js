import React from 'react';
import { FacebookLoginButton } from 'react-social-login-buttons';

const config = {
  text: 'Login with Facebook',
  icon: 'facebook',
  iconFormat: name => `fa fa-${name}`,
  style: { background: '#3b5998', fontSize: '12px' },
  activeStyle: { background: '#293e69' },
};

export default class FacebookButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  loadFbLoginApi() {
    window.fbAsyncInit = function() {
      window.FB.init({
        appId: '532621444084960',
        cookie: true,
        xfbml: true,
        version: 'v7.0',
      });

      window.FB.AppEvents.logPageView();
      window.FB.getLoginStatus(function(response) {
        console.log(response);
      });
    };

    (function(d, s, id) {
      let js;
      const fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src =
        'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v7.0&appId=532621444084960';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }

  componentDidMount() {
    this.loadFbLoginApi();
  }

  fieldsApi = authResponse => {
    const { facebookAuth } = this.props;
    window.FB.api('/me?fields=name,email,age_range', function(response) {
      console.log('Me', response);
      console.log(`Successful login for: ${response.name}`);
      facebookAuth({
        email: response.email,
        name: response.name,
        age_range: response.age_range,
        facebook_access_token: authResponse.accessToken,
        facebook_data_access_expiration_time:
          authResponse.data_access_expiration_time,
        facebook_user_id: authResponse.userID,
        facebook_signed_request: authResponse.signedRequest,
      });
    });
  };

  statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      this.fieldsApi(response.authResponse);
    } else if (response.status === 'not_authorized') {
      alert('Please log into this app.');
    } else {
      alert('Please log into this facebook.');
    }
  }

  checkLoginState = () => {
    window.FB.getLoginStatus(
      function(response) {
        this.statusChangeCallback(response);
      }.bind(this),
    );
  };

  handleFBLogin = () => {
    window.FB.login(this.checkLoginState, {
      scope: 'email,user_age_range',
      return_scopes: true,
    });
  };

  render() {
    return (
      <div>
        <FacebookLoginButton
          align="center"
          style={{
            fontSize: '14px',
            width: '300px',
            height: '40px',
            textAlign: 'center',
          }}
          onClick={this.handleFBLogin}
        />
      </div>
    );
  }
}
