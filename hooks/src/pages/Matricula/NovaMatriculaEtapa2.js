import React, { useRef, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, Redirect, useHistory, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

import FadeVariants from '@/animation/FadeVariants'

import Topbar from '@/components/Topbar'
import BoxPacote from '@/components/BoxPacote'
import BoxServico from '@/components/BoxServico'

import PageGoBack from '@/components/Page/PageGoBack'

import TextInput from '@/components/Input/TextInput'
import TextDateInput from '@/components/Input/TextDateInput'
import DateInput from '@/components/Input/DateInput'
import SelectInput from '@/components/Input/SelectInput'

import FormSection from '@/components/FormSection/FormSection'

import IcPlusSign from '@/assets/svg/ic_plus_sign.svg'

import ModalContatoAdicionalCreate from '@/components/Modal/ModalContatoAdicionalCreate'
import ModalContatoAdicionalUpdate from '@/components/Modal/ModalContatoAdicionalUpdate'

import TipoDocumentoRepository from '@/repository/TipoDocumentoRepository'
import StatusProcessoRepository from '@/repository/StatusProcessoRepository'

import FormHelper from '@/helpers/FormHelper'
import NetworkHelper from '@/helpers/NetworkHelper'

import useFeather from '@/hooks/useFeather'

import { preencherEnderecoPorCep } from '@/utils/FormUtils'

import Log from '@/utils/Log'

export default function NovaMatriculaEtapa2(props) {
  useFeather()

  const [pacotes, setPacotes] = useState([])
  const [servicos, setServicos] = useState([])

  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    Log.dev(location)
  }, [location])

  function handleBoxPacotesChange(event) {
    const pacotes = event.pacotes

    setPacotes(pacotes)
  }

  function handleBoxServicosChange(event) {
    const servicos = event.servicos

    setServicos(servicos)
  }

  function associateToAluno() {
    const aluno = location.state.aluno

    return {
      pacotes: pacotes.map((pacote) => {
        return { aluno: aluno, pacote: pacote._id }
      }),

      servicos: servicos.map((servico) => {
        return { aluno: aluno, servico: servico.servico._id, quantidade: servico.quantidade }
      }),
    }
  }

  async function handleSubmit(event) {
    const { pacotes, servicos } = associateToAluno()

    Log.dev(pacotes, servicos)

    try {
      const pacotesFormId = FormHelper.new()
      const servicosFormId = FormHelper.new()

      FormHelper.update(pacotesFormId, {
        $set: { data: pacotes }
      })

      FormHelper.update(servicosFormId, {
        $set: { data: servicos }
      })

      FormHelper.submit({
        id: pacotesFormId,
        model: 'AlunoPacote',
        action: 'create',
        type: 'array',
      })

      FormHelper.submit({
        id: servicosFormId,
        model: 'AlunoServico',
        action: 'create',
        type: 'array',
      })

      const responses = await NetworkHelper.processAllRequests()
      Log.dev(responses)
    } catch (err) {
      Log.dev(err)
      alert('Um erro ao processar o pedido.')
    }
  }

  return (
    <motion.div className="page__step" initial="exit" animate="enter" exit="exit" variants={FadeVariants}>
      <div className="page__content">

        <div className="page__columns">
          <div className="page__column page__column--half">
            <p className="page__subtitle">Pacotes</p>
            <BoxPacote onChange={handleBoxPacotesChange}/>
          </div>
          <div className="page__column page__column--half">
            <p className="page__subtitle">Serviços</p>
            <BoxServico onChange={handleBoxServicosChange}/>
          </div>
        </div>
      </div>

      <div className="page__footer">
        <div className="page__footer-left">
            <span className="page__indicator"></span>
        </div>
        <div className="page__footer-right">
          <button className="btn btn--one" onClick={handleSubmit}>Continuar</button>
        </div>
      </div>
    </motion.div>
  )
}