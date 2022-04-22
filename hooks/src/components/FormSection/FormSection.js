import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import IcPencil from '@/assets/svg/ic_pencil.svg'
import IcTrashcan from '@/assets/svg/ic_trashcan.svg'

import ModalHelper from '@/helpers/ModalHelper'
import NetworkHelper from '@/helpers/NetworkHelper'

export default function FormSection(props) {
  const model = props.model
  const action = props.action
  const title = props.title
  const message = props.message
  const Icon = props.icon
  const attributeIsSelect = props.attributeIsSelect
  const attributeToDisplay = props.attributeToDisplay
  const extraActions = props.extraActions || []
  const onCreateModalName = props.onCreateModalName
  const onUpdateModalName = props.onUpdateModalName

  const requests = useSelector(state => state.Network)

  function handleNewItemClick(event) {
    ModalHelper.open({
      name: onCreateModalName
    })
  }

  function handleUpdateItemClick(formId, event) {
    ModalHelper.open({
      name: onUpdateModalName,
      params: { formId: formId }
    })
  }

  function handleRemoveItemClick(formId, event) {
    NetworkHelper.deleteRequest(formId)
  }

  function handleCustomActionClick(formId, modalName, event) {
    ModalHelper.open({
      name: modalName,
      params: { formId: formId }
    })
  }

  function renderExtraActions(payload) {
    if (extraActions.length) {
      return extraActions.map((action, i) => {
        const Icon = action.icon

        return (
          <button className="svg action" onClick={(event) => action.handler(event, payload)}>
            <Icon/>
          </button>
        )
      })
    }
  }

  function renderSectionContent(mutations) {
    const payloads = requests.filter((request, i) => {
      if (request.params && request.params.model === model && request.params.action === action) {
        return true
      }
    })

    return (
      <div className="form-section-content">
        {payloads.map((payload, i) => {
          if (payload.data) {
            return (
              <div key={i} className="form-item">
                <div className="form-item-left">
                  {(attributeIsSelect)
                    ? (<span className="form-item-name">{payload.data.formData[attributeToDisplay].label}</span>)
                    : (<span className="form-item-name">{payload.data.formData[attributeToDisplay]}</span>)
                  }
                </div>
                <div className="form-item-right">
                  <div className="actions">
                    {renderExtraActions(payload)}

                    <button className="svg action" onClick={handleUpdateItemClick.bind(null, payload.id)}>
                      <IcPencil/>
                    </button>

                    <button className="svg action" onClick={handleRemoveItemClick.bind(null, payload.id)}>
                      <IcTrashcan/>
                    </button>
                  </div>
                </div>
              </div>
            )
          }
        })}
      </div>
    )
  }

  return (
    <div className="form-section">
      <p className="form-section-title">{title}</p>
      <button className="form-new-item" onClick={handleNewItemClick}>
        {(Icon) && (
          <div className="svg icon">
            <Icon/>
          </div>
        )}
        {message}
      </button>
      
      {renderSectionContent()}

      {props.children}
    </div>
  )
}