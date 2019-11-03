import React from 'react'
import { Route, Redirect } from 'wouter-preact'
import useAuth from '../../hooks/useAuth'

const PrivateRoute = ({ children, ...rest }) => {
  const { isAuthenticated } = useAuth()
  return (
    <Route {...rest}>
      {isAuthenticated ? children : <Redirect to="/login" />}
    </Route>
  )
}

export default PrivateRoute
