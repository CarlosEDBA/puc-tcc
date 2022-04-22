import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import update from 'immutability-helper'
import classNames from 'classnames'
import { utilsBr } from 'js-brasil'
import MaskedInput from 'react-text-mask'

import * as Forms from '@/actions/Form'

export default function TextAreaInput(props) {
  const formId = props.formId
  const attribute = props.attribute
  const initialValue =  props.initialValue
  const label = props.label
  const classes = props.classes || ''
  const required = props.required || false
  const onChange = props.onChange
  const onFocus = props.onFocus

  const forms = useSelector(state => state.Forms)

  const [inputValue, setInputValue] = useState('')

  const dispatch = useDispatch()

  let value

  useEffect(() => {
    setInitialValue()
  }, [formId, initialValue])

  function initFormAttribute() {
    if (forms[formId]) {
      console.log(formId, attribute, forms[formId])

      if (forms[formId]['raw'][attribute] === undefined) {
        dispatch(Forms.updateFormRawAttribute(formId, attribute, {
          $set: ''
        }))
      }
    }
  }

  function updateRenderedValue() {
    if (forms[formId]) {
      if (forms[formId]['raw'][attribute] !== undefined) {
        value = forms[formId]['raw'][attribute]
      }
    }
  }

  function setInitialValue() {
    if (formId && initialValue) {
      let value = initialValue

      if (typeof initialValue === 'number') value = value.toString()

      dispatch(Forms.updateFormRawAttribute(formId, attribute, {
        $set: value
      }))
    }
  }

  function handleInputChange(event) {
    const inputText = event.target.value

    if (inputText !== undefined && inputText !== null) {
      dispatch(Forms.updateFormRawAttribute(formId, attribute, {
        $set: inputText
      }))

      if (onChange) onChange({
        attribute: attribute,
        value: inputText
      })
    }
  }

  function handleInputFocus(event) {
    if (onFocus) onFocus({
      attribute: attribute,
      value: value
    })
  }

  initFormAttribute()
  updateRenderedValue()

  return (
    <div className={classNames('input', classes)}>
      {(label) ? (
        <label>{label}:{(required) ? (<span className="orange"> *</span>) : ''}</label>
      ) : null}
      <div className="input-container">
        <textarea value={value || ''} onChange={handleInputChange} onFocus={handleInputFocus}/>
      </div>
    </div>
  )
}

