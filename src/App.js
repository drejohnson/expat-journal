import { h } from 'preact'
import { Switch, Route, Redirect } from 'wouter-preact'

import useAuth from './hooks/useAuth'

// Code-splitting is automated for routes
import PrivateRoute from './components/PrivateRoute'
import Home from './routes/Home'
import Posts from './routes/Posts'
import Login from './routes/Login'

const App = () => {
  const { isAuthenticated } = useAuth()
  return (
    <div id="app">
      <Switch>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
        <PrivateRoute path="/posts">
          <Posts />
        </PrivateRoute>
        <Route path="/login">
          {isAuthenticated ? <Redirect to="/" /> : <Login />}
        </Route>
        <Route path="/:rest">
          <center>
            <b>404:</b> Sorry, this page isn't ready yet!
          </center>
        </Route>
      </Switch>
    </div>
  )
}

export default App
