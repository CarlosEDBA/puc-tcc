import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { maskBr } from 'js-brasil'

import useFeather from '@/hooks/useFeather'

export default function BoxServicoItem(props) {
  useFeather()
  
  const servico = props.servico
  const onChange = props.onChange

  const [quantidade, setQuantidade] = useState(0)

  const checkbox = useRef(null)

  useEffect(() => {
    if (onChange) {
      if (quantidade === 1) {
        onChange({ status: 'checked', item: servico, quantity: 1 })
      } else if (quantidade === 0) {
        onChange({ status: 'unchecked', item: servico })
      } else {
        onChange({ status: 'changed', item: servico, quantity: quantidade })
      }
    }
  }, [quantidade])

  function handleMinusClick(event) {
    event.stopPropagation()
    
    if (quantidade > 0) {
      const novaQuantidade = quantidade - 1

      setQuantidade(novaQuantidade)

      if (novaQuantidade === 0) {
        checkbox.current.checked = false
      }
    } else {
      checkbox.current.checked = false
    }
  }

  function handlePlusClick(event) {
    event.stopPropagation()

    setQuantidade(quantidade + 1)
    
    checkbox.current.checked = true
  }

  function handleQuantityChange(event) {
    const target = event.currentTarget
    
    const novaQuantidade = parseInt(target.value)

    setQuantidade(novaQuantidade)
  }

  function handleClick(event) {
    if (checkbox.current.checked) {
      checkbox.current.checked = false

      setQuantidade(0)
    } else {
      checkbox.current.checked = true

      setQuantidade(1)
    }
  }

  return (
    <div className="box-servico-item" onClick={handleClick}>
      <div className="box-servico-item__left">
        <div className="box-servico-item__checkbox">
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
          <p className="box-servico-item__title">{servico.nome}</p>
          <p className="box-servico-item__subtitle">{maskBr.currency(servico.valor)}</p>
        </div>
      </div>
      <div className="box-servico-item__right">
        <div className="box-servico-item__quantity">
          <button className="box-servico-item__minus" onClick={handleMinusClick}>
            <i data-feather="minus"></i>
          </button>

          <input type="number" value={quantidade} onChange={handleQuantityChange}/>

          <button className="box-servico-item__plus" onClick={handlePlusClick}>
            <i data-feather="plus"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

