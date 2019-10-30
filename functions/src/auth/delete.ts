import client from '../graphql/client'
import { DELETE_USER } from '../graphql/mutations'

export const deleteUser = async (user: any) => {
  if (user.uid) {
    const hasuraUser = await client.request(DELETE_USER, {
      id: user.uid,
    })
    return hasuraUser
  } else {
    throw new Error('Error deleting firebase user')
  }
}
