import { h, createContext } from 'preact'
import { useEffect, useReducer } from 'preact/hooks'

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
      case 'LOGIN_BEGIN':
        return {
          ...state,
          isAuthenticating: true,
        }
      case 'LOGIN_SUCCESS':
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
      case 'LOGIN_ERR':
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const { auth, providers, firestore } = useFirebase()

  const loginWithGoogle = ({ redirect = false }) => {
    dispatch({ type: 'LOGIN_BEGIN' })
    return redirect === true
      ? auth.signInWithRedirect(providers.google)
      : auth.signInWithPopup(providers.google)
  }
  const loginWithFacebook = ({ redirect = false }) => {
    dispatch({ type: 'LOGIN_BEGIN' })
    return redirect === true
      ? auth.signInWithRedirect(providers.facebook)
      : auth.signInWithPopup(providers.facebook)
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
                type: 'LOGIN_SUCCESS',
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
          handleLogout,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  )
}

export { AuthProvider, AuthContext }
