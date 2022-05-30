import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import useFeather from '@/hooks/useFeather'

export default function BoxPacoteItem(props) {
  useFeather()

  const pacote = props.pacote
  const onChange = props.onChange

  const [title, setTitle] = useState('')

  const checkbox = useRef(null)

  useEffect(() => {
    const nome = pacote.nome
    const categoria = pacote.categoria

    if (categoria) {
      setTitle(`${nome} - Categoria ${categoria}`)
    } else {
      setTitle(nome)
    }
  }, [])

  function handleClick(event) {
    if (checkbox.current.checked) {
      checkbox.current.checked = false

      if (onChange) {
        onChange({ status: 'unchecked', item: pacote })
      }
    } else {
      checkbox.current.checked = true

      if (onChange) {
        onChange({ status: 'checked', item: pacote })
      }
    }
  }

  return (
    <div className="box-pacote-item" onClick={handleClick}>
      <div className="box-pacote-item__left">
        <div className="box-pacote-item__checkbox">
          <div className="container coloured">
            <div className="checkbox">
              <label>
                <input type="checkbox" ref={checkbox}/>
                <span className="checkbox-material">
                  <span className="check"></span>
                </span>
              </label>
            </div>
          </div>
        </div>
        <div className="box-pacote-item__titles">
          <p className="box-pacote-item__title">{title}</p>
          <p className="box-pacote-item__subtitle"></p>
        </div>
      </div>
      <div className="box-pacote-item__right"></div>
    </div>
  )
}

