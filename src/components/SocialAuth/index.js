import React from 'react'
import style from './style.css'

import SignInButton from './SignInButton'

const SocialAuth = ({ type }) => {
  return (
    <div className={style.socialAuth}>
      <h4>Or {type} with your social account</h4>
      <SignInButton provider="google" />
      <SignInButton provider="facebook" />
    </div>
  )
}

export default SocialAuth
