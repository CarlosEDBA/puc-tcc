import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { motion } from 'framer-motion'

import FadeVariants from '@/animation/FadeVariants'

import Topbar from '@/components/Topbar'
import PageGoBack from '@/components/Page/PageGoBack'

import TextInput from '@/components/Input/TextInput'
import TextDateInput from '@/components/Input/TextDateInput'
import DateInput from '@/components/Input/DateInput'
import SelectInput from '@/components/Input/SelectInput'

import FormSection from '@/components/FormSection/FormSection'

import IcPlusSign from '@/assets/svg/ic_plus_sign.svg'

import ModalContatoAdicionalCreate from '@/components/Modal/ModalContatoAdicionalCreate'
import ModalContatoAdicionalUpdate from '@/components/Modal/ModalContatoAdicionalUpdate'

import TipoDocumentoRepository from '@/repository/TipoDocumentoRepository'
import StatusProcessoRepository from '@/repository/StatusProcessoRepository'

import FormHelper from '@/helpers/FormHelper'

import useFeather from '@/hooks/useFeather'

import { preencherEnderecoPorCep } from '@/utils/FormUtils'

import Log from '@/utils/Log'

export default function NovaMatriculaEtapa1(props) {
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
    try {
      const responses = await FormHelper.submit(formProps, true)
      Log.dev(responses)

      const response = FormHelper.getFormResponse(responses, formId)
      Log.dev(response)

      const objectId = response.result._id
      Log.dev(objectId)

      history.push('/matriculas/nova/2', {
        aluno: objectId
      })
    } catch (err) {
      Log.dev(err)
      alert('Um erro ocorreu ao salvar os dados.')
    }

    //history.push('/matriculas/nova/2')

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
      <motion.div className="page__step" initial="exit" animate="enter" exit="exit" variants={FadeVariants}>
        <div className="page__content">
          <form className="form">
            <div className="form-group">
              <p className="form-group__title">Dados básicos</p>
              <div className="inputs inputs--style-3">
                <div className="multi-input">
                  <TextInput formId={formId} classes="input--w2-q2" placeholder="Nome" attribute="nome"/>
                  <TextInput formId={formId} classes="input--w2-q2" placeholder="Sobrenome" attribute="sobrenome"/>
                </div>
                <div className="multi-input">
                  <TextInput formId={formId} classes="input--w3-q1" placeholder="Nome da mãe" attribute="nomeMae"/>
                  <TextInput formId={formId} classes="input--w3-q1" placeholder="Nome do pai" attribute="nomePai"/>
                </div>
                <div className="multi-input">
                  <TextDateInput formId={formId} classes="input--w1-q3" placeholder="Data de nascimento" attribute="dataNascimento" format="L"/>
                  <SelectInput
                      formId={formId}
                      size="w1-q3"
                      placeholder="Sexo"
                      attribute="sexo"
                     
                      options={[
                        { value: 'Masculino', label: 'Masculino' },
                        { value: 'Feminino', label: 'Feminino' },
                        { value: 'Outro', label: 'Outro' },
                      ]}
                  />
                  <TextInput formId={formId} classes="input--w1-q2" placeholder="CPF" attribute="cpf" mask="cpf"/>
                </div>
                <div className="multi-input">
                  <SelectInput
                      formId={formId}
                      size="w2-q1"
                      placeholder="Tipo de documento"
                      attribute="tipoDocumento"
                      options={tiposDocumento}
                  />
                  <TextInput formId={formId} classes="input--w2" placeholder="Número do documento" attribute="numeroDocumento"/>
                  <TextInput formId={formId} classes="input--w1-q2" placeholder="UF" attribute="uf"/>
                </div>
                <div className="multi-input">
                  <TextInput formId={formId} classes="input--w1-q3" placeholder="Telefone" attribute="telefone" mask="telefone"/>
                  <TextInput formId={formId} classes="input--w1-q3" placeholder="Celular" attribute="celular" mask="celular"/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <p className="form-group__title">Endereço</p>
              <div className="inputs inputs--style-3">
                <div className="multi-input">
                  <TextInput formId={formId} classes="input--w1-q1" placeholder="CEP" attribute="cep" mask="cep" onChange={handleTextInputChange}/>
                  <TextInput formId={formId} classes="input--w3-q2" placeholder="Rua" attribute="rua"/>
                </div>
                <div className="multi-input">
                  <TextInput formId={formId} classes="input--w1" placeholder="Número" attribute="numero"/>
                  <TextInput formId={formId} classes="input--w1-q1" placeholder="Complemento" attribute="complemento"/>
                  <TextInput formId={formId} classes="input--w2-q3" placeholder="Bairro" attribute="bairro"/>
                </div>
                <div className="multi-input">
                  <TextInput formId={formId} classes="input--w1-q3" placeholder="Cidade" attribute="cidade"/>
                  <TextInput formId={formId} classes="input--w1-q3" placeholder="Estado" attribute="estado"/>
                </div>
              </div>
            </div>
            <div className="form-group hidden">
              <p className="form-group__title">Contato Adicional</p>
              <div className="inputs inputs--style-3">
                <div className="multi-input">
                  <TextInput formId={formId} classes="input--w3" placeholder="Nome" attribute="nomeContato"/>
                  <TextInput formId={formId} classes="input--w1-q3" placeholder="Telefone" attribute="telefoneContato" mask="telefone"/>
                  <TextInput formId={formId} classes="input--w1-q3" placeholder="Celular" attribute="celularContato" mask="celular"/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <p className="form-group__title">Processo</p>
              <div className="inputs inputs--style-3">
                <div className="multi-input">
                  <TextInput formId={formId} classes="input--w1-q3" placeholder="Número do Processo" attribute="numProcesso"/>
                  <TextDateInput formId={formId} classes="input--w1-q3" placeholder="Início do Processo" attribute="inicioProcesso"/>
                  <TextDateInput formId={formId} classes="input--w1-q3" placeholder="Fim do Processo" attribute="fimProcesso"/>
                </div>
                <SelectInput
                    formId={formId}
                    size="w2"
                    placeholder="Status do Processo"
                    attribute="statusProcesso"
                    options={statusProcesso}
                    />
              </div>
            </div>
          </form>
        </div>

        <div className="page__footer">
          <div className="page__footer-left">
            <span className="page__indicator"></span>
          </div>
          <div className="page__footer-right">
            <button className="btn btn--two">Voltar</button>
            <button className="btn btn--one" onClick={handleSubmit}>Continuar</button>
          </div>
        </div>
      </motion.div>
  )
}