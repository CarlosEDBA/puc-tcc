import React from 'react'
import ReactDOM from 'react-dom'

import MainRouter from '@/components/MainRouter'

import './assets/css/main.css'

const render = Component => {
  ReactDOM.render(
      <Component/>, document.getElementById('root')
  )
}

render(MainRouter)

// webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('@/components/MainRouter', () => {
    render(MainRouter)
  })
}