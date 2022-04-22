import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import update from 'immutability-helper'
import classNames from 'classnames'
import { utilsBr } from 'js-brasil'
import MaskedInput from 'react-text-mask'
import ReactSelect from 'react-select'

import * as Forms from '@/actions/Form'
import MoedaRepository from '@/repository/MoedaRepository'

export default function CurrencyInput(props) {
  const formId = props.formId
  const attribute = props.attribute
  const initialValue = props.initialValue
  const mask = props.mask
  const label = props.label
  const classes = props.classes || ''
  const required = props.required || false

  const [moedas, setMoedas] = useState([])

  const forms = useSelector(state => state.Forms)

  const dispatch = useDispatch()

  let textMask, currency, value, customStyles

  useEffect(() => {
    fetchMoedas()
  }, [])

  useEffect(() => {
    setInitialValue()
  }, [formId, initialValue])

  function initFormAttribute() {
    if (forms[formId]) {
      if (forms[formId]['raw'][attribute] === undefined) {
        dispatch(Forms.updateFormRawAttribute(formId, attribute, {
          $set: {
            currency: '',
            value: ''
          }
        }))
        dispatch(Forms.updateFormComputedAttribute(formId, attribute, {
          $set: {
            currency: '',
            value: ''
          }
        }))
      }
    }
  }

  function updateRenderedValue() {
    if (forms[formId]) {
      if (forms[formId]['raw'][attribute] !== undefined) {
        currency = forms[formId]['raw'][attribute]['currency']
        value = forms[formId]['raw'][attribute]['value']
      }
    }
  }

  function setInitialValue() {
    if (initialValue) {
      dispatch(Forms.updateFormRawAttribute(formId, attribute, {
        $set: {
          currency: getOptionByValue(initialValue.currency),
          value: initialValue.value,
        }
      }))
      dispatch(Forms.updateFormComputedAttribute(formId, attribute, {
        $set: {
          currency: initialValue.currency,
          value: initialValue.value,
        }
      }))
    }
  }

  function getOptionByValue(value) {
    for (let option of moedas) {
      if (option.value === value) return option
    }

    return null
  }

  function fetchMoedas() {
    MoedaRepository.find()
      .then((data) => {
        const moedaOptions = data.map((moeda) => ({ value: moeda.simbolo, label: moeda.simbolo }))

        setMoedas(moedaOptions)
      })
  }

  function handleCurrencyChange(selectedOption) {
    if (selectedOption) {
      dispatch(Forms.updateFormRawAttribute(formId, attribute, {
        $merge: {
          currency: selectedOption
        }
      }))
      dispatch(Forms.updateFormComputedAttribute(formId, attribute, {
        $merge: {
          currency: selectedOption.value
        }
      }))
    }
  }

  function handleInputChange(event) {
    const inputText = event.target.value

    if (inputText !== undefined && inputText !== null) {
      dispatch(Forms.updateFormRawAttribute(formId, attribute, {
        $merge: {
          value: inputText
        }
      }))
      dispatch(Forms.updateFormComputedAttribute(formId, attribute, {
        $merge: {
          value: inputText
        }
      }))
    }
  }

  function renderMaskedInput(value) {
    let textMask

    if (typeof mask === "string") {
      textMask = utilsBr.MASKS[mask].textMask

      return (<MaskedInput mask={textMask} value={value || ''} onChange={handleInputChange}/>)
    } else {
      return (<MaskedInput mask={mask} value={value || ''} onChange={handleInputChange}/>)
    }
  }

  customStyles = Object.assign({}, {
    control: (provided, state) => ({
      ...provided,
      width: '105px',
      borderRadius: '6px',
      borderColor: 'rgb(229, 229, 234)',
      backgroundColor: '#fff',
    })
  })

  initFormAttribute()
  updateRenderedValue()

  return (
    <div className={classNames('input input-currency input-style-2', classes)}>
      <label>{label}:{(required) ? (<span className="orange"> *</span>) : ''}</label>
      <div>
        <ReactSelect
          styles={customStyles}
          placeholder="Moeda"
          value={currency}
          options={moedas}
          onChange={handleCurrencyChange}/>

        <div className="input-container">
          {(mask)
            ? renderMaskedInput(value)
            : (<input type="text" value={value || ''} onChange={handleInputChange}/>)
          }
        </div>
      </div>
    </div>
  )
}

