import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Sidebar from '@/components/Sidebar'
import Topbar from '@/components/Topbar'

import Inicio from '@/pages/Inicio'
import Logout from '@/pages/Logout'

import Alunos from '@/pages/Aluno/Alunos'

import Aulas from '@/pages/Aula/Aulas'

import Exames from '@/pages/Exame/Exames'

import Materiais from '@/pages/Material/Materiais'

import Matriculas from '@/pages/Matricula/Matriculas'
import NovaMatricula from '@/pages/Matricula/NovaMatricula'

import Pacotes from '@/pages/Pacote/Pacotes'

import Servicos from '@/pages/Servico/Servicos'
import NovoServico from '@/pages/Servico/NovoServico'

import PreferenciaUsuarioRepository from '@/repository/PreferenciaUsuarioRepository'

export default function AuthorizedLayout() {
  const user = useSelector(state => state.Auth.user)

  useEffect(() => {
    console.log('user', user)

    PreferenciaUsuarioRepository.find({
      usuario: user._id
    })
        .then((data) => {
          console.log(data)
        })
  }, [])

  return (
    <>
      <div className="app__sidebar">
        <Sidebar/>
      </div>

      <div className="app__main">
        <Topbar fixed={true}/>

        <AnimatePresence>
          <Switch>
            <Route path="/logout" component={Logout}/>

            <Route path="/alunos" component={Alunos}/>

            <Route path="/aulas" component={Aulas}/>

            <Route path="/exames" component={Exames}/>

            <Route path="/materiais" component={Materiais}/>

            <Route path="/matriculas/nova" component={NovaMatricula}/>
            <Route path="/matriculas" component={Matriculas}/>

            <Route path="/pacotes" component={Pacotes}/>

            <Route path="/servicos/novo" component={NovoServico}/>
            <Route path="/servicos" component={Servicos}/>

            <Route path="/" component={Inicio}/>
          </Switch>
        </AnimatePresence>
      </div>
    </>
  )
}