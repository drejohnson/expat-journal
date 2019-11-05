import { h } from 'preact'
import './style'

import { AuthProvider } from './context/Auth'
import { FirebaseProvider } from './context/Firebase'
import ApolloProvider from './apollo/ApolloProvider'

import App from './App'

export default () => {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <ApolloProvider>
          <App />
        </ApolloProvider>
      </AuthProvider>
    </FirebaseProvider>
  )
}
