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

const RegisterForm = ({ setShowLogin }) => {
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
    console.log('show sign in form')
  }

  return (
    <div class="form-container">
      <header>
        <h1>Create an account</h1>
        <h4>
          Already have an account?{' '}
          <button onClick={() => setShowLogin(true)} className={style.link}>
            Sign in
          </button>
        </h4>
      </header>
      <form class={style.form} onSubmit={handleSubmit(onSubmit)}>
        {/* <div class={style.inputField}>
          <label htmlFor="firstName">First Name</label>
          <input
            value={state.firstName}
            onChange={e => update(e.target.value)}
            name="firstName"
            placeholder="First Name"
            ref={register}
          />
          {errors.firstName && (
            <p class={style.error}>{errors.firstName.message}</p>
          )}
        </div> */}

        {/* <div class={style.inputField}>
          <label htmlFor="lastName">Last Name</label>
          <input
            value={state.lastName}
            onChange={e => update(e.target.value)}
            name="lastName"
            placeholder="Last Name"
            ref={register}
          />
          {errors.lastName && (
            <p class={style.error}>{errors.lastName.message}</p>
          )}
        </div> */}

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

        {/* <div class={style.inputField}>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            ref={register}
          />
          {errors.confirmPassword && (
            <p class={style.error}>{errors.confirmPassword.message}</p>
          )}
        </div> */}
        <div class={style.terms}>
          <h5>By clicking Create account, I agree that:</h5>
          <ul>
            <li>
              I have read and accepted the{' '}
              <Link href="/terms">
                <a className={style.link}>Terms of Use</a>
              </Link>
              .
            </li>
          </ul>
        </div>
        <button className={style.formButton} type="submit">
          <span>Create account</span>
        </button>

        <SocialAuth type="sign up" />
      </form>
    </div>
  )
}

export default RegisterForm
