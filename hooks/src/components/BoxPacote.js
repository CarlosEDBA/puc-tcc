import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Fuse from 'fuse.js'

import BoxPacoteItem from '@/components/BoxPacoteItem'

import PacoteRepository from '@/repository/PacoteRepository'

import Log from '@/utils/Log'

export default function BoxPacote(props) {
  const onChange = props.onChange

  const [todosPacotes, setTodosPacotes] = useState([])
  const [pacotes, setPacotes] = useState([])
  const [pacotesSelecionados, setPacotesSelecionados] = useState([])
  const [busca, setBusca] = useState('')

  useEffect(() => {
    fetchPacotes()
  }, [])

  useEffect(() => {
    filtrarPacotes()
  }, [busca])

  useEffect(() => {
    if (onChange) onChange({ pacotes: pacotesSelecionados })
  }, [pacotesSelecionados])

  async function fetchPacotes() {
    try {
      const pacotes = await PacoteRepository.find()
      
      adicionarCampoComposto(pacotes)
      setPacotes(pacotes)
    } catch (err) {
      console.error(err)
    }
  }

  function adicionarCampoComposto(todosPacotes) {
    setTodosPacotes(todosPacotes.map((el) => {
      if (el.categoria) {
        return { ...el, nomeComposto: `${el.nome} - Categoria ${el.categoria}` }
      }

      return el
    }))
  }

  function filtrarPacotes() {
    if (busca.length > 2) {
      const fuse = new Fuse(todosPacotes, {
        includeScore: true,
        keys: ['nome', 'nomeComposto']
      })
      
      const result = fuse.search(busca)
      
      const pacotes = result.map((el) => el.item)

      setPacotes(pacotes)
    } else {
      setPacotes(todosPacotes)
    }
  }

  function handleBuscaChange(event) {
    const target = event.currentTarget
    
    setBusca(target.value)
  }

  function handleItemChange(event) {
    if (event.status === 'checked') {
      setPacotesSelecionados([...pacotesSelecionados, event.item])
    } else {
      setPacotesSelecionados(pacotesSelecionados.filter((el) => el._id !== event.item._id))
    }
  }

  function renderItems() {
    return pacotes.map((pacote, i) => {
      return (<BoxPacoteItem key={pacote._id} pacote={pacote} onChange={handleItemChange}/>)
    })
  }
  
  return (
    <div className="box-pacote">
      <div className="box-pacote__header">
        <div className="box-pacote__filter">
          <i data-feather="search"></i>
          <input type="text" placeholder="Procure por um pacote..." value={busca} onChange={handleBuscaChange}/>
        </div>
      </div>
      <div className="box-pacote__list">
        {renderItems()}
      </div>
    </div>
  )
}

