import { h, createContext } from 'preact'
import { useEffect, useReducer } from 'preact/hooks'
import axios from 'axios'

import useFirebase from '../hooks/useFirebase'

const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const initialState = {
    isAuthenticating: false,
    isAuthenticated: localStorage.getItem('idToken') ? true : false,
    user: localStorage.getItem('user') || null,
    idToken: localStorage.getItem('idToken') || null,
    authError: null,
  }

  const reducer = (state, action) => {
    switch (action.type) {
      case 'AUTH_BEGIN':
        return {
          ...state,
          isAuthenticating: true,
        }
      case 'AUTH_SUCCESS':
        localStorage.setItem('idToken', JSON.stringify(action.payload.idToken))
        localStorage.setItem('user', JSON.stringify(action.payload.user))
        return {
          ...state,
          user: action.payload.user,
          idToken: action.payload.idToken,
          isAuthenticated: true,
          isAuthenticating: false,
        }
      case 'LOGOUT':
        localStorage.clear()
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          idToken: null,
        }
      case 'AUTH_ERR':
        return {
          ...state,
          isAuthenticated: false,
          user: null,
          idToken: null,
          authError: action.payload,
        }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const { auth, providers, firestore } = useFirebase()

  const loginWithGoogle = ({ redirect = false }) => {
    dispatch({ type: 'AUTH_BEGIN' })
    return redirect === true
      ? auth.signInWithRedirect(providers.google)
      : auth.signInWithPopup(providers.google)
  }
  const loginWithFacebook = ({ redirect = false }) => {
    dispatch({ type: 'AUTH_BEGIN' })
    return redirect === true
      ? auth.signInWithRedirect(providers.facebook)
      : auth.signInWithPopup(providers.facebook)
  }

  const loginWithEmailAndPassword = async values => {
    dispatch({ type: 'AUTH_BEGIN' })
    try {
      await auth.signInWithEmailAndPassword(values.email, values.password)
    } catch (err) {
      console.log(err)
      dispatch({
        type: 'AUTH_ERR',
        payload: err.response,
      })
    }
  }

  const handleRegister = async values => {
    try {
      dispatch({ type: 'AUTH_BEGIN' })
      const response = await axios
        .post(
          'https://us-central1-expat-journal.cloudfunctions.net/handleRegister',
          { name: values.name, email: values.email, password: values.password },
        )
        .then(() =>
          auth.signInWithEmailAndPassword(values.email, values.password),
        )

      return response.data
    } catch (err) {
      console.log(err)
      dispatch({
        type: 'AUTH_ERR',
        payload: err.response,
      })
    }
  }

  const handleLogout = () => auth.signOut()

  useEffect(() => {
    let listener
    if (auth) {
      listener = auth.onAuthStateChanged(async user => {
        try {
          if (user) {
            const idToken = await user.getIdToken()
            const idTokenResult = await user.getIdTokenResult()
            const hasuraClaim =
              idTokenResult.claims['https://hasura.io/jwt/claims']

            if (hasuraClaim) {
              dispatch({
                type: 'AUTH_SUCCESS',
                payload: { user, idToken },
              })
            }
          } else {
            dispatch({ type: 'LOGOUT' })
          }
        } catch (error) {
          console.log(error)
          dispatch({
            type: 'AUTH_ERR',
            payload: error.response,
          })
        }
      })
    }
    return () => {
      listener
    }
  }, [auth])

  return (
    <>
      <AuthContext.Provider
        value={{
          ...state,
          loginWithGoogle,
          loginWithFacebook,
          loginWithEmailAndPassword,
          handleRegister,
          handleLogout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  )
}

export { AuthProvider, AuthContext }
