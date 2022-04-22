import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import update from 'immutability-helper'

import { openModal, closeModal, updateModal } from '@/actions/Modal'
import { updateFormRaw, updateFormComputed } from '@/actions/Form'

import IcPencil from '@/assets/icons/ic_pencil.svg'
import IcTrashcan from '@/assets/icons/ic_trashcan.svg'
import ModalHelper from '@/ModalHelper'

export default function TextAttributeFormSection(props) {
  const { model, action, attribute } = props

  const forms = useSelector(state => state.Forms)
  const modal = useSelector(state => state.Modal)

  const dispatch = useDispatch()

  function handleNewItemClick(event) {
    const { onCreateModalName } = props

    ModalHelper.open({ name: onCreateModalName })
  }

  function handleUpdateItemClick(index, event) {
    const { onUpdateModalName } = props

    dispatch(openModal({
      name: onUpdateModalName,
      params: {
        index
      }
    }))
  }

  function handleRemoveItemClick(index, event) {
    dispatch(updateFormComputed(model, action, {
      [attribute]: { $splice: [[index, 1]] }
    }))
  }

  const { title, message, onClick } = props
  const Icon = props.icon

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
      
      {props.children}
    </div>
  )
}

