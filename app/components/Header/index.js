import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { IconButton, Icon, Drawer, Sidenav, Dropdown, Nav} from 'rsuite'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { logout } from '../../containers/App/actions'
import { makeSelectIsAuthenticated, makeSelectScope, makeSelectRole } from '../../containers/App/selectors';

const MobileHeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100vw;
    height: 4em;
    background-color: #F7F7FA;
    padding: 0.5em 1em 0 1em;
    background-color: ${props => props.darkTheme ? '#2b2b2c' : '#F5F5F5'} !important;
`


const StyledImage = styled.img`
    height: 15px;
    width: auto;
    margin-left: -2em;
`

const StyledDrawerLogo = styled.img`
    height: 15px;
    width: auto;
`

const StyledDrawer = styled(Drawer)`
    .rs-drawer-content {
        background-color: ${props => props.darkTheme ? '#313131' : '#F5F5F5'} !important;
    }
`

const StyledSidenav = styled(Sidenav)`
    background-color: ${props => props.darkTheme ? '#313131' : '#F5F5F5'} !important;
`

class Header extends Component {

    state = {
        show: false,
    }

    toggleMenu = () => {
        this.setState({show: !this.state.show});
    }

    handleMenuClick = (eventKey) => {
        const {handleLocationChange} = this.props;
        handleLocationChange(eventKey)
        this.setState({show: false});
    }

    handleLogout = () => {
        const {logout} = this.props;
        logout();
    }

    render() {
        const {pathname, isAuthenticated} = this.props;
        const {show} = this.state;
        return (
            <MobileHeaderContainer>
                <IconButton 
                    icon={<Icon icon="bars" />} 
                    onClick={this.toggleMenu}
                />
                <Link to="/"><StyledImage src={require('images/logo_transparent.png')}/></Link>
                <div />
                <StyledDrawer
                    placement="left"
                    size="xs"
                    show={show}
                    onHide={this.toggleMenu}
                    full
                >
                    <Drawer.Header>
                        <Drawer.Title><StyledDrawerLogo src={require('images/logo_transparent.png')}/></Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        
                        <StyledSidenav>
                            <Sidenav.Body>
                            <Nav activeKey={pathname}>
                                <Link to="/" ><Nav.Item onClick={() => this.handleMenuClick('/')} eventKey="/" icon={<Icon icon="home" />} >Home</Nav.Item></Link>
                            </Nav>
                            { isAuthenticated ? (
                                <Nav>
                                    <Nav.Item onClick={this.handleLogout}>Logout</Nav.Item>
                                </Nav>
                            ) : (
                                <Nav pullRight>
                                    {/* <Nav.Item icon={<Icon icon='moon-o' />}>Dark Mode<StyledToggle size="md" onChange={toggleTheme} checked={darkTheme} /></Nav.Item> */}
                                    <Link to="/login"><Nav.Item onClick={() => this.handleMenuClick('/login')}  icon={<Icon icon="user" />} >Login</Nav.Item></Link>
                                    <Link to="/signup"><Nav.Item onClick={() => this.handleMenuClick('/signup')}  icon={<Icon icon="user" />} >Signup</Nav.Item></Link>
                                </Nav>
                            )}
                            </Sidenav.Body>
                        </StyledSidenav>
                    </Drawer.Body>
                </StyledDrawer>
            </MobileHeaderContainer>
        )
    }
}

Header.propTypes = {
    isAuthenticated: PropTypes.bool,
    scope: PropTypes.string,
    role: PropTypes.role,
  };
  
const mapStateToProps = createStructuredSelector({
    isAuthenticated: makeSelectIsAuthenticated(),
    scope: makeSelectScope(),
    role: makeSelectRole(),
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
})


const withConnect = connect(
mapStateToProps,
mapDispatchToProps
);

export default compose(withConnect)(Header);
