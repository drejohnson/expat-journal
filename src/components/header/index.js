import { h } from 'preact'
import { useEffect } from 'preact/hooks'
import ActiveLink from '../ActiveLink'
import style from './style'

import useAuth from '../../hooks/useAuth'

const Header = () => {
  const {
    user,
    isAuthenticated,
    isAuthenticating,
    loginWithGoogle,
    handleLogout,
  } = useAuth()
  useEffect(() => {
    console.log('isAuthenticating', isAuthenticating)
    console.log('isAuthenticated', isAuthenticated)
  }, [isAuthenticating, isAuthenticated])
  return (
    <header class={style.header}>
      <h1>Preact App</h1>
      <nav>
        <ActiveLink href="/">Home</ActiveLink>
        <ActiveLink href="/posts">Posts</ActiveLink>
        {!isAuthenticated ? (
          <button onClick={() => loginWithGoogle({ redirect: true })}>
            Sign in with Google
          </button>
        ) : (
          <button onClick={() => handleLogout()}>Logout</button>
        )}
      </nav>
    </header>
  )
}

export default Header
