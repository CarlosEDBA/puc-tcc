import React, { useState, useEffect } from 'react'
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Navbar from '@/components/Navbar'

import Index from '@/pages/Index'
import Login from '@/pages/Login'
import Alunos from '@/pages/Alunos'
import Aulas from '@/pages/Aulas'
import Exames from '@/pages/Exames'
import Materiais from '@/pages/Materiais'

import { BASEPATH } from '@/globals'
import Sidebar from "./Sidebar";

export default function Main(props) {
  return (
    <div className="app">
        <Router basename={BASEPATH}>
            <Sidebar/>
            <Switch>
                <Route path="/materiais" component={Materiais}/>
                <Route path="/exames" component={Exames}/>
                <Route path="/aulas" component={Aulas}/>
                <Route path="/alunos" component={Alunos}/>
                <Route path="/login" component={Login}/>
                <Route path="/" component={Index}/>
            </Switch>
        </Router>
    </div>
  )
}

