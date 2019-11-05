import { h } from 'preact'
import { useState } from 'preact/hooks'
import { Link } from 'wouter-preact'
import useForm from 'react-hook-form'
import * as Yup from 'yup'

import style from '../style.css'

import useAuth from '../../../hooks/useAuth'
import SocialAuth from '../../SocialAuth'

const schema = Yup.object().shape({
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required(),
})

const LoginForm = ({ setShowLogin }) => {
  const intialValues = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  })
  const [values, setValues] = useState(intialValues)
  const { loginWithEmailAndPassword } = useAuth()

  const onSubmit = data => {
    console.log(data)
    loginWithEmailAndPassword(data)
    setValues(intialValues)
  }

  const handleClick = e => {
    console.log('show create an account form')
  }

  return (
    <div class="form-container">
      <header>
        <h1>Sign in</h1>
        <h4>
          New user?{' '}
          <button onClick={() => setShowLogin(false)} className={style.link}>
            Create an account
          </button>
        </h4>
      </header>
      <form class={style.form} onSubmit={handleSubmit(onSubmit)}>
        <div class={style.inputField}>
          <label htmlFor="email">Email</label>
          <input
            value={values.email}
            name="email"
            type="email"
            ref={register}
          />
          {errors.email && <p class={style.error}>{errors.email.message}</p>}
        </div>

        <div class={style.inputField}>
          <label htmlFor="password">Password</label>
          <input
            value={values.password}
            name="password"
            type="password"
            ref={register}
          />
          {errors.password && (
            <p class={style.error}>{errors.password.message}</p>
          )}
        </div>

        <button className={style.formButton} type="submit">
          <span>Sign in</span>
        </button>

        <SocialAuth type="login" />
      </form>
    </div>
  )
}

export default LoginForm
