import { h } from 'preact'
import { useState } from 'preact/hooks'
import { Link } from 'wouter-preact'
import useForm from 'react-hook-form'
import * as Yup from 'yup'

import style from '../style.css'

import SocialAuth from '../../SocialAuth'

const schema = Yup.object().shape({
  // firstName: Yup.string().required(),
  // lastName: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required(),
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref('password'), null], 'Passwords must match')
  //   .required(),
})

const LoginForm = ({ setShowLogin }) => {
  const intialValues = {
    // firstName: '',
    // lastName: '',
    email: '',
  }
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  })
  const [state, update] = useState(intialValues)
  const onSubmit = data => {
    console.log(data)
    alert(JSON.stringify(data))
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
            onChange={e => update(e.target.value)}
            defaultValue={intialValues.email}
            name="email"
            type="email"
            ref={register}
          />
          {errors.email && <p class={style.error}>{errors.email.message}</p>}
        </div>

        <div class={style.inputField}>
          <label htmlFor="password">Password</label>
          <input name="password" type="password" ref={register} />
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
