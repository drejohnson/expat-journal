import * as functions from 'firebase-functions'
import { GraphQLClient } from 'graphql-request'

export default new GraphQLClient(functions.config().hasura.endpoint, {
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret': functions.config().hasura.secret,
  },
})