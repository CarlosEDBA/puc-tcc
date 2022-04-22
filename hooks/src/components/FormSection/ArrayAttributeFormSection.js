import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import update from 'immutability-helper'

import { openModal, closeModal, updateModal } from '@/actions/Modal'

import * as Forms from '@/actions/Form'

import IcPencil from '@/assets/icons/ic_pencil.svg'
import IcTrashcan from '@/assets/icons/ic_trashcan.svg'
import ModalHelper from '@/ModalHelper'

export default function ArrayAttributeFormSection(props) {
  const formId = props.formId
  const attribute = props.attribute
  const title = props.title
  const message = props.message
  const onClick = props.onClick
  const onCreateModalName = props.onCreateModalName
  const onUpdateModalName = props.onUpdateModalName
  const Icon = props.icon

  const forms = useSelector(state => state.Forms)

  const dispatch = useDispatch()

  function handleNewItemClick(event) {
    ModalHelper.open({ name: onCreateModalName })
  }

  function handleUpdateItemClick(index, event) {
    ModalHelper.open({
      name: onUpdateModalName,
      params: { index: index }
    })
  }

  function handleRemoveItemClick(index, event) {
    if (forms[formId]['raw'][attribute]) {
      dispatch(Forms.updateFormRawAttribute(formId, attribute, {
        $splice: [[index, 1]]
      }))
    }

    if (forms[formId]['computed'][attribute]) {
      dispatch(Forms.updateFormComputedAttribute(formId, attribute, {
        $splice: [[index, 1]]
      }))
    }
  }

  function renderSectionContent() {
    let items
    
    if (forms[formId]) items = forms[formId]['raw'][attribute] || []

    if (items) {
      return (
        <div className="form-section-content">
          {items.map((name, i) => {
            return (
              <div key={i} className="form-item">
                <div className="form-item-left">
                  <span className="form-item-name">{name}</span>
                </div>
                <div className="form-item-right">
                  <div className="actions">
                    <button className="svg action" onClick={handleUpdateItemClick.bind(null, i)}>
                      <IcPencil/>
                    </button>
                    <button className="svg action" onClick={handleRemoveItemClick.bind(null, i)}>
                      <IcTrashcan/>
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )
    }
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

