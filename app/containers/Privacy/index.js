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
import { Panel } from 'rsuite';

const ChangelogContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledChangelog = {
  margin: '1em',
  width: '90%',
};

const HeadingStyle = {
  fontSize: '32px',
  fontWeight: 'SemiBold',
  color: '#2C3A56',
  textAlign: 'center',
  marginTop: '10px',
  marginBottom: '10px',
};

/* eslint-disable react/prefer-stateless-function */
export class Privacy extends React.Component {
  render() {
    return (
      <ChangelogContainer>
        <div style={StyledChangelog}>
          <div className="row m-0">
            <div
              className="container"
              style={{ fontSize: '16px', color: '#000' }}
            >
              <h4 className="text-center" style={HeadingStyle}>
                PRIVACY POLICY
              </h4>
              <div className="row">
                <div className="col-12">
                  <h5 className="font-weight-normal">
                    Effective date: 12/01/2020
                  </h5>
                </div>
                <div className="col-12">
                  <h5>1. Introduction</h5>
                  <p>
                    Welcome to ZontLabs OÜ. ZontLabs OÜ (“us”, “we”, or “our”)
                    operates www.tomati.app and Tomati.app mobile application
                    (hereinafter referred to as “Service”). Our Privacy Policy
                    governs your visit to www.tomati.app and Tomati.app mobile
                    application, and explains how we collect, safeguard and
                    disclose information that results from your use of our
                    Service. We use your data to provide and improve Service. By
                    using Service, you agree to the collection and use of
                    information in accordance with this policy. Unless otherwise
                    defined in this Privacy Policy, the terms used in this
                    Privacy Policy have the same meanings as in our Terms and
                    Conditions. Our Terms and Conditions (“Terms”) govern all
                    use of our Service and together with the Privacy Policy
                    constitutes your agreement with us (“agreement”).
                  </p>
                </div>
                <div className="col-12">
                  <h5>2. Definitions</h5>
                  <p>
                    SERVICE means the www.tomati.app website and Tomati.app
                    mobile application operated by ZontLabs OÜ.
                    <br />
                    PERSONAL DATA means data about a living individual who can
                    be identified from those data (or from those and other
                    information either in our possession or likely to come into
                    our possession).
                    <br />
                    USAGE DATA is data collected automatically either generated
                    by the use of Service or from Service infrastructure itself
                    (for example, the duration of a page visit)
                    <br />
                    COOKIES are small files stored on your device (computer or
                    mobile device).
                    <br />
                    DATA CONTROLLER means a natural or legal person who (either
                    alone or jointly or in common with other persons) determines
                    the purposes for which and the manner in which any personal
                    data are, or are to be, processed. For the purpose of this
                    Privacy Policy, we are a Data Controller of your data.
                    <br />
                    DATA PROCESSORS (OR SERVICE PROVIDERS) means any natural or
                    legal person who processes the data on behalf of the Data
                    Controller. We may use the services of various Service
                    Providers in order to process your data more effectively.
                    <br />
                    DATA SUBJECT is any living individual who is the subject of
                    Personal Data.
                    <br />
                    THE USER is the individual using our Service. The User
                    corresponds to the Data Subject, who is the subject of
                    Personal Data.
                  </p>
                </div>
                <div className="col-12">
                  <h5>3. Information Collection and Use</h5>
                  <p>
                    We collect several different types of information for
                    various purposes to provide and improve our Service to you.
                  </p>
                </div>
                <div className="col-12">
                  <h5>4. Types of Data Collected </h5>
                  <p>
                    Personal Data While using our Service, we may ask you to
                    provide us with certain personally identifiable information
                    that can be used to contact or identify you (“Personal
                    Data”). Personally identifiable information may include, but
                    is not limited to:
                    <br />
                    (a) Email address
                    <br />
                    (b) First name and last name
                    <br />
                    (c) Phone number
                    <br />
                    (d) Address, State, Province, ZIP/Postal code, City
                    <br />
                    (e) Cookies and Usage Data
                    <br />
                    We may use your Personal Data to contact you with
                    newsletters, marketing or promotional materials and other
                    information that may be of interest to you. You may opt out
                    of receiving any, or all, of these communications from us by
                    following the unsubscribe link or by emailing at
                    hello@tomati.app.
                    <br />
                    Usage Data We may also collect information that your browser
                    sends whenever you visit our Service or when you access
                    Service by or through a mobile device (“Usage Data”). This
                    Usage Data may include information such as your computer's
                    Internet Protocol address (e.g. IP address), browser type,
                    browser version, the pages of our Service that you visit,
                    the time and date of your visit, the time spent on those
                    pages, unique device identifiers and other diagnostic data.
                    <br />
                    When you access Service with a mobile device, this Usage
                    Data may include information such as the type of mobile
                    device you use, your mobile device unique ID, the IP address
                    of your mobile device, your mobile operating system, the
                    type of mobile Internet browser you use, unique device
                    identifiers and other diagnostic data. Location Data
                    <br />
                    We may use and store information about your location if you
                    give us permission to do so (“Location Data”). We use this
                    data to provide features of our Service, to improve and
                    customize our Service. You can enable or disable location
                    services when you use our Service at any time by way of your
                    device settings.
                    <br />
                    Tracking Cookies Data
                    <br />
                    We use cookies and similar tracking technologies to track
                    the activity on our Service and we hold certain information.
                    Cookies are files with a small amount of data which may
                    include an anonymous unique identifier. Cookies are sent to
                    your browser from a website and stored on your device. Other
                    tracking technologies are also used such as beacons, tags
                    and scripts to collect and track information and to improve
                    and analyze our Service. You can instruct your browser to
                    refuse all cookies or to indicate when a cookie is being
                    sent. However, if you do not accept cookies, you may not be
                    able to use some portions of our Service.
                    <br />
                    Examples of Cookies we use:
                    <br />
                    (a) Session Cookies: We use Session Cookies to operate our
                    Service.
                    <br />
                    (b) Preference Cookies: We use Preference Cookies to
                    remember your preferences and various settings.
                    <br />
                    (c) Security Cookies: We use Security Cookies for security
                    purposes.
                    <br />
                    (d) Advertising Cookies: Advertising Cookies are used to
                    serve you with advertisements that may be relevant to you
                    and your interests.
                  </p>
                </div>
                <div className="col-12">
                  <h5>5. Use of Data</h5>
                  <p>
                    ZontLabs OÜ uses the collected data for various purposes:
                    <br />
                    (a) to provide and maintain our Service;
                    <br />
                    (b) to notify you about changes to our Service;
                    <br />
                    (c) to allow you to participate in interactive features of
                    our Service when you choose to do so;
                    <br />
                    (d) to provide customer support;
                    <br />
                    (e) to gather analysis or valuable information so that we
                    can improve our Service;
                    <br />
                    (f) to monitor the usage of our Service;
                    <br />
                    (g) to detect, prevent and address technical issues;
                    <br />
                    (h) to fulfill any other purpose for which you provide it;
                    <br />
                    (i) to carry out our obligations and enforce our rights
                    arising from any contracts entered into between you and us,
                    including for billing and collection;
                    <br />
                    (j) to provide you with notices about your account and/or
                    subscription, including expiration and renewal notices,
                    email-instructions, etc.;
                    <br />
                    (k) to provide you with news, special offers and general
                    information about other goods, services and events which we
                    offer that are similar to those that you have already
                    purchased or enquired about unless you have opted not to
                    receive such information;
                    <br />
                    (l) in any other way we may describe when you provide the
                    information;
                    <br />
                    (m)for any other purpose with your consent
                  </p>
                </div>
                <div className="col-12">
                  <h5>6. Retention of Data</h5>
                  <p>
                    We will retain your Personal Data only for as long as is
                    necessary for the purposes set out in this Privacy Policy.
                    We will retain and use your Personal Data to the extent
                    necessary to comply with our legal obligations (for example,
                    if we are required to retain your data to comply with
                    applicable laws), resolve disputes, and enforce our legal
                    agreements and policies.
                    <br />
                    We will also retain Usage Data for internal analysis
                    purposes. Usage Data is generally retained for a shorter
                    period, except when this data is used to strengthen the
                    security or to improve the functionality of our Service, or
                    we are legally obligated to retain this data for longer time
                    periods.
                  </p>
                </div>
                <div className="col-12">
                  <h5>7. Transfer of Data</h5>
                  <p>
                    Your information, including Personal Data, may be
                    transferred to – and maintained on – computers located
                    outside of your state, province, country or other
                    governmental jurisdiction where the data protection laws may
                    differ from those of your jurisdiction.
                    <br />
                    If you are located outside United States and choose to
                    provide information to us, please note that we transfer the
                    data, including Personal Data, to United States and process
                    it there. Your consent to this Privacy Policy followed by
                    your submission of such information represents your
                    agreement to that transfer.
                    <br />
                    ZontLabs OÜ will take all the steps reasonably necessary to
                    ensure that your data is treated securely and in accordance
                    with this Privacy Policy and no transfer of your Personal
                    Data will take place to an organisation or a country unless
                    there are adequate controls in place including the security
                    of your data and other personal information.
                  </p>
                </div>
                <div className="col-12">
                  <h5>8. Disclosure of Data</h5>
                  <p>
                    We may disclose personal information that we collect, or you
                    provide:
                    <br />
                    (a) Disclosure for Law Enforcement.
                    <br />
                    Under certain circumstances, we may be required to disclose
                    your Personal Data if required to do so by law or in
                    response to valid requests by public authorities. (b)
                    Business Transaction.
                    <br />
                    If we or our subsidiaries are involved in a merger,
                    acquisition or asset sale, your Personal Data may be
                    transferred.
                    <br />
                    (c) Other cases. We may disclose your information also:
                    <br />
                    (i) to our subsidiaries and affiliates;
                    <br />
                    (ii) to contractors, service providers, and other third
                    parties we use to support our business;
                    <br />
                    (iii) to fulfill the purpose for which you provide it;
                    <br />
                    (iv) for the purpose of including your company’s logo on our
                    website;
                    <br />
                    (v) for any other purpose disclosed by us when you provide
                    the information;
                    <br />
                    (vi) with your consent in any other cases;
                    <br />
                    (vii)if we believe disclosure is necessary or appropriate to
                    protect the rights, property, or safety of the Company, our
                    customers, or others.
                  </p>
                </div>
                <div className="col-12">
                  <h5>9. Security of Data</h5>
                  <p>
                    The security of your data is important to us but remember
                    that no method of transmission over the Internet or method
                    of electronic storage is 100% secure. While we strive to use
                    commercially acceptable means to protect your Personal Data,
                    we cannot guarantee its absolute security.
                  </p>
                </div>
                <div className="col-12">
                  <h5>
                    10. Your Data Protection Rights Under General Data
                    Protection Regulation (GDPR)
                  </h5>
                  <p>
                    If you are a resident of the European Union (EU) and
                    European Economic Area (EEA), you have certain data
                    protection rights, covered by GDPR. – See more at
                    https://eurlex.europa.eu/eli/reg/2016/679/oj We aim to take
                    reasonable steps to allow you to correct, amend, delete, or
                    limit the use of your Personal Data.
                    <br />
                    If you wish to be informed what Personal Data we hold about
                    you and if you want it to be removed from our systems,
                    please email us at hello@tomati.app.
                    <br />
                    In certain circumstances, you have the following data
                    protection rights:
                    <br />
                    (a) the right to access, update or to delete the information
                    we have on you;
                    <br />
                    (b) the right of rectification. You have the right to have
                    your information rectified if that information is inaccurate
                    or incomplete;
                    <br />
                    (c) the right to object. You have the right to object to our
                    processing of your Personal Data;
                    <br />
                    (d) the right of restriction. You have the right to request
                    that we restrict the processing of your personal
                    information;
                    <br />
                    (e) the right to data portability. You have the right to be
                    provided with a copy of your Personal Data in a structured,
                    machine-readable and commonly used format;
                    <br />
                    (f) the right to withdraw consent. You also have the right
                    to withdraw your consent at any time where we rely on your
                    consent to process your personal information; Please note
                    that we may ask you to verify your identity before
                    responding to such requests. Please note, we may not able to
                    provide Service without some necessary data. You have the
                    right to complain to a Data Protection Authority about our
                    collection and use of your Personal Data. For more
                    information, please contact your local data protection
                    authority in the European Economic Area (EEA).
                  </p>
                </div>
                <div className="col-12">
                  <h5>11. Service Providers</h5>
                  <p>
                    We may employ third party companies and individuals to
                    facilitate our Service (“Service Providers”), provide
                    Service on our behalf, perform Service-related services or
                    assist us in analysing how our Service is used.
                    <br />
                    These third parties have access to your Personal Data only
                    to perform these tasks on our behalf and are obligated not
                    to disclose or use it for any other purpose.
                  </p>
                </div>
                <div className="col-12">
                  <h5>12. Analytics</h5>
                  <p>
                    We may use third-party Service Providers to monitor and
                    analyze the use of our Service.
                    <br />
                    Google Analytics
                    <br />
                    Google Analytics is a web analytics service offered by
                    Google that tracks and reports website traffic. Google uses
                    the data collected to track and monitor the use of our
                    Service. This data is shared with other Google services.
                    Google may use the collected data to contextualise and
                    personalise the ads of its own advertising network.
                    <br />
                    For more information on the privacy practices of Google,
                    please visit the Google Privacy Terms web page:
                    https://policies.google.com/privacy?hl=en We also encourage
                    you to review the Google's policy for safeguarding your
                    data: https://support.google.com
                    <br />
                    /analytics/answer/6004245.
                    <br />
                    Mixpanel
                    <br />
                    Mixpanel is provided by Mixpanel Inc.
                    <br />
                    You can prevent Mixpanel from using your information for
                    analytics purposes by opting-out. To opt-out of Mixpanel
                    service, please visit this page:
                    https://mixpanel.com/optout/ For more information on what
                    type of information Mixpanel collects, please visit the
                    Terms of Use page of Mixpanel: https://mixpanel.com/terms/
                  </p>
                </div>
                <div className="col-12">
                  <h5>13. CI/CD tools</h5>
                  <p>
                    We may use third-party Service Providers to automate the
                    development process of our Service.
                    <br />
                    GitHub
                    <br />
                    GitHub is provided by GitHub, Inc.
                    <br />
                    GitHub is a development platform to host and review code,
                    manage projects, and build software.
                    <br />
                    For more information on what data GitHub collects for what
                    purpose and how the protection of the data is ensured,
                    please visit GitHub Privacy Policy page:
                    https://help.github.com/en/articles/github-privacy-statement.
                  </p>
                </div>
                <div className="col-12">
                  <h5>14. Behavioral Remarketing</h5>
                  <p>
                    ZontLabs OÜ uses remarketing services to advertise on third
                    party websites to you after you visited our Service. We and
                    our third-party vendors use cookies to inform, optimise and
                    serve ads based on your past visits to our Service.
                    <br />
                    Google Ads (AdWords)
                    <br />
                    Google Ads (AdWords) remarketing service is provided by
                    Google Inc.
                    <br />
                    You can opt-out of Google Analytics for Display Advertising
                    and customize the Google Display Network ads by visiting the
                    Google Ads Settings page: http://www.google.com/settings/ads
                    Google also recommends installing the Google Analytics
                    Opt-out Browser Add-on –
                    https://tools.google.com/dlpage/gaoptout – for your web
                    browser. Google Analytics Opt-out Browser Add-on provides
                    visitors with the ability to prevent their data from being
                    collected and used by Google Analytics.
                    <br />
                    For more information on the privacy practices of Google,
                    please visit the Google Privacy Terms web page:
                    https://policies.google.com/privacy?hl=en
                    <br />
                    Twitter
                    <br />
                    Twitter remarketing service is provided by Twitter Inc. You
                    can opt-out from Twitter's interest-based ads by following
                    their instructions:
                    <br />
                    https://support.twitter.com/articles/20170405 You can learn
                    more about the privacy practices and policies of Twitter by
                    visiting their Privacy Policy page:
                    https://twitter.com/privacy
                    <br />
                    Facebook
                    <br />
                    Facebook remarketing service is provided by Facebook Inc.
                    <br />
                    You can learn more about interest-based advertising from
                    Facebook by visiting this page: https://www.facebook.com/
                    <br />
                    help/164968693837950
                    <br />
                    To opt-out from Facebook's interest-based ads, follow these
                    instructions from Facebook: https://www.facebook.com
                    <br />
                    /help/568137493302217
                    <br />
                    Facebook adheres to the Self-Regulatory Principles for
                    Online Behavioural Advertising established by the Digital
                    Advertising Alliance. You can also opt-out from Facebook and
                    other participating companies through the Digital
                    Advertising Alliance in the USA
                    http://www.aboutads.info/choices/, the Digital Advertising
                    Alliance of Canada in Canada http://youradchoices.ca/ or the
                    European Interactive Digital Advertising Alliance in Europe
                    http://www.youronlinechoices.eu/, or opt-out using your
                    mobile device settings.
                    <br />
                    For more information on the privacy practices of Facebook,
                    please visit Facebook's Data Policy:
                    https://www.facebook.com
                    <br />
                    /privacy/explanation
                  </p>
                </div>
                <div className="col-12">
                  <h5>15. Payments</h5>
                  <p>
                    We may provide paid products and/or services within Service.
                    In that case, we use third-party services for payment
                    processing (e.g. payment processors).
                    <br />
                    We will not store or collect your payment card details. That
                    information is provided directly to our third-party payment
                    processors whose use of your personal information is
                    governed by their Privacy Policy. These payment processors
                    adhere to the standards set by PCI-DSS as managed by the PCI
                    Security Standards Council, which is a joint effort of
                    brands like Visa, Mastercard, American Express and Discover.
                    PCI-DSS requirements help ensure the secure handling of
                    payment information.
                    <br />
                    The payment processors we work with are:
                    <br />
                    PayPal or Braintree:
                    <br />
                    Their Privacy Policy can be viewed at
                    https://www.paypal.com/webapps/
                    <br />
                    mpp/ua/privacy-full
                    <br />
                    Apple Store In-App Payments:
                    <br />
                    Their Privacy Policy can be viewed at:
                    https://www.apple.com/legal/privacy/en-ww/ /
                    https://support.apple.com/en-us/HT203027
                    <br />
                    Google Play In-App Payments:
                    <br />
                    Their Privacy Policy can be viewed at:
                    https://policies.google.com/privacy?hl=en&gl=us /
                    https://payments.google.com/payments/
                    <br />
                    apissecure/u/0/get_legal_document?ldo=0&ldt=privacynotice&ldl=en
                    <br />
                    Stripe:
                    <br />
                    Their Privacy Policy can be viewed at:
                    https://stripe.com/us/privacy
                    <br />
                    Authorize.net:
                    <br />
                    Their Privacy Policy can be viewed at:
                    https://www.authorize.net/about-us/privacy/
                  </p>
                </div>
                <div className="col-12">
                  <h5>16. Links to Other Sites</h5>
                  <p>
                    Our Service may contain links to other sites that are not
                    operated by us. If you click a third party link, you will be
                    directed to that third party's site. We strongly advise you
                    to review the Privacy Policy of every site you visit.
                    <br />
                    We have no control over and assume no responsibility for the
                    content, privacy policies or practices of any third party
                    sites or services.
                  </p>
                </div>
                <div className="col-12">
                  <h5>17. Children's Privacy</h5>
                  <p>
                    Our Services are not intended for use by children under the
                    age of 18 (“Child” or “Children”).
                    <br />
                    We do not knowingly collect personally identifiable
                    information from Children under 18. If you become aware that
                    a Child has provided us with Personal Data, please contact
                    us. If we become aware that we have collected Personal Data
                    from Children without verification of parental consent, we
                    take steps to remove that information from our servers.
                  </p>
                </div>
                <div className="col-12">
                  <h5>18. Changes to This Privacy Policy</h5>
                  <p>
                    We may update our Privacy Policy from time to time. We will
                    notify you of any changes by posting the new Privacy Policy
                    on this page.
                    <br />
                    We will let you know via email and/or a prominent notice on
                    our Service, prior to the change becoming effective and
                    update “effective date” at the top of this Privacy Policy.
                    You are advised to review this Privacy Policy periodically
                    for any changes. Changes to this Privacy Policy are
                    effective when they are posted on this page.
                  </p>
                </div>
                <div className="col-12">
                  <h5>19. Contact Us</h5>
                  <p>
                    If you have any questions about this Privacy Policy, please
                    contact us:
                    <br />
                    By email: hello@tomati.app.
                    <br />
                    By visiting this page on our website: www.tomati.app.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ChangelogContainer>
    );
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
