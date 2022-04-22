import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as Forms from '@/actions/Form'
import ModalHelper from '@/ModalHelper'

export default function ObjectArrayAttributeForm(props) {
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

    console.log(mode, attribute, sourceForm, sourceFormRaw, sourceFormComputed)

    if (!mode || mode === 'create') {
      if (!targetFormRaw[attribute]) {
        dispatch(Forms.updateFormRawAttribute(parentFormId, attribute, {
          $set: []
        }))
      }

      if (!targetFormComputed[attribute]) {
        dispatch(Forms.updateFormComputedAttribute(parentFormId, attribute, {
          $set: []
        }))
      }

      if (sourceFormRaw) {
        dispatch(Forms.updateFormRawAttribute(parentFormId, attribute, {
          $push: [sourceFormRaw]
        }))
      }

      if (sourceFormComputed) {
        dispatch(Forms.updateFormComputedAttribute(parentFormId, attribute, {
          $push: [sourceFormComputed]
        }))
      }
    } else if (mode === 'update') {
      if (targetFormRaw[attribute] && sourceFormRaw) {
        dispatch(Forms.updateFormRawAttribute(parentFormId, attribute, {
          [index]: {$set: sourceFormRaw}
        }))
      }

      if (targetFormComputed[attribute] && sourceFormComputed) {
        dispatch(Forms.updateFormComputedAttribute(parentFormId, attribute, {
          [index]: {$set: sourceFormComputed}
        }))
      }
    }

    dispatch(Forms.updateForm(formId, {
      $set: {
        raw: {},
        computed: {}
      }
    }))

    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit}>
      {props.children}
    </form>
  )
}

