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

  return (
      <motion.div className="page" initial="exit" animate="enter" exit="exit" variants={FadeVariants}>
        <div className="page__header">
          <PageGoBack/>

          <div className="page__titles">
            <h1 className="page__title">Nova matrícula</h1>
            <p className="page__description">Preencha os dados abaixo</p>
          </div>
        </div>

        <div className="page__content">
          <form className="form">
            <div className="form-group">
              <p className="form-group__title">Dados básicos</p>
              <div className="inputs inputs--style-3">
                <div className="multi-input">
                  <TextInput formId={formId} classes="input--w2-q2" placeholder="Nome" attribute="nome" required={true}/>
                  <TextInput formId={formId} classes="input--w2-q2" placeholder="Sobrenome" attribute="sobrenome" required={true}/>
                </div>
                <div className="multi-input">
                  <TextInput formId={formId} classes="input--w3-q1" placeholder="Nome da mãe" attribute="nomeMae" required={true}/>
                  <TextInput formId={formId} classes="input--w3-q1" placeholder="Nome do pai" attribute="nomePai" required={true}/>
                </div>
                <div className="multi-input">
                  <TextDateInput formId={formId} classes="input--w1-q3" placeholder="Data de nascimento" attribute="dataNascimento" format="L"/>
                  <SelectInput
                      formId={formId}
                      size="w1-q3"
                      placeholder="Sexo"
                      attribute="sexo"
                      required={true}
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
                      required={true}
                      options={[
                        { value: 'RG', label: 'RG' },
                        { value: 'CPF', label: 'CPF' },
                        { value: 'Carteira de Identidade', label: 'Carteira de Identidade' },
                        { value: 'Carteira Profissional', label: 'Carteira Profissional' },
                        { value: 'Passaporte', label: 'Passaporte' },
                      ]}
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
                  <TextInput formId={formId} classes="input--w1-q1" placeholder="CEP" attribute="cep" mask="cep" required={true}/>
                  <TextInput formId={formId} classes="input--w3-q2" placeholder="Rua" attribute="rua" required={true}/>
                </div>
                <div className="multi-input">
                  <TextInput formId={formId} classes="input--w1" placeholder="Número" attribute="numero" required={true}/>
                  <TextInput formId={formId} classes="input--w1-q1" placeholder="Complemento" attribute="complemento" required={true}/>
                  <TextInput formId={formId} classes="input--w2-q3" placeholder="Bairro" attribute="bairro" required={true}/>
                </div>
                <div className="multi-input">
                  <TextInput formId={formId} classes="input--w1-q3" placeholder="Cidade" attribute="cidade" required={true}/>
                  <TextInput formId={formId} classes="input--w1-q3" placeholder="Estado" attribute="estado" required={true}/>
                  <TextInput formId={formId} classes="input--w1-q3" placeholder="País" attribute="pais" required={true}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <p className="form-group__title">Contato Adicional</p>
              <div className="inputs inputs--style-3">
                <div className="multi-input">
                  <TextInput formId={formId} classes="input--w3" placeholder="Nome" attribute="nomeContato" required={true}/>
                  <TextInput formId={formId} classes="input--w1-q3" placeholder="Telefone" attribute="telefoneContato" mask="telefone" required={true}/>
                  <TextInput formId={formId} classes="input--w1-q3" placeholder="Celular" attribute="celularContato" mask="celular" required={true}/>
                </div>
              </div>
            </div>
            <div className="form-group">
              <p className="form-group__title">Processo</p>
              <div className="inputs inputs--style-3">
                <div className="multi-input">
                  <TextInput formId={formId} classes="input--w3" placeholder="Número do Processo" attribute="numProcesso" required={true}/>
                  <TextDateInput formId={formId} classes="input--w1-q3" placeholder="Início do Processo" attribute="inicioProcesso" required={true}/>
                  <TextDateInput formId={formId} classes="input--w1-q3" placeholder="Fim do Processo" attribute="fimProcesso" required={true}/>
                </div>
                <SelectInput
                    formId={formId}
                    size="w2"
                    placeholder="Status do Processo"
                    attribute="statusProcesso"
                    required={true}
                    options={[
                      { value: 'Pré Cadastro', label: 'Pré-cadastro' },
                      { value: 'Apropriado', label: 'Apropriado' },
                      { value: 'Concluido', label: 'Concluído' },
                      { value: 'Cancelado', label: 'Cancelado' },
                      { value: 'indeferido', label: 'Indeferido' },
                    ]}
                    />
              </div>
            </div>
          </form>
        </div>

        <div className="page__footer">
          <div className="page__footer-left">
            <span className="page__step">Etapa 1 de 3</span>
          </div>
          <div className="page__footer-right">
            <button className="btn btn--two">Voltar</button>
            <button className="btn btn--one">Continuar</button>
          </div>
        </div>
      </motion.div>
  )
}