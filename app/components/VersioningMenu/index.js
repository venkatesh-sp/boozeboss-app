import React, { Component } from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledMenu = styled.div`
    display: flex;
    flex-direction: row;
    align-center: center;
    position: fixed;
    bottom: 15px;
    left: 20px;
    border-radius: 5px;
    background-color: #32C5F4;
    padding: 5px;
    z-index: 99;
`

const StyledField = styled.div`
    display: flex;
    font-size: 1.15em;
    flex-direction: row;
    margin: 0 5px 0 0;
    color: white;
`

export default class VersioningMenu extends Component {
    render() {
        return (
            <StyledMenu>
                <StyledField>
                    <p>V{process.env.PACKAGE_VERSION.replace(`"`, '').replace(`"`, '')}</p>
                </StyledField>
                <StyledField>
                    <Link to="/terms" style={{color: 'white'}}>Terms</Link>
                </StyledField>
                <StyledField>
                    <Link to="/privacy" style={{color: 'white'}}>Privacy</Link>
                </StyledField>
                <StyledField>
                    <Link to="/help" style={{color: 'white'}}>Help</Link>
                </StyledField>
            </StyledMenu>
        )
    }
}
