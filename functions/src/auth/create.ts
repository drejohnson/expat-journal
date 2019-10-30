import { createUser } from './firebase'
import client from '../graphql/client'
import { ADD_USER } from '../graphql/mutations'

export const createAccount = async (req: any) => {
  const { name, email, password } = req.body

  const user = await createUser({ email, password })
  if (user && user.uid) {
    const hasuraUser = await client.request(ADD_USER, {
      uid: user.uid,
      email,
      name
    })
    if (hasuraUser) {
      return user
    } else {
      throw new Error('Error creating hasura user')
    }
  } else {
    throw new Error('Error creating firebase user')
  }
}