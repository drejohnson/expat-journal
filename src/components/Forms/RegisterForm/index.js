import { h } from 'preact'
import { useState } from 'preact/hooks'
import { Link } from 'wouter-preact'
import useForm from 'react-hook-form'
import * as Yup from 'yup'

import style from '../style.css'

import useAuth from '../../../hooks/useAuth'
import SocialAuth from '../../SocialAuth'

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string()
    .email()
    .required(),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required(),
})

const RegisterForm = ({ setShowLogin }) => {
  const intialValues = {
    name: '',
    email: '',
    password: '',
  }
  const { register, handleSubmit, errors } = useForm({
    validationSchema: schema,
  })

  const [values, setValues] = useState(intialValues)
  const { handleRegister } = useAuth()

  const onSubmit = async (data, e) => {
    await handleRegister(data)
    setValues(intialValues)
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
        <div class={style.inputField}>
          <label htmlFor="name">Full Name</label>
          <input value={values.name} name="name" type="text" ref={register} />
          {errors.name && <p class={style.error}>{errors.name.message}</p>}
        </div>

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
