const functions = require('firebase-functions')
const admin = require('firebase-admin')
const request = require('graphql-request')

admin.initializeApp(functions.config().firebase)

// TODO: Add Environment variables
const client = new request.GraphQLClient(process.env.GRAPHQL_ENDPOINT, {
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET,
  },
})

// On sign up.
exports.processSignUp = functions.auth.user().onCreate(async user => {
  const customClaims = {
    'https://hasura.io/jwt/claims': {
      'x-hasura-default-role': 'user',
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-user-id': user.uid,
    },
  }

  try {
    const setCustomUserClaims = admin
      .auth()
      .setCustomUserClaims(user.uid, customClaims)

    const metadata = admin
      .firestore()
      .collection('metadata')
      .doc(user.uid)
      .set({ refreshTime: new Date().getTime() })

    return await Promise.all([setCustomUserClaims, metadata])
  } catch (error) {
    console.log(error)
  }
})
