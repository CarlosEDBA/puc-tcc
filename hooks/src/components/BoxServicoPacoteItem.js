import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function BoxServicoPacoteItem(props) {
  const [title, setTitle] = useState('')

  const nome = props.nome
  const categoria = props.categoria

  useEffect(() => {
    if (categoria) {
      setTitle(`${nome} - Categoria: ${categoria}`)
    } else {
      setTitle(nome)
    }
  }, [])

  return (
    <div className="box-servico-pacote-item">
      <div className="box-servico-pacote-item__left">
        <div className="box-servico-pacote-item__checkbox">
          <input type="checkbox"/>
        </div>
        <p className="box-servico-pacote-item__title">{title}</p>
      </div>
      <div className="box-servico-pacote-item__right"></div>
    </div>
  )
}

