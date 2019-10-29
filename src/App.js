import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { Switch, Route } from 'wouter-preact'

import { AuthProvider } from './context/Auth'
import { FirebaseProvider } from './context/firebaseContext'
import ApolloProvider from './apollo/ApolloProvider'
import Header from './components/Header'

// Code-splitting is automated for routes
import Home from './routes/Home'
import Posts from './routes/Posts'

const App = () => {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <ApolloProvider>
          <div id="app">
            <Header />
            <Switch>
              <Route path="/">
                <Home />
              </Route>
              <Route path="/posts">
                <Posts />
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
