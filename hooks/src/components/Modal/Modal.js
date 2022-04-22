import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import update from 'immutability-helper'

import ReactModal from 'react-modal'

import { addModal, openModal, closeModal, updateModal, resetModal } from '@/actions/Modal'

export default function Modal(props) {
  const { name } = props

  const modal = useSelector(state => state.Modal)

  const dispatch = useDispatch()

  function onAfterOpen(event) {
    if (props.onAfterOpen) props.onAfterOpen()
  }

  function onRequestClose(event) {
    const { name } = props

    dispatch(closeModal(name))

    if (props.onRequestClose) props.onRequestClose()
  }

  return (
    <ReactModal {...props}
      isOpen={modal[name] && modal[name].isOpen}
      shouldCloseOnOverlayClick={true}
      onAfterOpen={onAfterOpen}
      onRequestClose={onRequestClose}

      className="react-modal"
      portalClassName="react-modal-portal"
      overlayClassName="react-modal-overlay"
      bodyOpenClassName="react-modal-body-open"

      shouldFocusAfterRender={true}>
      
      {props.children}
    </ReactModal>
  )
}

