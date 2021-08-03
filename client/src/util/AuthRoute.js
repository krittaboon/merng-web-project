//Prevent user access login and register page via url when they are already done auth process
import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router-dom'

import { AuthContext } from '../context/auth'

function AuthRoute({ component: Component, ...rest }) {
    const context = useContext(AuthContext)

    return (
        <Route {...rest}
            render={props => context.user ? <Redirect to="/" /> : <Component {...props} />} />
    )
}

export default AuthRoute;