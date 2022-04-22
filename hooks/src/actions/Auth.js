import Promise from 'bluebird'
import axios from 'axios'
import ls from 'store'
import jwtDecode from 'jwt-decode'

import AuthHelper from '@/helpers/AuthHelper'

import * as types from '@/actionTypes'

function extractUserData(token) {
  const tokenData = jwtDecode(token)

  return {
    _id: tokenData._id,
    nome: tokenData.nome,
    sobrenome: tokenData.sobrenome,
  }
}

export function login(data) {
  return async dispatch => {
    const { token } = await AuthHelper.fetchToken(data).catch(console.error) || {}

    if (token) {
      const userData = extractUserData(token)

      ls.set('token', token)
      ls.set('user', userData)
    }
  }
}

export function validateToken(receivedToken) {
  return async dispatch => {
    const { token } = await AuthHelper.validateToken(receivedToken).catch(console.error) || {}

    if (token) {
      const userData = extractUserData(token)

      ls.set('user', userData)
    }
  }
}

export function renewToken(receivedToken) {
  return async dispatch => {
    const { token } = await AuthHelper.renewToken(receivedToken).catch(console.error) || {}

    if (token) {
      const userData = extractUserData(token)

      ls.set('token', token)
      ls.set('user', userData)
    }
  }
}

export function logout() {
  return async dispatch => {
    ls.remove('token')
    ls.remove('user')

    dispatch({ type: types.AUTH_LOGOUT })
  }
}