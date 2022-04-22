import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import IcClose from '@/assets/svg/ic_close.svg'

import Modal from '@/components/Modal/Modal'
import Form from '@/components/Form/Form'
import TextDateInput from '@/components/Input/TextDateInput'

import ModalHelper from '@/helpers/ModalHelper'
import FormHelper from '@/helpers/FormHelper'

export default function ModalContatoAdicionalCreate(props) {
  const dependsOn = props.dependsOn
  const process = props.process || false
  const formRaw = props.formRaw || {}
  const formComputed = props.formComputed || {}

  const [formId, setFormId] = useState(null)
  const [formProps, setFormProps] = useState(null)

  const modalName = 'ModalContatoAdicionalCreate'

  function onAfterOpen() {
    let formId = FormHelper.new({
      props: { raw: formRaw, computed: formComputed }
    })

    setFormId(formId)

    setFormProps({
      id: formId,
      model: 'S7Conselheiro',
      action: 'create',
      dependsOn: dependsOn,
      process: process
    })
  }

  function onRequestClose() {
    FormHelper.remove(formId)
  }

  function handleBtnCloseClick(event) {
    ModalHelper.close(modalName)
  }

  function handleSubmit(event) {
    ModalHelper.close(modalName)
  }

  return (
    <Modal name={modalName} onAfterOpen={onAfterOpen} onRequestClose={onRequestClose}>
      <div className="modal">
        <div className="modal__header">
          <div className="modal__header-left">
            <div className="modal__titles">
              <span className="modal__hat">Conselho Administrativo</span>
              <span className="modal__title">Adicionar pessoa</span>
            </div>
          </div>
          <div className="modal__header-right">
            <button className="btn btn-close" onClick={handleBtnCloseClick}>
              <div className="svg icon">
                <IcClose/>
              </div>
            </button>
          </div>
        </div>
        <div className="modal__content">
          <Form {...formProps} onSubmit={handleSubmit}>
            <div className="inputs input-style-2">
              <TextDateInput formId={formId} classes="w1-q3" label="Data de admissão" attribute="dataAdmissao" format="L"/>

              <button type="submit" className="btn btn-six btn-bright-blue">Salvar</button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  )
}