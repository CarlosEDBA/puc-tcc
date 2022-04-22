import React, { useRef, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import useFeather from '@/hooks/useFeather'

export default function PageGoBack(props) {
  useFeather()

  const history = useHistory()

  function handleClick(event) {
    history.goBack()
  }

  return (
      <button className="page__go-back" onClick={handleClick}>
        <i data-feather="arrow-left"></i>
      </button>
  )
}