import * as admin from 'firebase-admin'

export const app = admin.initializeApp()

const getClaims = (user: any) => ({
  'https://hasura.io/jwt/claims': {
    'x-hasura-allowed-roles': ['user'],
    'x-hasura-default-role': 'user',
    'x-hasura-user-id': user.uid
  }
})

export const createUser = async ({ name, email, password } : {name: string, email: string, password: string}) => {
  const user = await app.auth().createUser({
    displayName: name,
    email,
    password
  })
  if (user.uid) {
    const customClaims = getClaims(user)
    await app.auth().setCustomUserClaims(user.uid, customClaims)
    return user
  } else {
    throw new Error('Error creating firebase user')
  }
}

export const authenticateUser = async (user: any) => {
  if (user.uid) {
    const customClaims = getClaims(user)
    await app.auth().setCustomUserClaims(user.uid, customClaims)
    return user
  } else {
    throw new Error('Error authenticating firebase user')
  }
}