import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import { motion } from 'framer-motion'

import FadeVariants from '@/animation/FadeVariants'

import Topbar from '@/components/Topbar'
import PageGoBack from '@/components/Page/PageGoBack'

import TextInput from '@/components/Input/TextInput'
import TextDateInput from '@/components/Input/TextDateInput'
import DateInput from '@/components/Input/DateInput'
import SelectInput from '@/components/Input/SelectInput'

import FormHelper from '@/helpers/FormHelper'

import useFeather from '@/hooks/useFeather'

export default function NovaMatricula(props) {
  useFeather()

  const [formId, setFormId] = useState('')
  const [formProps, setFormProps] = useState({})

  useEffect(() => {
    const formId = FormHelper.new()

    setFormId(formId)

    setFormProps({
      id: formId,
      model: 'Usuario',
      action: 'create'
    })
  }, [])

  async function handleSubmit(event) {
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

  return (
      <motion.div className="page" initial="exit" animate="enter" exit="exit" variants={FadeVariants}>
        <div className="page__header">
          <PageGoBack/>

          <div className="page__titles">
            <h1 className="page__title">Novo serviço</h1>
            <p className="page__description">Preencha os dados abaixo</p>
          </div>
        </div>

        <div className="page__content">
          <form className="form">
            <div className="form-group">
              <p className="form-group__title">Serviço</p>
              <div className="inputs inputs--style-3">
                <div className="multi-input">
                  <TextInput formId={formId} classes="input--w2-q3" placeholder="Nome" attribute="nome" required={true}/>
                  <SelectInput
                      formId={formId}
                      size="w2-q2"
                      placeholder="Tipo"
                      attribute="tipo"
                      required={true}
                      options={[
                        { value: 'Agendamento', label: 'Agendamento' },
                        { value: 'Aula', label: 'Aula' },
                        { value: 'Exame Prático', label: 'Exame Prático' },
                        { value: 'Exame Teórico', label: 'Exame Teórico' },
                        { value: 'Taxa Detran', label: 'Taxa Detran' },
                        { value: 'Material Didático', label: 'Material Didático' },
                        { value: 'Outros', label: 'Outros' },
                      ]}
                  />
                </div>
                <TextInput formId={formId} classes="input--w2-q1" placeholder="Valor" attribute="Valor" required={true}/>
              </div>
            </div>
          </form>
        </div>

        <div className="page__footer">
          <div className="page__footer-left">
          </div>
          <div className="page__footer-right">
            <button className="btn btn--two">Voltar</button>
            <button className="btn btn--one">Salvar</button>
          </div>
        </div>
      </motion.div>
  )
}