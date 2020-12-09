import React, { Component } from 'react'

const RoleValidator = (props) => {
    const hasScope = props.scopes && props.scopes.indexOf(props.scope) > - 1;
    const hasRole = props.roles && props.roles.indexOf(props.role) > -1;
    const shouldRender = hasScope && hasRole;
    return (
        <React.Fragment>
            {shouldRender && props.children}
        </React.Fragment>
    )
}
    
export default RoleValidator;