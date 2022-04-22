import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import * as Forms from '@/actions/Form'

export default function TextAttributeForm(props) {
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

    if (!mode || mode === 'create') {
      if (sourceFormRaw) {
        dispatch(Forms.updateFormRawAttribute(parentFormId, attribute, {
          $set: sourceFormRaw[attribute]
        }))
      }

    } else if (mode === 'update') {
      if (targetFormRaw[attribute] && sourceFormRaw) {
        dispatch(Forms.updateFormRawAttribute(parentFormId, attribute, {
          [modal[modalName].index]: {$set: sourceFormRaw}
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

