import config from './config'

export default async function initFirebase() {
  const firebase = await import('firebase/app')
  await import('firebase/auth')
  await import('firebase/firestore')

  const app = firebase.default
  try {
    app.initializeApp(config)
  } catch (err) {
    // we skip the "already exists" message which is
    // not an actual error when we're hot-reloading
    if (!/already exists/.test(err.message)) {
      console.error('Firebase initialization error', err.stack)
    }
  }

  const auth = app.auth()
  const firestore = app.firestore()

  const providers = {
    facebook: new app.auth.FacebookAuthProvider(),
    google: new app.auth.GoogleAuthProvider(),
  }

  return { app, auth, providers, firestore }
}
