import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Fuse from 'fuse.js'

import BoxServicoItem from '@/components/BoxServicoItem'

import ServicoRepository from '@/repository/ServicoRepository'

import Log from '@/utils/Log'

export default function BoxServico(props) {
  const onChange = props.onChange

  const [todosServicos, setTodosServicos] = useState([])
  const [servicos, setServicos] = useState([])
  const [servicosSelecionados, setServicosSelecionados] = useState([])
  const [busca, setBusca] = useState('')

  useEffect(() => {
    fetchServicos()
  }, [])

  useEffect(() => {
    filtrarServicos()
  }, [busca])

  useEffect(() => {
    if (onChange) onChange({ servicos: servicosSelecionados })
  }, [servicosSelecionados])

  async function fetchServicos() {
    try {
      const servicos = await ServicoRepository.find()

      setTodosServicos(servicos)
      setServicos(servicos)
    } catch (err) {
      console.error(err)
    }
  }

  function filtrarServicos() {
    if (busca.length > 2) {
      const fuse = new Fuse(todosServicos, {
        includeScore: true,
        keys: ['nome', 'tipo']
      })
      
      const result = fuse.search(busca)
      
      const servicos = result.map((el) => el.item)

      setServicos(servicos)
    } else {
      setServicos(todosServicos)
    }
  }

  function handleBuscaChange(event) {
    const target = event.currentTarget
    
    setBusca(target.value)
  }

  function handleItemChange(event) {
    if (event.status === 'checked') {
      setServicosSelecionados([...servicosSelecionados, { servico: event.item, quantidade: event.quantity }])
    } else if (event.status === 'unchecked') {
      setServicosSelecionados(servicosSelecionados.filter((el) => el.servico._id !== event.item._id))
    } else if (event.status === 'changed') {
      const arrayAtualziado = servicosSelecionados.filter((el) => el.servico._id !== event.item._id)

      setServicosSelecionados([...arrayAtualziado, { servico: event.item, quantidade: event.quantity }])
    }
  }

  function renderItems() {
    return servicos.map((servico, i) => (
      <BoxServicoItem key={servico._id} servico={servico} onChange={handleItemChange}/>
    ))
  }

  return (
    <div className="box-servico">
      <div className="box-pacote__header">
        <div className="box-servico__filter">
          <i data-feather="search"></i>
          <input type="text" placeholder="Procure por um serviço..." value={busca} onChange={handleBuscaChange}/>
        </div>
      </div>
      <div className="box-servico__list">
        {renderItems()}
      </div>
    </div>
  )
}

