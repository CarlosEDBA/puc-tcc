import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import update from 'immutability-helper'
import classNames from 'classnames'
import { utilsBr } from 'js-brasil'
import MaskedInput from 'react-text-mask'
import moment from 'moment'

import FormHelper from '@/helpers/FormHelper'

export default function TextDateInput(props) {
  const [data, setData] = useState('')
  const [meta, setMeta] = useState('')

  const formId = props.formId
  const attribute = props.attribute
  const initialValue =  props.initialValue
  const format = props.format || 'L'
  const label = props.label
  const placeholder = props.placeholder
  const classes = props.classes || ''
  const required = props.required || false
  const onChange = props.onChange
  const onFocus = props.onFocus

  const formats = {
    'L': [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  }

  useEffect(() => {
    initFormAttribute()
    setInitialValue()
  }, [formId, initialValue])

  function initFormAttribute() {
    if (FormHelper.dataAttributeIsUndefined(formId, attribute)) {
      FormHelper.setDataAttribute(formId, attribute, { $set: '' })
    }
  }

  function setInitialValue() {
    if (initialValue) {
      let _initialValue = initialValue
      let date = moment(_initialValue)

      if (date.isValid()) {
        FormHelper.setDataAttribute(formId, attribute, {
          $set: date.format(format)
        })

        FormHelper.setMetaAttribute(formId, attribute, {
          $set: {
            type: 'date',
            format: format,
            value: date.toDate()
          }
        })

        setData(date.format(format))
      } else {
        if (typeof _initialValue === 'number') _initialValue = _initialValue.toString()

        FormHelper.setDataAttribute(formId, attribute, {
          $set: _initialValue
        })

        setData(_initialValue)
      }
    }
  }

  function handleInputChange(event) {
    const inputText = event.target.value

    if (inputText !== undefined && inputText !== null) {
      FormHelper.setDataAttribute(formId, attribute, {
        $set: inputText
      })

      setData(inputText)

      let date = moment(inputText, format).toDate()

      FormHelper.setMetaAttribute(formId, attribute, {
        $set: {
          type: 'date',
          format: format,
          value: date
        }
      })

      setMeta({
        type: 'date',
        format: format,
        value: date
      })

      if (onChange) onChange({
        attribute: attribute,
        data: data,
        meta: meta,
      })
    }
  }

  function handleInputFocus(event) {
    if (onFocus) onFocus({
      attribute: attribute,
      data: data,
      meta: meta,
    })
  }

  function renderMaskedInput() {
    let mask = formats[0]

    switch (format) {
      case 'L':
        mask = formats[format]
        break
    }

    return (<MaskedInput mask={mask} value={data} placeholder={placeholder} onChange={handleInputChange} onFocus={handleInputFocus}/>)
  }

  return (
    <div className={classNames('input', classes)}>
      {(label) ? (
          <label>{label}:{(required) ? (<span className="input__required"> *</span>) : ''}</label>
      ) : null}
      <div className="input__container">
        {renderMaskedInput()}
      </div>
    </div>
  )
}