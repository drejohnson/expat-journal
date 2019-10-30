import * as functions from 'firebase-functions';
import { createAccount } from './auth/create'
import { signInUser } from './auth/signin'
import { deleteUser } from './auth/delete'
import * as cors from 'cors'

const corsHandler = cors({ origin: true })

export const handleRegister = functions.https.onRequest(async (req, res) => {
  corsHandler(req, res, async () => {
    try {
      const data = await createAccount(req)
      res.status(200).send({ error: null, data })
    } catch (error) {
      res.status(500).send({ error, data: null })
      throw new functions.https.HttpsError('failed-precondition', 'sync-failed')
    }
  })
})

export const handleSignIn = functions.auth.user().onCreate(async user => {
  try {
    const data = await signInUser(user)
    return data
  } catch (error) {
    console.log(error)
    throw new functions.https.HttpsError('failed-precondition', 'sync-failed')
  }
})

export const handleDelete = functions.auth.user().onDelete(async user => {
  try {
    const data = await deleteUser(user)
    return data
  } catch (error) {
    console.log(error)
    throw new functions.https.HttpsError('failed-precondition', 'sync-failed')
  }
})
