import React from 'react'
import useAuth from '../../../hooks/useAuth'

import style from './style.css'

const SignInButton = ({ provider }) => {
  const { loginWithGoogle, loginWithFacebook } = useAuth()
  return (
    <div className={style.socialButton}>
      {provider === 'google' && (
        <button
          onClick={() => loginWithGoogle({ redirect: true })}
          class={style.google}
        >
          <img src="assets/social-icons/google.svg" alt="Google button" />
          <span>Sign in with Google</span>
        </button>
      )}
      {provider === 'facebook' && (
        <button
          onClick={() => loginWithFacebook({ redirect: true })}
          class={style.facebook}
        >
          <img src="assets/social-icons/facebook.svg" alt="Facebook button" />
          <span>Sign in with facebook</span>
        </button>
      )}
    </div>
  )
}

export default SignInButton
