import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import update from 'immutability-helper'

export default function Input(props) {
  const { label, classes } = props

  const [inputValue, setInputValue] = useState('')

  function handleInputChange(event) {
    const inputText = event.target.value

    if (value !== undefined && value !== null) {
      setInputValue(inputText)
    }
  }

  return (
    <div className={classNames('input', classes)}>
      <label>{label}:</label>
      <input type="text" value={inputValue} onChange={handleInputChange}/>
    </div>
  )
}

