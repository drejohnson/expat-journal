import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import { Switch, Route } from 'wouter-preact'

import initFirebase from './firebase/initialize'
import Header from './components/Header'

// Code-splitting is automated for routes
import Home from './routes/Home'
import Posts from './routes/Posts'

const App = () => {
  useEffect(() => {
    ;(async () => {
      const firebase = await initFirebase()
      console.log(firebase.auth())
    })()
  }, [])
  return (
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
  )
}

export default App
