import { authenticateUser } from './firebase'
import client from '../graphql/client'
import { ADD_USER } from '../graphql/mutations'

export const signInUser = async (user: any) => {

  const userRecord = await authenticateUser(user)
  if (userRecord && userRecord.uid) {
    const hasuraUser = await client.request(ADD_USER, {
      id: userRecord.uid,
      email: userRecord.email,
      name: userRecord.displayName
    })
    if (hasuraUser) {
      return userRecord
    } else {
      throw new Error('Error signing in hasura user')
    }
  } else {
    throw new Error('Error signing in firebase user')
  }
}