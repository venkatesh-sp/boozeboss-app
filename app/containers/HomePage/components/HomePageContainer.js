import React, { Component } from 'react';
import styled from 'styled-components';
import { Message, Button } from 'rsuite';
import RoleValidator from 'components/RoleValidator';
import EventList from './EventList';
import AgencyEventList from './AgencyEventList';
import MessageContainer from './MessageContainer';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1em;
`;

const StyledButton = styled(Button)`
  margin: 1em 0 0 0;
`;

export default class HomePageContainer extends Component {
  componentWillMount = () => {
    const { getEvents, getAgencyEvents, scope, role } = this.props;
    if (scope === 'GUEST' || scope === 'BRAND' || scope === 'REGION') {
      getEvents();
    }
    if (scope === 'AGENCY') {
      getAgencyEvents();
    }
    if (scope === 'OUTLET' && role === 'WAITER') {
      const { history } = this.props;
      history.push({
        pathname: '/scanner',
      });
    }
  };

  goToRoute = () => {
    const { history } = this.props;
    history.push({
      pathname: '/verification',
    });
  };

  render() {
    const { isAgeVerified, isAuthenticated, user } = this.props;
    return (
      <Container>
        {/* <MessageContainer {...this.props} goToRoute={this.goToRoute} /> */}
        {/* <RoleValidator
          {...this.props}
          scopes={['GUEST', 'BRAND', 'REGION']}
          roles={['REGULAR', 'VIP', 'VVIP', 'OWNER', 'MANAGER']}
        >
          {isAuthenticated && <EventList {...this.props} />}
        </RoleValidator> */}
        <RoleValidator
          {...this.props}
          scopes={['AGENCY']}
          roles={['OWNER', 'MANAGER', 'STAFF']}
        >
          {isAuthenticated && <AgencyEventList {...this.props} />}
        </RoleValidator>
      </Container>
    );
  }
}
