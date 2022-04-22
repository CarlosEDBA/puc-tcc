import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import update from 'immutability-helper'

import * as Forms from '@/actions/Form'
import ModalHelper from '@/ModalHelper'

export default function ArrayAttributeForm(props) {
  const formId = props.formId
  const parentFormId = props.parentFormId
  const attribute = props.attribute
  const modalName = props.modalName
  const mode = props.mode
  const onSubmit = props.onSubmit

  const forms = useSelector(state => state.Forms)
  const modal = useSelector(state => state.Modal)

  const dispatch = useDispatch()

  function handleSubmit(event) {
    event.preventDefault()

    const sourceForm = forms[formId]
    const sourceFormRaw = sourceForm['raw']
    const sourceFormComputed = sourceForm['computed']

    const targetForm = forms[parentFormId]
    const targetFormRaw = targetForm['raw']
    const targetFormComputed = targetForm['computed']

    const index = ModalHelper.getParam(modalName, 'index')

    if (!mode || mode === 'create') {

      if (sourceFormRaw[attribute] && !targetFormRaw[attribute]) {
        dispatch(Forms.updateFormRawAttribute(parentFormId, attribute, {
          $set: []
        }))
      }

      if (sourceFormComputed[attribute] && !targetFormComputed[attribute]) {
        dispatch(Forms.updateFormComputedAttribute(parentFormId, attribute, {
          $set: []
        }))
      }

      if (sourceFormRaw[attribute]) {
        dispatch(Forms.updateFormRawAttribute(parentFormId, attribute, {
          $push: [sourceFormRaw[attribute]]
        }))
      }

      if (sourceFormComputed[attribute]) {
        dispatch(Forms.updateFormComputedAttribute(parentFormId, attribute, {
          $push: [sourceFormComputed[attribute]]
        }))
      }

    } else if (mode === 'update') {
      if (targetFormRaw[attribute]) {
        dispatch(Forms.updateFormRawAttribute(parentFormId, attribute, {
          [index]: { $set: sourceFormRaw[attribute] }
        }))
      }

      if (targetFormComputed[attribute]) {
        dispatch(Forms.updateFormComputedAttribute(parentFormId, attribute, {
          [index]: {$set: sourceFormComputed[attribute]}
        }))
      }
    }

    dispatch(Forms.updateFormRawAttribute(formId, attribute, {
      $set: ""
    }))

    dispatch(Forms.updateFormComputedAttribute(formId, attribute, {
      $set: null
    }))

    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit}>
      {props.children}
    </form>
  )
}