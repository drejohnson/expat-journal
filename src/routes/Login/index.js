import { h } from 'preact'
import { useState } from 'preact/hooks'
import { CSSTransition } from 'react-transition-group'
import style from './style'

import Authlayout from '../../components/AuthLayout'
import RegisterForm from '../../components/Forms/RegisterForm'
import LoginForm from '../../components/Forms/LoginForm'

const Login = () => {
  const [showLogin, setShowLogin] = useState(true)
  return (
    <Authlayout
      subTitle={() => (
        <>
          Become apart of a 25 million expat network, with members across the
          globe.
        </>
      )}
    >
      <CSSTransition in={showLogin} timeout={300} classNames="show-auth">
        {showLogin ? (
          <LoginForm showLogin={showLogin} setShowLogin={setShowLogin} />
        ) : (
          <RegisterForm showLogin={showLogin} setShowLogin={setShowLogin} />
        )}
      </CSSTransition>
    </Authlayout>
  )
}

export default Login
