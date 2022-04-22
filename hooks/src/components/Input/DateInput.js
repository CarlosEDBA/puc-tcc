import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import update from 'immutability-helper'
import classNames from 'classnames'
import { utilsBr } from 'js-brasil'
import MaskedInput from 'react-text-mask'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment'

import * as Forms from '@/actions/Form'
import moment from 'moment'

export default function DateInput(props) {
  const formId = props.formId
  const attribute = props.attribute
  const initialValue = props.initialValue
  const label = props.label
  const classes = props.classes || ''
  const required = props.required || false
  const onChange = props.onChange

  const forms = useSelector(state => state.Forms)

  const [inputValue, setInputValue] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    setInitialValue()
  }, [formId, initialValue])

  function setInitialValue() {
    if (formId && initialValue && !inputValue) {
      let format = 'L'
      let initValue = initialValue
      let date = moment(initValue)

      setInputValue(date.toDate())

      if (date.isValid()) {
        dispatch(Forms.updateFormRawAttribute(formId, attribute, {
          $set: date.format(format)
        }))

        dispatch(Forms.updateFormComputedAttribute(formId, attribute, {
          $set: {
            type: 'date',
            format: format,
            value: date.toDate()
          }
        }))
      } else {
        if (typeof initialValue === 'number') initValue = initValue.toString()

        dispatch(Forms.updateFormRawAttribute(formId, attribute, {
          $set: initValue
        }))
      }

      if (onChange) onChange({
        attribute: attribute,
        value: initialValue
      })
    }
  }

  function handleDayChange(date) {
    if (date) {
      console.log('handleDayChange date', date)

      let format = 'L'
      let inputText = moment(date).format(format)

      dispatch(Forms.updateFormRawAttribute(formId, attribute, {
        $set: inputText
      }))

      dispatch(Forms.updateFormComputedAttribute(formId, attribute, {
        $set: {
          type: 'date',
          format: format,
          value: date
        }
      }))

      if (onChange) onChange({
        attribute: attribute,
        value: inputText
      })
    }
  }

  return (
    <div className={classNames('input', classes)}>
      <label>{label}:{(required) ? (<span className="orange"> *</span>) : ''}</label>
      <div className="input-container">
        <DayPickerInput
          dayPickerProps={{
            localeUtils: MomentLocaleUtils,
            locale: 'pt-br'
          }}
          formatDate={formatDate}
          parseDate={parseDate}
          value={inputValue}
          placeholder=""
          onDayChange={handleDayChange}/>
      </div>
    </div>
  )
}

