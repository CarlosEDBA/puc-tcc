import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classNames from 'classnames'

import * as Forms from '@/actions/Form'

const timeToWait = 250

let timeToWaitTimeout = null

export default function SuggestionInput(props) {
  const formId = props.formId
  const label = props.label
  const attribute = props.attribute
  const dataSource = props.dataSource || {}
  const classes = props.classes || ''
  const required = props.required || false
  const initialValue = props.initialValue
  const onChange = props.onChange

  const [loading, setLoading] = useState(false)

  const [inputValue, setInputValue] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [focusedSuggestion, setFocusedSuggestion] = useState(-1)
  const [suggestionSelected, setSuggestionSelected] = useState(false)

  const forms = useSelector(state => state.Forms)

  const dispatch = useDispatch()

  useEffect(() => {
    setInitialValue()
  }, [formId, initialValue])

  function combineAttributes(data, attributes) {
    let text = ''

    for (let i = 0; i < attributes.length; i++) {
      let attribute = attributes[i]

      text = text + data[attribute]

      if (i !== attributes.length - 1) text = text + ' '
    }

    return text
  }

  function initFormAttribute() {
    if (formId && forms[formId]) {
      if (forms[formId]['raw'][attribute] === undefined) {
        dispatch(Forms.updateFormRawAttribute(formId, attribute, {
          $set: ''
        }))
      }
    }
  }

  function setInitialValue() {
    const repository = dataSource.repository
    const attributes = dataSource.attributes

    if (initialValue) {
      if (typeof initialValue === 'object' && initialValue._id && initialValue.label) {
        setInputValue(initialValue.label)

        if (formId) {
          dispatch(Forms.updateFormRawAttribute(formId, attribute, {
            $set: initialValue.label
          }))

          dispatch(Forms.updateFormComputedAttribute(formId, attribute, {
            $set: initialValue._id
          }))
        }
      }

      if (typeof initialValue === 'object' && !initialValue.label) {
        setInputValue(combineAttributes(initialValue, attributes))

        if (formId) {
          dispatch(Forms.updateFormRawAttribute(formId, attribute, {
            $set: combineAttributes(initialValue, attributes)
          }))

          dispatch(Forms.updateFormComputedAttribute(formId, attribute, {
            $set: initialValue._id
          }))
        }
      }

      if (typeof initialValue === 'string') {
        repository.findById(initialValue)
          .then((data) => {
            let inputValue = combineAttributes(data, attributes)

            setInputValue(inputValue)

            if (formId) {
              dispatch(Forms.updateFormRawAttribute(formId, attribute, {
                $set: inputValue
              }))

              dispatch(Forms.updateFormComputedAttribute(formId, attribute, {
                $set: data._id
              }))
            }
          })
          .catch((err) => {
            setLoading(false)
          })
      }

      setSuggestionSelected(true)
    }
  }

  function findSuggestions(str) {
    const repository = dataSource.repository
    const attributes = dataSource.attributes

    repository.suggestions(str, attributes)
      .then((data) => {
        setSuggestions(data)

        setTimeout(() => { setLoading(false) }, 500)
      })
      .catch((err) => {
        setLoading(false)
      })
  }

  function userIsTyping() {
    console.log('log > userIsTyping:')

    setLoading(true)
    setSuggestions([])
    setSuggestionSelected(false)
  }

  function userFinishedTyping(str = '') {
    console.log('log > userFinishedTyping:', str)

    if (str !== '') findSuggestions(str)
  }

  function handleInputChange(event) {
    if (event) {
      const inputValue = event.target.value

      setInputValue(inputValue)

      if (inputValue !== null) {
        if (inputValue === '') {
          setSuggestions([])
          setLoading(false)

          if (formId) {
            dispatch(Forms.updateFormComputedAttribute(formId, attribute, {
              $set: ''
            }))
          }

          if (onChange) onChange({
            attribute: attribute,
            value: null
          })
        }

        userIsTyping()

        clearTimeout(timeToWaitTimeout)

        timeToWaitTimeout = setTimeout(userFinishedTyping.bind(null, inputValue), timeToWait)
      }

      if (formId) {
        dispatch(Forms.updateFormRawAttribute(formId, attribute, {
          $set: inputValue
        }))
      }
    }
  }

  function handleInputKeyDown(event) {
    switch (event.keyCode) {
      case 13:
        event.preventDefault()

        if (focusedSuggestion > -1) {
          const suggestion = suggestions[focusedSuggestion]

          setInputValue(suggestion.label)

          setSuggestionSelected(true)

          if (formId) {
            dispatch(Forms.updateFormRawAttribute(formId, attribute, {
              $set: suggestion.label
            }))

            dispatch(Forms.updateFormComputedAttribute(formId, attribute, {
              $set: suggestion._id
            }))
          }

          if (onChange) {
            onChange({
              attribute: attribute,
              value: suggestion
            })
          }
        }
        break

      case 38:
        if (suggestions.length > 0) {
          if (focusedSuggestion > -1) {
            setFocusedSuggestion(focusedSuggestion - 1)
          }
        }
        break

      case 40:
        if (suggestions.length > 0) {
          if (focusedSuggestion < suggestions.length - 1) {
            setFocusedSuggestion(focusedSuggestion + 1)
          }
        }
        break
    }
  }

  function handleSuggestionClick(event, suggestion) {
    setInputValue(suggestion.label)

    setSuggestionSelected(true)

    if (formId) {
      dispatch(Forms.updateFormRawAttribute(formId, attribute, {
        $set: suggestion.label
      }))

      dispatch(Forms.updateFormComputedAttribute(formId, attribute, {
        $set: suggestion._id
      }))
    }

    if (onChange) {
      onChange({
        attribute: attribute,
        value: suggestion
      })
    }
  }

  function renderSuggestions() {
    return suggestions.map((suggestion, i) => {
      return (
        <li key={suggestion._id} tabIndex="0" className={classNames({
          'selected': focusedSuggestion === i
        })} onClick={(event) => handleSuggestionClick(event, suggestion)}>
          {suggestion.label}
        </li>
      )
    })
  }

  initFormAttribute()

  return (
    <div className={classNames('input input-style-2', classes)}>
      {(label) ? (
        <label>{label}:{(required) ? (<span className="orange"> *</span>) : ''}</label>
      ) : null}

      <div className="input-container">
        <input
          type="text"
          tabIndex="0"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
        />
      </div>

      {(inputValue !== '' && !suggestionSelected) ? (
        <ul className={classNames('suggestions', {
          'is-loading': loading
        })}>
          <div className="spinner"></div>
          {(!loading && suggestions.length > 0) ? renderSuggestions() : null}
        </ul>
      ) : null}
    </div>
  )
}