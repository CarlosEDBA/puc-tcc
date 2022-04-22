import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import moment from 'moment'
import Modal from 'react-modal'

import MainRouter from './components/MainRouter'

import store from './store'

import './assets/css/common.css'
import './assets/css/daypicker.css'
import './assets/css/data.css'
import './assets/css/s-widget.css'
import './assets/css/ctable.css'
import './assets/css/widget.css'
import './assets/css/custom-table.css'
import './assets/css/inputs.css'
import './assets/css/cfc.css'


moment.locale('pt-BR')

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <Component/>
    </Provider>
    , document.getElementById('root')
  )
}

Modal.setAppElement('#root')

render(MainRouter)

// webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('@/components/MainRouter', () => {
    render(MainRouter)
  })
}