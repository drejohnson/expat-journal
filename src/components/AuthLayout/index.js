import { h } from 'preact'
import style from './style.css'

const AuthLayout = ({
  titleSize,
  subTitle,
  message,
  bgImg = 'assets/login-bg.jpeg',
  children,
}) => {
  return (
    <div
      className={style.container}
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImg})`,
      }}
    >
      <div class={style.intro}>
        <section className={style.content} style={{ titleSize }}>
          <header>
            <h1>Expat Journal</h1>
          </header>
          <div className={style.subTitle}>
            {subTitle ? <h4>{subTitle()}</h4> : null}
          </div>
          <div className={style.bottomMessage}>
            {message ? <p>{message()}</p> : null}
          </div>
        </section>
      </div>
      <div className={style.formWrapper}>{children}</div>
    </div>
  )
}

export default AuthLayout
