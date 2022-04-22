import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Modal from '@/components/Modal/Modal'
import Form from '@/components/Form/Form'
import TextDateInput from '@/components/Input/TextDateInput'

import IcClose from '@/assets/svg/ic_close.svg'

import ModalHelper from '@/helpers/ModalHelper'
import FormHelper from '@/helpers/FormHelper'

export default function ModalContatoAdicionalUpdate(props) {
  const action = props.action || 'create'
  const process = props.process || false
  const dependsOn = props.dependsOn

  const [formId, setFormId] = useState(null)
  const [formProps, setFormProps] = useState(null)

  const modalName = 'ModalContatoAdicionalUpdate'

  function onAfterOpen() {
    let formId = ModalHelper.getParam(modalName, 'formId')

    if (!formId) formId = FormHelper.new()

    setFormId(formId)

    setFormProps({
      id: formId,
      model: 'S7Conselheiro',
      action: action,
      dependsOn: dependsOn,
      process: process
    })

    if (action === 'update') {
      let objectId = ModalHelper.getRawValue(modalName, formId, '_id')

      FormHelper.setObjectId(formId, objectId)
    }
  }

  function onRequestClose() {
    let formId = ModalHelper.getParam(modalName, 'formId')

    if (!formId) FormHelper.remove(formId)

    setFormId(null)
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
              <span className="modal__title">Editar pessoa</span>
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
          <Form {...formProps} dependsOn={dependsOn} update={true} onSubmit={handleSubmit}>
            <div className="inputs input-style-2">
              <TextDateInput formId={formId} classes="w2" label="Data de admissão" attribute="dataAdmissao" format="L" initialValue={ModalHelper.getRawValue(modalName, formId, 'dataAdmissao')}/>

              <button type="submit" className="btn btn-six btn-bright-blue">Salvar</button>
            </div>
          </Form>
        </div>
      </div>
    </Modal>
  )
}