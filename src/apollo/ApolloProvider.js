import { h } from 'preact'
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'

import useAuth from '../hooks/useAuth'

export default ({ children }) => {
  const { isAuthenticated, idToken } = useAuth()

  const headers = isAuthenticated ? { Authorization: `Bearer ${idToken}` } : {}
  const link = new HttpLink({
    uri: 'https://expat-journal-graphql.herokuapp.com/v1/graphql',
    headers,
  })
  const cache = new InMemoryCache()
  const client = new ApolloClient({
    link,
    cache,
  })
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
