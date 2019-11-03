import { h } from 'preact'
import { Switch, Route } from 'wouter-preact'

import { AuthProvider } from './context/Auth'
import { FirebaseProvider } from './context/Firebase'
import ApolloProvider from './apollo/ApolloProvider'

// Code-splitting is automated for routes
import PrivateRoute from './components/PrivateRoute'
import Home from './routes/Home'
import Posts from './routes/Posts'
import Login from './routes/Login'
import Register from './routes/Register'

const App = () => {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <ApolloProvider>
          <div id="app">
            <Switch>
              <PrivateRoute path="/">
                <Home />
              </PrivateRoute>
              <PrivateRoute path="/posts">
                <Posts />
              </PrivateRoute>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Route path="/:rest">
                <center>
                  <b>404:</b> Sorry, this page isn't ready yet!
                </center>
              </Route>
            </Switch>
          </div>
        </ApolloProvider>
      </AuthProvider>
    </FirebaseProvider>
  )
}

export default App
