import { h, createContext } from 'preact'
import { useEffect, useState, useReducer } from 'preact/hooks'
import initFirebase from '../firebase/initialize'

const FirebaseContext = createContext()

const FirebaseProvider = ({ children }) => {
  const [state, setState] = useState({})
  useEffect(() => {
    ;(async () => {
      const { app, auth, providers, firestore } = await initFirebase()
      setState({ app, auth, providers, firestore })
    })()
  }, [])
  return (
    <FirebaseContext.Provider value={{ ...state }}>
      {children}
    </FirebaseContext.Provider>
  )
}

export { FirebaseProvider, FirebaseContext }
