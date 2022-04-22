import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { motion } from 'framer-motion'

import FadeVariants from '@/animation/FadeVariants'

import { login } from '@/actions/Auth'

import TypographyLogo from '@/assets/svg/typography_logo.svg'

export default function Login(props) {
  const auth = useSelector(state => state.Auth)
  const authenticated = useSelector(state => state.Auth.authenticated)

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')

  const dispatch = useDispatch()

  function handleEmailChange(event) {
    const value = event.target.value
    setEmail(value)
  }

  function handleSenhaChange(event) {
    const value = event.target.value
    setSenha(value)
  }

  function handleSubmit(event) {
    event.preventDefault()

    dispatch(login({ email, senha }))
  }

  if (authenticated) {
    return (<Redirect to=""/>)
  }

  return (
    <motion.div className="page page--login" initial="exit" animate="enter" exit="exit" variants={FadeVariants}>
      <div className="setup-box setup-box--login">
        <div className="setup-box__left">
          <div className="setup-box__logo">
            <TypographyLogo/>
          </div>
        </div>
        <div className="setup-box__right">
          <div className="setup-box__titles">
            <h1 className="setup-box__title">Entrar</h1>
            <h2 className="setup-box__subtitle">Digite seu e-mail e senha</h2>
          </div>
          <form className="setup-box__form">
            <div className="inputs inputs--style-3">
              <div className="input input--full">
                <div className="input__container">
                  <label>E-mail:</label>
                  <input type="email" placeholder="E-mail" value={email} onChange={handleEmailChange} required={true}/>
                </div>
              </div>
              <div className="input input--full">
                <div className="input__container">
                  <label>Senha:</label>
                  <input type="password" placeholder="Senha" value={senha} onChange={handleSenhaChange} required={true}/>
                </div>
              </div>
            </div>
            {(auth.error && auth.error.code === 1000) ? (
                <div className="setup-box__alert">
                  <div className="svg svg--height setup-box__alert-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 510 510">
                      <path
                          d="M255 0C114.8 0 0 114.8 0 255s114.8 255 255 255 255-114.8 255-255S395.3 0 255 0zm30.4 406.8h-60.7v-60.7h60.7v60.7zm0-121.4h-60.7V103.2h60.7v182.2z"/>
                    </svg>
                  </div>
                  <span className="setup-box__alert-message">Dados inválidos.</span>
                </div>
            ) : null}
            <div className="setup-box__buttons">
              <button className="btn btn--login" onClick={handleSubmit}>Entrar</button>
            </div>
          </form>
          <div className="setup-box__links">
            <Link to="/criar-conta">Não tem conta? <span>Clique aqui!</span></Link>
            <a href="">Esqueceu sua senha? <span>Resetar</span></a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}