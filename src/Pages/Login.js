import React, { useState } from 'react'
import { useHistory } from 'react-router'

// style
import style from './Login.module.css'
// assets
import IconBg from '../Assets/images/iconBig.svg'
import Logo from '../Assets/images/logo1.svg'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [emailValid, setEmailValid] = useState(true)
  const [passValid, setPassValid] = useState(true)

  const history = useHistory()

  const loginHandler = (e) => {
    e.preventDefault()
    setEmailValid(false)
    setPassValid(false)

    const emailFmt = email.trim()
    const passFmt = password.trim()

    const emailIsValid = emailFmt !== ''
    const passIsValid = passFmt !== ''

    if (emailFmt !== '') {
      setEmailValid(true)
    }
    if (passFmt !== '') {
      setPassValid(true)
    }
    if (emailIsValid && passIsValid) {
      history.push('/dashboard/manage')
    } else {
      setErrorMsg('Please enter valid values.(Any email or password)')
    }
    //alert(emailIsValid, '....', passIsValid)
  }

  return (
    <section className={style.loginPage}>
      <div className={style.loginLeft}>
        <img src={IconBg} alt="icon" />
      </div>
      <div className={style.loginRight}>
        <div className={style.rightContent}>
          <div className={style.rightTop}>
            <img src={Logo} alt="logo" />
            <p className={style.subtxt}>Patient Management System</p>
          </div>
          <div className={style.rightBody}>
            <p className={style.subtxt}>Welcome back,</p>
            <h1 className={style.titleBg}>Login to account</h1>
            <form className={style.loginForm} onSubmit={loginHandler}>
              <input
                className={
                  emailValid ? style.inputFields : style.inputFieldsInvalid
                }
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className={
                  passValid ? style.inputFields : style.inputFieldsInvalid
                }
                type="password"
                placeholder="Password (123456)"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className={style.submitBtn}>Login</button>
              <br />
              <p className={style.errorTxt}>{errorMsg}</p>
            </form>
            <p className={style.btmTxt}>
              Forgot Password? (Use any email or password for now)
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
