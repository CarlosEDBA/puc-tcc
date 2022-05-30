import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'
import { utilsBr } from 'js-brasil'
import MaskedInput from 'react-text-mask'

import FormHelper from '@/helpers/FormHelper'

export default function TextInput(props) {
  const [meta, setMeta] = useState('')

  const formId = props.formId
  const attribute = props.attribute
  const initialValue =  props.initialValue
  const mask = props.mask
  const label = props.label
  const placeholder = props.placeholder
  const type = props.type || 'text'
  const classes = props.classes || ''
  const required = props.required || false
  const onChange = props.onChange
  const onFocus = props.onFocus

  useEffect(() => {
    initFormAttribute()
    setInitialValue()
  }, [formId, initialValue])

  let data = ''

  const forms = useSelector(state => state.Forms)

  function updateRenderedValue() {
    if (formId && forms[formId]) {
      if (forms[formId]['data'][attribute] !== undefined) {
        data = forms[formId]['data'][attribute]
      }
    }
  }

  function initFormAttribute() {
    if (FormHelper.dataAttributeIsUndefined(formId, attribute)) {
      FormHelper.setDataAttribute(formId, attribute, { $set: '' })
    }
  }

  function setInitialValue() {
    if (initialValue) {
      let _initialValue = initialValue

      if (typeof _initialValue === 'number') _initialValue = _initialValue.toString()

      if (formId) {
        FormHelper.setDataAttribute(formId, attribute, {
          $set: _initialValue
        })
      }

      data = _initialValue
    }
  }

  function handleInputChange(event) {
    const inputText = event.target.value

    console.log(event)

    if (inputText !== undefined && inputText !== null) {
      data = inputText

      FormHelper.setDataAttribute(formId, attribute, {
        $set: inputText
      })

      if (onChange) onChange({
        attribute: attribute,
        data: inputText,
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
    let textMask

    if (typeof mask === "string") {
      textMask = utilsBr.MASKS[mask].textMask

      return (<MaskedInput mask={textMask} value={data} placeholder={placeholder} onChange={handleInputChange} onFocus={handleInputFocus}/>)
    } else {
      return (<MaskedInput mask={mask} value={data} placeholder={placeholder} onChange={handleInputChange} onFocus={handleInputFocus}/>)
    }
  }

  updateRenderedValue()

  return (
    <div className={classNames('input', classes)}>
      {(label) ? (
          <label>{label}:{(required) ? (<span className="input__required"> *</span>) : ''}</label>
      ) : null}
      <div className="input__container">
        {(mask)
          ? renderMaskedInput()
          : (<input type={type} value={data || ''} placeholder={placeholder} onChange={handleInputChange} onFocus={handleInputFocus}/>)
        }
      </div>
    </div>
  )
}

