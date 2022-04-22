import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  HashRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import AuthorizedRoute from '@/components/AuthorizedRoute'
import AuthorizedLayout from '@/components/AuthorizedLayout'

import Login from '@/pages/Login'
import CriarConta from '@/pages/CriarConta'


import { BASEPATH } from '@/globals'

export default function Main(props) {
  return (
    <div className="app">
        <Router basename={BASEPATH}>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/criar-conta" component={CriarConta}/>
            <AuthorizedRoute path="/" component={AuthorizedLayout}/>
          </Switch>
        </Router>
    </div>
  )
}

