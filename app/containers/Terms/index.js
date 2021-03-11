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
export class Terms extends React.Component {
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
                TERMS OF SERVICE
              </h4>
              <div className="row">
                <div className="col-12">
                  <h5 className="font-weight-normal">
                    Last updated: 12/01/2020
                  </h5>
                </div>
                <div className="col-12">
                  <h5>1. Introduction</h5>
                  <p>
                    Welcome to ZontLabs OÜ (“Company”, “we”, “our”, “us”)! As
                    you have just clicked our Terms of Service, please pause,
                    grab a cup of coffee and carefully read the following pages.
                    It will take you approximately 20 minutes. These Terms of
                    Service (“Terms”, “Terms of Service”) govern your use of our
                    web pages located at www.tomati.app and our mobile
                    application Tomati.app (together or individually “Service”)
                    operated by ZontLabs OÜ. Our Privacy Policy also governs
                    your use of our Service and explains how we collect,
                    safeguard and disclose information that results from your
                    use of our web pages. Please read it here
                    www.tomati.app/privacy. Your agreement with us includes
                    these Terms and our Privacy Policy (“Agreements”). You
                    acknowledge that you have read and understood Agreements,
                    and agree to be bound of them. If you do not agree with (or
                    cannot comply with) Agreements, then you may not use the
                    Service, but please let us know by emailing at
                    hello@tomati.app so we can try to find a solution. These
                    Terms apply to all visitors, users and others who wish to
                    access or use Service. Thank you for being responsible.
                  </p>
                </div>
                <div className="col-12">
                  <h5>2. Communications </h5>
                  <p>
                    By creating an Account on our Service, you agree to
                    subscribe to newsletters, marketing or promotional materials
                    and other information we may send. However, you may opt out
                    of receiving any, or all, of these communications from us by
                    following the unsubscribe link or by emailing at.
                  </p>
                </div>
                <div className="col-12">
                  <h5>3. Purchases </h5>
                  <p>
                    If you wish to purchase any product or service made
                    available through Service (“Purchase”), you may be asked to
                    supply certain information relevant to your Purchase
                    including, without limitation, your credit card number, the
                    expiration date of your credit card, your billing address,
                    and your shipping information. You represent and warrant
                    that: (i) you have the legal right to use any credit card(s)
                    or other payment method(s) in connection with any Purchase;
                    and that (ii) the information you supply to us is true,
                    correct and complete. We may employ the use of third party
                    services for the purpose of facilitating payment and the
                    completion of Purchases. By submitting your information, you
                    grant us the right to provide the information to these third
                    parties subject to our Privacy Policy. We reserve the right
                    to refuse or cancel your order at any time for reasons
                    including but not limited to: product or service
                    availability, errors in the description or price of the
                    product or service, error in your order or other reasons. We
                    reserve the right to refuse or cancel your order if fraud or
                    an unauthorized or illegal transaction is suspected.
                  </p>
                </div>
                <div className="col-12">
                  <h5>4. Contests, Sweepstakes and Promotions </h5>
                  <p>
                    Any contests, sweepstakes or other promotions (collectively,
                    “Promotions”) made available through Service may be governed
                    by rules that are separate from these Terms of Service. If
                    you participate in any Promotions, please review the
                    applicable rules as well as our Privacy Policy. If the rules
                    for a Promotion conflict with these Terms of Service,
                    Promotion rules will apply.
                  </p>
                </div>
                <div className="col-12">
                  <h5>5. Subscriptions</h5>
                  <p>
                    Some parts of Service are billed on a subscription basis
                    (“Subscription(s)”). You will be billed in advance on a
                    recurring and periodic basis (“Billing Cycle”). Billing
                    cycles are set either on a monthly or annual basis,
                    depending on the type of subscription plan you select when
                    purchasing a Subscription. At the end of each Billing Cycle,
                    your Subscription will automatically renew under the exact
                    same conditions unless you cancel it or ZontLabs OÜ cancels
                    it. You may cancel your Subscription renewal either through
                    your online account management page or by contacting
                    ZontLabs OÜ customer support team. A valid payment method,
                    including credit card or PayPal, is required to process the
                    payment for your subscription. You shall provide ZontLabs OÜ
                    with accurate and complete billing information including
                    full name, address, state, zip code, telephone number, and a
                    valid payment method information. By submitting such payment
                    information, you automatically authorize ZontLabs OÜ to
                    charge all Subscription fees incurred through your account
                    to any such payment instruments. Should automatic billing
                    fail to occur for any reason, ZontLabs OÜ will issue an
                    electronic invoice indicating that you must proceed
                    manually, within a certain deadline date, with the full
                    payment corresponding to the billing period as indicated on
                    the invoice.
                  </p>
                </div>
                <div className="col-12">
                  <h5>6. Free Trial</h5>
                  <p>
                    ZontLabs OÜ may, at its sole discretion, offer a
                    Subscription with a free trial for a limited period of time
                    (“Free Trial”). You may be required to enter your billing
                    information in order to sign up for Free Trial. If you do
                    enter your billing information when signing up for Free
                    Trial, you will not be charged by ZontLabs OÜ until Free
                    Trial has expired. On the last day of Free Trial period,
                    unless you cancelled your Subscription, you will be
                    automatically charged the applicable Subscription fees for
                    the type of Subscription you have selected. At any time and
                    without notice, ZontLabs OÜ reserves the right to (i) modify
                    Terms of Service of Free Trial offer, or (ii) cancel such
                    Free Trial offer.
                  </p>
                </div>
                <div className="col-12">
                  <h5>7. Fee Changes</h5>
                  <p>
                    ZontLabs OÜ, in its sole discretion and at any time, may
                    modify Subscription fees for the Subscriptions. Any
                    Subscription fee change will become effective at the end of
                    the thencurrent Billing Cycle. 3 ZontLabs OÜ will provide
                    you with a reasonable prior notice of any change in
                    Subscription fees to give you an opportunity to terminate
                    your Subscription before such change becomes effective. Your
                    continued use of Service after Subscription fee change comes
                    into effect constitutes your agreement to pay the modified
                    Subscription fee amount.
                  </p>
                </div>
                <div className="col-12">
                  <h5>8. Refunds</h5>
                  <p>
                    We issue refunds for Contracts within forty-five (45) days
                    of the original purchase of the Contract.
                  </p>
                </div>
                <div className="col-12">
                  <h5>9. Content</h5>
                  <p>
                    Our Service allows you to post, link, store, share and
                    otherwise make available certain information, text,
                    graphics, videos, or other material (“Content”). You are
                    responsible for Content that you post on or through Service,
                    including its legality, reliability, and appropriateness. By
                    posting Content on or through Service, You represent and
                    warrant that: (i) Content is yours (you own it) and/or you
                    have the right to use it and the right to grant us the
                    rights and license as provided in these Terms, and (ii) that
                    the posting of your Content on or through Service does not
                    violate the privacy rights, publicity rights, copyrights,
                    contract rights or any other rights of any person or entity.
                    We reserve the right to terminate the account of anyone
                    found to be infringing on a copyright. You retain any and
                    all of your rights to any Content you submit, post or
                    display on or through Service and you are responsible for
                    protecting those rights. We take no responsibility and
                    assume no liability for Content you or any third party posts
                    on or through Service. However, by posting Content using
                    Service you grant us the right and license to use, modify,
                    publicly perform, publicly display, reproduce, and
                    distribute such Content on and through Service. You agree
                    that this license includes the right for us to make your
                    Content available to other users of Service, who may also
                    use your Content subject to these Terms. ZontLabs OÜ has the
                    right but not the obligation to monitor and edit all Content
                    provided by users. In addition, Content found on or through
                    this Service are the property of ZontLabs OÜ or used with
                    permission. You may not distribute, modify, transmit, reuse,
                    download, repost, copy, or use said Content, whether in
                    whole or in part, for commercial purposes or for personal
                    gain, without express advance written permission from us.
                  </p>
                </div>
                <div className="col-12">
                  <h5>10. Prohibited Uses</h5>
                  <p>
                    You may use Service only for lawful purposes and in
                    accordance with Terms. You agree not to use Service: (a) In
                    any way that violates any applicable national or
                    international law or regulation. (b) For the purpose of
                    exploiting, harming, or attempting to exploit or harm minors
                    in any way by exposing them to inappropriate content or
                    otherwise. (c) To transmit, or procure the sending of, any
                    advertising or promotional material, including any “junk
                    mail”, “chain letter,” “spam,” or any other similar
                    solicitation. 4 (d) To impersonate or attempt to impersonate
                    Company, a Company employee, another user, or any other
                    person or entity. (e) In any way that infringes upon the
                    rights of others, or in any way is illegal, threatening,
                    fraudulent, or harmful, or in connection with any unlawful,
                    illegal, fraudulent, or harmful purpose or activity. (f) To
                    engage in any other conduct that restricts or inhibits
                    anyone’s use or enjoyment of Service, or which, as
                    determined by us, may harm or offend Company or users of
                    Service or expose them to liability.
                  </p>
                </div>
                <div className="col-12">
                  <h5>Additionally, you agree not to:</h5>
                  <p>
                    (a) Use Service in any manner that could disable,
                    overburden, damage, or impair Service or interfere with any
                    other party’s use of Service, including their ability to
                    engage in real time activities through Service. (b) Use any
                    robot, spider, or other automatic device, process, or means
                    to access Service for any purpose, including monitoring or
                    copying any of the material on Service. (c) Use any manual
                    process to monitor or copy any of the material on Service or
                    for any other unauthorized purpose without our prior written
                    consent. (d) Use any device, software, or routine that
                    interferes with the proper working of Service. (e) Introduce
                    any viruses, trojan horses, worms, logic bombs, or other
                    material which is malicious or technologically harmful. (f)
                    Attempt to gain unauthorized access to, interfere with,
                    damage, or disrupt any parts of Service, the server on which
                    Service is stored, or any server, computer, or database
                    connected to Service. (g) Attack Service via a
                    denial-of-service attack or a distributed denial-of-service
                    attack. (h) Take any action that may damage or falsify
                    Company rating. (i) Otherwise attempt to interfere with the
                    proper working of Service.
                  </p>
                </div>
                <div className="col-12">
                  <h5>20. Limitation Of Liability</h5>
                  <p>
                    EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR
                    OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS HARMLESS FOR ANY
                    INDIRECT, PUNITIVE, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL
                    DAMAGE, HOWEVER IT ARISES (INCLUDING ATTORNEYS' FEES AND ALL
                    RELATED COSTS AND EXPENSES OF LITIGATION AND ARBITRATION, OR
                    AT TRIAL OR ON APPEAL, IF ANY, WHETHER OR NOT LITIGATION OR
                    ARBITRATION IS INSTITUTED), WHETHER IN AN ACTION OF
                    CONTRACT, NEGLIGENCE, OR OTHER TORTIOUS ACTION, OR ARISING
                    OUT OF OR IN CONNECTION WITH THIS AGREEMENT, INCLUDING
                    WITHOUT LIMITATION ANY CLAIM FOR PERSONAL INJURY OR PROPERTY
                    DAMAGE, ARISING FROM THIS AGREEMENT AND ANY VIOLATION BY YOU
                    OF ANY FEDERAL, STATE, OR LOCAL LAWS, STATUTES, RULES, OR
                    REGULATIONS, EVEN IF COMPANY HAS BEEN PREVIOUSLY ADVISED OF
                    THE POSSIBILITY OF SUCH DAMAGE. EXCEPT AS PROHIBITED BY LAW,
                    IF THERE IS LIABILITY FOUND ON THE PART OF COMPANY, IT WILL
                    BE LIMITED TO THE AMOUNT PAID FOR THE PRODUCTS AND/OR
                    SERVICES, AND UNDER NO CIRCUMSTANCES WILL THERE BE
                    CONSEQUENTIAL OR PUNITIVE DAMAGES. SOME STATES DO NOT ALLOW
                    THE EXCLUSION OR LIMITATION OF PUNITIVE, INCIDENTAL OR
                    CONSEQUENTIAL DAMAGES, SO THE PRIOR LIMITATION OR EXCLUSION
                    MAY NOT APPLY TO YOU.
                  </p>
                </div>
                <div className="col-12">
                  <h5>21. Termination</h5>
                  <p>
                    We may terminate or suspend your account and bar access to
                    Service immediately, without prior notice or liability,
                    under our sole discretion, for any reason whatsoever and
                    without limitation, including but not limited to a breach of
                    Terms. If you wish to terminate your account, you may simply
                    discontinue using Service. All provisions of Terms which by
                    their nature should survive termination shall survive
                    termination, including, without limitation, ownership
                    provisions, warranty disclaimers, indemnity and limitations
                    of liability.
                  </p>
                </div>
                <div className="col-12">
                  <h5>22. Governing Law</h5>
                  <p>
                    These Terms shall be governed and construed in accordance
                    with the laws of Republic of Estonia without regard to its
                    conflict of law provisions. Our failure to enforce any right
                    or provision of these Terms will not be considered a waiver
                    of those rights. If any provision of these Terms is held to
                    be invalid or unenforceable by a court, the remaining
                    provisions of these Terms will remain in effect. These Terms
                    constitute the entire agreement between us regarding our
                    Service and supersede and replace any prior agreements we
                    might have had between us regarding Service.
                  </p>
                </div>
                <div className="col-12">
                  <h5>23. Changes To Service</h5>
                  <p>
                    We reserve the right to withdraw or amend our Service, and
                    any service or material we provide via Service, in our sole
                    discretion without notice. We will not be liable if for any
                    reason all or any part of Service is unavailable at any time
                    or for any period. From time to time, we may restrict access
                    to some parts of Service, or the entire Service, to users,
                    including registered users.
                  </p>
                </div>
                <div className="col-12">
                  <h5>24. Amendments To Terms</h5>
                  <p>
                    We may amend Terms at any time by posting the amended terms
                    on this site. It is your responsibility to review these
                    Terms periodically. 9 Your continued use of the Platform
                    following the posting of revised Terms means that you accept
                    and agree to the changes. You are expected to check this
                    page frequently so you are aware of any changes, as they are
                    binding on you. By continuing to access or use our Service
                    after any revisions become effective, you agree to be bound
                    by the revised terms. If you do not agree to the new terms,
                    you are no longer authorized to use Service.
                  </p>
                </div>
                <div className="col-12">
                  <h5>25. Waiver And Severability</h5>
                  <p>
                    No waiver by Company of any term or condition set forth in
                    Terms shall be deemed a further or continuing waiver of such
                    term or condition or a waiver of any other term or
                    condition, and any failure of Company to assert a right or
                    provision under Terms shall not constitute a waiver of such
                    right or provision. If any provision of Terms is held by a
                    court or other tribunal of competent jurisdiction to be
                    invalid, illegal or unenforceable for any reason, such
                    provision shall be eliminated or limited to the minimum
                    extent such that the remaining provisions of Terms will
                    continue in full force and effect.
                  </p>
                </div>
                <div className="col-12">
                  <h5>26. Acknowledgement</h5>
                  <p>
                    BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU
                    ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND
                    AGREE TO BE BOUND BY THEM.
                  </p>
                </div>
                <div className="col-12">
                  <h5>27. Contact Us</h5>
                  <p>
                    Please send your feedback, comments, requests for technical
                    support: By email: hello@tomati.app. By visiting this page
                    on our website: www.tomati.app.
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

Terms.propTypes = {
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

export default compose(withConnect)(Terms);
