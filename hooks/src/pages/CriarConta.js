import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { motion } from 'framer-motion'

import FadeVariants from '@/animation/FadeVariants'

import Form from '@/components/Form/Form'
import TextInput from '@/components/Input/TextInput'

import FormHelper from '@/helpers/FormHelper'

export default function CriarConta(props) {
  const [formId, setFormId] = useState('')
  const [formProps, setFormProps] = useState({})

  const authenticated = useSelector(state => state.Auth.authenticated)

  const dispatch = useDispatch()

  useEffect(() => {
    const formId = FormHelper.new()

    setFormId(formId)

    setFormProps({
      id: formId,
      model: 'Usuario',
      action: 'create'
    })
  }, [])

  function senhasBatem() {
    const senha = FormHelper.getDataAttribute(formId, 'senha')
    const confirmarSenha = FormHelper.getDataAttribute(formId, 'confirmarSenha')

    return senha === confirmarSenha;
  }

  function minCaracteresSenha() {
    const senha = FormHelper.getDataAttribute(formId, 'senha')

    return senha.length >= 6;
  }

  async function handleSubmit(event) {
    if (!senhasBatem()) {
      return alert('As senhas digitadas não batem.')
    }

    if (!minCaracteresSenha()) {
      return alert('A senha precisa ter no mínimo 6 caracteres.')
    }

    FormHelper.validate(formProps)
        .then(() => {
          FormHelper.submit(formProps, true)
              .then(() => {})
              .catch((err) => {
                console.error(err)
                alert('Um erro ocorreu ao salvar os dados.')
              })
        })
        .catch((err) => {
          console.error(err)
          alert('Preencha todos campos obrigatórios.')
        })
  }

  if (authenticated) {
    return (<Redirect to="/"/>)
  }

  return (
      <motion.div className="fp-page fp-page--sign-up" initial="exit" animate="enter" exit="exit" variants={FadeVariants}>
        <div className="fp-setup-box fp-setup-box--sign-up">
          <div className="fp-setup-box__titles">
            <h1 className="fp-setup-box__title">Criar uma conta</h1>
            <h2 className="fp-setup-box__subtitle">Digite seus dados nos respectivos campos para continuar</h2>
          </div>
          <Form className="fp-setup-box__form">
            <div className="fp-inputs fp-inputs--style-3">
              <div className="fp-multi-input fp-multi-input--full">
                <TextInput formId={formId} classes="fp-input--half" placeholder="Nome" attribute="nome" required={true}/>
                <TextInput formId={formId} classes="fp-input--half" placeholder="Sobrenome" attribute="sobrenome" required={true}/>
              </div>
              <div className="fp-multi-input fp-multi-input--full">
                <TextInput formId={formId} classes="fp-input--half" placeholder="E-mail" attribute="email" type="email" required={true}/>
                <TextInput formId={formId} classes="fp-input--half" placeholder="Telefone" attribute="telefone" mask="telefone" required={true}/>
              </div>
              <div className="fp-multi-input fp-multi-input--full">
                <TextInput formId={formId} classes="fp-input--half" placeholder="Senha" attribute="senha" type="password" required={true}/>
                <TextInput formId={formId} classes="fp-input--half" placeholder="Confirmar senha" attribute="confirmarSenha" type="password" required={true}/>
              </div>
            </div>
          </Form>
          <div className="fp-setup-box__footer">
            <p className="fp-setup-box__text">* simboliza um campo obrigatório</p>
            <div className="fp-setup-box__buttons">
              <Link className="fp-btn fp-btn--two" to="/login">Voltar</Link>
              <button className="fp-btn fp-btn--one" onClick={handleSubmit}>Continuar</button>
            </div>
          </div>
        </div>
      </motion.div>
  )
}