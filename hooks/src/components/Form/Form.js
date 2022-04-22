import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import FormHelper from '@/helpers/FormHelper'

export default function Form(props) {
  const id = props.id
  const className = props.className
  const onSubmit = props.onSubmit

  function handleSubmit(event) {    
    event.preventDefault()

    FormHelper.submit(props)

    if (onSubmit) onSubmit(props)
  }

  return (
    <form className={className} onSubmit={handleSubmit}>
      {props.children}
    </form>
  )
}
