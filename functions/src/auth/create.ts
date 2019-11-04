import { createUser } from './firebase'
import client from '../graphql/client'
import { ADD_USER } from '../graphql/mutations'

export const createAccount = async (req: any) => {
  const { email, password } = req.body
  try {
    const user = await createUser({ email, password })
    const hasuraUser = await client.request(ADD_USER, {
      id: user.uid,
      email
    })
    return hasuraUser && user
    // if (user && user.uid) {
    //   const hasuraUser = await client.request(ADD_USER, {
    //     uid: user.uid,
    //     email
    //   })
    //   if (hasuraUser) {
    //     return user
    //   } else {
    //     throw new Error('Error creating hasura user')
    //   }
    // }
  } catch (err) {
    console.log(err)
    throw new Error('Error creating firebase user')
  }
}