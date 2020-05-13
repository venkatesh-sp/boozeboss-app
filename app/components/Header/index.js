import React, { Component } from 'react'
import { IconButton, Icon, Drawer, Sidenav, Dropdown, Nav, Toggle } from 'rsuite'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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

const StyledToggle = styled(Toggle)`
  margin: 0 0 0 10px;
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

export default class MobileHeader extends Component {

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

    render() {
        const {pathname, handleLogout, isAuthenticated, darkTheme, toggleTheme} = this.props;
        const {show} = this.state;
        return (
            <MobileHeaderContainer darkTheme={darkTheme}>
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
                    darkTheme={darkTheme}
                    full
                >
                    <Drawer.Header>
                        <Drawer.Title><StyledDrawerLogo src={require('images/logo_transparent.png')}/></Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                        
                        <StyledSidenav darkTheme={darkTheme}>
                            <Sidenav.Body>
                            <Nav activeKey={pathname}>
                                <Link to="/" ><Nav.Item onClick={() => this.handleMenuClick('/')} eventKey="/" icon={<Icon icon="home" />} >Home</Nav.Item></Link>
                            </Nav>
                            { isAuthenticated ? (
                                <Nav pullRight>
                                    <Dropdown title="More">
                                        {/* <Dropdown.Item icon={<Icon icon='moon-o' />}>Dark Mode<StyledToggle size="md" onChange={toggleTheme} checked={darkTheme} /></Dropdown.Item> */}
                                        <Dropdown.Item onSelect={handleLogout}>Logout</Dropdown.Item>
                                    </Dropdown>
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