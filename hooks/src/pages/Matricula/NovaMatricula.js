import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route, Link, Redirect, useHistory } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import FadeVariants from '@/animation/FadeVariants'

import IcPlusSign from '@/assets/svg/ic_plus_sign.svg'

import Topbar from '@/components/Topbar'
import PageGoBack from '@/components/Page/PageGoBack'

import TextInput from '@/components/Input/TextInput'
import TextDateInput from '@/components/Input/TextDateInput'
import DateInput from '@/components/Input/DateInput'
import SelectInput from '@/components/Input/SelectInput'

import FormSection from '@/components/FormSection/FormSection'

import ModalContatoAdicionalCreate from '@/components/Modal/ModalContatoAdicionalCreate'
import ModalContatoAdicionalUpdate from '@/components/Modal/ModalContatoAdicionalUpdate'

import NovaMatriculaEtapa1 from '@/pages/Matricula/NovaMatriculaEtapa1'
import NovaMatriculaEtapa2 from '@/pages/Matricula/NovaMatriculaEtapa2'

import TipoDocumentoRepository from '@/repository/TipoDocumentoRepository'
import StatusProcessoRepository from '@/repository/StatusProcessoRepository'

import FormHelper from '@/helpers/FormHelper'

import useFeather from '@/hooks/useFeather'

import { preencherEnderecoPorCep } from '@/utils/FormUtils'

export default function NovaMatricula(props) {
  useFeather()

  const [formId, setFormId] = useState('')
  const [formProps, setFormProps] = useState({})

  const [tiposDocumento, setTiposDocumento] = useState([])
  const [statusProcesso, setStatusProcesso] = useState([])

  const history = useHistory()

  useEffect(() => {
    const formId = FormHelper.new()

    setFormId(formId)

    setFormProps({
      id: formId,
      model: 'Aluno',
      action: 'create'
    })

    fetchTiposDocumento()
    fetchStatusProcessos()
  }, [])

  function fetchTiposDocumento() {
    TipoDocumentoRepository.find()
        .then((data) => {
          const tiposDocumentoOptions = data.map((tipoDocumento) => ({
            value: tipoDocumento._id,
            label: tipoDocumento.nome
          }))

          setTiposDocumento(tiposDocumentoOptions)
        })
  }

  function fetchStatusProcessos() {
    StatusProcessoRepository.find()
        .then((data) => {
          const statusProcessoOptions = data.map((statusProcesso) => ({
            value: statusProcesso._id,
            label: statusProcesso.nome
          }))

          setStatusProcesso(statusProcessoOptions)
        })
  }

  function handleTextInputChange(event) {
    console.log(event)
    if (event.data) {
      if (event.attribute === 'cep') preencherEnderecoPorCep(formId, event.data)
    }
  }

  async function handleSubmit(event) {
    FormHelper.submit(formProps, true)
        .then(() => {
          alert('Aluno cadastrado com sucesso!')
          history.push('/')
        })
        .catch((err) => {
          console.error(err)

          if (err.error && err.error.message.includes('cpf')) {
            alert('Erro: CPF já cadastrado.')
            return
          }

          alert('Um erro ocorreu ao salvar os dados.')
        })

    /*
    FormHelper.validate(formProps)
        .then(() => {
          FormHelper.submit(formProps, true)
              .then(() => {
                alert('Aluno cadastrado com sucesso!')
                history.push('/')
              })
              .catch((err) => {
                console.error(err)
                alert('Um erro ocorreu ao salvar os dados.')
              })
        })
        .catch((err) => {
          console.error(err)
          alert('Preencha todos campos obrigatórios.')
        })*/
  }

  return (
      <motion.div className="page" initial="exit" animate="enter" exit="exit" variants={FadeVariants}>
        <div className="page__header">
          <PageGoBack/>

          <div className="page__titles">
            <h1 className="page__title">Nova matrícula</h1>
            <p className="page__description">Preencha os dados abaixo</p>
          </div>
        </div>

        <AnimatePresence>
          <Switch>
            <Route path="/matriculas/nova/1" component={NovaMatriculaEtapa1}/>
            <Route path="/matriculas/nova/2" component={NovaMatriculaEtapa2}/>
          </Switch>
        </AnimatePresence>
      </motion.div>
  )
}