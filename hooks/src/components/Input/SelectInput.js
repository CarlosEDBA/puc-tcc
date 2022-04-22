import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import classNames from 'classnames'
import ReactSelect from 'react-select'

import FormHelper from '@/helpers/FormHelper'

export default function SelectInput(props) {
  const [data, setData] = useState('')
  const [meta, setMeta] = useState('')

  const formId = props.formId
  const attribute = props.attribute
  const initialValue = props.initialValue
  const options = props.options
  const size = props.size
  const label = props.label
  const placeholder = props.placeholder || 'Selecione...'
  const classes = props.classes || ''
  const required = props.required || false
  const labelKey = props.labelKey || 'nome'
  const valueKey = props.valueKey || '_id'
  const isClearable = props.isClearable || false
  const onChange = props.onChange

  let reactSelectOptions, customStyles

  useEffect(() => {
    initFormAttribute()
    setInitialValue()
  }, [formId, initialValue])

  function initFormAttribute() {
    if (FormHelper.dataAttributeIsUndefined(formId, attribute)) {
      FormHelper.setDataAttribute(formId, attribute, { $set: '' })
    }
  }

  function isOption(obj) {
    if (obj.label && obj.value) return true
    return false
  }

  function isOptionsArray(arr) {
    for (const item of arr) {
      if (!isOption(item)) return false
      return true
    }
  }

  function isStringArray(arr) {
    for (const item of arr) {
      if (typeof item !== 'string') return false
      return true
    }
  }

  function isObjectArray(arr) {
    for (const item of arr) {
      if (typeof item === 'object') return true
      return false
    }
  }

  function setInitialValue() {
    if (initialValue) {
      let _initialValue = initialValue

      if (typeof _initialValue === 'object' && isOption(_initialValue)) {
        setData(_initialValue)

        if (formId) {
          FormHelper.setDataAttribute(formId, attribute, {
            $set: _initialValue
          })
        }
      }

      if (typeof _initialValue === 'object' && _initialValue._id) {
        let option = getOptionByValue(_initialValue._id)

        if (option) {
          setData(option)

          if (formId) {
            FormHelper.setDataAttribute(formId, attribute, {
              $set: option
            })
          }
        }
      }

      if (typeof _initialValue === 'string') {
        let option = getOptionByValue(_initialValue)

        if (option) {
          setData(option)

          if (formId) {
            FormHelper.setDataAttribute(formId, attribute, {
              $set: option
            })
          }
        }
      }

      if (Array.isArray(_initialValue)) {
        if (isOptionsArray(_initialValue)) {
          setData(_initialValue)

          if (formId) {
            FormHelper.setDataAttribute(formId, attribute, {
              $set: _initialValue
            })
          }
        } else if (isStringArray(_initialValue)) {
          let options = generateOptionsFromStringArray(_initialValue)

          setData(options)

          if (formId) {
            FormHelper.setDataAttribute(formId, attribute, {
              $set: options
            })
          }
        } else if (isObjectArray(_initialValue)) {
          let options = generateOptionsFromObjectArray(_initialValue)

          setData(options)

          if (formId) {
            FormHelper.setDataAttribute(formId, attribute, {
              $set: options
            })
          }
        }
      }
    }
  }

  function getOptionByValue(value) {
    for (let option of options) {
      if (option.value === value) return option
    }

    return null
  }

  function generateOptionsFromStringArray(strArr) {
    const arr = []

    for (let str of strArr) {
      arr.push({ value: str, label: str })
    }

    return arr
  }

  function generateOptionsFromObjectArray(objArr) {
    const arr = []

    for (let item of objArr) {
      arr.push({ value: item[valueKey], label: item[labelKey] })
    }

    return arr
  }

  function getSize() {
    console.log(size)
    switch (size) {
      case 'w1':
        return 100

      case 'w1-q1':
        return 125

      case 'w1-q2':
        return 150

      case 'w1-q3':
        return 175


      case 'w2':
        return 200

      case 'w2-q1':
        return 225

      case 'w2-q2':
        return 250

      case 'w2-q3':
        return 275


      case 'w3':
        return 300

      case 'w3-q1':
        return 325

      case 'w3-q2':
        return 350

      case 'w3-q3':
        return 375


      case 'w4':
        return 400

      case 'w4-q1':
        return 425

      case 'w4-q2':
        return 450

      case 'w4-q3':
        return 475

      default:
        return 150
    }
  }

  function handleChange(selectedOption) {
    if (selectedOption) {
      setData(selectedOption)

      if (formId) {
        FormHelper.setDataAttribute(formId, attribute, {
          $set: selectedOption
        })
      }

      if (onChange) onChange({
        attribute: attribute,
        label: selectedOption.label,
        value: selectedOption.value,
      })
    }

    if (selectedOption === null) {
      setData(null)

      if (formId) {
        FormHelper.setDataAttribute(formId, attribute, {
          $set: 'selectedOption'
        })
      }

      if (onChange) onChange({
        attribute: attribute,
        label: null,
        value: null,
      })
    }
  }

  if (typeof options[0] === 'string') {
    reactSelectOptions = generateOptionsFromStringArray(options)
  } else {
    reactSelectOptions = options
  }

  customStyles = {
    container: (provided, state) => {
      console.log('container - provided:', provided)

      return {
        ...provided,
        borderColor: state.isFocused ? 'red' : 'green',
      }
    },

    control: (provided, state) => {
      console.log('control - provided:', provided)

      return {
        ...provided,
        cursor: 'pointer',

        padding: 0,
        minHeight: 50,
        width: getSize(),
        borderRadius: '10px',

        borderColor: state.isFocused ? 'var(--colorLightGray)' : 'var(--colorPlatinum)',
        backgroundColor: '#fff',
        boxShadow: state.isFocused ? null : null,

        fontFamily: 'myriad-pro, sans-serif',

        '&:hover': {
          borderColor: state.isFocused ? 'var(--colorLightGray)' : 'var(--colorPlatinum)',
        },
      }
    },

    valueContainer: (provided, state) => {
      console.log('group - provided:', provided)

      return {
        ...provided,
        padding: '0 14px',
      }
    },

    option: (provided, state) => {
      console.log('option - provided:', provided)

      return {
        ...provided,
        cursor: 'pointer',
        fontFamily: 'myriad-pro, sans-serif'
      }
    }
  }

  return (
    <div className={classNames('input', classes)}>
      {(label) ? (
          <label>{label}:{(required) ? (<span className="input__required"> *</span>) : ''}</label>
      ) : null}

      <ReactSelect
        {...props}
        styles={customStyles}
        placeholder={placeholder}
        value={data}
        isClearable={isClearable}
        onChange={handleChange}
        options={reactSelectOptions}/>
    </div>
  )
}

